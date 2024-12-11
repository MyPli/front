import React from "react";

interface FormButtonProps {
  color: "primary" | "white";
  size: "large" | "small";
  onMouseDown?: () => void;
  children: React.ReactNode;
}

const FormButton = ({
  children,
  color,
  size,
  onMouseDown,
}: FormButtonProps) => {
  return (
    <button
      onMouseDown={onMouseDown}
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
        }`}
    >
      {children}
    </button>
  );
};

export default FormButton;
