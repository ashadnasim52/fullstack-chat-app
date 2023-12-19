const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
		},
		avatar: {
			type: String,
		},
		email: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		isBanned: {
			type: Boolean,
			default: false,
		},
		lastSeen: {
			type: Date,
		},
		password: String,
	},
	{
		timestamps: true,
	}
);

module.exports = User = mongoose.model('users', UserSchema);
