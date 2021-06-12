import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getPlacesData, getSelectedFilters } from 'containers/Home/data/homeSelectors'

import Notification from 'components/Notification/Notification'
import Card from 'components/Card/Card'

function PlaceSelect () {
  const dispatch = useDispatch()

  const placesData = useSelector(getPlacesData)
  const selectedFilters = useSelector(getSelectedFilters)

  const testImage = 'https://source.unsplash.com/GXXYkSwndP4/1600x900'

  const handlePlaceSelect = (placeId) => {
    dispatch(setCurrentScreen('Place'))
    dispatch(setSelectedPlaceId(placeId))
  }

  const generatePlacesChoiceContent = (places) => {
    if (!places.length) {
      return (
        <Notification 
          message="No places match your criteria"
          color="is-info"
        />
      )
    }

    if (selectedFilters.length) {      
      const filteredPlaces = places.filter(place => {
        const properties = place.usps.concat(place.vital_infos)

        return selectedFilters.every((filter) => properties.includes(filter))
      })
      places = filteredPlaces
    }

    return places.map((place) => (
      <Card
        key={`place-select-card-${ place.name }`}
        cardType="image"
        clickHandler={ () => { handlePlaceSelect(place.id) } }
        image={ testImage }
        imageRatio="is-2by1"
        title={ place.name }
      />
    ))
  }

  return (
    <div className="block">
      <h3 className="title is-4">Places</h3>
      { placesData.placesRequest === 'completed'
        ? (
            generatePlacesChoiceContent(placesData.places) 
        )
        : (
            <Notification 
              message="Select a city to see places!" 
              color="is-info"
            /> 
          )
      }
    </div>
  )
}

export default PlaceSelect
