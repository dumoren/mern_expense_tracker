import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {

  // Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#3b82f6" : "#93c5fd"; 
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-sm rounded-lg p-3 border border-gray-100">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].payload.category}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-medium text-gray-900">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: "#6B7280" }} 
            stroke="#E5E7EB"
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#6B7280" }} 
            stroke="#E5E7EB"
            axisLine={false}
          />
          <Tooltip content={CustomTooltip} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Bar
            dataKey="amount"
            radius={[6, 6, 0, 0]}
            activeBar={{ fill: "#2563EB" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
