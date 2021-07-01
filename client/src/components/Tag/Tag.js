const Tag = (props) => {
  return (
    <span 
      onClick={() => props.clickHandler() }
      className={`tag is-medium ${ props.isSelected ? 'is-primary' : '' }`}>
      { props.text }
    </span>
  )
}

export default Tag
