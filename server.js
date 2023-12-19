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

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
	console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Express Rate Limit middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Your routes and other middleware can be added here

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const authRoute = require('./routes/auth');
app.use('/api/v1/auth', authRoute);
