import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthSlice {
	loggedIn: boolean;
}

const initialState: IAuthSlice = {
	loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		setLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.loggedIn = action.payload;
		},
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
