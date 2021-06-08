import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedCity, requestGetPlaces, requestGetCities } from 'screens/Home/data/homeSlice'

import Card from 'components/Card/Card'
import Modal from 'components/Modal/Modal'
import Notification from 'components/Notification/Notification'

const initialState = {
  isSelecting: false,
  selectedCityImage: null
}

const cityImageMap = {
  'Seattle': 'https://source.unsplash.com/QEob0Fp4rdg',
  'Tokyo': 'https://source.unsplash.com/IocJwyqRv3M',
  'New York' : 'https://source.unsplash.com/wpU4veNGnHg'
}

function CitySelect () {
  const dispatch = useDispatch()

  const cities = useSelector((state) => state.home.cities)
  const citiesRequest = useSelector((state) => state.home.citiesRequest)
  const selectedCity = useSelector((state) => state.home.selectedCity)
  
  const [isSelecting, setIsSelecting] = useState(initialState.isSelecting)
  const [selectedCityImage, setSelectedCityImage] = useState(initialState.selectedCityImage)

  useEffect(() => {
    if (citiesRequest === 'initial') {
      dispatch(requestGetCities())
    }
  })

  useEffect(() => {
    if (selectedCity) {
      dispatch(requestGetPlaces(selectedCity.id))
      setSelectedCityImage(cityImageMap[selectedCity.name])
    }
  }, [dispatch, selectedCity])
  
  function handleCitySelection(id) {
    dispatch(setSelectedCity(id))
    setIsSelecting(false)
  }

  const generateCityChoiceModalContent = () => cities.map((city) => (
    <div className="block" key={`city-select-block-${city.id}`}>
      <Card
        cardType="image"
        clickHandler={ () => handleCitySelection(city.id) }
        image={ cityImageMap[city.name] }
        imageRatio="is-2by1"
        title={ city.name }
      />
    </div>
  ))

  return (
    <>
      { citiesRequest === 'completed'
        ? (
          <div className="block">
            <h3 className="title is-4">Find places in</h3>
            <Card
              cardType="image"
              imageRatio="is-16by9"
              image={ selectedCityImage }
              clickHandler={ () => setIsSelecting(true) }
              title={ selectedCity.name }
            />
      
            <Modal 
              isActive={ isSelecting }
              content={ generateCityChoiceModalContent() }
              closeHandler={ () => setIsSelecting(false) }
            />
          </div>
        )
        : (
          <Notification 
            message="Loading cities..."
          />
        )
      }
    </> 
  )
}

export default CitySelect
