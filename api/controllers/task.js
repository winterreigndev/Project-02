// imports
const mongoose = require('mongoose');

// get the task schema model for database
const Task = require('../models/task');

// routes and paths
// -- create task
exports.task_create = (req, res) => {
	// create the task
	const task = new Task({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		date: req.body.date,
		list: req.body.list,
		user: req.body.user,
		userId: req.body.userId,
	});
	task
		.save()
		// send success message if successful
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					message: 'New task created!',
					task: doc,
				});
			} else {
				// show an error if there is one
				res
					.status(404)
					.json({ message: 'There was an error in creating a task.' });
			}
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

// -- get all tasks
exports.task_all = (req, res) => {
	// find all tasks
	Task.find()
		// select the info to show from the tasks
		.select('_id title description status date list user userId')
		.exec()
		.then((docs) => {
			// show info
			const response = {
				count: docs.length,
				tasks: docs.map((doc) => {
					return {
						_id: doc._id,
						title: doc.title,
						description: doc.description,
						status: doc.status,
						date: doc.date,
						list: doc.list,
						user: doc.user,
						userId: doc.userId,
					};
				}),
			};
			res.status(200).json(response);
		})
		// throw error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- get task by list id
exports.task_list = (req, res) => {
	const listId = req.params.listId;
	// find task by id
	Task.find({ list: listId })
		// select information to show
		.select('_id title description status date list user userId')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					count: doc.length,
					task: doc,
				});
			} else {
				// show an error if there is no task by that ID
				res.status(404).json({ message: 'No tasks found under that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- get task by task id
exports.task_taskId = (req, res) => {
	const taskId = req.params.taskId;
	// find task by id
	Task.findById({ _id: taskId })
		// select information to show
		.select('_id title description status date list user userId')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					task: doc,
				});
			} else {
				// show an error if there is no task by that ID
				res.status(404).json({ message: 'No task found with that ID' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- get task by user id
exports.task_user = (req, res) => {
	const userId = req.params.userId;
	// find task by id
	Task.find({ user: userId })
		// select information to show
		.select('_id title description status date list user userId')
		.exec()
		.then((doc) => {
			if (doc) {
				// show information
				res.status(200).json({
					count: doc.length,
					list: doc,
				});
			} else {
				// show an error if there is no task by that ID
				res.status(404).json({ message: 'No tasks found by that user.' });
			}
		})
		// throw an error if there is one
		.catch((err) => {
			// console.log(err);
			res.status(500).json({ error: err });
		});
};

// -- update task by taskId
exports.task_update = (req, res) => {
	const id = req.params.taskId;
	// find task by task id
	Task.findById({ _id: id })
		// update the information in the database for that task
		.updateOne(
			{ _id: id },
			{
				title: req.body.title,
				description: req.body.description,
				status: req.body.status,
				date: req.body.date,
				list: req.body.list,
				user: req.body.user,
				userId: req.body.userId,
			}
		)
		.exec()
		// send successful message and info
		.then(() => {
			res.status(200).json({
				message: 'Task information updated',
			});
		})
		// throw error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- delete task by taskId
exports.task_delete = (req, res) => {
	const id = req.params.taskId;
	// find task by ID and remove that task with the ID
	Task.remove({ _id: id })
		.exec()
		.then(() => {
			// successful message if the task was found and removed
			res.status(200).json({
				message: 'Task has been deleted',
			});
		})
		// throw an error if there is one
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

// -- delete tasks by listId
exports.task_list_delete = (req, res) => {
	const id = req.params.listId;
	// find task by ID and remove that task with the ID
	Task.remove({ list: id })
		.exec()
		.then((result) => {
			// successful message if the task was found and removed
			res.status(200).json({
				message: 'Tasks under that list ID have been deleted',
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

// -- delete tasks by user
exports.task_user_delete = (req, res) => {
	const id = req.params.user;
	// find tasks by ID and remove that task with the ID
	Task.remove({ user: id })
		.exec()
		.then((result) => {
			// successful message if the task was found and removed
			res.status(200).json({
				message: 'Tasks by that user have been deleted',
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
