import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedCity, requestGetPlaces, requestGetCities, resetRequestStatus, resetFilters } 
  from 'containers/Home/data/homeSlice'
import { getCitiesData } from 'containers/Home/data/homeSelectors'

import Card from 'components/Card/Card'
import Modal from 'components/Modal/Modal'
import Notification from 'components/Notification/Notification'

const initialState = {
  isSelecting: false,
  selectedCityImage: null
}

function CitySelect () {
  const dispatch = useDispatch()

  const citiesData = useSelector(getCitiesData)

  const [isSelecting, setIsSelecting] = useState(initialState.isSelecting)
  const [selectedCityImage, setSelectedCityImage] = useState(initialState.selectedCityImage)

  useEffect(() => {
    if (citiesData.citiesRequest === 'initial') {
      dispatch(requestGetCities())
    }

    if (citiesData.selectedCity) {
      dispatch(requestGetPlaces(citiesData.selectedCity.id))
      dispatch(resetRequestStatus('filtersRequest'))
      dispatch(resetFilters())
      setSelectedCityImage(citiesData.citiesImages[citiesData.selectedCity.name])
    }
  }, [dispatch, citiesData.selectedCity, citiesData.citiesImages, citiesData.citiesRequest])
  
  const handleCitySelection = (id) =>{
    dispatch(setSelectedCity(id))
    setIsSelecting(false)
  }

  const generateCityChoiceModalContent = () => citiesData.cities.map((city) => (
    <div className="block" key={`city-select-block-${city.id}`}>
      <Card
        cardType="image"
        clickHandler={ () => handleCitySelection(city.id) }
        image={ citiesData.citiesImages[city.name] }
        imageRatio="is-2by1"
        title={ city.name }
      />
    </div>
  ))

  return (
    <>
      { citiesData.citiesRequest === 'completed'
        ? (
          <div className="block">
            <h3 className="title is-4">Find places in</h3>
            <Card
              cardType="image"
              imageRatio="is-16by9"
              image={ selectedCityImage }
              clickHandler={ () => setIsSelecting(true) }
              title={ citiesData.selectedCity.name }
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
