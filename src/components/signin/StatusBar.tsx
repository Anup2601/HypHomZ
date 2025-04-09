import React from "react";

const StatusBar: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-5 w-full h-11">
      <time className="text-base font-semibold tracking-tight text-zinc-800">
        9:41
      </time>
      <div className="flex gap-1.5 items-center">
        <div className="w-[17px] h-[11px]">
          {/* Network signal icon */}
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9H2.5V2H1V9ZM5.5 9H7V0H5.5V9ZM9.5 9H11V4H9.5V9ZM13.5 9H15V6H13.5V9Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
        <div className="w-[15px] h-[11px]">
          {/* WiFi icon */}
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 8.5C8.328 8.5 9 9.172 9 10C9 10.828 8.328 11.5 7.5 11.5C6.672 11.5 6 10.828 6 10C6 9.172 6.672 8.5 7.5 8.5ZM1.3335 3.6665C3.6665 1.3335 11.3335 1.3335 13.6665 3.6665L12.3335 4.9995C10.6665 3.3335 4.3335 3.3335 2.6665 4.9995L1.3335 3.6665ZM4.3335 6.9995C5.6665 5.6665 9.3335 5.6665 10.6665 6.9995L9.3335 8.3335C8.6665 7.6665 6.3335 7.6665 5.6665 8.3335L4.3335 6.9995Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <div className="rounded-sm bg-zinc-500 h-[11px] w-[22px]" />
          <div className="ml-px w-0.5 h-1 bg-zinc-500" />
        </div>
      </div>
    </header>
  );
};

export default StatusBar;
