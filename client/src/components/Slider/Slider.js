import React from 'react';
import Slider from 'react-slick';

import SliderArrow from 'components/Slider/SliderArrow';

const ImageSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow direction="right" />,
    prevArrow: <SliderArrow direction="left" />
  };

  return (
    <Slider { ...settings }>
      <figure class="image is-16by9">
        <img src="https://source.unsplash.com/Z6E62SLyqj8" />
      </figure>
      <figure class="image is-16by9">
        <img src="https://source.unsplash.com/nmpW_WwwVSc" />
      </figure>
      <figure class="image is-16by9">
        <img src="https://source.unsplash.com/EHbtjmz7hvw" />
      </figure>
    </Slider>
  );
}

export default ImageSlider
