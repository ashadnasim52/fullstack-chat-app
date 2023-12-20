import React, { useEffect, useState } from "react";
import animationData from "../assets/walk.json";
import Lottie from "lottie-react";
import { SOMETHING_WENT_WRONG, TOAST_SUCCESS, colors } from "../utils/constant";
import Layout from "../components/Layout";
import Groups from "../components/Groups";
import FloatingActionButton from "../components/FloatingActionButton";
import { ALL_GROUPS, CREATE_GROUP } from "../utils/api";
import axiosInstance from "../utils/axios";
import { logger } from "../utils/logger";
import { showToast } from "../utils/funcs";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

const Home = () => {
	const [groups, setGroups] = useState([]);
	const style = {
		height: 500,
	};

	const _getAllGroup = async () => {
		try {
			const { data } = await axiosInstance.get(ALL_GROUPS);
			logger.log({
				data: data,
			});
			setGroups(data?.payload);
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};

	useEffect(() => {
		_getAllGroup();
	}, []);

	const _handleAddGroupClick = async () => {
		const { value: groupName } = await Swal.fire({
			title: "Provide Group Name",
			input: "text",
			inputLabel: "Your new group name",
			inputPlaceholder: "example:- XYX",
		});
		if (groupName) {
			_createGroup(groupName);
		}
	};

	const _createGroup = async (groupName) => {
		try {
			const { data } = await axiosInstance.post(CREATE_GROUP, {
				name: groupName,
			});
			if (data?.error) return showToast(data?.message || SOMETHING_WENT_WRONG);
			logger.log({
				data: data,
			});
			showToast(data?.message || "Success", TOAST_SUCCESS);
			_getAllGroup();
		} catch (error) {
			console.log({ error });
			showToast(error?.response?.message || SOMETHING_WENT_WRONG);
		}
	};

	return (
		<Layout>
			<div className="flex flex-col lg:flex-row bg-secondarycolor h-full">
				<div className="lg:flex-1">
					<div className="p-4">
						<Groups groups={groups} />
					</div>
				</div>

				<div className="lg:flex-1 bg-secondarycolor p-8 flex items-center justify-center">
					<div className="text-white text-center">
						<Lottie
							animationData={animationData}
							loop={true}
							style={style}
							// interactivity={interactivity}
						/>
					</div>
				</div>
			</div>

			<FloatingActionButton onClick={_handleAddGroupClick} />
		</Layout>
	);
};

export default Home;
