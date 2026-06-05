const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task name must be provided"],
      trim: true,
      maxlength: [100, "Maximum length is 100 characters"],
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "mid", "high"],
      default: "mid",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", TaskSchema);
