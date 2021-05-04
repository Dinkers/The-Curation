import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedCity } from '../screens/home/homeSlice';
import Card from '../components/Card';

const initialState = {
  isSelecting: false
};

function CitySelect () {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.home.selectedCity);
  const cities = useSelector((state) => state.home.cities);
  const [isSelecting, setIsSelecting] = useState(initialState.isSelecting);
  
  function handleCitySelection(index) {
    dispatch(setSelectedCity(cities[index]));
    setIsSelecting(false);
  }

  const cityChoices = cities.map((city, index) => (
      <p 
        onClick={() => handleCitySelection(index)}
        key={`${city.name}-${index}`}
      >
        { city.name }
      </p>
    )
  );

  if (isSelecting) {
    return (
      <div>
        { cityChoices }
      </div>
    )
  } else {
    return (
      <Card
        cardType="image"
        image={selectedCity.imageURL}
        imageAlt={selectedCity.imageAlt}
        clickHandler={() => setIsSelecting(true)}
      />
    );
  }
}

export default CitySelect;
