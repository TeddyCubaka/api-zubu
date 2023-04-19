const express = require("express");
const router = express.Router();
const auth = require("../middelwares/authorizations");

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

router.post("/", auth, propretiesCtrl.addProprety);
router.post("/:id", auth, propretiesCtrl.updateProprety);
router.get("/select/:propreties", propretiesCtrl.getPropreties);
router.get("/filter", propretiesCtrl.getManyPropreties);
router.get("/", propretiesCtrl.getAllPropreties);
router.get("/three_On_top", propretiesCtrl.getThreeToper);
router.get("/:id", propretiesCtrl.getOneProprety);
router.get("/chakeAdress/:adress", propretiesCtrl.chakeAdress);

module.exports = router;
