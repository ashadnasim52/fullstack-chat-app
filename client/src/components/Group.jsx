// src/components/GroupCard.js
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const Group = ({ chatId, groupName, createdBy, creatorImage }) => {
	return (
		<Link to={`/chat/${chatId}`}>
			<div className="bg-black text-white px-5 rounded-md shadow-md mb-4 w-full p-2">
				<h2 className="text-xl font-bold mb-2">{groupName}</h2>
				<div className="flex items-center justify-end">
					<p className="text-sm">{`Created by ${createdBy}`}</p>
					<Avatar className="h-9 w-9">
						<AvatarImage
							src="https://avatars.githubusercontent.com/u/38835999?v=4"
							alt="@shadcn"
						/>
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</Link>
	);
};

export default Group;
