import React, {useEffect, useState} from 'react';
import {useKeenSlider, TrackDetails} from 'keen-slider/react';
import {PickedDate, PickedTime, WheelType} from '@/components/wheel-pickers/types';
import {MutationPlugin, WheelControls} from './plugins';
import WheelInner from './WheelInner';
import {getStyledSlides} from './utils';

interface WheelProps {
  type: WheelType;
  slides: Array<number> | Array<string>;
  minIndex?: number;
  maxIndex?: number;
  onScrollEnd?: (num: number) => void;
  resultRef: React.MutableRefObject<PickedDate | PickedTime>;
  wheelWidth: number;
  initial?: number;
}
export default function Wheel({
  slides,
  minIndex,
  maxIndex,
  onScrollEnd,
  resultRef,
  wheelWidth,
  type,
  initial,
}: WheelProps) {
  const [styledSlides, setStyledSlides] = useState<Array<{value: number | string; style: React.CSSProperties}>>([]);
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        origin: 'center',
        perView: 7,
        spacing: 10,
      },
      initial,
      dragSpeed: 0.4,
      vertical: true,
      loop: true,
      rubberband: true,
      mode: 'free-snap',
      detailsChanged: s => {
        setSliderState(s.track.details);
      },
      animationEnded: s => {
        const pickedSlideIndex = s.track.details.rel;
        const result = resultRef.current as {[key: string]: number | string};
        result[type] = slides[pickedSlideIndex];
        if (minIndex && pickedSlideIndex < minIndex) s.moveToIdx(minIndex);
        if (maxIndex && pickedSlideIndex > maxIndex) s.moveToIdx(maxIndex);
        if (onScrollEnd) onScrollEnd(pickedSlideIndex);
      },
    },
    [MutationPlugin, WheelControls],
  );

  useEffect(() => {
    setStyledSlides(getStyledSlides(sliderState, slides));
  }, [sliderState, slides.length]);

  const alignToCenter = ['day', 'month', 'year'].includes(type);

  // style={{width: `${wheelWidth}px`}}
  return (
    <div ref={sliderRef} className={`keen-slider${type === 'day' ? ' pr-2' : ''}`}>
      {(styledSlides.length ? styledSlides : getStyledSlides(sliderState, slides)).map(({value, style}) => (
        <div key={value} className={`keen-slider__slide${alignToCenter ? ' keen-slider__slide--center' : ''}`}>
          <WheelInner value={value} styleJSON={JSON.stringify(style)} />
        </div>
      ))}
    </div>
  );
}
