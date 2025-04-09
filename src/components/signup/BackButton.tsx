"use client";
import { useNavigate } from "react-router-dom";
import React from "react";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute left-6 cursor-pointer top-[60px]"
      onClick={onClick}
      aria-label="Go back"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="back-icon"
      >
        <path
          d="M10.5 19.5L11.5575 18.4425L5.8725 12.75H21V11.25H5.8725L11.5575 5.5575L10.5 4.5L3 12L10.5 19.5Z"
          fill="#0F0F0F"
        />
      </svg>
    </button>
  );
};

export default BackButton;
