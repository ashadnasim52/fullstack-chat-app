// src/Routes.js
import React from "react";
import Home from "../../pages/Home";
import About from "../../pages/About";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Chat from "../../pages/Chat";

const Navigations = () => {
	return (
		<div>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</div>
	);
};

export default Navigations;
