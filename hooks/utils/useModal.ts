"use client";

import { useState } from "react";

export const useModal = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
