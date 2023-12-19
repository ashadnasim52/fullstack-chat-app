import React, { useEffect } from "react";
import Navigations from "./components/routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { TOKEN } from "./utils/constant";
import { setAuthentication } from "./store/globalSlice";
import { setSession } from "./utils/jwt";
import LoadingComponent from "./components/ui/LoadingComponent";
import { logger } from "./utils/logger";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./utils/funcs";

const App = () => {
	const dispatch = useDispatch();
	const nav = useNavigate();

	const { isAuthenticated, isLoading } = useSelector((state) => state.global);
	const _checkAuthentication = async () => {
		const token = localStorage.getItem(TOKEN);
		logger.log({ token });
		if (token) {
			dispatch(setAuthentication(true));
			setSession(token);
		} else {
			dispatch(setAuthentication(false));
			// showToast("Please Signin to Continue");
			nav("/signin");
		}
	};
	useEffect(() => {
		_checkAuthentication();
	}, []);

	if (isLoading) return <LoadingComponent />;
	return (
		<div>
			<ToastContainer />
			<Navigations />
		</div>
	);
};

export default App;
