"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { registered: number; enrolled: number }[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="registered" stroke="#8884d8" />
          <Line type="monotone" dataKey="enrolled" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
