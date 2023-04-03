const Proprety = require("../models/propreties");
const User = require("../models/user");

exports.addProprety = (req, res) => {
	const proprety = new Proprety({ ...req.body });
	proprety.upload_date = Date();
	proprety.is_available = false;
	proprety
		.save()
		.then((data) => {
			User.updateOne(
				{ _id: req.auth.userId },
				{ $push: { proprety: data._id } }
			)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			res.status(201).json({ message: "Propreties added", data });
		})
		.catch((err) => res.status(401).json({ message: "echec ", err }));
};

exports.getPropreties = (req, res) => {
	Proprety.find({ _id: { $in: req.body.propreties } })
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
};

exports.getAllPropreties = (req, res) => {
	Proprety.find()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
};

exports.getThreeToper = (req, res) => {
	Proprety.find({})
		.select({ rental_information: 1, "description.interior.bedRooms": 1 })
		.then((data) => {
			data.sort((a, b) => (a.referencing_note > b.referencing_note ? 1 : -1));
			res.send({ propreties_on_top: [data[0], data[1], data[2]] });
		})
		.catch((err) => res.send(err));
};

exports.updateProprety = (req, res) => {
	Proprety.updateOne({ _id: req.params.id }, { ...req.body })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.send(err));
};

exports.chakeAdress = (req, res) => {
	Proprety.find({ "rental_information.adress": req.params.adress })
		.then((data) => res.send(data.length))
		.catch((err) => res.send(err));
};

exports.getOneProprety = (req, res) => {
	Proprety.findOne({ _id: req.params.id })
		.then((data) => res.send(data))
		.catch((err) => res.status(404).json(err));
};
