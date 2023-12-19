// src/components/SignIn.js
import React from "react";
import animationData from "../assets/login.json";
import Lottie from "lottie-react";
import { colors } from "../utils/constant";
import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<div className="flex h-screen bg-darkblack">
			{/* Left side with image and text */}
			<div
				className={`flex-1 bg-darkblack p-8 flex items-center justify-center`}
			>
				<div className="text-white text-center">
					<Lottie animationData={animationData} loop={true} />
					<div className="text-pink text-center">
						<h1 className="text-4xl font-bold mb-4">GenZ Chat App</h1>
						<p>Your go-to platform for chatting with GenZ!</p>
					</div>
				</div>
			</div>

			{/* Right side with sign-in card */}
			<div className="flex-1 flex items-center justify-center p-8">
				<div className="bg-secondary text-white p-8 rounded rounded-md shadow-md w-96">
					<h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
					<button className="bg-accent text-white rounded-md py-2 px-4 w-full">
						Sign In
					</button>
					<p className="text-white mt-4 ">
						Already have an account?{" "}
						<Link to={"/signup"} className="underline text-blue-400">
							Sign In
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
