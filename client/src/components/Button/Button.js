const Button = (props) => {

  function handleClick () {
    if (props.clickHandler) props.clickHandler()
  }

  const renderCloseButton = () => (
    <button 
      aria-label="close"
      className={`modal-close is-large`}
      onClick={ () => handleClick() }
      style={{
        zIndex: 1000,
        background: '#808080a3'}}
      >
      Close
    </button>
  )

  const renderDefaultButton = () => (
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

  const renderButton = () => {
    switch (props.type) {
      case 'close':
        return renderCloseButton()
      default:
        return renderDefaultButton()
    }
  }

  return (
    renderButton()
  )
}

export default Button
