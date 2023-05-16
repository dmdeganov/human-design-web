// useModal.tsx

import {useState} from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    toggle,
    close,
  };
}
