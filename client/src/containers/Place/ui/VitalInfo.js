import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getPlaceData, getVitalInfoData } from 'containers/Place/data/placeSelectors'
import { requestAllVitalInfos } from 'containers/Place/data/placeSlice'


const VitalInfo = () => {
  const dispatch = useDispatch()

  const placeData = useSelector(getPlaceData)
  const vitalInfoData = useSelector(getVitalInfoData)

  useEffect(() => {
    if (vitalInfoData.vitalInfoRequest === 'initial') {
      dispatch(requestAllVitalInfos(placeData.place['vital_infos']))
    }
  }, [dispatch, placeData.place, vitalInfoData.vitalInfoRequest])

  return (
    <div className="block">
      <h2 className="subtitle">Vital info</h2>
      <div className="content">
        {
          vitalInfoData.vitalInfoRequest === 'completed'
            ? (
              <ul>
                { vitalInfoData.vitalInfos.map((vitalInfo) => <li key={`vital-info-${vitalInfo.id}`}>{ vitalInfo['vital_info'] }</li>) }
              </ul>
            )
            : ( <p>Loading</p> )
        }
      </div>
    </div>
  )
}

export default VitalInfo
