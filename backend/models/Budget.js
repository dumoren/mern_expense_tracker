const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Budget name is required"],
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: [true, "Budget amount is required"],
      min: [0, "Budget amount must be positive"],
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);

// Pre-save middleware to set initial remaining amount
budgetSchema.pre("save", function(next) {
  if (this.isNew) {
    this.remainingAmount = this.totalAmount;
  }
  next();
});

module.exports = mongoose.model("Budget", budgetSchema); 