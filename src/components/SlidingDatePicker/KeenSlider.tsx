import React, {useEffect, useRef, useState} from 'react';
import {useKeenSlider, KeenSliderPlugin, TrackDetails} from 'keen-slider/react';

const ResizePlugin: KeenSliderPlugin = slider => {
  const observer = new ResizeObserver(function () {
    slider.update();
  });

  slider.on('created', () => {
    observer.observe(slider.container);
  });
  slider.on('destroyed', () => {
    observer.unobserve(slider.container);
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
interface KeenSliderProps {
  loop: boolean;
  slidesPerView: number;
}
export default function KeenSlider({loop, slidesPerView}: KeenSliderProps) {
  const [slides, setSlides] = useState(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => ({value, style: {}})),
  );
  const [styledSlides, setStyledSlides] = useState<any>([]);
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(null);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        origin: 'center',
        perView: slidesPerView,
        spacing: 10,
      },
      vertical: true,
      loop,
      rubberband: true,
      mode: 'free-snap',
      detailsChanged: s => {
        setSliderState(s.track.details);
      },
    },
    [MutationPlugin, ResizePlugin],
  );

  const getStyledSlides = () => {
    // if (!sliderState) return [];

    const indexOfSlideInCenter = sliderState?.rel || 0;
    const values = [];
    for (let i = 0; i < slides.length; i++) {
      const distanceFromCenter =
        Math.abs(indexOfSlideInCenter - i) < Math.abs(slides.length - 2)
          ? Math.abs(indexOfSlideInCenter - i)
          : Math.abs(slides.length - Math.abs(indexOfSlideInCenter - i));
      let style;
      if (distanceFromCenter === 0) {
        style = {
          color: '#fff',
          fontSize: '20px',
        };
      }
      if (distanceFromCenter === 1) {
        style = {
          color: '#99999f',
          fontSize: '20px',
        };
      }
      if (distanceFromCenter === 2) {
        style = {
          color: '#99999f',
          fontSize: '17px',
        };
      }
      if (distanceFromCenter >= 3) {
        style = {
          color: '#5b5b5e',
          fontSize: '15px',
        };
      }
      values.push({value: slides[i].value, style});
    }

    return values;
  };

  useEffect(() => {
    setStyledSlides(getStyledSlides());
  }, [sliderState, slides.length]);

  console.log(styledSlides);
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {/*<div className="keen-slider__inner">*/}
        {(styledSlides.length ? styledSlides : getStyledSlides()).map(slide => {
          const {value, style} = slide;
          return (
            <div
              key={value}
              className="keen-slider__slide"
              style={{...style, opacity: !styledSlides.length ? 0 : 1}}
            >
              {value}
            </div>
          );
        })}
        <div className="keen-slider__center-highlight" />
      </div>
      {/*</div>*/}
      <div className="buttons">
        <button onClick={() => setSlides([...slides, {value: slides.length + 1, style: {}}])}>
          Add
        </button>
        <button onClick={() => setSlides(slides.slice(0, -1))}>Remove</button>
      </div>
    </>
  );
}
