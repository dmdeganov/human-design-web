import React, {useRef, useState} from 'react';
import Wheel from './Wheel';
import {PickedDate} from './types';
import {currentYear, dateConfig, months, years} from '@/components/wheel-pickers/static';
import {getMemoizedIntegersArr, getNumberOfDaysInMonth} from '@/components/wheel-pickers/utils';
interface DatePickerProps {
  dateRef: React.MutableRefObject<PickedDate>;
}

const DatePicker = ({dateRef}: DatePickerProps) => {
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
      <Wheel type="day" slides={days} wheelWidth={250} resultRef={dateRef} />
      <Wheel type="month" slides={months} onScrollEnd={onMonthChange} wheelWidth={400} resultRef={dateRef} />
      <Wheel
        type="year"
        initial={currentYear - dateConfig.minYear}
        slides={years}
        wheelWidth={250}
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
