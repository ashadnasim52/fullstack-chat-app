// src/components/GroupCard.js
import React from "react";
import Group from "./Group";

const Groups = ({ groups }) => {
	return (
		<div className="overflow-y-auto  bg-darkblackcolor text-white p-4 m-10 rounded-md shadow-md mb-4 w-full h-70 ">
			<h2 className="text-xl font-bold mb-2 text-center p-2">
				Join Any Group{" "}
			</h2>
			<div
			// className="overflow-y-auto "
			// style={{
			// 	height: "90%",
			// }}
			>
				{groups.map((group) => (
					<Group
						key={group?._id}
						chatId={group?._id}
						groupName={group?.name}
						createdBy={group?.createdBy?.userName}
						creatorImage={group?.createdBy?.avatar}
					/>
				))}
			</div>

			{/* <button className="bg-white text-black rounded-md py-2 px-4 w-full absolute bottom-0 left-0 right-0">
				Create New Group
			</button> */}
		</div>
	);
};

export default Groups;
