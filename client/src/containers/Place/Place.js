import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'
import { requestGetPlace, resetPlaceData, requestAllVitalInfos, requestAllUsps, requestAllOpeningHours, requestAllPlaceImages } from 'containers/Place/data/placeSlice'
import { getPlaceData, getVitalInfoData, getUspsData, getOpeningHoursData, getPlaceImagesUris } from 'containers/Place/data/placeSelectors'

import Notification from 'components/Notification/Notification'

import Intro from 'containers/Place/ui/Intro'
import Slider from 'components/Slider/Slider'

const Place = () => {
  const dispatch = useDispatch()

  const appData = useSelector(getAppData)
  const placeData = useSelector(getPlaceData)
  const vitalInfoData = useSelector(getVitalInfoData)
  const uspsData = useSelector(getUspsData)
  const openingHoursData = useSelector(getOpeningHoursData)
  const placeImageUris = useSelector(getPlaceImagesUris)

  const contentStartRef = useRef(null)

  useEffect(() => {
    if (placeData.placeRequest === 'initial') {
      dispatch(
        requestGetPlace(appData.selectedPlaceId)
      )
    }
  })

  useEffect(() => {
    if (
      placeData.placeRequest === 'completed' 
      && vitalInfoData.vitalInfoRequest === 'initial'
    ) {
      dispatch(requestAllVitalInfos(placeData.place['vital_infos']))
      dispatch(requestAllUsps(placeData.place['usps']))
      dispatch(requestAllOpeningHours(placeData.place['opening_hours']))
      dispatch(requestAllPlaceImages(placeData.place.images))
    }
  }, [placeData, vitalInfoData, dispatch])

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
      { placeData.placeRequest === 'completed' && placeData.placeImagesRequest === 'completed'
      ? (
        <div>
          <Intro
            name={ placeData.place.name }
            copy={ placeData.place.copy }
            clickHandler={ () => scrollToContentStart() }
            backgroundImageUrl={ placeImageUris[0] }
          />

          <section className="section" ref={contentStartRef}>
            <div className="container">
              
              <button className="button" onClick={ () => handleHomeClick() }>
                Home
              </button> 
             
              <div className="block">
                <h1 className="title">{ placeData.place.name }</h1>
                <h2 className="subtitle">Open Now</h2>
              </div>

              <div className="block">
                <Slider
                  images={ placeImageUris }
                />
              </div>

              <div className="block">
                <h2 className="subtitle">Vital info</h2>
                <div className="content">
                  {
                    vitalInfoData.vitalInfoRequest === 'completed'
                      ? (
                        <ul>
                          { vitalInfoData.vitalInfos.map((vitalInfo) => <li>{ vitalInfo['vital_info']}</li>) }
                        </ul>
                      )
                      : ( <p>Loading</p> )
                  }
                </div>
              </div>

              <div className="block">
                <h2 className="subtitle">Reasons to visit</h2>
                <div className="content">
                  {
                    uspsData.uspsRequest === 'completed'
                      ? (
                        <ul>
                          { uspsData.usps.map((usp) => <li>{usp.usp}</li>) }
                        </ul>
                      ) 
                      : ( <p>Loading</p> )
                  }
                </div>
              </div>

              <div className="block">
                <div className="content">
                  <p>Find: {placeData.place.address }</p>
                  <p>Write: { placeData.place.email_address }</p>
                  {/* <p>Website: { placeData.place.website }</p> */}
                </div>
              </div>

              <div className="block">
                <h2 className="subtitle">Opening times</h2>
                  <div className="content">
                    {
                      openingHoursData.openingHoursRequest === 'completed'
                      ? (
                        openingHoursData.sortedOpeningHours.map((openingHour) => {
                          return (
                            openingHour['closed'] 
                            ? <p>{ openingHour.weekday }: Closed</p>
                            : <p>{ openingHour.weekday } : { openingHour['from_hour'] } - { openingHour['to_hour'] }</p>
                          )
                        })
                      )
                      : ( <p>Loading</p> )
                    }
                  </div>
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
