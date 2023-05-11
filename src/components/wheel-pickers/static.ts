
export const dateConfig = {
  minYear: 1900,
  minPickableYear: 1920,
  maxYear: 2100,
  maxPickableYear: 2050,
};

export const years = new Array(dateConfig.maxYear - dateConfig.minYear).fill(null).map((_, index) => dateConfig.minYear + index);
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

export const currentYear = new Date().getFullYear();
