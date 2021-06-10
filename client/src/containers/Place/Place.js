import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentScreen, setSelectedPlaceId } from 'containers/App/data/appSlice'
import { getAppData } from 'containers/App/data/appSelectors'

const Place = () => {
  const dispatch = useDispatch()
  const appData = useSelector(getAppData)

  useEffect(() => {})

  const handleHomeClick = () => {
    dispatch(setCurrentScreen('Home'))
    dispatch(setSelectedPlaceId(null))
  }

  return (
    <>
      <button className="button" onClick={ () => handleHomeClick() }>
        Home
      </button>
      <h1>Place screen!!!</h1>
      <p>Selected place Id: {appData.selectedPlaceId}</p>
    </>
  )
}

export default Place
