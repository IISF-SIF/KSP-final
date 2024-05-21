"use client"
import { Bar, BarChart, CartesianGrid, Label, LabelList, Tooltip, XAxis, YAxis } from 'recharts';

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;

  return (
    <text x={x + width / 2} y={y + height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
      District {value}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`District ${payload[0].payload.District}`}</p>
        <p className="intro">{`Accidents: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const DistrictBarChart = ({ data }) => {
  // Sort data in descending order of accidents
  const sortedData = [...data].sort((a, b) => b.Accidents - a.Accidents);

  return (
    <BarChart
      width={530}
      height={400}
      data={sortedData}
      layout="vertical"
      margin={{
        top: 20, right: 30, left: 0, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number">
        <Label value="Accident Frequency" position="insideBottom" offset={-10} style={{ textAnchor: 'middle' }} />
      </XAxis>
      <YAxis dataKey="District" type="category" hide={false}>
        <Label value="Districts" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="Accidents" fill="#8884d8">
        <LabelList dataKey="District" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
};

export default DistrictBarChart;
