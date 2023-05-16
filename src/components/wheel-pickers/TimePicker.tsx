import React from 'react';
import Wheel from './Wheel';
import {PickedTime} from './types';
import {getMemoizedIntegersArr} from '@/components/wheel-pickers/utils';
import DayPeriodWheel from '@/components/wheel-pickers/DayPeriodWheel';
interface TimePickerProps {
  timeRef: React.MutableRefObject<PickedTime & {isAnimationActive: boolean}>;
  initialHourIndex?: number;
  initialMinuteIndex?: number;
  initialPeriodIndex?: number;
}

const TimePicker = ({
  timeRef,
  initialHourIndex = 11,
  initialMinuteIndex = 0,
  initialPeriodIndex = 0,
}: TimePickerProps) => {
  return (
    <div className="slider-picker">
      <Wheel type="hour" slides={getMemoizedIntegersArr(12)} resultRef={timeRef} initial={initialHourIndex} />
      <Wheel type="minute" slides={getMemoizedIntegersArr(60, 0)} resultRef={timeRef} initial={initialMinuteIndex}/>
      <DayPeriodWheel resultRef={timeRef} initial={initialPeriodIndex} />
      <div className="slider-picker__center-highlight" />
    </div>
  );
};

export default TimePicker;
