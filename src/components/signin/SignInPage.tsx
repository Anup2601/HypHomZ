"use client";
import React, { useState } from "react";
import StatusBar from "./StatusBar";
import PhoneNumberInput from "./PhoneNumberInput";
import SocialSignInOptions from "./SocialSignInOptions";
import Divider from "./Divider";
import { Link } from "react-router-dom";

const SignInPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneChange = (value: string, isValid: boolean) => {
    setPhoneNumber(value);
    setIsPhoneValid(isValid);
  };

  const handleSignIn = () => {
    if (isPhoneValid) {
      // Handle sign in logic here
      console.log("Signing in with phone number:", phoneNumber);
    }
  };

  return (
    <main className="w-full bg-amber-400 min-h-screen">
      <StatusBar />

      <section className="flex flex-col items-center px-5 mt-11">
        <header className="flex items-center w-full">
          <Link to="/">
            <button aria-label="Go back">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 19.5L11.5575 18.4425L5.8725 12.75H21V11.25H5.8725L11.5575 5.5575L10.5 4.5L3 12L10.5 19.5Z"
                  fill="#0F0F0F"
                />
              </svg>
            </button>
          </Link>
          <h1 className="flex-1 text-3xl font-bold text-center">Sign in</h1>
        </header>

        <div className="mt-24 w-full">
          <PhoneNumberInput value={phoneNumber} onChange={handlePhoneChange} />

          <button
            className={`mt-12 w-full h-12 text-base font-bold rounded-xl ${
              isPhoneValid
                ? "bg-amber-400 text-zinc-900"
                : "bg-neutral-100 text-zinc-700 opacity-70 cursor-not-allowed"
            }`}
            onClick={handleSignIn}
            disabled={!isPhoneValid}
          >
            Sign In
          </button>
        </div>

        <Divider text="OR" className="mt-36" />

        <SocialSignInOptions />

        <p className="mt-14 text-sm text-center">
          Don't have an account?{" "}
          <a href="#" className="text-blue-700 underline">
            sign up
          </a>
        </p>
      </section>
    </main>
  );
};

export default SignInPage;
