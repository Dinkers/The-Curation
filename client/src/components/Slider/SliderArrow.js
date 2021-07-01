import styles from 'components/Slider/Slider.module.scss'

const SliderArrow = (props) => {
  return (
    <span 
      className={
        ` ${ styles['slider-arrow'] }
          ${ props.direction === 'left' 
            ? styles['slider-arrow--left'] 
            : styles['slider-arrow--right']}
        `
      }
      onClick={ props.onClick }
    >
      { 
        props.direction === 'left'
          ? <i class="fa fa-arrow-left"></i>
          : <i class="fa fa-arrow-right"></i>
      }
    </span>
  )
}

export default SliderArrow
