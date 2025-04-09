import React from "react";

const SocialSignInOptions: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-9">
      <h2 className="text-sm font-semibold text-gray-900">Sign in with</h2>
      <div className="flex justify-center gap-6 mt-5">
        {/* Google Button */}
        <button
          className="flex justify-center items-center rounded-xl border-2 bg-zinc-50 border-zinc-100 h-12 w-12"
          aria-label="Sign in with Google"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2501_1607)">
              <path
                d="M24.4247 12.9497C24.4247 12.1597 24.3547 11.4097 24.2347 10.6797H12.9347V15.1897H19.4047C19.1147 16.6697 18.2647 17.9197 17.0047 18.7697V21.7697H20.8647C23.1247 19.6797 24.4247 16.5997 24.4247 12.9497Z"
                fill="#4285F4"
              />
              <path
                d="M12.9347 24.6797C16.1747 24.6797 18.8847 23.5997 20.8647 21.7697L17.0047 18.7697C15.9247 19.4897 14.5547 19.9297 12.9347 19.9297C9.8047 19.9297 7.1547 17.8197 6.2047 14.9697H2.2247V18.0597C4.1947 21.9797 8.2447 24.6797 12.9347 24.6797Z"
                fill="#34A853"
              />
              <path
                d="M6.20469 14.9697C5.95469 14.2497 5.82469 13.4797 5.82469 12.6797C5.82469 11.8797 5.96469 11.1097 6.20469 10.3897V7.29968H2.22469C1.40469 8.91968 0.934692 10.7397 0.934692 12.6797C0.934692 14.6197 1.40469 16.4397 2.22469 18.0597L6.20469 14.9697Z"
                fill="#FBBC05"
              />
              <path
                d="M12.9347 5.42969C14.7047 5.42969 16.2847 6.03969 17.5347 7.22969L20.9547 3.80969C18.8847 1.86969 16.1747 0.679688 12.9347 0.679688C8.2447 0.679688 4.1947 3.37969 2.2247 7.29969L6.2047 10.3897C7.1547 7.53969 9.8047 5.42969 12.9347 5.42969Z"
                fill="#EA4335"
              />
            </g>
          </svg>
        </button>

        {/* Facebook Button */}
        <button
          className="flex justify-center items-center rounded-xl border-2 bg-zinc-50 border-zinc-100 h-12 w-12"
          aria-label="Sign in with Facebook"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 2H14.5C12.57 2 11 3.57 11 5.5V8.5H8V12.5H11V22H15V12.5H17.5L18 8.5H15V5.5C15 5.22 15.22 5 15.5 5H18V2H17.5Z"
              fill="#1877F2"
            />
          </svg>
        </button>

        {/* Apple Button */}
        <button
          className="flex justify-center items-center rounded-xl border-2 bg-zinc-50 border-zinc-100 h-12 w-12"
          aria-label="Sign in with Apple"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 2C15.6 2.6 14.5 3.6 14.5 5C14.5 6.3 15.4 7.3 16.2 8C17.1 8.7 18 9.2 18.2 9.3C18 10 17.9 10.8 17.9 11.5C17.9 13.6 18.7 15.6 20.1 17.2C21.4 18.8 23.1 19.5 24 19.5C23.8 20 23.2 21.1 22.5 22C21.6 23.2 20.7 24 19.5 24C18.3 24 17.6 23.4 16.3 23.4C15 23.4 14.2 24 13 24C11.7 24 10.8 22.9 9.9 21.6C8.7 19.8 8 17.5 8 15.3C8 12 9.5 10 11 10C12.2 10 12.9 10.8 14.1 10.8C15.3 10.8 16 10 17.2 10C17.6 10 18.5 10.2 19.5 11C18.9 11.7 18 12.7 18 14.5C18 17 19.5 18.5 21 18.5C19.6 20.4 17.7 21.5 16.5 21.5C16.4 20.8 16.5 19.9 16.5 19.5C16.5 16 18.8 14 21 14C19.2 12 17.5 12.5 16.5 12.5C15.5 12.5 14.7 12 14 11C13.3 10 13.5 9 13.5 8.5C13.5 6.8 14.8 5.3 16.5 2Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SocialSignInOptions;
