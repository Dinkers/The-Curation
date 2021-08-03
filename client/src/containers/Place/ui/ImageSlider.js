import { useSelector } from 'react-redux'

import { getPlaceImagesUris } from 'containers/Place/data/placeSelectors'

import Slider from 'components/Slider/Slider'

const ImageSlider = () => {
  const placeImageUris = useSelector(getPlaceImagesUris)
  
  return (
    <div className="block">
      <Slider
        images={ placeImageUris }
      />
  </div>
  )
}

export default ImageSlider
