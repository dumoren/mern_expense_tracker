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
    
    if (this.isNew) {
      // New expense being added
      await Budget.updateRemainingAmount(this.budgetId, this.amount, 'subtract');
    } else if (this.isModified('amount')) {
      // Expense amount being modified
      const originalDoc = await this.constructor.findById(this._id);
      const amountDiff = originalDoc.amount - this.amount;
      await Budget.updateRemainingAmount(this.budgetId, Math.abs(amountDiff), amountDiff > 0 ? 'add' : 'subtract');
    }
  }
  next();
});

// Middleware to update budget remaining amount when an expense is deleted
ExpenseSchema.pre('remove', async function(next) {
  if (this.budgetId) {
    const Budget = mongoose.model('Budget');
    await Budget.updateRemainingAmount(this.budgetId, this.amount, 'add');
  }
  next();
});

module.exports = mongoose.model("Expense", ExpenseSchema);
