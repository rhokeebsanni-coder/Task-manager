const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const CustomError = require("../errors/custom-error");

const register = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // Validate fields
  if (!email || !username || !password || !confirmPassword) {
    throw new CustomError("Fill all fields", 400);
  }

  // Check passwords match
  if (password !== confirmPassword) {
    throw new CustomError("Passwords must match", 400);
  }

  // Check existing email
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new CustomError("Email already exists", 400);
  }

  // Check existing username
  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    throw new CustomError("Username already exists", 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  // Create token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.status(201).json({
    success: true,
    token,
  });
};

module.exports = register;
