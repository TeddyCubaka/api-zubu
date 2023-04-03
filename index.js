const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const PropretyRoute = require("./api/routes/propreties");
const UserRoute = require("./api/routes/users");

const app = express();

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
app.use("/api/proprety", PropretyRoute);
app.use("/api/user", UserRoute);
app.use("/api", (req, res, next) => {
	res.send({
		message:
			"Welcome to zubu, Take contact with Teddy, my King, to more information",
	});
});


app.listen("4000", () => {
	console.log("listen on http://localhost:4000");
});
