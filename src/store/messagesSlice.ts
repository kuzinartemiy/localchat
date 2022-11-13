import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IQuote {
	quoteText: string;
	quotedAuthor: string;
}

export interface IMessage {
	id: string;
	currentRoom: string;
	date: string;
	author: {
		id: string;
		name: string;
	},
	text: string;
	quote?: IQuote;
}

interface IMessagesSlice {
	messagesList: IMessage[] | [];
	selectedMessage: IMessage | null;
}

const initialState: IMessagesSlice = {
  messagesList: [],
	selectedMessage: null,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messagesList = [...state.messagesList, action.payload];
    },
		selectMessage: (state, action: PayloadAction<IMessage | null>) => {
			state.selectedMessage = action.payload;
		},
  },
});

export const { addMessage, selectMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
