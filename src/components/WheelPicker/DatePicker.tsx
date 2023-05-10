import React, {useRef, useState} from 'react';
import Wheel from './Wheel';
import {PickedDate} from '@/components/WheelPicker/types';

const generateIntegersSequence = (num: number) => new Array(num).fill(null).map((_, index) => 1 + index);

const getMemoizedIntegersArr = (() => {
  const cache: {[key: number]: number[]} = {};
  return (num: number): number[] => {
    if (num in cache) return cache[num];
    cache[num] = generateIntegersSequence(num);
    return cache[num];
  };
})();

const minYear = 1900;
const minPickableYear = 1920;
const maxYear = 2100;
const maxPickableYear = 2050;

const years = new Array(maxYear - minYear).fill(null).map((_, index) => minYear + index);
const months = [
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

const getNumberOfDaysInMonth = (monthIndex: number, year: number) => new Date(year, monthIndex + 1, 0).getDate();
const currentYear = new Date().getFullYear();

const DatePicker = ({adjustLineHeight = false, animatedTextTranslation = false}) => {
  const [days, setDays] = useState(getMemoizedIntegersArr(31));
  const date = useRef<PickedDate>({day: days[0], month: months[0], year: currentYear});

  const onMonthChange = (pickedMonthIndex: number) => {
    setDays(getMemoizedIntegersArr(getNumberOfDaysInMonth(pickedMonthIndex, date.current.year)));
  };
  const onYearChange = (pickedYearIndex: number) => {
    setDays(
      getMemoizedIntegersArr(
        getNumberOfDaysInMonth(
          months.findIndex(m => m === date.current.month),
          pickedYearIndex,
        ),
      ),
    );
  };
  return (
    <div className="slider-picker">
      <Wheel
        type="day"
        slides={days}
        wheelWidth={250}
        resultRef={date}
        adjustLineHeight={adjustLineHeight}
        animatedTextTranslation={animatedTextTranslation}
      />
      <Wheel
        type="month"
        slides={months}
        onScrollEnd={onMonthChange}
        wheelWidth={400}
        resultRef={date}
        adjustLineHeight={adjustLineHeight}
        animatedTextTranslation={animatedTextTranslation}
      />
      <Wheel
        type="year"
        initial={currentYear - minYear}
        slides={years}
        wheelWidth={250}
        resultRef={date}
        minIndex={minPickableYear - minYear}
        maxIndex={maxPickableYear - minYear}
        onScrollEnd={onYearChange}
        adjustLineHeight={adjustLineHeight}
        animatedTextTranslation={animatedTextTranslation}
      />
      <div className="slider-picker__center-highlight" />
    </div>
  );
};

export default DatePicker;
