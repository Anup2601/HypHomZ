"use client";

import React, { useState } from "react";

interface TitleSelectorProps {
  selectedTitle?: string;
  onTitleChange?: (title: string) => void;
}

const TitleSelector: React.FC<TitleSelectorProps> = ({
  selectedTitle = "Mr.",
  onTitleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const titles = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

  const handleTitleChange = (title: string) => {
    if (onTitleChange) {
      onTitleChange(title);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex gap-2 items-center text-sm font-semibold text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedTitle}</span>
        <i className="ti ti-chevron-down">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-24 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {titles.map((title) => (
            <li
              key={title}
              className={`cursor-pointer select-none relative py-2 px-3 text-sm ${
                selectedTitle === title
                  ? "font-semibold bg-indigo-100 text-indigo-900"
                  : "text-gray-900"
              }`}
              role="option"
              aria-selected={selectedTitle === title}
              onClick={() => handleTitleChange(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TitleSelector;
