const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		uid: {
			type: String,
		},
		name: {
			type: String,
		},
		mobileNumber: {
			type: String,
		},
		countryCode: {
			type: String,
		},
		email: {
			type: String,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: 'seller',
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: 'profile',
		},
		admin: {
			type: Schema.Types.ObjectId,
			ref: 'admin',
		},
		employee: {
			type: Schema.Types.ObjectId,
			ref: 'employee',
		},
		isSuperAdmin: {
			type: Boolean,
			default: false,
		},

		isActive: {
			type: Boolean,
			default: false,
		},
		isBanned: {
			type: Boolean,
			default: false,
		},
		isNumberVerifiedUsingOTP: {
			type: Boolean,
			default: false,
		},
		authType: String,
		passwordChangedAt: Date,
		password: String,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		timestamps: true,
	}
);

module.exports = User = mongoose.model('users', UserSchema);
