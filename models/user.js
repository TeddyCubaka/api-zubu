const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	users: {
		_id: " ",
		mail: " ",
		phone_number: "number",
		password: " ",
		username: " ",
		gender: " ",
		profile_picture_url: " ",
		created_at: "date",
		proprety: ["id"],
		pending_visit: ["_id"],
		sending_visit: ["_id"],
		proprety_saved: ["_id"],
		notifications: [
			{
				_id: "",
				type: "",
				url: "",
				writting_date: "date",
				object: " ",
				content: " ",
			},
		],
	},
});

exports = mongoose.model("Users", UserSchema);
