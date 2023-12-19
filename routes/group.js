const express = require('express');
const router = express.Router();
const groupController = require('../controller/group');

const { body, validationResult } = require('express-validator');
const passport = require('passport');

router.get('/all', groupController.getAllGroups);
router.get('/single/:id', groupController.getSingleGroupId);
router.post(
	'/create',
	[body('name').trim().exists().withMessage('Group Name is Required')],
	passport.authenticate('user-rule', { session: false }),
	groupController.createGroup
);

// router.delete('/join-group', groupController.joinGroup);

module.exports = router;
