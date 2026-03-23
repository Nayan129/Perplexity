import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState, useRef } from "react";

const Dashboard = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Chat title" },
    { id: 2, title: "Chat title" },
    { id: 3, title: "Chat title" },
    { id: 4, title: "Chat title" },
    { id: 5, title: "Chat title" },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { type: "user", content: message }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "AI message response..." },
      ]);
    }, 1000);
    setMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      <aside className="w-64 min-w-50 flex flex-col border-r border-gray-800/50 bg-[#0d0d0d]">
        <div className="p-4 border-b border-gray-800/50">
          <h1 className="text-lg font-semibold tracking-wide text-white/90">
            Perplexity
          </h1>
        </div>

        {/* Chat History */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {chatHistory.map((chatItem) => (
            <button
              key={chatItem.id}
              onClick={() => setActiveChat(chatItem.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-out cursor-pointer
                ${
                  activeChat === chatItem.id
                    ? "bg-linear-to-r from-cyan-500/20 to-transparent border border-cyan-500/30 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <span className="block truncate">{chatItem.title}</span>
            </button>
          ))}
        </nav>

        {/* button for new chat */}
        <div className="p-3 border-t border-gray-800/50">
          <button className="w-full px-4 py-2.5 rounded-lg bg-linear-to-tr  hover:to-neutral-800  text-white text-sm font-medium transition-all duration-300 ease-out shadow-lg shadow-white-500/60 cursor-pointer">
            + New Chat
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* User Message */}
          <div className="flex justify-end mb-4">
            {messages
              .filter((m) => m.type === "user")
              .slice(-1)
              .map((msg, idx) => (
                <div
                  key={idx}
                  className="max-w-md px-4 py-3 mr-10 rounded-xl bg-gray-800/60 border border-gray-700/50 text-sm text-gray-200 backdrop-blur-sm"
                >
                  {msg.content}
                </div>
              )) || (
              <div className="px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700/30 text-sm text-gray-500">
                user message
              </div>
            )}
          </div>

          {/* AI Response  */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-360  h-full min-h-75 rounded-2xl  flex items-center justify-center overflow-y-auto">
              {messages.filter((m) => m.type === "ai").length > 0 ? (
                <div className="p-6 text-gray-300 text-sm leading-relaxed w-full">
                  {
                    messages.filter((m) => m.type === "ai").slice(-1)[0]
                      ?.content
                  }
                </div>
              ) : (
                <p className="text-shadow-white text-4xl">
                  Welcome To Perplexity AI 🤖
                </p>
              )}
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="mt-4">
            <form onSubmit={handleSendMessage} className="relative">
              <div className="rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 focus-within:border-cyan-500/50 focus-within:shadow-lg focus-within:shadow-cyan-500/10">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Chat input area"
                  className="w-full px-4 py-4 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800/50">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-200 disabled:opacity-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default Dashboard;
