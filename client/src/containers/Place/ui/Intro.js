import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestAllPlaceImages } from 'containers/Place/data/placeSlice'
import { getPlaceData, getPlaceImagesUris } from 'containers/Place/data/placeSelectors'

const Intro = (props) => {
  const dispatch = useDispatch()
  const placeData = useSelector(getPlaceData)
  const placeImageUris = useSelector(getPlaceImagesUris)

  const introStyles = {
    background: {
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), 25%, rgba(10, 10, 10, 0.9)), url(${ placeImageUris[0] })`,
      color: 'white',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center top'
    },

    arrow: {
      fontSize: '1.5rem'
    }
  }

  useEffect(() => {
    if (placeData.placeImagesRequest === 'initial') {
      dispatch(requestAllPlaceImages(placeData.place.images))
    }
  }, [placeData, dispatch])

  return (
    <section 
      className='hero is-fullheight'
      style={ introStyles.background }
    >
      <div className="hero-body">
        <div className="">
          <p className="title has-text-white">
            { placeData.place.name }
          </p>
          <p className="subtitle has-text-white">
            { placeData.place.copy }
          </p>
          <div className="block">
            <i 
              className="fa fa-arrow-down"
              style={ introStyles.arrow }
              aria-hidden="true"
              onClick={ () => props.clickHandler() }
            ></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
