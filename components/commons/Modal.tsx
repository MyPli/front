import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex-center bg-black bg-opacity-70 z-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-10 w-96 min-h-72 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className="flex-between ">
            <span>{title}</span>
            <button onClick={onClose}>
              <IoCloseOutline />
            </button>
          </header>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Modal;
