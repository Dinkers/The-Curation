import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'
import { requestGetPlace, resetPlaceRequest } from 'containers/Place/data/placeSlice'
import { getPlaceData } from 'containers/Place/data/placeSelectors'

import Notification from 'components/Notification/Notification'

const Place = () => {
  const dispatch = useDispatch()
  const appData = useSelector(getAppData)
  const placeData = useSelector(getPlaceData)

  useEffect(() => {
    if (placeData.placeRequest === 'initial') {
      dispatch(
        requestGetPlace(appData.selectedPlaceId)
      )
    }
  })

  const handleHomeClick = () => {
    dispatch(setCurrentScreen('Home'))
    dispatch(setSelectedPlaceId(null))
    dispatch(resetPlaceRequest())
  }

  return (
    <>
      { placeData.placeRequest === 'completed'
      ? (
        <div>
          <button className="button" onClick={ () => handleHomeClick() }>
            Home
          </button>

          <p>Name: { placeData.place.name }</p>
          <p>Type: { placeData.place.place_type }</p>
          <p>Website: { placeData.place.website }</p>
          <p>Address: {placeData.place.address }</p>
          <p>Email: { placeData.place.email_address }</p>
          <p>Copy: {placeData.place.copy }</p>
        </div>
      ): (
        <Notification 
          message="Loading place data"
        />
      )}
    </>
  )
}

export default Place
