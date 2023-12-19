const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/User');
const keys = process.env.SECRET || '';

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = (passport) => {
	passport.use(
		'customer-rule',
		new JwtStrategy(opts, async (payload, done) => {
			console.log('customer signin');
			const user = await User.findOne({
				_id: payload._id,
				role: ROLES.Customer,
			})
				.select('_id uid mobileNumber email role name isActive isBanned ')
				.populate('profile');
			console.log({ user });
			if (!user) return done(null, false);
			return done(null, user);
		})
	);
};
