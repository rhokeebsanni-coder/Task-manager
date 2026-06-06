const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/users.js");
const CustomError = require("../errors/custom-error.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    throw new CustomError("No credential provided", 400);
  }
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new CustomError("Google login is not configured", 500);
  }

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (error) {
    throw new CustomError("Invalid or expired Google token", 401);
  }

  const { sub, email, name, picture } = payload;

  let user = await User.findOne({ googleId: sub });
  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = sub;
      if (!user.image) user.image = picture;
      await user.save();
    } else {
      user = await User.create({
        username: name,
        email,
        googleId: sub,
        image: picture,
      });
    }
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

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

module.exports = googleLogin;
