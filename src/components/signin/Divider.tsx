import React from "react";

interface DividerProps {
  text: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className = "" }) => {
  return (
    <div className={`flex gap-3 justify-center items-center ${className}`}>
      <hr className="h-px bg-gray-500 w-[101px]" />
      <span className="text-xl text-black text-opacity-40">{text}</span>
      <hr className="h-px bg-gray-500 w-[97px]" />
    </div>
  );
};

export default Divider;
