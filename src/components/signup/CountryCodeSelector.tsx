"use client";

import React, { useState, useEffect, useRef } from "react";
import { countries, CountryData } from "./countryData";

interface CountryCodeSelectorProps {
  selectedCountry?: CountryData;
  onCountryChange?: (country: CountryData) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  selectedCountry = countries[0],
  onCountryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialCode.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredCountries(filtered);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountryChange = (country: CountryData) => {
    if (onCountryChange) {
      onCountryChange(country);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex gap-2 items-center text-sm font-semibold text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <img
          src={selectedCountry.flag}
          alt={`${selectedCountry.name} flag`}
          className="w-6 h-6 rounded-xl"
        />
        <span>{selectedCountry.dialCode}</span>
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
        <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              type="text"
              placeholder="Search country or code..."
              className="w-full p-2 text-sm border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <ul className="py-1" role="listbox">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className={`cursor-pointer select-none relative py-2 px-3 text-sm ${
                  selectedCountry.code === country.code
                    ? "font-semibold bg-indigo-100 text-indigo-900"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
                role="option"
                aria-selected={selectedCountry.code === country.code}
                onClick={() => handleCountryChange(country)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-5 h-5 rounded-xl"
                  />
                  <span className="font-medium">{country.name}</span>
                  <span className="text-gray-500 ml-auto">
                    {country.dialCode}
                  </span>
                </div>
              </li>
            ))}

            {filteredCountries.length === 0 && (
              <li className="py-2 px-3 text-sm text-gray-500">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
