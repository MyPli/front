"use client";

import React from "react";

interface FormButtonProps {
  color: "primary" | "white";
  size: "large" | "small";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const FormButton = ({
  children,
  color,
  size,
  onClick,
  disabled,
}: FormButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-center  rounded-md 
        ${
          color === "primary"
            ? "bg-primary text-white"
            : "bg-white text-black border-primary border-solid border"
        } 
        ${
          size === "large"
            ? "text-md p-4 font-medium w-full"
            : "text-sm p-2 font-normal"
        }
        disabled:bg-neutral-400
        disabled:cursor-not-allowed
        `}
    >
      {children}
    </button>
  );
};

export default FormButton;
