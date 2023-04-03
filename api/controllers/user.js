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
					res.status(201).json({
						message: "Utilisateur créé !",
						user: data,
					})
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) =>
			res.status(500).json({
				message: "une erreur s'est produite, veuillez réessayer plus tard",
				error,
			})
		);
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
					user.password = "";
					res.status(200).json({
						user: user,
						token: jwt.sign(
							{ userId: user._id },
							process.env.SECRET_KEY_FOR_JWT,
							{
								expiresIn: process.env.EXPIRE_DURATION_FOR_TOKEN,
							}
						),
					});
				})
				.catch((err) =>
					res.status(500).json({ err, message: "Can't compare password" })
				);
		})
		.catch((err) =>
			res.status(500).json({ err, message: "User is not found" })
		);
};

exports.getAllUser = (req, res) => {
	User.find()
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json({ err }));
};
