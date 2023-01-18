const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PropretyRoute = require("./routes/propreties");

const app = express();

mongoose
	.connect("mongodb://localhost:27017/zubu", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

app.use("/api/proprety", PropretyRoute);
app.use("/api", (req, res, next) => {
	res.send({
		message:
			"Welcome to zubu, Take contact with Teddy, my King, to more information",
	});
});

app.listen("4000", () => {
	console.log("listen on http://localhost:4000");
});
