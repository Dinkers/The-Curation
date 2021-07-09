import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'
import { requestGetPlace, resetPlaceData } from 'containers/Place/data/placeSlice'
import { getPlaceData } from 'containers/Place/data/placeSelectors'

import Notification from 'components/Notification/Notification'

import ContactInfo from 'containers/Place/ui/ContactInfo'
import Header from 'containers/Place/ui/Header'
import ImageSlider from 'containers/Place/ui/ImageSlider'
import Intro from 'containers/Place/ui/Intro'
import OpeningHours from 'containers/Place/ui/OpeningHours'
import USPs from 'containers/Place/ui/USPs'
import VitalInfo from 'containers/Place/ui/VitalInfo'

const Place = () => {
  const dispatch = useDispatch()

  const appData = useSelector(getAppData)
  const placeData = useSelector(getPlaceData)

  const contentStartRef = useRef(null)

  useEffect(() => {
    if (placeData.placeRequest === 'initial') {
      dispatch(requestGetPlace(appData.selectedPlaceId))
    }
  })

  const handleHomeClick = () => {
    dispatch(setCurrentScreen('Home'))
    dispatch(setSelectedPlaceId(null))
    dispatch(resetPlaceData())
  }

  const scrollToContentStart = () => {
    contentStartRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      { placeData.placeRequest === 'completed'
        ? (
          <Intro
            clickHandler={ () => scrollToContentStart() }
          />
        ) : ( <Notification message="Loading place data" /> )
      }
      { placeData.placeRequest === 'completed' && placeData.placeImagesRequest === 'completed'
        ? (
          <div>
            <section className="section" ref={ contentStartRef }>
              <div className="container">
                <button 
                  aria-label="close"
                  className={`modal-close is-large`}
                  onClick={ () => handleHomeClick() }
                  style={{
                    zIndex: 1000,
                    background: '#808080a3'}}
                >
                  Close
                </button>

                <Header />
                <ImageSlider />
                <VitalInfo />
                <USPs />
                <ContactInfo />
                <OpeningHours />
              </div>
            </section>
          </div>
        ): ( <Notification message="Loading place data" /> )
      }
    </>
  )
}

export default Place
