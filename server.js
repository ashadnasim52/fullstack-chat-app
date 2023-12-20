const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// const server = require('http').createServer(app);

// const io = require('socket.io')(server);

// Use Helmet middleware for securing HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(morgan('tiny'));
mongoose.set('debug', false);
app.use(passport.initialize());
require('./utils/userRole')(passport);

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI);
mongoose.set('debug', true);

const db = mongoose.connection;

db.on('error', (err) => {
	console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
	console.log('Connected to MongoDB');
});

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests max
});
app.use(limiter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const authRoute = require('./routes/auth');
const groupRoute = require('./routes/group');
const Group = require('./model/Group');
const User = require('./model/User');
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/group', groupRoute);
const keys = process.env.SECRET || '';

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.auth.token;
		console.log(token);
		const decoded = jwt.verify(token, keys);
		console.log(decoded);

		socket.user = decoded;

		return next();
	} catch (err) {
		console.log(err);
		return next(new Error('Authentication failed.'));
	}
});

io.on('connection', (socket) => {
	console.log(`User ${socket.user.userName} connected: ${socket.id}`);

	socket.on('joinGroup', async (groupId) => {
		try {
			const group = await Group.findById(groupId);
			if (
				!group.members.some(
					(member) => member._id.toString() === socket.user._id.toString()
				)
			) {
				group.members.push(socket.user._id);
				await group.save();
			}

			socket.join(groupId);

			io.to(groupId).emit(
				'participantsUpdated',
				await getParticipants(groupId)
			);

			console.log(`User ${socket.user.userName} joined group ${groupId}`);
		} catch (error) {
			console.error('Error joining group:', error.message);
		}
	});

	socket.on('groupMessage', async (data) => {
		try {
			const group = await Group.findById(data.groupId);
			console.log({
				groupMessage: data,
			});
			io.to(data.groupId).emit('groupMessage', {
				message: data.message,
				sender: socket.user._id,
				userName: socket.user.userName,
				avatar: socket.user.avatar,
				date: Date.now(),
			});

			const updated = await Group.findOneAndUpdate(
				{ _id: data.groupId },
				{
					$push: {
						chats: {
							message: data.message,
							sender: socket.user._id,
							userName: socket.user.userName,
							avatar: socket.user.avatar,
							date: Date.now(),
						},
					},
				}
			);
		} catch (error) {
			console.error('Error sending group message:', error.message);
		}
	});

	// Handle disconnections
	socket.on('disconnect', async () => {
		try {
			// const user = await User.findById(socket.user._id);
			// if (user) {
			// 	const groups = await Group.find({ members: user._id });
			// 	groups.forEach(async (group) => {
			// 		group.members.pull(user._id);
			// 		await group.save();
			// 		io.to(group._id).emit(
			// 			'participantsUpdated',
			// 			await getParticipants(group._id)
			// 		);
			// 	});
			// }
			console.log(`User ${socket.user.userName} disconnected: ${socket.id}`);
			User.findOneAndUpdate(
				{ _id: socket.user._id },
				{
					lastSeen: Date.now(),
				}
			);
			console.log(`User ${socket.user.username} disconnected: ${socket.id}`);
		} catch (error) {
			console.error('Error handling disconnect:', error.message);
		}
	});
});

const getParticipants = async (groupId) => {
	const groups = await Group.findById(groupId).populate(
		'members',
		'userName lastSeen avatar'
	);
	return groups;
};
