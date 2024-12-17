import React from "react";

interface FormInputProps {
  placeholder: string;
  type: string;
  name: string;
  errors?: string[];
}

const FormInput = ({ placeholder, type, name, errors }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        placeholder={placeholder}
        type={type}
        className="form-input"
        required
        name={name}
      />
      <span className="error-text">
        {errors?.map((error, idx) => (
          <span key={idx}>
            {error} <br />
          </span>
        ))}
      </span>
    </div>
  );
};

export default FormInput;
