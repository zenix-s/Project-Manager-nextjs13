'use client'
import { useState } from 'react';


export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function onClose() {
    setIsShowing(false);
  }

  function onOpen() {
    setIsShowing(true);
  }

  return {
    isShowing,
    onClose,
    onOpen,
  };
}