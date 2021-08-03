import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestAllUsps } from 'containers/Place/data/placeSlice'
import { getPlaceData, getUspsData } from 'containers/Place/data/placeSelectors'

const USPs = () => {
  const dispatch = useDispatch()

  const placeData = useSelector(getPlaceData)
  const uspsData = useSelector(getUspsData)

  useEffect(() => {
    if (uspsData.uspsRequest === 'initial') {
      dispatch(requestAllUsps(placeData.place['usps']))
    }
  }, [dispatch, placeData.place, uspsData.uspsRequest ])

  return (
    <div className="block">
      <h2 className="subtitle">Reasons to visit</h2>
      <div className="content">
        {
          uspsData.uspsRequest === 'completed'
            ? (
              <ul>
                { uspsData.usps.map((usp) => <li key={`usp-${usp.id}`}>{usp.usp}</li>) }
              </ul>
            ) 
            : ( <p>Loading</p> )
        }
      </div>
    </div>
  )
}

export default USPs
