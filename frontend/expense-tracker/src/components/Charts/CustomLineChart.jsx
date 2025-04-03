import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const CustomLineChart = ({ data }) => {

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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          
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
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#ef4444" 
            fill="url(#expenseGradient)" 
            strokeWidth={2} 
            dot={{ 
              r: 4, 
              fill: "#ef4444",
              stroke: "#fff",
              strokeWidth: 2
            }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
