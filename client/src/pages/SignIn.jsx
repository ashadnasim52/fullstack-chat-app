// src/components/SignIn.js
import React from "react";
import Lottie from "react-lottie";
import animationData from "../path-to-your-animation.json";

const SignIn = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className="flex h-screen">
			{/* Left side with image and text */}
			<div className="flex-1 bg-blue-500 p-8 flex items-center justify-center">
				<div className="text-white text-center">
					<h1 className="text-4xl font-bold mb-4">GenZ Chat App</h1>
					<p>Your go-to platform for chatting with GenZ!</p>
				</div>
			</div>

			{/* Right side with sign-in card */}
			<div className="flex-1 flex items-center justify-center p-8">
				<div className="bg-white p-8 rounded shadow-md w-96">
					<h2 className="text-2xl font-bold mb-6">Sign In</h2>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-600 font-semibold mb-2"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full border rounded-md py-2 px-3"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-600 font-semibold mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full border rounded-md py-2 px-3"
						/>
					</div>
					<button className="bg-blue-500 text-white rounded-md py-2 px-4 w-full">
						Sign In
					</button>
					<p className="text-gray-600 mt-4">
						Don't have an account? <a href="#">Create one</a>.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
