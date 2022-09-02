// import
const mongoose = require('mongoose');

// user schema
const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match:
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	},
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: false },
});

// export
module.exports = mongoose.model('User', userSchema);
