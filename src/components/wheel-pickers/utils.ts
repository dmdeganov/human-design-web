import React from "react";
import {TrackDetails} from "keen-slider/react";

export const generateIntegersSequence = (num: number, offset = 1) =>
  new Array(num).fill(null).map((_, index) => offset + index);

export const getMemoizedIntegersArr = (() => {
  const cache: {[key: number]: number[]} = {};
  return (num: number, offset = 1): number[] => {
    if (num in cache) return cache[num];
    cache[num] = generateIntegersSequence(num, offset);
    return cache[num];
  };
})();

export const getNumberOfDaysInMonth = (monthIndex: number, year: number) => new Date(year, monthIndex + 1, 0).getDate();

export const getStyledSlides = (sliderState: TrackDetails | null, slides: Array<number> | Array<string>) => {
  const indexOfSlideInCenter = sliderState?.rel || 0;

  const getSlidesOnDefinedDistance = (distance: number) => ({
    prev:
      slides[indexOfSlideInCenter - distance] || slides[indexOfSlideInCenter - distance] === 0
        ? indexOfSlideInCenter - distance
        : slides.length - (distance - indexOfSlideInCenter),
    next: slides[indexOfSlideInCenter + distance]
      ? indexOfSlideInCenter + distance
      : distance - (slides.length - indexOfSlideInCenter),
  });

  const slidesInView = {
    center: indexOfSlideInCenter,
    oneSlideFar: getSlidesOnDefinedDistance(1),
    twoSlidesFar: getSlidesOnDefinedDistance(2),
    threeSlidesFar: getSlidesOnDefinedDistance(3),
  };

  const values = [];

  for (let i = 0; i < slides.length; i++) {
    const indicesDiff = Math.abs(i - indexOfSlideInCenter);
    const distanceFromCenter = Math.abs(
      indicesDiff < Math.abs(slides.length - 3) ? indicesDiff : indicesDiff - slides.length,
    );
    let style: React.CSSProperties = {
      transform: `scale(0.75)  translateX(-16.67%)`,
    };
    if (distanceFromCenter === 0) {
      style = {
        transform: `scale(1)`,
      };
    }
    if (distanceFromCenter === 1) {
      style = {
        transform: `scale(0.95) translateX(-2.6%)`,
      };
    }
    if (distanceFromCenter === 2) {
      const translateY = slidesInView.twoSlidesFar.next === i ? `translateY(-3px)` : 'translateY(3px)';
      style = {
        transform: `scale(0.85) translateX(-8.82%) ${translateY}`,
      };
    }
    if (distanceFromCenter === 3) {
      const translateY = slidesInView.threeSlidesFar.prev === i ? `translateY(8px)` : `translateY(-8px)`;
      style = {
        transform: `scale(0.75) translateX(-16.67%) ${translateY}`,
      };
    }
    values.push({
      value: slides[i],
      style,
    });
  }
  return values;
};
