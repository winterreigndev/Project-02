// import
const mongoose = require('mongoose');

// task schema
const taskSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: false },
	description: { type: String, required: false },
	status: { type: String, required: false, default: 'false' },
	date: { type: Date, required: false, default: Date.now },
	list: { type: String, required: false },
	user: { type: String, required: false },
	userId: { type: String, required: false },
});

// export
module.exports = mongoose.model('Task', taskSchema);
