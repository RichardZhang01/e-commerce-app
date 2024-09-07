"use client";

import { useEffect, useState } from "react";

interface AlertBoxProps {
  message: string;
  type: "success" | "error" | "warning";
  autoClose?: boolean;
  onClose?: () => void;
}

export default function AlertBox({
  message,
  type,
  autoClose = true,
  onClose,
}: AlertBoxProps) {
  const [visible, setVisible] = useState(true);
  const [animateClose, setAnimateClose] = useState(false);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setAnimateClose(true);
    setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, 300); 
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 left-0 right-0 mx-auto p-4 w-full max-w-md text-white shadow-lg rounded-md z-50 transition-transform duration-500 ease-in-out ${
        animateClose
          ? "animate-slideUp" 
          : "animate-slideDown" 
      } ${type === "error" ? "bg-red-600" : type === "success" ? "bg-green-600" : "bg-yellow-600"}`}
    >
      <div className="flex justify-between items-center p-2">
        <p className="m-0 text-sm md:text-base">{message}</p>
        <button
          className="ml-4 text-2xl leading-none p-0"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
