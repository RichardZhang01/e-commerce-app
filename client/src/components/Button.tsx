import React from "react";

interface ButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}

export const Button = ({ onClickHandler, buttonText }: ButtonProps) => (
  <button
    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
    onClick={onClickHandler}
  >
    {buttonText}
  </button>
);
