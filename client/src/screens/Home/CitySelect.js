import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedCity } from 'screens/Home/homeSlice'
import Card from 'components/Card/Card'
import Modal from 'components/Modal/Modal'

const initialState = {
  isSelecting: false
}

function CitySelect () {
  const dispatch = useDispatch()
  const selectedCity = useSelector((state) => state.home.selectedCity)
  const cities = useSelector((state) => state.home.cities)
  const [isSelecting, setIsSelecting] = useState(initialState.isSelecting)
  
  function handleCitySelection(index) {
    dispatch(setSelectedCity(cities[index]))
    setIsSelecting(false)
  }

  const cityChoiceModalContent = cities.map((city, index) => (
    <div className="block" key={`city-select-block-${index}`}>
      <Card
        cardType="image"
        clickHandler={ () => handleCitySelection(index) }
        image={ city.imageURL }
        imageAlt={ city.imageAlt }
        imageRatio="is-2by1"
        title={ city.name }
      />
    </div>
  ))

  return (
    <>
      <Card
        cardType="image"
        imageRatio="is-16by9"
        image={ selectedCity.imageURL }
        imageAlt={ selectedCity.imageAlt} 
        clickHandler={ () => setIsSelecting(true) }
        title={ selectedCity.name }
      />

      <Modal 
        isActive={ isSelecting }
        content={ cityChoiceModalContent }
        closeHandler={ () => setIsSelecting(false) }
      />
    </>
  )
}

export default CitySelect
