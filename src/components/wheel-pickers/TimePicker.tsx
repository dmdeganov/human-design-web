import React from 'react';
import Wheel from './Wheel';
import {PickedTime} from './types';
import {getMemoizedIntegersArr} from '@/components/wheel-pickers/utils';
import DayPeriodWheel from '@/components/wheel-pickers/DayPeriodWheel';
interface TimePickerProps {
  timeRef: React.MutableRefObject<PickedTime & {isAnimationActive: boolean}>;
}

const TimePicker = ({timeRef}: TimePickerProps) => {
  return (
    <div className="slider-picker">
      <Wheel type="hour" slides={getMemoizedIntegersArr(12)} resultRef={timeRef} initial={11} />
      <Wheel type="minute" slides={getMemoizedIntegersArr(60, 0)}  resultRef={timeRef} />
      <DayPeriodWheel resultRef={timeRef} />
      <div className="slider-picker__center-highlight" />
    </div>
  );
};

export default TimePicker;
