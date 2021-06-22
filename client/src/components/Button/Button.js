const Button = (props) => {

  function handleClick () {
    if (props.clickHandler) props.clickHandler()
  }

  return (
    <button 
      className="button is-inverted"
      onClick={ () => handleClick() }
    >
      <span>
        { props.text }
      </span>

      { props.icon
        ? (
          <span className="icon is-small">
            <i className={`fas ${props.icon}`}></i>
          </span>
        )
        : ''
      }
    </button>
  )
}

export default Button
