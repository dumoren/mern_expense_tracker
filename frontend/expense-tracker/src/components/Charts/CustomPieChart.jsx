import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({ data, label, totalAmount, showTextAnchor, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
        />
        <Legend 
          content={<CustomLegend />}
          verticalAlign="bottom"
          height={36}
        />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#4B5563"
              fontSize="14px"
              fontWeight="500"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#111827"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
