const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../middelwares/authorizations");

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

router.post("/", user.signup);
router.get("/", user.getAllUser);
router.post("/auth", user.login);
router.get("/:id", user.getOneUser);
router.put("/save/:propretyId", auth, user.saveProprety);
router.put("/unsave/:propretyId", auth, user.unsaveProprety);

module.exports = router;
