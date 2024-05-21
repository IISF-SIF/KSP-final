// PieChart.js
"use client"
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import "./PieChart.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({ data }) => {
  return (
    <PieChart width={600} height={500} className="piechart">
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={120}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CustomPieChart;
