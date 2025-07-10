const mongoose = require("mongoose");
const { projectStatus } = require("../config/config.config");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:true
    },
    description: String,
    status: {
      type: String,
      enum: [projectStatus.ACTIVE, projectStatus.COMPLETED],
      default: projectStatus.ACTIVE,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
