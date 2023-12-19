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

// Express Rate Limit middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Your routes and other middleware can be added here

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
		const decoded = jwt.verify(token, keys); // Replace with your secret key
		console.log(decoded);

		// Attach the user details to the socket object
		socket.user = decoded;

		return next();
	} catch (err) {
		console.log(err);
		return next(new Error('Authentication failed.'));
	}
});

// io.on('connection', (socket) => {
// 	console.log('user connected');
// 	// socket.on('join', (userName) => {
// 	// 	console.log('joineddd...');
// 	// 	console.log(userName);

// 	// 	socket.on('message', (messageText) => {
// 	// 		console.log(`messageText recieved is ${messageText} from ${userName}`);
// 	// 		socket.emit('messageRecieved', {});
// 	// 	});
// 	// });
// 	socket.on('joinGroup', (groupId) => {
// 		socket.join(groupId);
// 		console.log(`User ${socket.id} joined group ${groupId}`);
// 	});

// 	socket.on('groupMessage', (data) => {
// 		console.log(`groupMessage recieved`);
// 		console.log(data);

// 		io.to(data.groupId).emit('groupMessage', data);
// 	});

// 	socket.on('disconnect', () => {
// 		console.log('user left ' + socket.id);
// 	});
// });

io.on('connection', (socket) => {
	console.log(`User ${socket.user.userName} connected: ${socket.id}`);

	// Handle joining a group
	socket.on('joinGroup', async (groupId) => {
		try {
			// Find the group and add the user to the members
			const group = await Group.findById(groupId);
			// if (
			// 	group.members.includes(
			// 		(member) => member._id.toString() !== socket.user._id.toString()
			// 	)
			// ) {
			group.members.push(socket.user._id);
			await group.save();
			// }
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

	// Handle group messages
	// socket.on('groupMessage', (data) => {
	// 	console.log(data);
	// 	// io.to(data.groupId).emit('messages', {
	// 	// 	message: data.message,
	// 	// 	sender: socket.user._id,
	// 	// 	userName: socket.user.userName,
	// 	// 	avatar: socket.user.avatar,
	// 	// 	date: Date.now(),
	// 	// });
	// 	Group.findOneAndUpdate(
	// 		{ _id: data.groupId },
	// 		{
	// 			$push: {
	// 				chats: {
	// 					message: data.message,
	// 					sender: socket.user._id,
	// 					userName: socket.user.userName,
	// 					avatar: socket.user.avatar,
	// 					date: Date.now(),
	// 				},
	// 			},
	// 		}
	// 	);
	// });

	socket.on('groupMessage', async (data) => {
		try {
			const group = await Group.findById(data.groupId);
			console.log({
				groupMessage: data,
			});
			// If the sender is a member of the group, broadcast the message to the group
			io.to(data.groupId).emit('groupMessage', {
				message: data.message,
				sender: socket.user._id,
				userName: socket.user.userName,
				avatar: socket.user.avatar,
				date: Date.now(),
			});
			// console.log({
			// 	ID: data.groupId,
			// 	message: data.message,
			// 	sender: socket.user._id,
			// 	userName: socket.user.userName,
			// 	avatar: socket.user.avatar,
			// 	date: Date.now(),
			// });
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
			// console.log({ updated });
		} catch (error) {
			console.error('Error sending group message:', error.message);
		}
	});

	// Handle disconnections
	socket.on('disconnect', () => {
		console.log(`User ${socket.user.userName} disconnected: ${socket.id}`);
		User.findOneAndUpdate(
			{ _id: socket.user._id },
			{
				lastSeen: Date.now(),
			}
		);
	});
});

const getParticipants = async (groupId) => {
	const groups = await Group.findById(groupId).populate(
		'members',
		'userName lastSeen avatar'
	);
	return groups;
};
