import PropTypes from "prop-types";
import { cloneElement, createContext, useContext, useState } from "react";
import Button from "./Button";
import { X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  Modal.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [openName, setOpenName] = useState("");

  const closeModal = () => setOpenName("");
  const openModal = setOpenName;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, openName }}>
      <span>{children}</span>
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => openModal(name),
  });
}

function Window({ children, name }) {
  Window.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  };

  const { openName, closeModal } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full backdrop-blur-md transition-all duration-75">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg transition-all duration-75">
        <Button
          className="absolute right-3 top-3 hover:text-red-500"
          onClick={closeModal}
        >
          <X size={18} />
        </Button>

        <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
