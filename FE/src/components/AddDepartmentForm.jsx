// AddDepartmentForm.jsx
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SelectUnit from "./SelectUnit";
// import SelectUnit from "./SelectUnit"; // Sesuaikan dengan path sebenarnya

const AddDepartmentForm = ({ onAddDepartment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentName, setDepartmentName] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [departmentSlug, setDepartmentSlug] = useState("");
  const [manPower2023, setManPower2023] = useState(0);
  const [manPower2024, setManPower2024] = useState(0);

  const handleSubmit = () => {
    if (
      departmentName.trim() === "" ||
      !selectedUnit ||
      departmentSlug.trim() === ""
    ) {
      return;
    }

    onAddDepartment({
      name: departmentName,
      unit: selectedUnit,
      slug: departmentSlug,
      m_power_2023: manPower2023,
      m_power_2024: manPower2024,
    });

    setDepartmentName("");
    setSelectedUnit(null);
    setDepartmentSlug("");
    setManPower2023(0);
    setManPower2024(0);

    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add Department
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Unit</FormLabel>
              <SelectUnit onSelectUnit={setSelectedUnit} />
            </FormControl>
            <FormControl>
              <FormLabel>Slug</FormLabel>
              <Input
                type="text"
                value={departmentSlug}
                onChange={(e) => setDepartmentSlug(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Existing Man Power 2023</FormLabel>
              <Input
                type="number"
                value={manPower2023}
                onChange={(e) => setManPower2023(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Existing Man Power 2024</FormLabel>
              <Input
                type="number"
                value={manPower2024}
                onChange={(e) => setManPower2024(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDepartmentForm;
