export interface CountryData {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  iso2: string;
}

// A more comprehensive list of countries with their data
export const countries: CountryData[] = [
  {
    code: "KE",
    name: "Kenya",
    flag: "https://placehold.co/24x24/ff4444/ff4444",
    dialCode: "+254",
    iso2: "KE",
  },
  {
    code: "US",
    name: "United States",
    flag: "https://placehold.co/24x24/0000ff/0000ff",
    dialCode: "+1",
    iso2: "US",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "https://placehold.co/24x24/ff0000/ff0000",
    dialCode: "+44",
    iso2: "GB",
  },
  {
    code: "IN",
    name: "India",
    flag: "https://placehold.co/24x24/00ff00/00ff00",
    dialCode: "+91",
    iso2: "IN",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "https://placehold.co/24x24/ff0000/ff0000",
    dialCode: "+1",
    iso2: "CA",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "https://placehold.co/24x24/0000ff/0000ff",
    dialCode: "+61",
    iso2: "AU",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "https://placehold.co/24x24/ffff00/ffff00",
    dialCode: "+49",
    iso2: "DE",
  },
  {
    code: "FR",
    name: "France",
    flag: "https://placehold.co/24x24/0000ff/0000ff",
    dialCode: "+33",
    iso2: "FR",
  },
  {
    code: "IT",
    name: "Italy",
    flag: "https://placehold.co/24x24/00ff00/00ff00",
    dialCode: "+39",
    iso2: "IT",
  },
  {
    code: "JP",
    name: "Japan",
    flag: "https://placehold.co/24x24/ff0000/ff0000",
    dialCode: "+81",
    iso2: "JP",
  },
];

// Function to find a country by its ISO2 code
export const findCountryByIso2 = (iso2: string): CountryData | undefined => {
  return countries.find(
    (country) => country.iso2.toUpperCase() === iso2.toUpperCase(),
  );
};

// Function to find a country by its dial code
export const findCountryByDialCode = (
  dialCode: string,
): CountryData | undefined => {
  // Remove the + if it exists
  const cleanDialCode = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  return countries.find((country) => country.dialCode === cleanDialCode);
};
