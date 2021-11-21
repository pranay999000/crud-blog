const express = require("express");
const { check } = require("express-validator");
const { isSignedIn } = require("../middlewares/authMiddleware");

const router = express();
const {
	signup,
	signout,
	signin,
	alluser,
} = require("./../controllers/authController");

router.post(
  	"/sign-up",
  	[
		check("username", "Username should be at least 5 charaters long").isLength({ min: 5 }),
		check("password", "Password should be at least 6 charaters long").isLength({
	  		min: 6,
		}),
  	],
  	signup
);

router.post("/sign-in", signin);

router.get("/sign-out", isSignedIn, signout);
router.get("/all-user", isSignedIn, alluser);

module.exports = router;
