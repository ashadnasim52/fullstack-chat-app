import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useParams } from "react-router-dom";
import { SINGLE_GROUP_DETAIL } from "../utils/api";
import { showToast } from "../utils/funcs";
import { SOMETHING_WENT_WRONG, TOKEN } from "../utils/constant";
import { logger } from "../utils/logger";
import axiosInstance from "../utils/axios";
import moment from "moment";
import { Provider, useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL;
const socket = io(URL, {
	autoConnect: false,
	auth: { token: `${localStorage.getItem(TOKEN)}` }, // Replace with the actual JWT token
});
const Chat = () => {
	const { isAuthenticated, isLoading, authData } = useSelector(
		(state) => state.global
	);
	const [message, setMessage] = useState("");
	const [isJoined, setIsJoined] = useState(false);
	const [groupData, setGroupData] = useState([]);
	const [chats, setChats] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	let { id } = useParams(); // Unpacking and retrieve id
	const chatContainerRef = useRef(null);
	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [chats]);
	// const handleSendMessage = () => {
	// 	const newChat = {
	// 		id: Date.now(),
	// 		sender: "user",
	// 		message: newMessage,
	// 		timestamp: generateRandomTimestamp(),
	// 	};
	// 	setChats((prevChats) => [...prevChats, newChat]);
	// 	setNewMessage("");
	// };
	const _getGroupData = async () => {
		try {
			const { data } = await axiosInstance.get(`${SINGLE_GROUP_DETAIL}/${id}`);
			logger.log({
				data: data,
			});
			setGroupData(data?.payload);
			setChats(data?.payload?.chats);
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};
	const [participants, setParticipants] = useState([]);

	// useEffect(() => {
	// 	socket.on("participantsUpdated", (updatedParticipants) => {
	// 		console.log({ updatedParticipants });
	// 		setParticipants(updatedParticipants.members);
	// 	});
	// }, []);

	useEffect(() => {
		socket.on("participantsUpdated", (updatedParticipants) => {
			console.log({ updatedParticipants });
			setParticipants(updatedParticipants.members);
		});

		socket.on("groupMessage", (data) => {
			console.log("groupMessage");
			console.log(data);
			setChats([...chats, data]);
		});
	}, [chats]);

	useEffect(() => {
		_getGroupData();
	}, []);

	// const [isConnected, setIsConnected] = useState(socket.connected);
	// const [fooEvents, setFooEvents] = useState([]);

	// useEffect(() => {
	// 	function onConnect() {
	// 		console.log("Connected");
	// 		setIsConnected(true);
	// 	}

	// 	function onDisconnect() {
	// 		setIsConnected(false);
	// 	}

	// 	function onFooEvent(value) {
	// 		setFooEvents((previous) => [...previous, value]);
	// 	}

	// 	socket.connect();

	// 	socket.on("connect", onConnect);
	// 	socket.on("disconnect", onDisconnect);
	// 	socket.on("foo", onFooEvent);

	// 	return () => {
	// 		socket.off("connect", onConnect);
	// 		socket.off("disconnect", onDisconnect);
	// 		socket.off("foo", onFooEvent);
	// 	};
	// }, []);

	// useEffect(() => {
	// 	// Handle incoming group messages
	// 	socket.on("messages", (data) => {
	// 		console.log({ messages });
	// 		setMessages([...messages, data]);
	// 	});

	// 	// Cleanup when component unmounts
	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, [messages]);

	const joinGroup = () => {
		socket.connect();
		// Emit joinGroup event to server
		socket.emit("joinGroup", id);
		setIsJoined(true);
	};

	// const sendMessage = () => {
	// 	// Emit groupMessage event to server

	// 	try {
	// 		socket.emit("groupMessage", {
	// 			groupId: id,
	// 			message: "HI",
	// 		});
	// 	} catch (error) {
	// 		console.log({ error });
	// 	}
	// };

	const sendMessage = () => {
		socket.emit("groupMessage", { groupId: id, message: message });
		setMessage("");
	};
	if (!isJoined)
		return (
			<Layout>
				<div className="min-h-screen flex flex-col justify-center items-center bg-secondarycolor">
					<button
						onClick={joinGroup}
						className="bg-accentcolor h-14 text-white rounded-md py-2 px-10 hover:bg-accentcolor-dark focus:outline-none focus:shadow-outline"
					>
						Join Group {groupData?.name}
					</button>{" "}
					<p className="font-bold text-sm text-white mt-10">
						{groupData?.name} has {groupData?.members?.length} member and
						growing
					</p>
				</div>
			</Layout>
		);
	return (
		<Layout>
			<div
				className="flex  bg-secondarycolor"
				style={{
					maxHeight: "92vh",
				}}
			>
				{/* Participants List (Left Side) */}
				<div
					className="w-1/4 bg-darkblackcolor text-white p-4 border-r  overflow-y-auto"
					style={{
						height: "92vh",
					}}
				>
					{/* <button onClick={sendMessage}>Send Message</button> */}

					<h2 className="text-xl font-bold mb-4">Participants</h2>
					{participants.map((participant) => (
						<div className="flex items-center mb-4">
							<Avatar className="h-9 w-9">
								<AvatarImage
									src={participant.avatar}
									alt={participant.userName}
								/>
								<AvatarFallback>SC</AvatarFallback>
							</Avatar>
							<div className=" pl-4">
								<p className="font-bold text-white">{participant.userName}</p>
								<p className="text-gray-500 text-sm">
									{moment(participant.lastSeen).fromNow()}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="flex-1 p-4 overflow-y-auto relative">
					{/* Chat Messages */}
					<div
						ref={chatContainerRef}
						className="flex flex-col overflow-y-auto pb-10"
						style={{
							height: "92vh",
						}}
					>
						{chats.map((chat) => (
							<div
								key={chat.id}
								className={`flex ${
									chat?.sender === authData?._id
										? "justify-end"
										: "justify-start"
								} items-center mb-2`}
							>
								{chat?.sender !== authData?._id && (
									<img
										src={chat?.avatar} // Replace with the actual path
										alt="Participant Avatar"
										className="w-8 h-8 rounded-full mr-2"
									/>
								)}
								<div>
									<p
										className={`${
											chat.sender === authData?._id
												? "bg-darkblackcolor text-white self-end"
												: "bg-accentcolor text-white"
										} p-2 rounded`}
									>
										{chat.message}
									</p>
									<p className="text-xs text-gray-300 ml-2 mt-1">
										{moment(chat.date).format("hh:mm DD/MM/YYYY")}
									</p>
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
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							className="bg-blue-500 text-white p-4 px-12  "
							onClick={sendMessage}
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
