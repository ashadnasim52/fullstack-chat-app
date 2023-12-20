import { createSlice } from "@reduxjs/toolkit";
import { logger } from "../utils/logger";
const initialState = {
	isAuthenticated: false,
	isLoading: true,
	authData: null,
};
export const globalSlice = createSlice({
	name: "global",
	initialState: initialState,
	reducers: {
		setAuthentication: (state, action) => {
			state.isAuthenticated = action.payload;
			state.isLoading = false;
		},
		setAuthData: (state, action) => {
			state.isAuthenticated = true;
			state.authData = action.payload;
		},
		logOut: () => initialState,
	},
});

export const { setAuthentication, setAuthData, logOut } = globalSlice.actions;

export default globalSlice.reducer;
