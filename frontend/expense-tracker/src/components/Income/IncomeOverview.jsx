import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
     const result = prepareIncomeBarChartData(transactions);
     setChartData(result);
  
      return () => {};
    }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-lg font-medium text-gray-800">Income Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your income trends
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD166] text-gray-800 rounded-xl hover:bg-[#FFD166]/90 transition-colors"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-6">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
