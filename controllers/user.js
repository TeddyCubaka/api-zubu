const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports.login = (req, res) => {
	User.findOne({ mail: req.body.mail })
		.then((user) => {
			if (!user)
				return res.status(401).json({ message: "Incorrect password !" });
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid)
						return res.status(401).json({ message: "Incorrect password !" });
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.SECRET_KEY_FOR_JWT,
							{
								expiresIn: process.env.EXPIRE_DURATION_FOR_TOKEN,
							}
						),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};

exports.getAllUser = (req, res) => {
	User.find()
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json({ err }));
};
