const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    startingAt: {
      type: Date,
      required: true,
    },
    endingAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Ensure endingAt is after startingAt
          return value > this.startingAt;
        },
        message: "Ending time must be after starting time.",
      },
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
