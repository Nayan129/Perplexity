import { initializeSocketConnection } from "../services/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../services/chat.api.js";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  removeChat,
} from "../chat.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  async function handleSendMessage({ message, chatId }) {
    if (!message.trim()) return;

    try {
      dispatch(setLoading(true));

      const data = await sendMessage({ message, chatId });

      const { chat, aiMessage } = data;

      const finalChatId = chatId || chat._id;

      //  new chat create
      if (!chatId) {
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      }

      //  set current chat
      dispatch(setCurrentChatId(finalChatId));

      //  add user message
      dispatch(
        addNewMessage({
          chatId: finalChatId,
          content: message,
          role: "user",
        }),
      );

      //  add AI message
      dispatch(
        addNewMessage({
          chatId: finalChatId,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
    } catch (err) {
      console.log(err);
      dispatch(setError("Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    dispatch(setLoading(true));

    const data = await getChats();
    const { chats } = data;

    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );

    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId, chats) {
    if (chats[chatId]?.messages.length === 0) {
      const data = await getMessages(chatId);
      const { messages } = data;

      localStorage.setItem("currentChatId", chatId);

      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    }

    dispatch(setCurrentChatId(chatId));
  }

  function handleNewChat() {
    dispatch(setCurrentChatId(null));
    localStorage.removeItem("currentChatId");
  }

  async function handleDeleteChat(chatId) {
    await deleteChat(chatId);

    dispatch(removeChat(chatId));

    if (currentChatId === chatId) {
      dispatch(setCurrentChatId(null));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleNewChat,
    handleDeleteChat,
  };
};
