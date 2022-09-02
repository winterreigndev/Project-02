// import
const mongoose = require('mongoose');

// list schema
const listSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: false },
	permissions: { type: String, required: false },
	user: { type: String, required: false },
	createdOn: { type: Date, required: false },
});

// export
module.exports = mongoose.model('List', listSchema);
