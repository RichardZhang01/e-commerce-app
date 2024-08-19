import React from "react";

interface ButtonProps {
  onClickHandler: () => void;
  buttonText: string;
}

export const Button = ({ onClickHandler, buttonText }: ButtonProps) => (
  <button
    className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded shadow transition duration-200"
    onClick={onClickHandler}
  >
    {buttonText}
  </button>
);
