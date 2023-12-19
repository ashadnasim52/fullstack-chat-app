import React from "react";
import Navigations from "./components/routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div>
			<ToastContainer />
			<Navigations />
		</div>
	);
};

export default App;
