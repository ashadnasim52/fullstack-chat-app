import { createSlice } from "@reduxjs/toolkit";
import { logger } from "../utils/logger";
const initialState = {
	isAuthenticated: false,
	isLoading: true,
	authData: null,
	globalData: null,
};
export const globalSlice = createSlice({
	name: "global",
	initialState: initialState,
	reducers: {
		setAuthentication: (state, action) => {
			state.isAuthenticated = action.payload;
			state.isLoading = false;
		},
		setGlobalData: (state, action) => {
			// state.isLoading = false;
			state.globalData = action.payload;
			state.isLoading = false;
		},
		setAuthData: (state, action) => {
			state.isAuthenticated = true;
			state.authData = action.payload;
			state.isLoading = false;
		},
		logOut: () => initialState,
	},
});

export const { setAuthentication, setGlobalData, setAuthData, logOut } =
	globalSlice.actions;

export default globalSlice.reducer;
