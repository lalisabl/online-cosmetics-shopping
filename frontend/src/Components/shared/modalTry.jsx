import React, { useState } from "react";
import GenericModal from "./GenericModal";

function ModalTry() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <GenericModal
        children=<TryModal closeModal={closeModal} />
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

function TryModal({ closeModal }) {
  return (
    <>
      <h2>Modal Title</h2>
      <p>This is some content inside the modal.</p>
      <h2>Modal Title</h2>
      <p>This is some content inside the modal.
      <h2>Modal Title</h2>
      <p>This is some content inside the modal.</p></p>
      <button>other btn</button>
      <button onClick={closeModal}>Close Modal</button>
    </>
  );
}
export default ModalTry;
