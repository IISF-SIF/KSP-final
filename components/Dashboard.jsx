// App.js
"use client"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CSVReader from './CSVReader';
import DataAnalytics from './DataAnalytics';

const Dashboard = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CSVReader />} />
        <Route path="/data-analytics" element={<DataAnalytics />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
