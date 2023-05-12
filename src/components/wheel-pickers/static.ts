export const currentYear = new Date().getFullYear();

export const dateConfig = {
  minYear: currentYear - 100,
  minPickableYear: currentYear - 100,
  maxYear: currentYear + 10,
  maxPickableYear: currentYear,
};
export const initialYear = currentYear - 20;

export const years = new Array(dateConfig.maxYear - dateConfig.minYear)
  .fill(null)
  .map((_, index) => dateConfig.minYear + index);
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
