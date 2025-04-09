"use client";
import React, { useState, useRef, useEffect } from "react";
import countries from "./CountryList";
// Note: In a real implementation, you would need to install this library
// import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

// Simulating the libphonenumber-js functionality for this example
const parsePhoneNumberFromString = (
  phoneNumber: string,
  countryCode?: string,
) => {
  // This is a simplified validation - in a real app, use the actual library
  if (!phoneNumber) return null;

  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Simple length-based validation as a fallback
  const isValid =
    countryCode === "US" || countryCode === "CA"
      ? digitsOnly.length === 10
      : digitsOnly.length >= 8 && digitsOnly.length <= 12;

  return {
    isValid: () => isValid,
    country: countryCode,
    formatNational: () => {
      // Very basic formatting for demo purposes
      if (countryCode === "US" || countryCode === "CA") {
        if (digitsOnly.length === 10) {
          return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
        }
      } else if (countryCode === "KE" && digitsOnly.length === 9) {
        return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6)}`;
      }
      return phoneNumber;
    },
  };
};

// Simulating AsYouType formatter
const AsYouType = (countryCode?: string) => {
  return {
    input: (text: string) => {
      // This is a simplified formatter - in a real app, use the actual library
      if (countryCode === "US" || countryCode === "CA") {
        const digitsOnly = text.replace(/\D/g, "");
        if (digitsOnly.length <= 3) {
          return digitsOnly;
        } else if (digitsOnly.length <= 6) {
          return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
        } else {
          return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
        }
      } else if (countryCode === "KE") {
        const digitsOnly = text.replace(/\D/g, "");
        if (digitsOnly.length <= 3) {
          return digitsOnly;
        } else if (digitsOnly.length <= 6) {
          return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3)}`;
        } else {
          return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 6)} ${digitsOnly.slice(6, 9)}`;
        }
      }
      return text;
    },
  };
};

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.dial_code.includes(searchTerm),
      )
    : countries;

  // Validate and format phone number when it changes or country changes
  useEffect(() => {
    if (!value) {
      setError(null);
      setFormattedValue("");
      onChange("", false);
      return;
    }

    // Format as user types
    const formatter = AsYouType(selectedCountry.code);
    const formatted = formatter.input(value);
    setFormattedValue(formatted);

    // Validate the phone number
    const phoneNumber = parsePhoneNumberFromString(value, selectedCountry.code);

    if (phoneNumber && phoneNumber.isValid()) {
      setError(null);
      onChange(formatted, true);
    } else {
      setError(`Please enter a valid ${selectedCountry.name} phone number`);
      onChange(formatted, false);
    }
  }, [value, selectedCountry, onChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchTerm("");
  };

  const selectCountry = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);

    // Re-validate with the new country code
    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value, country.code);
      if (phoneNumber && phoneNumber.isValid()) {
        setError(null);
        onChange(phoneNumber.formatNational(), true);
      } else {
        setError(`Please enter a valid ${country.name} phone number`);
        onChange(value, false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue, false); // Will be validated in the useEffect
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="phone-number"
        className="text-base font-semibold tracking-normal leading-6 text-zinc-900"
      >
        Phone Number
      </label>
      <div
        className={`flex items-center p-3 rounded-lg bg-white bg-opacity-80 relative ${error ? "border border-red-500" : ""}`}
      >
        <div className="flex items-center" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={toggleDropdown}
            aria-label="Select country code"
            aria-expanded={isDropdownOpen}
          >
            <span className="w-6 h-6 flex items-center justify-center text-lg">
              {selectedCountry.flag}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {selectedCountry.dial_code}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M7 10L12 14L17 10"
                stroke="#6F767E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg z-10">
              <div className="p-2 sticky top-0 bg-white border-b">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className="py-1">
                {filteredCountries.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => selectCountry(country)}
                    >
                      <span className="mr-2 text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="ml-auto font-medium">
                        {country.dial_code}
                      </span>
                    </button>
                  </li>
                ))}
                {filteredCountries.length === 0 && (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    No countries found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="ml-3 w-0.5 h-5 bg-indigo-500" />
        <input
          id="phone-number"
          type="tel"
          placeholder="Phone Number"
          className="ml-px flex-1 text-sm font-semibold bg-transparent text-black focus:outline-none"
          value={formattedValue}
          onChange={handleInputChange}
          aria-invalid={!!error}
          aria-describedby={error ? "phone-error" : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Example:{" "}
        {selectedCountry.code === "US"
          ? "(555) 123-4567"
          : selectedCountry.code === "KE"
            ? "712 345 678"
            : "Enter your phone number"}
      </p>
    </div>
  );
};

export default PhoneNumberInput;
