import { useSelector } from 'react-redux'

import { getPlaceData } from 'containers/Place/data/placeSelectors'

const Header = () => {
  const placeData = useSelector(getPlaceData)

  return(
    <div className="block">
    <h1 className="title">{ placeData.place.name }</h1>
    { /* TODO: Replace hard-coded open now with actual open now data */ }
    <h2 className="subtitle">Open Now</h2>
  </div>
  )
}

export default Header
