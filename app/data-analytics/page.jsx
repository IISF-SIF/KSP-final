"use client"
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";

// Dynamically import DataAnalytics with SSR disabled
const DataAnalytics = dynamic(() => import('@/components/DataAnalytics'), { ssr: false });

const Third4th = () => {
  return (
    <main>
      <Navbar />
      <DataAnalytics />
    </main>
  );
};

export default Third4th;
