const mongoose = require("mongoose");
const { taskStatus } = require("../config/config.config");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: [taskStatus.TODO, taskStatus.IN_PROGRESS, taskStatus.DONE],
      default: taskStatus.TODO,
    },
    dueDate: Date,
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
