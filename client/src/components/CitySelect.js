import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedCity } from '../screens/home/homeSlice'
import Card from '../components/Card'
import Modal from '../components/Modal'

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
    <>
      <div className="block">
        <Card
          cardType="image"
          imageRatio="is-2by1"
          image={ city.imageURL }
          imageAlt={ city.imageAlt }
          clickHandler={ () => handleCitySelection(index) }
          title={ city.name }
        />
      </div>
    </>
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
