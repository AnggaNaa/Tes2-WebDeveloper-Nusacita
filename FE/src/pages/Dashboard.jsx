import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import SidebarWithHeader from "../components/Sidebar";
import { API } from "../libs/api";

export default function ChartExample() {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await API.get(`/departements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching Departments:", error);
    }
  };
  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2) + "%";
  };

  const totalPower2023 = departments.reduce(
    (acc, dept) => acc + dept.m_power_2023,
    0
  );
  const totalPower2024 = departments.reduce(
    (acc, dept) => acc + dept.m_power_2024,
    0
  );

  const dataWithPercentage = departments.map((dept) => ({
    ...dept,
    percentage2023: calculatePercentage(dept.m_power_2023, totalPower2023),
    percentage2024: calculatePercentage(dept.m_power_2024, totalPower2024),
  }));

  const totalPercentage2023 = calculatePercentage(
    totalPower2023,
    totalPower2023 + totalPower2024
  );
  const totalPercentage2024 = calculatePercentage(
    totalPower2024,
    totalPower2023 + totalPower2024
  );

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <SidebarWithHeader />
      <Box w={"80%"} position={"absolute"} top={"15%"} left={"18%"}>
        <Flex>
          <Box
            w={"20em"}
            p={4}
            boxShadow="base"
            rounded="md"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Flex align="center" justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                Bar Chart Department
              </Text>
            </Flex>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={departments}
                // fill={(entry) => nameColors[entry.name]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="m_power_2023"
                  fill="#8884d8"
                  name="Exising Man Power 2023"
                />
                <Bar
                  dataKey="m_power_2024"
                  fill="#82ca9d"
                  name="Exising Man Power 2024"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box
            w={"50em"}
            p={4}
            boxShadow="base"
            rounded="md"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Flex align="center" justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                Line Chart Department
              </Text>
            </Flex>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={departments}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="m_power_2023"
                  stroke="#8884d8"
                  name="Existing Man Power 2023"
                />
                <Line
                  type="monotone"
                  dataKey="m_power_2024"
                  stroke="#82ca9d"
                  name="Existing Man Power 2024"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Flex>
        <Flex align="center" justify="space-between" m={4}>
          <CircularProgress m={4} value={100} size="200px" thickness="10px">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              {totalPercentage2023}
            </Text>
          </CircularProgress>
          <Box
            flex={2}
            p={4}
            boxShadow="base"
            rounded="md"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Flex align="center" justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                Horizontal Bar Chart Department
              </Text>
            </Flex>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical" // Set layout to vertical for horizontal bar chart
                data={departments}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" fontSize={10} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="m_power_2023"
                  // fill="#8884d8"
                  fill="#0078d4"
                  name="Exising Man Power 2023"
                />
                <Bar
                  dataKey="m_power_2024"
                  fill="#82ca9d"
                  name="Exising Man Power 2024"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <CircularProgress
            color="#82ca9d"
            m={4}
            value={100}
            size="200px"
            thickness="10px"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              {totalPercentage2024}
            </Text>
          </CircularProgress>
        </Flex>
        <Box
          p={4}
          boxShadow="base"
          rounded="md"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Flex align="center" justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Pie Chart Department 2023 & 2024
            </Text>
          </Flex>
          <Flex p={5}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="m_power_2023"
                  data={departments}
                  fill="#8884d8"
                  label
                />

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="m_power_2024"
                  data={departments}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Flex>
        </Box>

        {/* <Box
          p={4}
          boxShadow="base"
          rounded="md"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Flex align="center" justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Doughnut Chart Department
            </Text>
          </Flex>
          <Flex>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="m_power_2023"
                  data={departments}
                  fill="#8884d8"
                  label="asdsa"
                  innerRadius={60}
                  outerRadius={80}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="m_power_2024"
                  data={departments}
                  fill="#82ca9d"
                  label
                  innerRadius={60}
                  outerRadius={80}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Flex>
          <Text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Arial"
            fontSize="14"
            fill="#ffffff"
          >
            {`Total 2023: ${totalPercentage2023} | Total 2024: ${totalPercentage2024}`}
          </Text>
        </Box> */}
      </Box>
    </>
  );
}
