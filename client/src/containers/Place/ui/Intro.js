const Intro = (props) => {
  return (
    <section 
      className="hero is-danger is-fullheight" 
      style={
        {
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), 25%, rgba(10, 10, 10, 0.9)), url(https://source.unsplash.com/GXXYkSwndP4/1600x900) no-repeat center top',
          backgroundSize: 'cover'
        }
      }
    >
      <div className="hero-body">
        <div className="">
          <p className="title">
            { props.name }
          </p>
          <p className="subtitle">
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
