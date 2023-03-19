const express = require("express");
const router = express.Router();

const propretiesCtrl = require("../controllers/propreties");

router.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

router.post("/", propretiesCtrl.addProprety);
router.post("/:id", propretiesCtrl.updateProprety);
router.get("/", propretiesCtrl.getAllPropreties);
router.get("/three_On_top", propretiesCtrl.getThreeToper);
router.get("/:id", propretiesCtrl.getOneProprety);
router.get("/chakeAdress/:adress", propretiesCtrl.chakeAdress);

module.exports = router;
