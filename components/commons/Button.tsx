import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
  color: "primary" | "white" | 'border';
}

const Button = ({
  className,
  color,
  children,
  ...props
}: PropsWithChildren<IProps>) => {
  const getStyle = () => {
    if (color === 'primary') {
      return 'bg-primary text-white'
    } else if (color === 'white') {
      return 'bg-white text-primary'
    } else if (color === 'border') {
      return "border border-white text-white";
    }
  }

  return (
    <button
      className={`rounded-xl ${getStyle()} text-base w-[83px] h-[40px] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;