import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { API } from "../libs/api";
import AddUnitForm from "../components/FormUnit";
import UpdateUnitForm from "../components/UpdateUnitForm";
import AddDepartmentForm from "../components/AddDepartmentForm";
import UpdateDepartmentForm from "../components/UpdateDepartmentForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [units, setUnits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [unitSearch, setUnitSearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchUnits = async () => {
    try {
      const response = await API.get(`/units`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching Units:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      //   const response = await API.get("/departements",
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

  const handleAddUnit = async (data) => {
    try {
      const response = await API.post(
        "/units",
        {
          name: data.name,
          slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUnits([...units, response.data]);
    } catch (error) {
      console.error("Error create Units:", error);
    }
  };

  const handleDeleteUnit = async (unitId) => {
    try {
      const response = await API.delete(`/units/${unitId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== unitId));
    } catch (error) {
      console.error("Error deleting Unit:", error);
    }
  };

  const handleUpdateUnit = async (unitId) => {
    try {
      const response = await API.get(`/units/${unitId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedUnit(response.data);
    } catch (error) {
      console.error("Error fetching Unit for update:", error);
    }
  };

  const handleCloseUpdateForm = () => {
    setSelectedUnit(null);
  };

  const handleAddDepartment = async (data) => {
    try {
      const response = await API.post(
        "/departements",
        {
          name: data.name,
          unit_id: data.unit.id,
          slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDepartments([...departments, response.data]);
      fetchDepartments();
    } catch (error) {
      console.error("Error create Departments:", error);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      const response = await API.delete(`/departement/${departmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDepartments((prevUnits) =>
        prevUnits.filter((departement) => departement.id !== departmentId)
      );
    } catch (error) {
      console.error("Error deleting Unit:", error);
    }
  };

  const handleUpdateDepartment = async (data) => {
    console.log("ini data update", data);
    try {
      const response = await API.patch(
        `/departement/${data.id}`,
        {
          name: data.name,
          unit_id: data.unit_id,
          slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("ini response", response.data);

      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department.id === data.id
            ? { ...response.data, unit: department.unit }
            : department
        )
      );

      fetchDepartments();
    } catch (error) {
      console.error("Error update Department:", error);
    }
  };

  const handleCloseUpdateFormDepartment = () => {
    setSelectedDepartment(null);
  };

  const handleUnitSearch = async () => {
    try {
      const response = await API.get(`/unit/search?name=${unitSearch}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUnits(response.data);
    } catch (error) {
      console.error("Error searching Units:", error);
    }
  };

  const handleDepartmentSearch = async () => {
    try {
      const response = await API.get(
        `/departements/search?name=${departmentSearch}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error searching Departments:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUnits();
    fetchDepartments();
  }, []);

  return (
    <Stack margin={"auto"} maxW={"6xl"} p={4}>
      <Heading size="lg" display={"flex"} justifyContent={"space-between"}>
        Unit List{" "}
        <Button onClick={handleLogout} colorScheme="red">
          Logout
        </Button>
      </Heading>

      <AddUnitForm
        onAddUnit={(data) => {
          handleAddUnit(data);
        }}
      />

      <Flex justify="space-between" align="center">
        <Input
          placeholder="Search Unit"
          value={unitSearch}
          onChange={(e) => setUnitSearch(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleUnitSearch}>
          Search
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {units.map((unit, index) => (
            <Tr key={unit.id}>
              <Td>{index + 1}</Td>
              <Td>{unit.name}</Td>
              <Td>{unit.slug}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleUpdateUnit(unit.id)}
                >
                  Update
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  onClick={() => handleDeleteUnit(unit.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedUnit && (
        <UpdateUnitForm
          onUpdateUnit={(data) => {
            setUnits((prevUnits) =>
              prevUnits.map((unit) => (unit.id === data.id ? data : unit))
            );
          }}
          selectedUnit={selectedUnit}
          onClose={handleCloseUpdateForm}
        />
      )}

      <Heading mt={8} size="lg">
        Department List
      </Heading>

      <AddDepartmentForm onAddDepartment={handleAddDepartment} />
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Search Department"
          value={departmentSearch}
          onChange={(e) => setDepartmentSearch(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleDepartmentSearch}>
          Search
        </Button>
      </Flex>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Name</Th>
            <Th>Unit</Th>
            <Th>Slug</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {departments &&
            departments.map((department, index) => (
              <Tr key={department.id}>
                <Td>{index + 1}</Td>
                <Td>{department.name}</Td>
                <Td>{department.unit?.name}</Td>
                <Td>{department.slug}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => setSelectedDepartment(department)}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDeleteDepartment(department.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {selectedDepartment && (
        <UpdateDepartmentForm
          onUpdateDepartment={handleUpdateDepartment}
          selectedDepartment={selectedDepartment}
          onClose={handleCloseUpdateFormDepartment}
          units={units}
        />
      )}
    </Stack>
  );
};

export default Home;
