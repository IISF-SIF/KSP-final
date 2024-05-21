"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './DataAnalytics.css';

// Dynamically import charts with ssr: false
const BarChart = dynamic(() => import('../components/Charts/BarChart'), { ssr: false });
const DistrictBarChart = dynamic(() => import('../components/Charts/DistrictBarChart'), { ssr: false });
const Heatmap = dynamic(() => import('../components/Charts/HeatMap'), { ssr: false });
const CustomLineChart = dynamic(() => import('../components/Charts/LineChart'), { ssr: false });
const CustomPieChart = dynamic(() => import('../components/Charts/PieChart'), { ssr: false });

const DataAnalytics = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const csvData = sessionStorage.getItem('csvData');
      const month = sessionStorage.getItem('month');
      const year = sessionStorage.getItem('year');

      setMonth(month || '');
      setYear(year || '');

      if (csvData && month && year) {
        const parsedCsvData = JSON.parse(csvData);

        const groupedBarChartData = () => {
          const parsedData = parsedCsvData.map(d => {
            const date = new Date(d.Date.split('-').reverse().join('-'));
            const dayOfWeek = date.getDay() + 1;
            return {
              Day_of_Week: dayOfWeek,
              Month: date.getMonth() + 1,
              Year: date.getFullYear()
            };
          });

          const filteredData = parsedData.filter(d => d.Month === parseInt(month) && d.Year === parseInt(year));

          return d3.rollups(filteredData, v => v.length, d => d.Day_of_Week)
            .map(([key, value]) => ({ Day_of_Week: key, Accidents: value }));
        };

        const groupedPieChartData = () => {
          const pieData = d3.rollups(parsedCsvData, v => v.length, d => d.Accident_Severity)
            .map(([key, value]) => ({ name: key, value }));
        
          const severityMap = {
            1: 'Minor',
            2: 'Moderate',
            3: 'Severe'
          };
        
          return pieData.map(d => ({
            ...d,
            name: typeof d.name === 'string' ? severityMap[d.name.split(' ')[1]] : 'Unknown'
          }));
        };

        const groupedHeatmapData = () => {
          try {
            const csvData = JSON.parse(sessionStorage.getItem('csvData'));
        
            const heatmapData = d3.rollups(
              csvData,
              v => v.length,
              d => [d.longitude, d.latitude]
            ).map(([key, value]) => ({ lng: parseFloat(key[0]), lat: parseFloat(key[1]), count: value }));
        
            return heatmapData.filter(item => !isNaN(item.lng) && !isNaN(item.lat));
          } catch (error) {
            console.error("Error processing heatmap data:", error);
            return [];
          }
        };

        const groupedLineChartData = () => {
          const parsedData = parsedCsvData.map(d => {
            const [hours, minutes] = d.Time.split(':').map(Number);
            const roundedMinutes = Math.floor(minutes / 30) * 30;
            const time = `${hours}:${roundedMinutes < 10 ? '0' : ''}${roundedMinutes}`;
            return { ...d, Time: time };
          });

          return d3.rollups(parsedData, v => v.length, d => d.Time)
            .map(([key, value]) => ({ Time: key, Accidents: value }));
        };

        const groupedDistrictData = () => {
          const districtData = d3.rollups(parsedCsvData, v => v.length, d => d['Local_Authority_(District)'])
            .map(([key, value]) => ({ District: key, Accidents: value }));

          return districtData.sort((a, b) => b.Accidents - a.Accidents).slice(0, 10);
        };

        setDistrictData(groupedDistrictData(parsedCsvData));
        setBarChartData(groupedBarChartData(parsedCsvData));
        setPieChartData(groupedPieChartData(parsedCsvData));
        setLineChartData(groupedLineChartData(parsedCsvData));
        setHeatmapData(groupedHeatmapData(parsedCsvData));
      }
    }
  }, []);

  return (
    <div className="analytics-container">
      <div className="container1">
        <div className="title">
          <div className="year">{year || ''}</div>
          <div className="subtext">
            The Statistical analysis of <br /> accidents in the month <br /> of {month}
          </div>
        </div>
        <div className="chart1">
          <CustomLineChart data={lineChartData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="container2">
          <div className="pie">
            <p className="headings">Accident Severity</p>
            <ul>
              <li style={{ color: "rgb(0, 170, 125)", marginRight: "40px" }} className="list">
                Minor
              </li>
              <li style={{ color: "blue", marginRight: "40px" }} className="list">
                Moderate
              </li>
              <li style={{ color: "orange", marginRight: "40px" }} className="list">
                Severe
              </li>
            </ul>
            <CustomPieChart style={{ marginTop: "-50px" }} data={pieChartData} />
          </div>
          <div className="bar">
            <p className="headings">District-wise Accidents</p>
            <DistrictBarChart data={districtData} />
          </div>
          <div className="districtbar">
            <p className="headings">Weekly Accident Trends</p>
            <BarChart data={barChartData} />
          </div>
        </div>
      </div>
      <div className="chart-col">
        <div className="headings2">Accident Heatmap</div>
        <div className="list2"></div>
        <div className="para2">
          An Accident Heat Map that highlights the Accident Hotspots.
        </div>
        <Heatmap data={heatmapData} />
      </div>
    </div>
  );
};

export default DataAnalytics;
