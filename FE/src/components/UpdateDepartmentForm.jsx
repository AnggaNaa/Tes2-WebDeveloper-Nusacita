// UpdateDepartmentForm.jsx
import React, { useState, useEffect } from "react";
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
  Select,
} from "@chakra-ui/react";

const UpdateDepartmentForm = ({
  onUpdateDepartment,
  selectedDepartment,
  onClose,
  units,
}) => {
  const { isOpen, onOpen } = useDisclosure();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);

  useEffect(() => {
    if (selectedDepartment) {
      setName(selectedDepartment.name);
      setSlug(selectedDepartment.slug);
      setSelectedUnit(selectedDepartment.unit);
      onOpen();
    }
  }, [selectedDepartment, onOpen]);

  const handleSubmit = () => {
    console.log("ini id dari update", selectedUnit);
    if (name.trim() === "" || slug.trim() === "" || !selectedUnit) {
      return;
    }

    onUpdateDepartment({
      id: selectedDepartment.id,
      name: name,
      slug: slug,
      unit_id: selectedUnit.id,
    });

    setName("");
    setSlug("");
    setSelectedUnit(null);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Slug</FormLabel>
            <Input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Unit</FormLabel>
            <Select
              value={selectedUnit ? selectedUnit.id : ""}
              onChange={(e) => {
                const unitId = e.target.value;
                const unit = units.find((u) => u.id === unitId);
                setSelectedUnit(unit);
              }}
            >
              <option value="" disabled>
                Pilih Unit
              </option>
              {units &&
                units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDepartmentForm;
