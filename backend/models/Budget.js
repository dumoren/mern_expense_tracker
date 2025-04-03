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
      default: function() {
        return this.totalAmount;
      }
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
  console.log("Pre-save middleware - this:", this);
  if (this.isNew) {
    this.remainingAmount = this.totalAmount;
    console.log("Set remainingAmount to:", this.remainingAmount);
  }
  next();
});

module.exports = mongoose.model("Budget", budgetSchema); 