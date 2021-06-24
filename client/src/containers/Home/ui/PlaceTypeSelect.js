import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getPlacesData, getSelectedPlaceType, getPlaceTypeImages } from 'containers/Home/data/homeSelectors'

import { setSelectedPlaceType } from 'containers/Home/data/homeSlice'

import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import Modal from 'components/Modal/Modal'
import Notification from 'components/Notification/Notification'

const initialState = {
  isSelecting: false,
  placeTypes: ['Any']
}

const PlaceTypeSelect = () => {
  const dispatch = useDispatch()

  const [isSelecting, setIsSelecting] = useState(initialState.isSelecting)
  const [placeTypes, setPlaceTypes] = useState(initialState.placeTypes)

  const placesData = useSelector(getPlacesData)
  const selectedPlaceType = useSelector(getSelectedPlaceType)
  const placeTypeImages = useSelector(getPlaceTypeImages)

  useEffect(() => {
    if (placesData.placesRequest === 'completed') {
      const types = placesData.places.map((place) => place.place_type)
      setPlaceTypes([...initialState.placeTypes, ...types])
    }
  }, [placesData])

  const handlePlaceTypeSelection = (type) =>{
    dispatch(setSelectedPlaceType(type))
    setIsSelecting(false)
  }

  const generatePlaceTypeModalContent = () => placeTypes.map((type) => (
    <div className="block" key={`type-select-block-${type}`}>
      <Card
        cardType="image"
        clickHandler={ () => handlePlaceTypeSelection(type) }
        image={ placeTypeImages[type] }
        imageRatio="is-2by1"
        title={ type }
      />
    </div>
  ))

  return (
    <>
      { placesData.placesRequest === 'completed'
        ? (
          <div className="block">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="title is-4">Type of place</h3>
                </div>

                <div className="level-item">
                  <Button
                    clickHandler={() => setIsSelecting(true)}
                    icon='fa-angle-down'
                    text={ selectedPlaceType }
                  />
                </div>
              </div>
            </div>
    
            <Modal 
              isActive={ isSelecting }
              content={ generatePlaceTypeModalContent() }
              closeHandler={ () => setIsSelecting(false) }
            />
          </div>
        ) : (
          <Notification 
            message="Loading types of places..."
          />
        )
      }
    </>
  )
}

export default PlaceTypeSelect
