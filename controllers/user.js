const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({ ...req.body });
			user.password = hash;
			user
				.save()
				.then((data) =>
					res.status(201).json({ message: "Utilisateur créé !", data: data })
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
