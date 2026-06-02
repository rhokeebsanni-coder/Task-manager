const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      minlength: 3,
      // Removed structural maxlength validation to account for long Google names safely
      trim: true,
      unique: false, // Fixed: Dropped unique to stop names like "Alex Smith" from crashing the DB
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      trim: true,
      lowercase: true, // Ensures "User@Email.com" and "user@email.com" match perfectly
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-w\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      // Required is false so Google OAuth users don't need a placeholder password
      required: false,
      minlength: 6,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Perfect. Safely handles users who have no Google ID linked.
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
); // Highly recommended for tracking registration timelines

module.exports = mongoose.model("User", UserSchema);
