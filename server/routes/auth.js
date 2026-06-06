const express = require("express");
const router = express.Router();
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const googleLogin = require("../controllers/googleLogin.js");
const asyncWrapper = require("../middleware/async.js");

router.route("/login").post(asyncWrapper(login));
router.route("/googleLogin").post(asyncWrapper(googleLogin));
router.route("/register").post(asyncWrapper(register));

module.exports = router;
