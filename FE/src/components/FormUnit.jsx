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

const AddUnitForm = ({ onAddUnit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [unitName, setUnitName] = useState("");
  const [unitSlug, setUnitSlug] = useState("");

  const handleSubmit = () => {
    // Validasi atau logika lainnya sebelum menambah unit
    if (unitName.trim() === "" || unitSlug.trim() === "") {
      // Handle validasi jika diperlukan
      return;
    }

    // Panggil fungsi onAddUnit dengan data unit yang baru
    onAddUnit({ name: unitName, slug: unitSlug });

    // Reset nilai formulir setelah submit
    setUnitName("");
    setUnitSlug("");

    // Tutup modal
    onClose();
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Add Unit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Unit</ModalHeader>
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
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUnitForm;
