const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" }, // Optional, as not all expenses need to be part of a budget
  icon: { type: String }, 
  category: { type: String, required: true }, // Example: Food, Rent, Groceries
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

// Middleware to update budget remaining amount when an expense is added or modified
ExpenseSchema.pre('save', async function(next) {
  if (this.budgetId && (this.isNew || this.isModified('amount') || this.isModified('budgetId'))) {
    const Budget = mongoose.model('Budget');
    const budget = await Budget.findById(this.budgetId);
    
    if (!budget) {
      throw new Error('Budget not found');
    }

    if (this.isNew) {
      // New expense being added
      if (budget.remainingAmount < this.amount) {
        throw new Error('Expense amount exceeds budget remaining amount');
      }
      budget.remainingAmount -= this.amount;
    } else if (this.isModified('amount')) {
      // Expense amount being modified
      const originalDoc = await this.constructor.findById(this._id);
      const amountDiff = originalDoc.amount - this.amount;
      if (budget.remainingAmount + amountDiff < 0) {
        throw new Error('Modified expense amount exceeds budget remaining amount');
      }
      budget.remainingAmount += amountDiff;
    }

    await budget.save();
  }
  next();
});

// Middleware to update budget remaining amount when an expense is deleted
ExpenseSchema.pre('remove', async function(next) {
  if (this.budgetId) {
    const Budget = mongoose.model('Budget');
    const budget = await Budget.findById(this.budgetId);
    
    if (budget) {
      budget.remainingAmount += this.amount;
      await budget.save();
    }
  }
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);
