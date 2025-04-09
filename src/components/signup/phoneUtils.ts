import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  formatIncompletePhoneNumber,
} from "libphonenumber-js";

// Validate a phone number based on country code
export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string,
): { isValid: boolean; error?: string } => {
  if (!phoneNumber) {
    return { isValid: false, error: "Phone number is required" };
  }

  try {
    // Remove the + from country code if it exists
    const cleanCountryCode = countryCode.startsWith("+")
      ? countryCode.substring(1)
      : countryCode;

    // Parse the phone number
    const fullNumber = `+${cleanCountryCode}${phoneNumber}`;
    const phoneNumberObj = parsePhoneNumberFromString(fullNumber);

    if (!phoneNumberObj) {
      return { isValid: false, error: "Invalid phone number format" };
    }

    if (!phoneNumberObj.isValid()) {
      return {
        isValid: false,
        error: `Invalid phone number for ${phoneNumberObj.country || "this country"}`,
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error("Phone validation error:", error);
    return { isValid: false, error: "Invalid phone number" };
  }
};

// Format a phone number as the user types
export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode: string,
): string => {
  if (!phoneNumber) return "";

  try {
    // Remove the + from country code if it exists
    const cleanCountryCode = countryCode.startsWith("+")
      ? countryCode.substring(1)
      : countryCode;

    // Format the phone number
    const formattedNumber = formatIncompletePhoneNumber(
      phoneNumber,
      cleanCountryCode,
    );

    // Remove the country code from the formatted number if it's included
    const countryPrefix = `+${cleanCountryCode}`;
    return formattedNumber.startsWith(countryPrefix)
      ? formattedNumber.substring(countryPrefix.length).trim()
      : formattedNumber;
  } catch (error) {
    // If formatting fails, return the original input
    return phoneNumber;
  }
};

// Get example phone number format for a country
export const getExamplePhoneNumber = (countryCode: string): string => {
  try {
    // Remove the + from country code if it exists
    const cleanCountryCode = countryCode.startsWith("+")
      ? countryCode.substring(1)
      : countryCode;

    const phoneNumberObj = parsePhoneNumberFromString(
      `+${cleanCountryCode}123456789`,
    );
    if (!phoneNumberObj) return "e.g., 123456789";

    return `e.g., ${phoneNumberObj.formatNational().replace(/\d/g, "0")}`;
  } catch (error) {
    return "e.g., 123456789";
  }
};
