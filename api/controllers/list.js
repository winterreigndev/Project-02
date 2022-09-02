// imports
const mongoose = require('mongoose');

// get the list schema model for database
const List = require('../models/list');

// routes and paths
// -- create list
exports.list_create = (req, res) => {
	// create list
	const list = new List({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		permissions: req.body.permissions,
		user: req.body.user,
		createdOn: req.body.createdOn,
	});
	list
		.save()
		// send success message if successful
		.then((result) => {
			res.status(201).json({
				message: 'List created',
			});
		})
		// catch an error if there is one
		// and show error message
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
// -- get all lists
exports.list_all = (req, res) => {
	// find all to do lists
	List.find()
		// select the info to show from the lists
		.select('_id title permissions user createdOn')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				lists: docs.map((doc) => {
					return {
						_id: doc._id,
						title: doc.title,
						permissions: doc.permissions,
						user: doc.user,
						createdOn: doc.createdOn,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get lists by username
exports.list_users = (req, res) => {
	const username = req.params.username;
	// find all lists by username
	List.find({ user: username })
		// select the info to show from the lists
		.select('_id title permissions user createdOn')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				lists: docs.map((doc) => {
					return {
						_id: doc._id,
						title: doc.title,
						permissions: doc.permissions,
						user: doc.user,
						createdOn: doc.createdOn,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get lists by ID
exports.list_ID = (req, res) => {
	const id = req.params.id;
	// find list by id
	List.findById({ _id: id })
		// select information to show
		.select('_id title permissions user createdOn')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					list: doc,
				});
			} else {
				// show an error if there is no user by that ID
				res.status(404).json({ message: 'No list found with that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- edit list by ID
exports.list_edit = (req, res) => {
	const id = req.params.listId;
	// find list by list id
	List.findById({ _id: id })
		// update the information in the database for that list
		.updateOne(
			{ _id: id },
			{
				title: req.body.title,
				permissions: req.body.permissions,
			}
		)
		.exec()
		// send successful message
		.then((result) => {
			res.status(200).json({
				message: 'List information updated',
			});
		})
		// throw error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- delete list by ID
exports.list_id_delete = (req, res) => {
	const id = req.params.id;
	// find list by ID and remove that list with the ID
	List.remove({ _id: id })
		.exec()
		.then((result) => {
			// successful message if the list was found and removed
			res.status(200).json({
				message: 'List has been deleted',
			});
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- delete list by user
exports.list_delete = (req, res) => {
	const id = req.params.user;
	// find list by user and remove that list with the user associated
	List.remove({ user: id })
		.exec()
		.then((result) => {
			// successful message if the list was found and removed
			res.status(200).json({
				message: 'List has been deleted',
			});
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
