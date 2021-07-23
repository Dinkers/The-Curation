import React from 'react';
import Slider from 'react-slick';

import SliderArrow from 'components/Slider/SliderArrow';

const ImageSlider = (props) => {
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
      { props.images.map((image, index) => {
        return (
          <figure className="image is-16by9" key={`image-slide-${index}`}>
            <img src={image} />
          </figure>
        )
      })}
    </Slider>
  );
}

export default ImageSlider
