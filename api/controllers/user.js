// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get the user schema model for database
const User = require('../models/user');

// routes and paths
// -- register new user
exports.user_register = (req, res) => {
	// search the user database for email and username entered
	User.findOne({
		$or: [
			{
				email: req.body.email,
			},
			{
				username: req.body.username,
			},
		],
	}).then((user) => {
		if (user) {
			let errors = {};
			if (user.username === req.body.username) {
				errors.username = 'This username is already taken';
			} else if (user.email === req.body.email) {
				errors.email = 'An account with this email already exists';
			}
			return res.status(400).json(errors);
		} else {
			// if the email the user entered does not match user in database
			// create account

			// -- hash the entered password with bcrypt and create user
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err,
					});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						username: req.body.username,
						password: hash,
						role: 'user',
					});
					user
						.save()
						// if created show sucess message
						.then((result) => {
							// console.log(result);
							res.status(201).json({
								message: 'New user created',
							});
						})
						.catch((err) => {
							// if error show error
							// console.log(err);
							res.status(500).json({
								error: err,
							});
						});
				}
			});
		}
	});
};

// -- login existing user
exports.user_login = (req, res) => {
	// find user in database by username
	User.find({ username: req.body.username })
		.exec()
		.then((user) => {
			// if username does not exist
			if (user.length < 1) {
				return res.status(401).json({
					message: 'The username entered does not exist in our database',
				});
			}
			// if password is incorrect for that username
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Password is incorrect',
					});
				}
				// if password and username are correct
				// -- create jwt token and return it
				if (result) {
					const token = jwt.sign(
						{
							username: user[0].username,
							userId: user[0]._id,
							role: user[0].role,
						},
						process.env.JWT_KEY,
						{
							expiresIn: 8000,
						}
					);
					// information sent for successful request
					return res.status(200).json({
						userId: user[0]._id,
						username: user[0].username,
						role: user[0].role,
						expiresIn: 8000,
						message: 'Login successful',
						token: token,
					});
				}
				// if error when logging in
				res.status(401).json({
					message: 'Login failed',
				});
			});
		})
		.catch((err) => {
			// show error if there is one
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get user information
exports.user_information = (req, res) => {
	const user = req.params.username;
	// find user by id
	User.findOne({ username: user })
		// select information to show
		.select('_id username email role')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					user: doc,
				});
			} else {
				// show an error if there is no user by that ID
				res.status(404).json({ message: 'No user found with that ID' });
			}
		})
		// show an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({ error: err });
		});
};

// get all userrs
exports.user_list = (req, res) => {
	// find all users
	User.find()
		// select the info to show
		.select('_id email username role')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				users: docs.map((doc) => {
					return {
						_id: doc._id,
						email: doc.email,
						username: doc.username,
						role: doc.role,
					};
				}),
			};
			res.status(200).json(response);
		})
		// show error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// update single user
exports.user_update = (req, res) => {
	const id = req.params.userId;
	// find user by user id
	User.findById({ _id: id })
		// update the information in the database for that user
		.updateOne(
			{ _id: id },
			{
				email: req.body.email,
			}
		)
		.exec()
		// send successful message
		.then((result) => {
			res.status(200).json({
				message: 'User information updated',
			});
		})
		// show error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// delete a user
exports.user_delete = (req, res) => {
	const id = req.params.userId;
	// find user by ID and remove that user with the ID
	User.remove({ _id: id })
		.exec()
		.then((result) => {
			// successful message if the user was found and removed
			res.status(200).json({
				message: 'User has been deleted',
			});
		})
		// show an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
