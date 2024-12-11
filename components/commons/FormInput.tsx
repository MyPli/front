import React from "react";

interface FormInputProps {
  placeholder: string;
  type: string;
  required: boolean;
  error: string;
  name: string;
}

const FormInput = ({
  placeholder,
  type,
  required,
  error,
  name,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        name={name}
        className="text-md p-4  w-full outline-none
      font-medium border border-primary border-solid rounded-md
      focus:ring-2 ring-primary
      "
        required={required}
        type={type}
        placeholder={placeholder}
      />
      <span className="text-red-500 font-medium">{error}</span>
    </div>
  );
};

export default FormInput;
