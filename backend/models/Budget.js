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

// Static method to update remaining amount when an expense is added
budgetSchema.statics.updateRemainingAmount = async function(budgetId, amount, operation = 'subtract') {
  const budget = await this.findById(budgetId);
  if (!budget) {
    throw new Error('Budget not found');
  }

  if (operation === 'subtract') {
    if (budget.remainingAmount < amount) {
      throw new Error('Expense amount exceeds budget remaining amount');
    }
    budget.remainingAmount -= amount;
  } else if (operation === 'add') {
    budget.remainingAmount += amount;
  }

  await budget.save();
  return budget;
};

module.exports = mongoose.model("Budget", budgetSchema); 