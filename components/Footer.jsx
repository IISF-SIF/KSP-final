"use client"
import Link from "next/link";
import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <section>
      <div className="footer">
    Explore our <Link href="/benchmarks">Benchmarks</Link> page, showcasing Signal Time Optimization benchmarks, including Reinforcement Learning Benchmarks,Traffic Signal Control and Traffic Flow Forecasting Benchmark: STD-MAE and our YOLOWorld Benchmarks.

    </div>

    </section>

  )
}

export default Footer;