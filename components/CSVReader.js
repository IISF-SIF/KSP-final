// components/CSVReader.js
"use client"; // Ensure this is present at the top
import { useState } from 'react';
import Papa from 'papaparse';
import './CSVReader.css';
import Link from "next/link";

const CSVReader = () => {
  const [file, setFile] = useState(null);
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2018');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        alert("Please select a CSV file.");
        reject();
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;

        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header =>
            ['Local_Authority_(Highway)', '1st_Road_Class', '1st_Road_Number'].includes(header)
              ? null
              : header,
          complete: function (results) {
            let data = results.data;

            data = data.filter(row => {
              if (row.Date) {
                const dateParts = row.Date.split('-');
                if (dateParts.length >= 3) { // Ensure date is in format DD-MM-YYYY
                  const csvMonth = dateParts[1];
                  const csvYear = dateParts[2];
                  return csvMonth === month && csvYear === year;
                } else {
                  return false; // Date format incorrect
                }
              }
              return false; // Date field is empty or undefined
            });

            if (data.length === 0) {
              alert("No data found for the selected month and year.");
              reject();
              return;
            }

            // Store data in session storage
            sessionStorage.setItem('csvData', JSON.stringify(data));
            sessionStorage.setItem('month', month);
            sessionStorage.setItem('year', year);

            resolve();
          },
        });
      };

      reader.readAsText(file);
    });
  };

  const DateInputs = () => {
    const handleMonthChange = (e) => {
      const value = e.target.value.padStart(2, '0');
      setMonth(value);
    };

    const handleYearChange = (e) => {
      setYear(e.target.value);
    };

    return (
      <div className="date-inputs">
        <label className="month">
          <div className="name">Month:</div>
          <input
            className="select-month"
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={handleMonthChange}
          />
        </label>
        <label className="year1">
          <div className="name">Year:</div>
          <input
            className="select-year1"
            type="number"
            min="2000"
            max="2099"
            value={year}
            onChange={handleYearChange}
          />
        </label>
      </div>
    );
  };

  const handleDataAnalytics = async (e) => {
    e.preventDefault(); // Prevent the default link behavior
    try {
      await handleSubmit();
      // Navigate to DataAnalytics page
      window.location.href = "/data-analytics";
    } catch (error) {
      console.error("Error processing the CSV file:", error);
    }
  };

  return (
    <section className="hello">
      <div className="container">
        <div className="color"></div>
        <div className="all">
          <div className="image-main">
            <img className="image" src="/dashboard_img.jpg" alt="graph" height="340px" width="440px" />
            <div className="triangle"></div>
          </div>
          <div className="inputs-here">
            <div className="inputs-heading">Access statistical analysis of accidents by entering your secure and custom data:</div>
            <div className="input-group">
              <div className="file-input">
                <input className="upload-box" type="file" accept=".csv" onChange={handleFileChange} />
              </div>
              <br />
              <DateInputs />
            </div>
            <div className="button-input">
              <button
                className="submit-button"
                style={{ "--clr": "#9932CC" }}
                onClick={handleDataAnalytics}
              >
                <span><i>Load Data</i></span>
              </button>
            </div>
          </div>
        </div>
        <div className="csv-requirements">
          <div className="csv-title">CSV FILE REQUIREMENTS</div>
          <ul className="requirements_list">
            <li>1. Latitude</li>
            <li>2. Longitude</li>
            <li>3. Local Authority (District)</li>
            <li>4. Police Force (Name)</li>
            <li>5. Accident Severity (minor, moderate, severe)</li>
            <li>6. Number of Vehicles</li>
            <li>7. Number of Casualties</li>
            <li>8. Day in the Week</li>
            <li>9. Time</li>
            <li>10. Area (Urban or Rural)</li>
            <li>11. Weather Conditions</li>
          </ul>
          <p className='para'>Use the following <a  style={{"color":"blue"}} href="https://www.kaggle.com/datasets/aravjain007/dataset-for-reference">link</a> to find a sample CSV file.</p>
        </div>
        
      <div className="footer">
        Explore our <Link href="/benchmarks">Benchmarks</Link> page, showcasing Signal Time Optimization benchmarks, including Reinforcement Learning Benchmarks,Traffic Signal Control and Traffic Flow Forecasting Benchmark: STD-MAE and our YOLOWorld Benchmarks.

    
      </div>
      </div>
    </section>
  );
};

export default CSVReader;
