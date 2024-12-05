// Calendar conversion utilities
export const GREGORIAN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const ETHIOPIAN_MONTHS = [
  "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሳስ", "ጥር", "የካቲት",
  "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
];

export const ETHIOPIAN_MONTHS_LATIN = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
  "Megabit", "Miyazia", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
];

export const getLeapYearOffset = (year: number): number => {
  if (year < 1900) return 1;
  if (year > 2100) return -1;
  return 0;
};

export const determineLeapYears = (year: number) => {
  const isJulianCalendar = year <= 1752;
  let isLeapYear = (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
  let isEthiopianLeapYear = ((year + 1) % 4 === 0) && ((year + 1) % 100 !== 0 || (year + 1) % 400 === 0);
  
  if (isJulianCalendar) {
    isLeapYear = year % 4 === 0;
    isEthiopianLeapYear = ((year + 1) % 4) === 0;
  }
  
  return { isJulianCalendar, isLeapYear, isEthiopianLeapYear };
};

export const getInitialEthiopianDate = (
  isLeapYear: boolean,
  isJulianCalendar: boolean,
  leapYearOffset: number
) => {
  let month = 4;
  let day = 23 + leapYearOffset;
  
  if (isLeapYear && !isJulianCalendar) {
    day = 22 + leapYearOffset;
  }
  
  if (isJulianCalendar) {
    month = 5;
    day = 6;
  }
  
  return { month, day };
};