import styles from 'containers/Place/ui/Intro.module.scss'

const Intro = (props) => {
  return (
    <section 
      className={`hero ${styles.heroWhite} is-fullheight ${styles['intro__background-image']}`}
      style={
        {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), 25%, rgba(10, 10, 10, 0.9)), url(${props.backgroundImageUrl})`,
        }
      }
    >
      <div className="hero-body">
        <div className="">
          <p className="title has-text-white">
            { props.name }
          </p>
          <p className="subtitle has-text-white">
            { props.copy }
          </p>
          <div className="block">
            <i 
              className="fa fa-arrow-down"
              style={{'fontSize': '1.5rem'}}
              aria-hidden="true"
              onClick={() => props.clickHandler()}
            >
            </i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
