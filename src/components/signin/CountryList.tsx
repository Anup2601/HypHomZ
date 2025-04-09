interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export const countries: Country[] = [
  {
    name: "Kenya",
    code: "KE",
    dial_code: "+254",
    flag: "🇰🇪",
  },
  {
    name: "United States",
    code: "US",
    dial_code: "+1",
    flag: "🇺🇸",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dial_code: "+44",
    flag: "🇬🇧",
  },
  {
    name: "India",
    code: "IN",
    dial_code: "+91",
    flag: "🇮🇳",
  },
  {
    name: "Canada",
    code: "CA",
    dial_code: "+1",
    flag: "🇨🇦",
  },
  {
    name: "Australia",
    code: "AU",
    dial_code: "+61",
    flag: "🇦🇺",
  },
  {
    name: "Germany",
    code: "DE",
    dial_code: "+49",
    flag: "🇩🇪",
  },
  {
    name: "France",
    code: "FR",
    dial_code: "+33",
    flag: "🇫🇷",
  },
  {
    name: "China",
    code: "CN",
    dial_code: "+86",
    flag: "🇨🇳",
  },
  {
    name: "Japan",
    code: "JP",
    dial_code: "+81",
    flag: "🇯🇵",
  },
  {
    name: "South Africa",
    code: "ZA",
    dial_code: "+27",
    flag: "🇿🇦",
  },
  {
    name: "Nigeria",
    code: "NG",
    dial_code: "+234",
    flag: "🇳🇬",
  },
];

export default countries;
