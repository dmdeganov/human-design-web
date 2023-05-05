import React, {Component, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SlidingDatePicker = () => {
  const [slidesAmount, setSlidesAmount] = useState(17);
  const slides = new Array(slidesAmount).fill(null).map((_, index) => index);

  const settings = {
    arrows: false,
    dots: false,
    speed: 300,
    slidesToShow: 7,
    vertical: true,
    swipeToSlide: true,
    swipe: true,
    verticalSwiping: true,
    infinite: true,
    easing: "cssEase",
  };

  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide}>
            <span>{slide}</span>
          </div>
        ))}
      </Slider>
      <button onClick={() => setSlidesAmount(slidesAmount + 1)}>add item</button>
    </div>
  );
};
