const { validationResult } = require('express-validator');
const Group = require('../model/Group');

const getAllGroups = async (req, res) => {
	try {
		const groups = await Group.find().populate({
			path: 'createdBy',
			select: 'userName avatar',
		});
		return res.json({
			error: false,
			message: 'All Groups',
			payload: groups,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: true,
			message: 'Something wents wrong, Please try after sometime',
		});
	}
};
const getSingleGroupId = async (req, res) => {
	try {
		const groupId = req.params.id;
		const groups = await Group.findOne({
			_id: groupId,
		}).populate({
			path: 'createdBy',
			select: 'userName avatar',
		});
		return res.json({
			error: false,
			message: 'Group Detail',
			payload: groups,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: true,
			message: 'Something wents wrong, Please try after sometime',
		});
	}
};
const createGroup = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.json({ error: true, message: errors.array()[0].msg });
		}

		const { name } = req.body;

		console.log(req.body);
		const isNameAlreadyUsed = await Group.findOne({
			name,
		});
		if (isNameAlreadyUsed)
			return res.json({
				error: true,
				message: `${name} is already taken, please choose another name`,
			});

		let group = await new Group({
			createdBy: req.user._id,
			name: name,
		}).save();

		console.log(group);

		return res.json({
			message: 'Group Created successfully',
		});
	} catch (error) {
		console.log({ error });
		return res.json({
			error: true,
			message: 'Something wents wrong, Please try after sometime',
		});
	}
};

module.exports = {
	getAllGroups,
	createGroup,
	getSingleGroupId,
};
