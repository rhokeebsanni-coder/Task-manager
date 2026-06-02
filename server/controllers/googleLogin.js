const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const { OAuth2Client } = require("google-auth-library");
const CustomError = require("../errors/custom-error.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ msg: "No credential provided" });
  }

  try {
    console.log("Step 3 - Attempting Google token verification...");

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("✅ SUCCESS - Token verified!");

    const payload = ticket.getPayload();
    console.log("Payload extracted:", {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
    });

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
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("❌ FAILED - Token verification failed:", error.message);
    res.status(401).json({
      msg: "Invalid or expired Google token",
    });
  }
};

module.exports = googleLogin;
