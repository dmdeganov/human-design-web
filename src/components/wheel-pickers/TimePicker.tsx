import React from 'react';
import Wheel from './Wheel';
import {PickedTime} from './types';
import {getMemoizedIntegersArr} from '@/components/wheel-pickers/utils';
import DayPeriodWheel from '@/components/wheel-pickers/DayPeriodWheel';
interface TimePickerProps {
  timeRef: React.MutableRefObject<PickedTime>;
}

const TimePicker = ({timeRef}: TimePickerProps) => {
  return (
    <div className="slider-picker">
      <Wheel type="hour" slides={getMemoizedIntegersArr(12)} wheelWidth={50} resultRef={timeRef} initial={12} />
      <Wheel type="minute" slides={getMemoizedIntegersArr(60, 0)} wheelWidth={50} resultRef={timeRef} />
      <DayPeriodWheel wheelWidth={50} resultRef={timeRef} />
      <div className="slider-picker__center-highlight" />
    </div>
  );
};

export default TimePicker;
