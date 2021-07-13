import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedCity, requestGetPlaces, requestGetCities, resetRequestStatus, resetFilters, setSelectedPlaceType, resetPlacesImages, resetPlacesRequest } 
  from 'containers/Home/data/homeSlice'
import { getCitiesData } from 'containers/Home/data/homeSelectors'

import Button from 'components/Button/Button'
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
  // const [selectedCityImage, setSelectedCityImage] = useState(initialState.selectedCityImage)

  useEffect(() => {
    if (citiesData.citiesRequest === 'initial') {
      dispatch(requestGetCities())
    }
  }, [dispatch, citiesData.citiesRequest])

  useEffect(() => {
    if (citiesData.selectedCity) {
      dispatch(requestGetPlaces(citiesData.selectedCity.id))
      // setSelectedCityImage(citiesData.citiesImages[citiesData.selectedCity.name])
    }
  }, [dispatch, citiesData])
  
  const handleCitySelection = (id) =>{
    // TODO: create an action to reset to initial rather than all of these
    dispatch(resetRequestStatus('filtersRequest'))
    dispatch(resetFilters())
    dispatch(setSelectedPlaceType('Any'))
    dispatch(setSelectedCity(id))
    dispatch(resetPlacesImages())
    dispatch(resetPlacesRequest())
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
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="title is-4">Find places in </h3>
                </div>

                <div className="level-item">
                  <Button
                    clickHandler={() => setIsSelecting(true)}
                    icon='fa-angle-down'
                    text={citiesData.selectedCity.name}
                  />
                </div>
              </div>
            </div>
      
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
