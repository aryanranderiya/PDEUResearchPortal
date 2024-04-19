import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function FormAddedModal({
  isOpen,
  onOpenChange,
  successfullyUploaded,
  title,
  link,
  formData,
}) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
      <ModalContent>
        <ModalHeader>
          {successfullyUploaded ? "Successfully Uploaded" : "Error Uploading"}:{" "}
          {title}
        </ModalHeader>
        <ModalBody>
          <p>
            <br />
            <b>DOI:</b> {formData.DOI}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onOpenChange}>
            X
          </Button>
          <Button color="default" onPress={() => navigate("/home")}>
            Home
          </Button>
          <Button color="primary" onPress={() => navigate(link)}>
            View All {title}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
