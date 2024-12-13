"use client";

import { useState } from "react";

interface IProps {
  defaultValue?: boolean;
}

export const useModal = ({ defaultValue = false }: IProps) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
