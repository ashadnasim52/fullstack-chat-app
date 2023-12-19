import store from "../store";
import { setAuthentication } from "../store/globalSlice";
import axiosInstance from "./axios";
import { TOKEN } from "./constant";
import { logger } from "./logger";

const isValidToken = (token) => {
	if (!token) {
		return false;
	}
	return true;
};

const setSession = (token) => {
	logger.log("Called");
	// const isTokenValid = verifyToken(token);
	// if (!isTokenValid) {
	// 	window.location.replace("/");
	// 	return showToast("Token Expired, please signin again.");
	// }
	if (token) {
		localStorage.setItem(TOKEN, token);
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		store.dispatch(setAuthentication(true));
	} else {
		localStorage.removeItem(TOKEN);
		delete axiosInstance.defaults.headers.common.Authorization;
	}
};
export { isValidToken, setSession };
