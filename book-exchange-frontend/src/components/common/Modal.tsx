import React from "react";
import Modal from "../base/Modal";
import Form from "./Form";
import Button from "../base/Button";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { [key: string]: string }) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal title="Create Record" isOpen={isOpen} onClose={onClose} variant="default" shadow="xl">
      <Form onSubmit={onSubmit} />
      <Button variant="secondary" onClick={onClose} shadow="sm">
        Cancel
      </Button>
    </Modal>
  );
};

export default ModalForm;
