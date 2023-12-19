import axios from "axios";
import { BASE_URL } from "./api";
import { setSession } from "./jwt";
import { logger } from "./logger";
import store from "../store";
import { logOut } from "../store/globalSlice";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		// any other default headers
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		logger.log({
			error,
		});

		if (
			error?.status === 401 ||
			error?.status === 403 ||
			error?.response?.status === 401 ||
			error?.response?.status === 403 ||
			error?.response?.status === 429 ||
			error?.response?.status === 429
		) {
			console.log("Error");
			console.log(error);
			setSession();
			store.dispatch(logOut());
			// showToast('Please Signin again, something went wrong');
		} else if (error?.status === 503 || error?.response?.status === 503) {
			setSession();
			store.dispatch(logOut());
			// showToast('Please Signin again, something went wrong');
		} else {
			return Promise.reject(
				(error?.response && error?.response?.data) || "Something went wrong"
			);
		}
	}
);

export default axiosInstance;
