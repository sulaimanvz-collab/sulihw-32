import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../types";
import { createMessage, fetchMessages } from "./messagesThunks";

interface MessagesState {
  items: Message[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: MessagesState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createMessage.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const selectMessages = (state: { messages: MessagesState }) =>
  state.messages.items;
export const selectFetchLoading = (state: { messages: MessagesState }) =>
  state.messages.fetchLoading;
export const selectCreateLoading = (state: { messages: MessagesState }) =>
  state.messages.createLoading;

export const messagesReducer = messagesSlice.reducer;
