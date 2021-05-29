import styles from './Card.module.scss'

export const cardTypes = {
  image: 'image'
}

function Card (props) {
  
  function handleClick () {
    if (props.clickHandler) props.clickHandler()
  }

  const generateImageCard = () => (
    <>
      <div className="card-image">
        <figure className={`image ${ props.imageRatio }`}>
          <img src={ props.image } alt={ props.imageAlt } />
        </figure>
        <div className="card-content is-overlay is-flex is-align-items-flex-end">
          <span className="tag is-large is-white">{ props.title }</span>
        </div>
      </div>
    </>
  )

  let cardContent

  switch (props.cardType) {
    case cardTypes.image:
      cardContent = generateImageCard()
      break

    default:
      cardContent = ( <p>Please specify a type</p>) 
      break
  }

  return (
    <>
      <div 
        className={`card ${styles.card} ${props.isSelected ? styles.isSelected: ''}`} 
        onClick={ () => handleClick() }>
        { cardContent }
      </div>
    </>
  )
}

export default Card
