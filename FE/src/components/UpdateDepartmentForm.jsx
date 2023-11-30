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
  const [manPower2023, setManPower2023] = useState(0);
  const [manPower2024, setManPower2024] = useState(0);

  useEffect(() => {
    if (selectedDepartment) {
      setName(selectedDepartment.name);
      setSlug(selectedDepartment.slug);
      setSelectedUnitId(selectedDepartment.unit?.id);
      setManPower2023(selectedDepartment.m_power_2023);
      setManPower2024(selectedDepartment.m_power_2024);
      onOpen();
    }
  }, [selectedDepartment, onOpen]);

  const handleSubmit = () => {
    if (
      name.trim() === "" ||
      slug.trim() === "" ||
      !selectedUnitId ||
      !manPower2023 ||
      !manPower2024
    ) {
      return;
    }

    onUpdateDepartment({
      id: selectedDepartment.id,
      name: name,
      slug: slug,
      unit_id: selectedUnitId,
      m_power_2023: manPower2023,
      m_power_2024: manPower2024,
    });

    setName("");
    setSlug("");
    setSelectedUnitId("");
    setManPower2023(0);
    setManPower2024(0);

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
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDepartmentForm;
