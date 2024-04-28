// Modal.js
import React from "react";
import ProductForm from "./ProductForm";

const Modal = ({ isOpen, closeModal, categoryId }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Product</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
      </div>
    </div>
  );
};

export default Modal;
