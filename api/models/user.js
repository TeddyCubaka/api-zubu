const mongoose = require("mongoose");
const propreties = require("./propreties");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
	mail: { type: String, require: true, unique: true },
	phone_number: { type: String, unique: true },
	password: { type: String, require: true },
	username: { type: String, require: true },
	gender: String,
	profile_picture_url: String,
	created_at: Date,
	proprety: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proprety" }],
	pending_visit: [String],
	sending_visit: [String],
	proprety_saved: [String],
	notifications: [
		{
			type: String,
			url: String,
			writting_date: Date,
			object: String,
			content: String,
		},
	],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", UserSchema);
