// book-exchange-frontend/src/pages/ComponentTestPage.tsx
import React from "react";
import Button from "../components/base/Button";
import Modal from "../components/base/Modal";

const ComponentTestPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Component Test Page</h1>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Button Component</h2>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Secondary Button Clicked")}
        >
          Secondary Button
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl mb-2">Modal Component</h2>
          <p>This is a modal content.</p>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentTestPage;
