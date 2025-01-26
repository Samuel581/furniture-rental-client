"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RentalsGraph() {
  const salesData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1500 },
    { month: "Mar", sales: 1700 },
    { month: "Apr", sales: 1600 },
    { month: "May", sales: 1800 },
    { month: "June", sales: 2000 },
    { month: "July", sales: 2100 },
    { month: "Aug", sales: 1900 },
    { month: "Sep", sales: 2200 },
    { month: "Oct", sales: 2500 },
    { month: "Nov", sales: 2400 },
    { month: "Dec", sales: 3000 },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"month"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type={"monotone"} dataKey={"sales"} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RentalsGraph;
