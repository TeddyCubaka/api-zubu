const router = require("express").Router();
const user = require("../controllers/user");

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
router.get("/auth", user.login);

module.exports = router;
