const Notification = (props) => {
  const color = props.color || 'is-warning'

  return (
    <div className={`notification ${color}`}>
      { props.showClose ? (<button class="delete"></button>) : null }
      { props.message }
    </div>
  )
}

export default Notification
