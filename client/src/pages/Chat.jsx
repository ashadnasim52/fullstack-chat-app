import React, { useState } from "react";
import Layout from "../components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
function generateRandomLastSeen() {
	const hoursAgo = Math.floor(Math.random() * 24);
	return `Last seen ${
		hoursAgo === 0
			? "just now"
			: `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`
	}`;
}
const generateParticipants = () => {
	const participants = [];
	for (let i = 1; i <= 50; i++) {
		participants.push({
			id: i,
			name: `Participant ${i}`,
			avatar: `/path-to-avatar${i}.jpg`, // Replace with the actual path
			lastSeen: generateRandomLastSeen(),
		});
	}
	return participants;
};

const participantsData = generateParticipants();

const generateRandomChatMessage = () => {
	const messages = [
		"Hi there!",
		"How are you doing?",
		"This is a sample message.",
		"Random message!",
		"Nice to meet you!",
	];
	const randomIndex = Math.floor(Math.random() * messages.length);
	return messages[randomIndex];
};

const generateRandomTimestamp = () => {
	const hoursAgo = Math.floor(Math.random() * 24);
	return `Last seen ${
		hoursAgo === 0
			? "just now"
			: `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`
	}`;
};

const generateRandomChat = () => {
	return {
		id: Date.now(),
		sender: Math.random() < 0.5 ? "user" : "participant",
		message: generateRandomChatMessage(),
		timestamp: generateRandomTimestamp(),
	};
};

const generateInitialChats = () => {
	const initialChats = [];
	for (let i = 1; i <= 10; i++) {
		initialChats.push(generateRandomChat());
	}
	return initialChats;
};
const Chat = () => {
	const [chats, setChats] = useState(generateInitialChats());
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		const newChat = {
			id: Date.now(),
			sender: "user",
			message: newMessage,
			timestamp: generateRandomTimestamp(),
		};
		setChats((prevChats) => [...prevChats, newChat]);
		setNewMessage("");
	};

	return (
		<Layout>
			<div className="flex h-100 bg-secondarycolor">
				{/* Participants List (Left Side) */}
				<div className="w-1/4 bg-darkblackcolor text-white p-4 border-r h-100 overflow-y-auto">
					<h2 className="text-xl font-bold mb-4">Participants</h2>

					{participantsData.map((participant) => (
						<div className="flex items-center mb-4">
							<Avatar className="h-9 w-9">
								<AvatarImage
									src="https://avatars.githubusercontent.com/u/38835999?v=4"
									alt="@shadcn"
								/>
								<AvatarFallback>SC</AvatarFallback>
							</Avatar>
							<div className=" pl-4">
								<p className="font-bold text-white">Participant 1</p>
								<p className="text-gray-500 text-sm">
									Last seen 30 minutes ago
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="flex-1 p-4 overflow-y-auto relative">
					{/* Chat Messages */}
					<div className="flex flex-col">
						{chats.map((chat) => (
							<div
								key={chat.id}
								className={`flex ${
									chat.sender === "user" ? "justify-end" : "justify-start"
								} items-center mb-2`}
							>
								{chat.sender === "participant" && (
									<img
										src="/path-to-participant-avatar.jpg" // Replace with the actual path
										alt="Participant Avatar"
										className="w-8 h-8 rounded-full mr-2"
									/>
								)}
								<div
									className={`bg-${
										chat.sender === "user" ? "blue-500" : "green-500"
									} text-white p-2 rounded`}
								>
									<p>{chat.message}</p>
									<p className="text-xs text-gray-300">{chat.timestamp}</p>
								</div>
							</div>
						))}

						{/* Add more chat messages as needed */}
					</div>

					{/* Chat Input */}
					<div className="fixed w-3/4 bottom-0 flex right-0 p-0 bg-white">
						<input
							type="text"
							placeholder="Type your message..."
							className="flex-1 p-4 border rounded-l focus:outline-none"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
						<button
							className="bg-blue-500 text-white p-4 px-12  "
							onClick={handleSendMessage}
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Chat;
