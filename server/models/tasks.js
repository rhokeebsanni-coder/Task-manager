const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "name must be provided"],
      trim: true,
      maxlength: [40, "maximum length is 40 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Task',TaskSchema)
// module.exports = mongoose.model('Model name',Structure of the data)