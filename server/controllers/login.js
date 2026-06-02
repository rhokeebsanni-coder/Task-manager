const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const CustomError = require("../errors/custom-error");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please Enter all fields", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.status(200).json({ success: true, token });
};
module.exports = login;
