// src/components/SignIn.js
import React from "react";
import animationData from "../assets/walk.json";
import Lottie from "lottie-react";
import { colors } from "../utils/constant";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Groups from "../components/Groups";
import FloatingActionButton from "../components/FloatingActionButton";

const Home = () => {
	const style = {
		height: 500,
	};
	const interactivity = {
		mode: "scroll",
		actions: [
			{
				visibility: [0, 0.2],
				type: "stop",
				frames: [0],
			},
			{
				visibility: [0.2, 0.45],
				type: "seek",
				frames: [0, 45],
			},
			{
				visibility: [0.45, 1.0],
				type: "loop",
				frames: [45, 60],
			},
		],
	};

	const groupsData = [
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		{
			id: 1,
			groupName: "Study Group",
			createdBy: "John Doe",
			creatorImage: "/path-to-john-image.jpg",
		},
		// Add more group data as needed
	];

	return (
		<Layout>
			<div className="flex bg-secondarycolor h-full">
				{/* Left side with image and text */}
				<div
					className={`flex-1 bg-secondarycolor p-8 flex items-center justify-center`}
				>
					<div className="text-white text-center">
						<Lottie
							animationData={animationData}
							loop={true}
							style={style}
							// interactivity={interactivity}
						/>
					</div>
				</div>

				<div className="flex flex-1">
					{/* <h1 className="text-3xl font-bold mb-4">Groups</h1> */}
					<Groups groups={groupsData} />
				</div>
			</div>

			<FloatingActionButton onClick={() => {}} />
		</Layout>
	);
};

export default Home;
