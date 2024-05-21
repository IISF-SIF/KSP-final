"use client"
import { Bar, BarChart, CartesianGrid, Label, Tooltip, XAxis, YAxis } from 'recharts';
import "./BarChart.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dayOfWeekMap = {
      1: 'Sunday',
      2: 'Monday',
      3: 'Tuesday',
      4: 'Wednesday',
      5: 'Thursday',
      6: 'Friday',
      7: 'Saturday',
    };

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
        <p className="label">{`Day: ${dayOfWeekMap[label]}`}</p>
        <p className="intro">{`Accidents: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomBarChart = ({ data }) => {
  // Sort data in ascending order by Day_of_Week
  data.sort((a, b) => a.Day_of_Week - b.Day_of_Week);

  // Substitute numbers for days of the week
  const dayOfWeekMap = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
  };

  return (
    <BarChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Day_of_Week" tickFormatter={(tickItem) => dayOfWeekMap[tickItem]} />
      <YAxis>
        <Label value="Accident Frequency" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="Accidents" fill="#8884d8" />
    </BarChart>
  );
};

export default CustomBarChart;
