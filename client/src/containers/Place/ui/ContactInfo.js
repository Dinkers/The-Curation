import { useSelector } from 'react-redux'

import { getPlaceData } from 'containers/Place/data/placeSelectors'

const ContactInfo = () => {
  const placeData = useSelector(getPlaceData)
  
  return (
  <div className="block">
    <div className="content">
      <p>
        <span className="subtitle is-6">Find: </span>
        { placeData.place.address }
      </p>
      <p>
        <span className="subtitle is-6">Write: </span>
        { placeData.place.email_address }
      </p>
      <p>
        <span className="subtitle is-6">Website: </span>
        { placeData.place.website }
      </p>
    </div>
  </div>
  )
}

export default ContactInfo
