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
  Select,
  useDisclosure,
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
  const [selectedUnitId, setSelectedUnitId] = useState("");

  useEffect(() => {
    if (selectedDepartment) {
      setName(selectedDepartment.name);
      setSlug(selectedDepartment.slug);
      setSelectedUnitId(selectedDepartment.unit?.id);
      onOpen();
    }
  }, [selectedDepartment, onOpen]);

  const handleSubmit = () => {
    if (name.trim() === "" || slug.trim() === "" || !selectedUnitId) {
      return;
    }

    onUpdateDepartment({
      id: selectedDepartment.id,
      name: name,
      slug: slug,
      unit_id: selectedUnitId,
    });

    setName("");
    setSlug("");
    setSelectedUnitId("");

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
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
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
