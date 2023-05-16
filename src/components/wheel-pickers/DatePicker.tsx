import React, {useState} from 'react';
import Wheel from './Wheel';
import {PickedDate} from './types';
import {dateConfig, months, years} from '@/components/wheel-pickers/static';
import {getMemoizedIntegersArr, getNumberOfDaysInMonth} from '@/components/wheel-pickers/utils';
interface DatePickerProps {
  dateRef: React.MutableRefObject<PickedDate & {isAnimationActive: boolean}>;
  initialYearIndex: number;
  initialMonthIndex?: number;
  initialDayIndex?: number;
}

const DatePicker = ({dateRef, initialYearIndex, initialMonthIndex = 0, initialDayIndex = 0}: DatePickerProps) => {
  const [days, setDays] = useState(getMemoizedIntegersArr(31));

  const onMonthChange = (pickedMonthIndex: number) => {
    setDays(getMemoizedIntegersArr(getNumberOfDaysInMonth(pickedMonthIndex, dateRef.current.year)));
  };
  const onYearChange = (pickedYearIndex: number) => {
    setDays(
      getMemoizedIntegersArr(
        getNumberOfDaysInMonth(
          months.findIndex(m => m === dateRef.current.month),
          pickedYearIndex,
        ),
      ),
    );
  };

  return (
    <div className="slider-picker">
      <Wheel type="day" slides={days} resultRef={dateRef} initial={initialDayIndex}/>
      <Wheel type="month" slides={months} onScrollEnd={onMonthChange} resultRef={dateRef} initial={initialMonthIndex}/>
      <Wheel
        type="year"
        initial={initialYearIndex}
        slides={years}
        resultRef={dateRef}
        minIndex={dateConfig.minPickableYear - dateConfig.minYear}
        maxIndex={dateConfig.maxPickableYear - dateConfig.minYear}
        onScrollEnd={onYearChange}
      />
      <div className="slider-picker__center-highlight" />
    </div>
  );
};

export default DatePicker;
