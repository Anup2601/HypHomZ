"use client";
import React from "react";

interface RoleCardProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  illustration,
}) => {
  const handleClick = () => {
    // Handle card selection logic here
    console.log(`Selected role: ${title}`);
  };

  return (
    <article
      className="relative p-6 rounded-3xl bg-white bg-opacity-90 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] max-sm:p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Select role: ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="illustration-container">{illustration}</div>
      <div className="mt-4">
        <h2 className="mb-2 text-base font-bold text-black text-opacity-90">
          {title}
        </h2>
        <p className="text-sm text-black text-opacity-60">{description}</p>
      </div>
    </article>
  );
};
