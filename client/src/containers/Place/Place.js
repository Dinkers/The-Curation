import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'
import { requestGetPlace, resetPlaceRequest } from 'containers/Place/data/placeSlice'
import { getPlaceData } from 'containers/Place/data/placeSelectors'

import Notification from 'components/Notification/Notification'

import Intro from 'containers/Place/ui/Intro'
import Slider from 'components/Slider/Slider'

const Place = () => {
  const dispatch = useDispatch()
  const appData = useSelector(getAppData)
  const placeData = useSelector(getPlaceData)

  const contentStartRef = useRef(null)

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

  const scrollToContentStart = () => {
    contentStartRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      { placeData.placeRequest === 'completed'
      ? (
        <div>
          <Intro
            name={ placeData.place.name }
            copy={ placeData.place.copy }
            clickHandler={ () => scrollToContentStart() }
          />

          <section className="section" ref={contentStartRef}>
            <div className="container">
              {/* 
                <button className="button" onClick={ () => handleHomeClick() }>
                  Home
                </button> 
              */}

              <div className="block">
                <h1 className="title">{ placeData.place.name }</h1>
                <h2 className="subtitle">Open Now</h2>
              </div>

              <div className="block">
                <Slider />
              </div>

              <div className="block">
                <p>Name: { placeData.place.name }</p>
                <p>Type: { placeData.place.place_type }</p>
                <p>Website: { placeData.place.website }</p>
                <p>Address: {placeData.place.address }</p>
                <p>Email: { placeData.place.email_address }</p>
                <p>Copy: { placeData.place.copy }</p>
              </div>
            </div>
          </section>
        </div>
      ): (
        <Notification message="Loading place data" /> 
      )}
    </>
  )
}

export default Place
