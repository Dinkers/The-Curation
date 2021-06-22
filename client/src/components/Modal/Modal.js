import styles from './Modal.module.scss'

const Modal = (props) => {
  return (
    <div className={`modal is-justify-content-start ${props.isActive ? 'is-active': ''}`}>

      <div className={`modal-background ${styles.modalBackground} ${styles.isOverride}`}></div>

      <div className="modal-content">
        <section className="section">
          <div className="container">
            { props.content }
          </div>
        </section>
      </div>

      <button 
        aria-label="close"
        className={`modal-close is-large ${styles.modalClose} ${styles.isOverride}`} 
        onClick={ () => props.closeHandler() }
      ></button>
    </div>
  )
}

export default Modal
