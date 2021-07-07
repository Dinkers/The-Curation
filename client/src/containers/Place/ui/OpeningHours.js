import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOpeningHoursData, getPlaceData } from 'containers/Place/data/placeSelectors'
import { requestAllOpeningHours } from 'containers/Place/data/placeSlice'

const OpeningHours = () => {
  const dispatch = useDispatch()

  const openingHoursData = useSelector(getOpeningHoursData)
  const placeData = useSelector(getPlaceData)

  useEffect(() => {
    if (openingHoursData.openingHoursRequest === 'initial') {
      dispatch(requestAllOpeningHours(placeData.place['opening_hours']))
    }
  }, [dispatch, openingHoursData.openingHoursRequest, placeData.place])
  
  return (
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
  )
}

export default OpeningHours
