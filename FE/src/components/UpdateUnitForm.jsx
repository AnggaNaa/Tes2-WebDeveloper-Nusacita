// UpdateUnitForm.jsx
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
} from "@chakra-ui/react";
import { API } from "../libs/api";

const UpdateUnitForm = ({ onUpdateUnit, selectedUnit, onClose }) => {
  const [unitName, setUnitName] = useState(selectedUnit.name || "");
  const [unitSlug, setUnitSlug] = useState(selectedUnit.slug || "");

  const handleSubmit = async () => {
    try {
      const response = await API.patch(
        `/units/${selectedUnit.id}`,
        {
          name: unitName,
          slug: unitSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Panggil fungsi onUpdateUnit dengan data unit yang diupdate
      onUpdateUnit(response.data);

      // Reset nilai formulir setelah submit
      setUnitName("");
      setUnitSlug("");

      // Tutup modal
      onClose();
    } catch (error) {
      console.error("Error update Unit:", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Unit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Slug</FormLabel>
            <Input
              type="text"
              value={unitSlug}
              onChange={(e) => setUnitSlug(e.target.value)}
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

export default UpdateUnitForm;
