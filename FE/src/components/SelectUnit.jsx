// SelectUnit.jsx
import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { API } from "../libs/api";

const SelectUnit = ({ onSelectUnit }) => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await API.get("/units", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching Units:", error);
    }
  };

  const handleSelect = (e) => {
    const selectedUnitId = e.target.value;
    const selectedUnit = units.find((unit) => unit.id === selectedUnitId);
    onSelectUnit(selectedUnit);
  };

  return (
    <Select placeholder="Select Unit" onChange={handleSelect}>
      {units.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.name}
        </option>
      ))}
    </Select>
  );
};

export default SelectUnit;
