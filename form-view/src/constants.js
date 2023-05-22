//Replace with API BASE URL
export const baseUrl = "http://127.0.0.1:8000/api";

export const daysOptionsList = Array.from({ length: 31 }, (_, index) => index + 1);
export const monthOptionsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startYear = 2002;
const endYear = 1910;

export const yearsOptionsList = Array.from(
  { length: startYear - endYear + 1 },
  (_, index) => startYear - index
);