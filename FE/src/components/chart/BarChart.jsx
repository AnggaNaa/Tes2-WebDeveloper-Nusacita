import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@chakra-ui/react";

const data = [
  { name: "Category 1", value: 10 },
  { name: "Category 2", value: 15 },
  { name: "Category 3", value: 20 },
  // ...Tambahkan data lainnya sesuai kebutuhan
];

export default function ChartExample() {
  return (
    <Box p={4} boxShadow="base" rounded="md" bg="white">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
