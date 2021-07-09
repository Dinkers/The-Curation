import { useSelector } from 'react-redux'

import { getPlaceData } from 'containers/Place/data/placeSelectors'

const ContactInfo = () => {
  const placeData = useSelector(getPlaceData)
  
  return (
  <div className="block">
    <div className="content">
      <p>
        <span className="subtitle is-6">Find: </span>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeData.place.address)}`} 
          target="_blank" 
          rel="noreferrer"
        >
          { placeData.place.address }
        </a>
      </p>
      <p>
        <span className="subtitle is-6">Write: </span>
        <a href={`mailto:${placeData.place.email_address}`}>{ placeData.place.email_address }</a>
      </p>
      <p>
        <span className="subtitle is-6">Website: </span>
        <a 
          href={`//${ placeData.place.website }`} 
          target="_blank" 
          rel="noreferrer"
        >
          { placeData.place.website }
        </a>
      </p>
    </div>
  </div>
  )
}

export default ContactInfo
