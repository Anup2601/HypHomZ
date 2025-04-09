"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SkipLink: React.FC = () => {
  const navigate=useNavigate();
  const handleSkip = () => {
    navigate("/signup");
    console.log("Skipped role selection");
  };

  return (
    <button
      className="w-full px-0 py-3 mt-10 text-base font-medium text-center underline text-black text-opacity-70 hover:text-opacity-100 transition-opacity"
      onClick={handleSkip}
    >
      Skip and Start
    </button>
  );
};
