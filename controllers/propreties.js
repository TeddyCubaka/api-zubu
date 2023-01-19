const Proprety = require("../models/propreties");

exports.addProprety = (req, res) => {
	const proprety = new Proprety({ ...req.body });
	proprety
		.save()
		.then((data) => res.send({ message: "Propreties added", data }))
		.catch((err) => res.send(err));
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
		.select({ rental_information: 1, "description.interior.bedrooms": 1 })
		.then((data) => {
			data.sort((a, b) => (a.referencing_note > b.referencing_note ? 1 : -1));
			res.send({ propreties_on_top: [data[0], data[1], data[2]] });
		})
		.catch((err) => res.send(err));
};

exports.updateProprety = (req, res) => {
	Proprety.updateOne({ _id: req.params.id }, { ...req.body })
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
};

exports.chakeAdress = (req, res) => {
	Proprety.find({ "rental_information.adress": req.params.adress })
		.then((data) => res.send(data.length))
		.catch((err) => res.send(err));
};
