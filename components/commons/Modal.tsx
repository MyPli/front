import React, { useState } from "react";
import { IoCloseOutline, IoPencil } from "react-icons/io5";

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
      className="fixed top-0 left-0 w-screen h-screen 
      flex-center bg-black bg-opacity-70 z-40
      ho
      "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-10 pt-6 
        min-w-96 min-h-72 flex flex-col gap-4 relative
       box-border"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex-between text-black ">
          {title ? (
            <span className="text-md font-medium">{title}</span>
          ) : (
            <div className="bg-white w-1 h-1" />
          )}

          <button
            className="hover:bg-gray rounded-full p-1 hover:text-black "
            onClick={onClose}
          >
            <IoCloseOutline className="w-7 h-7" />
          </button>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Modal;
