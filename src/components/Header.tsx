import React from "react";
import { BackArrow } from "./BackArrow";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex relative items-center mb-20 max-sm:mb-10">
      <button className="absolute left-0" aria-label="Go back">
        {/* <BackArrow /> */}
      </button>
      <h1 className="w-full text-2xl font-bold leading-8 text-center text-black">
        {title}
      </h1>
    </header>
  );
};
