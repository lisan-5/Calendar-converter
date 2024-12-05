export const getEthiopianYear = (gregorianYear: number): number => {
  return gregorianYear - 8;
};

export const getEthiopianYearRange = (gregorianYear: number): { start: number; end: number } => {
  const ethiopianYear = getEthiopianYear(gregorianYear);
  return {
    start: ethiopianYear,
    end: ethiopianYear + 1
  };
};