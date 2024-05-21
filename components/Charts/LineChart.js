// LineChart.js
"use client"
import { CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import "./LineChart.css";

// Custom legend component
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <g x={30} y={30}>
      {payload.map((entry, index) => (
        <text x={120} y={10 * 20} fill={entry.color} key={`item-${index}`}>{entry.value}</text>
      ))}
    </g>
  );
};

const CustomLineChart = ({ data }) => {
  // Sort data in ascending order by Time
  data.sort((a, b) => new Date('1970/01/01 ' + a.Time) - new Date('1970/01/01 ' + b.Time));

  return (
    <div>
      <div className="title">Accidents by Time of Day</div>
      <LineChart
        width={1150}
        height={450}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 200,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time">
          <Label value="Time (HH:MM)" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Accidents" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Line type="monotone" dataKey="Accidents" stroke="#8884d8" />
      </LineChart></div>
    );
};

export default CustomLineChart;