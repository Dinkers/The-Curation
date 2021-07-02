import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'
import { requestGetPlace, resetPlaceData, getAllVitalInfos, getAllUsps } from 'containers/Place/data/placeSlice'
import { getPlaceData, getVitalInfoData, getUspsData } from 'containers/Place/data/placeSelectors'

import Notification from 'components/Notification/Notification'

import Intro from 'containers/Place/ui/Intro'
import Slider from 'components/Slider/Slider'

const Place = () => {
  const dispatch = useDispatch()

  const appData = useSelector(getAppData)
  const placeData = useSelector(getPlaceData)
  const vitalInfoData = useSelector(getVitalInfoData)
  const uspsData = useSelector(getUspsData)

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
      dispatch(getAllVitalInfos(placeData.place['vital_infos']))
      dispatch(getAllUsps(placeData.place['usps']))
      // TODO: dispatch image request here
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
              
              {/* <button className="button" onClick={ () => handleHomeClick() }>
                Home
              </button>  */}
             
              <div className="block">
                <h1 className="title">{ placeData.place.name }</h1>
                <h2 className="subtitle">Open Now</h2>
              </div>

              <div className="block">
                <Slider />
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
                  <p>Website: { placeData.place.website }</p>
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
