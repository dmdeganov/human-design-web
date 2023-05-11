import React, {memo} from 'react';

interface WheelInnerProps {
  value: number | string;
  styleJSON: string;
}

function WheelInner({value, styleJSON}: WheelInnerProps) {
  const style = JSON.parse(styleJSON) as React.CSSProperties;
  return (
    <div className="keen-slider__inner">
      <span style={style}>{value}</span>
    </div>
  );
}

const WheelInnerMemoized = memo(WheelInner);
export default WheelInnerMemoized;
