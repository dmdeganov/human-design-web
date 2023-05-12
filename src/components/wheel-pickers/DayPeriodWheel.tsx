import React, {useEffect, useState} from 'react';
import {useKeenSlider, TrackDetails} from 'keen-slider/react';
import {PickedDate, PickedTime} from '@/components/wheel-pickers/types';
import {WheelControls} from './plugins';
import {getStyledSlides} from './utils';
import WheelInner from '@/components/wheel-pickers/WheelInner';

interface WheelProps {
  resultRef: React.MutableRefObject<(PickedDate | PickedTime) & {isAnimationActive: boolean}>;
}

export default function DayPeriodWheel({resultRef}: WheelProps) {
  const slides = ['AM', 'PM'];
  const [styledSlides, setStyledSlides] = useState<Array<{value: number | string; style: React.CSSProperties}>>([]);
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        origin: 'center',
        perView: 7,
        spacing: 10,
      },
      dragSpeed: 0.6,
      vertical: true,
      loop: false,
      rubberband: true,
      mode: 'free-snap',
      detailsChanged: s => {
        setSliderState(s.track.details);
      },
      animationEnded: s => {
        const pickedSlideIndex = s.track.details.rel;
        const result = resultRef.current as {[key: string]: number | string | boolean};
        result.period = slides[pickedSlideIndex];
      },
    },
    [WheelControls],
  );

  useEffect(() => {
    setStyledSlides(getStyledSlides(sliderState, slides));
  }, [sliderState, slides.length]);

  return (
    <div ref={sliderRef} className="keen-slider">
      {(styledSlides.length ? styledSlides : getStyledSlides(sliderState, slides)).map(slide => {
        const {value, style} = slide;
        return (
          <div key={value} className="keen-slider__slide">
            <WheelInner key={value} value={value} styleJSON={JSON.stringify(style)} />
          </div>
        );
      })}
    </div>
  );
}
