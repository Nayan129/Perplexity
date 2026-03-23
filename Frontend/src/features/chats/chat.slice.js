import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setChats: (action, state) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (action, state) => {
      state.currentChatId = action.payload;
    },
    setIsLoading: (action, state) => {
      state.isLoading = action.payload;
    },
    setError: (action, state) => {
      state.error = action.payload;
    },
  },
});

export const { setChats, setCurrentChatId, setError, setIsLoading } =
  chatSlice.actions;
export default chatSlice.reducer;
