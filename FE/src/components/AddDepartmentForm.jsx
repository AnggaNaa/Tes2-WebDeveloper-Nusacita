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
    });

    setDepartmentName("");
    setSelectedUnit(null);
    setDepartmentSlug("");

    onClose();
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
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
