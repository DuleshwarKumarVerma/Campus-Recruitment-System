const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: { type: String },
	email: { type: String },
	password: { type: String },
	date: { type: Date, default: Date.now },
	isVerified: { type: Boolean, default: false },
	profilePic: { type:String }

});

const User = mongoose.model('user', UserSchema);

module.exports = User;
