import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-lg font-medium text-gray-800">Expense Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your spending trends over time and gain insights into where your money goes
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD166] text-gray-800 rounded-xl hover:bg-[#FFD166]/90 transition-colors"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
