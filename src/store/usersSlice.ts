import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRoom {
	id: string;
	name: string;
	value: string;
}

export interface IUser {
	id: string;
	currentRoom: IRoom | null;
	name: string;
}

interface IUsersSlice {
	usersdb: IUser[] | [];
}

const initialState: IUsersSlice = {
  usersdb: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserToDB: (state, action: PayloadAction<IUser>) => {
      state.usersdb = [...state.usersdb, action.payload];
    },
		setUserCurrenRoom: (state, action: PayloadAction<{room: IRoom, userId: string}>) => {
			const currentUserIndex = state.usersdb.findIndex((user) => user.id === action.payload.userId);
			state.usersdb[currentUserIndex].currentRoom = action.payload.room;
		},
		clearUserRoom: (state, action: PayloadAction<string>) => {
			const currentUserIndex = state.usersdb.findIndex((user) => user.id === action.payload);
			console.log(state.usersdb);
			state.usersdb[currentUserIndex].currentRoom = null;
		},
  },
});

export const {
 addUserToDB, clearUserRoom, setUserCurrenRoom,
} = usersSlice.actions;

export default usersSlice.reducer;
