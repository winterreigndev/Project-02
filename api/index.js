// imports
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// registering our routes for requests
const userRoutes = require('./routes/user');
const listRoutes = require('./routes/list');
const taskRoutes = require('./routes/task');

// connect database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB database connected...'));
mongoose.Promise = global.Promise;

// app uses
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes that handle requests
app.use('/user', userRoutes);
app.use('/list', listRoutes);
app.use('/task', taskRoutes);

// error handling
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

// export app
module.exports = app;
