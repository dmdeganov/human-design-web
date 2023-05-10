import React, {useEffect, useRef, useState} from 'react';
import {useKeenSlider, KeenSliderPlugin, TrackDetails} from 'keen-slider/react';
import {PickedDate, PickedTime, WheelType} from '@/components/WheelPicker/types';
import {useDebounce} from '@/hooks/useDebounce';
import {useThrottle} from '@/hooks/useThrottle';

const WheelControls: KeenSliderPlugin = slider => {
  let touchTimeout: ReturnType<typeof setTimeout>;
  let position: {
    x: number;
    y: number;
  };
  let wheelActive: boolean;

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      }),
    );
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, 'ksDragStart');
  }

  function wheel(e: WheelEvent) {
    dispatch(e, 'ksDrag');
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, 'ksDragEnd');
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    });
  });
};

const MutationPlugin: KeenSliderPlugin = slider => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      slider.update();
    });
  });
  const config = {childList: true};

  slider.on('created', () => {
    observer.observe(slider.container, config);
  });
  slider.on('destroyed', () => {
    observer.disconnect();
  });
};
interface WheelProps {
  type: WheelType;
  slides: Array<number> | Array<string>;
  minIndex?: number;
  maxIndex?: number;
  onScrollEnd?: (num: number) => void;
  resultRef: React.MutableRefObject<PickedDate | PickedTime>;
  wheelWidth: number;
  adjustLineHeight: boolean;
  animatedTextTranslation: boolean;
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
  adjustLineHeight,
  animatedTextTranslation,
}: WheelProps) {
  const [styledSlides, setStyledSlides] = useState<any>([]);
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        origin: 'center',
        perView: 7,
        spacing: 10,
      },
      initial,
      dragSpeed: 0.5,
      vertical: true,
      loop: true,
      rubberband: true,
      mode: 'free-snap',
      detailsChanged: s => {
        setSliderState(s.track.details);
      },
      animationEnded: s => {
        const pickedSlideIndex = s.track.details.rel;
        const result = resultRef.current;
        result[type] = slides[pickedSlideIndex];

        if (minIndex && pickedSlideIndex < minIndex) s.moveToIdx(minIndex);
        if (maxIndex && pickedSlideIndex > maxIndex) s.moveToIdx(maxIndex);
        if (onScrollEnd) onScrollEnd(pickedSlideIndex);
      },
    },
    [MutationPlugin, WheelControls],
  );
  const getStyledSlides = () => {
    // if (!sliderState) return [];

    const indexOfSlideInCenter = sliderState?.rel || 0;
    const getSlidesOnDefinedDistance = (distance: number) => ({
      prev: slides[indexOfSlideInCenter - distance]
        ? indexOfSlideInCenter - distance
        : slides.length - (distance - indexOfSlideInCenter),
      next: slides[indexOfSlideInCenter + distance]
        ? indexOfSlideInCenter + distance
        : distance - (slides.length - indexOfSlideInCenter),
    });
    const values = [];

    const slidesInView = {
      center: indexOfSlideInCenter,
      oneSlideFar: getSlidesOnDefinedDistance(1),
      twoSlidesFar: getSlidesOnDefinedDistance(2),
      threeSlidesFar: getSlidesOnDefinedDistance(3),
    };

    for (let i = 0; i < slides.length; i++) {
      const indicesDiff = Math.abs(i - indexOfSlideInCenter);
      const distanceFromCenter = Math.abs(
        indicesDiff < Math.abs(slides.length - 3) ? indicesDiff : indicesDiff - slides.length,
      );

      let style;
      if (distanceFromCenter === 0) {
        style = {
          color: '#fff',
        };
      }
      if (distanceFromCenter === 1) {
        style = {
          color: '#99999f',
        };
      }
      if (distanceFromCenter === 2) {
        const translateY = slidesInView.twoSlidesFar.next === i ? `translateY(-3px)` : 'translateY(3px)';
        style = {
          color: '#99999f',
          transform: `scale(0.85) translateX(-7.5%) ${translateY}`,
        };
      }
      if (distanceFromCenter >= 3) {
        const translateY = slidesInView.threeSlidesFar.prev === i ? `translateY(6px)` : `translateY(-6px)`;
        style = {
          color: '#5b5b5e',
          transform: `scale(0.75)  translateX(-12.5%) ${translateY}`,
        };
      }
      values.push({
        value: slides[i],
        style,
      });
    }

    return values;
  };

  useEffect(() => {
    setStyledSlides(getStyledSlides());
  }, [sliderState, slides.length]);

  return (
    <>
      <div ref={sliderRef} className="keen-slider" style={{width: `${wheelWidth}px`}}>
        {/*<div className="keen-slider__inner">*/}
        {(styledSlides.length ? styledSlides : getStyledSlides()).map(slide => {
          const {value, style} = slide;
          return (
            <div key={value} className="keen-slider__slide">
              <div className="keen-slider__inner">
                <span style={style}>{value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
