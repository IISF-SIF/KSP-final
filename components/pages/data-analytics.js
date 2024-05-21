// ... (existing data processing functions)// pages/data-analytics.js
"use client";
import * as d3 from 'd3';
import { getDay, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import BarChart from '../components/Charts/BarChart';
import DistrictBarChart from '../components/Charts/DistrictBarChart';
import Heatmap from '../components/Charts/HeatMap';
import CustomLineChart from '../components/Charts/LineChart';
import CustomPieChart from '../components/Charts/PieChart';
import './DataAnalytics.css';

const DataAnalytics = () => {
  const { query } = useRouter();
  const { csvData, month, year } = query;
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    if (csvData && month && year) {
      const parsedCsvData = JSON.parse(csvData);

      const groupedBarChartData = () => {
      // Parse the date and extract day of the week, month, and year
      const parsedData = csvData.map(d => {
        const date = parse(d.Date, 'dd-MM-yyyy', new Date());
        const dayOfWeek = getDay(date); // 0 is Sunday, 1 is Monday, ...
        return {
          Day_of_Week: dayOfWeek + 1, // Adjust to start from 1 for Sunday
          Month: date.getMonth() + 1, // getMonth() returns 0-11, so we add 1
          Year: date.getFullYear()
        };
      });

      // Filter data based on desired month and year
      const filteredData = parsedData.filter(d => d.Month === month && d.Year === year);

      // Group data by Day_of_Week and count the number of accidents
      return d3.rollups(filteredData, v => v.length, d => d.Day_of_Week)
        .map(([key, value]) => ({ Day_of_Week: key, Accidents: value }));
    };

    const groupedPieChartData = () => {
      // Group data by Accident_Severity and count the number of accidents
      const pieData = d3.rollups(csvData, v => v.length, d => d.Accident_Severity)
        .map(([key, value]) => ({ name: `Level ${key}`, value }));

      // Map severity levels to their descriptions
      const severityMap = {
        'Level 1': 'Severe Accident',
        'Level 2': 'Mild Accident',
        'Level 3': 'Light Accident',
      };

      // Replace severity levels with their descriptions
      return pieData.map(item => ({ name: severityMap[item.name], value: item.value }));
    };

    const groupedHeatmapData = () => {
        // Group data by longitude and latitude and count the number of accidents
        const heatmapData = d3.rollups(
            csvData,
            v => v.length,
            d => [d.longitude, d.latitude],
            d => d.longitude,
            d => d.latitude
        ).map(([key, value]) => ({ lng: parseFloat(key[0]), lat: parseFloat(key[1]), count: value }));
        // Filter out any undefined or NaN values
        return heatmapData.filter(item => !isNaN(item.lng) && !isNaN(item.lat));
    };

    const groupedLineChartData = () => {
        // Group data by Time and count the number of accidents
        const parsedData = csvData.map(d => {
          const [hours, minutes] = d.Time.split(':').map(Number);
          // Round down to the nearest 30 minutes
          const roundedMinutes = Math.floor(minutes / 30) * 30;
          const time = hours + ':' + (roundedMinutes < 10 ? '0' : '') + roundedMinutes;
          return { ...d, Time: time };
        });
      
        return d3.rollups(parsedData, v => v.length, d => d.Time)
          .map(([key, value]) => ({ Time: key, Accidents: value }));
    };
    
    const groupedDistrictData = () => {
      // Group data by Local_Authority_(District) and count the number of accidents
      const districtData = d3.rollups(csvData, v => v.length, d => d['Local_Authority_(District)'])
        .map(([key, value]) => ({ District: key, Accidents: value }));
      // Sort by number of accidents and select top 10
      return districtData.sort((a, b) => b.Accidents - a.Accidents).slice(0, 10);
    };
    
    setDistrictData(groupedDistrictData()); // Set districtData 
    
    setBarChartData(groupedBarChartData());
    setPieChartData(groupedPieChartData());
    setLineChartData(groupedLineChartData());
    setHeatmapData(groupedHeatmapData());

    }
  }, [csvData, month, year]);

  return (
    <div className="analytics-container">
      <div className="container1">
        <div className="title">
          <div className="year">2018</div>
          <div className="subtext">
            The Satistical analysis of <br></br> accidents in the month <br></br>
            of May
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
              <li
                style={{ color: "rgb(0, 170, 125)", marginRight: "40px" }}
                className="list"
              >
                Minor
              </li>
              <li
                style={{ color: "blue", marginRight: "40px" }}
                className="list"
              >
                Moderate
              </li>
              <li
                style={{ color: "orange", marginRight: "40px" }}
                className="list"
              >
                Severe
              </li>
            </ul>
            <CustomPieChart style={{ "marginTop": "-50px" }} data={pieChartData} />
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
          A Accident Heat Map that highlights the Accident Hotspots.
        </div>
        <Heatmap data={heatmapData} />
      </div>
    </div>
  );
};

export default DataAnalytics;