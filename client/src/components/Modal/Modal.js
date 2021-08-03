import Button from 'components/Button/Button'

import styles from './Modal.module.scss'

const Modal = (props) => {
  return (
    <div className={`modal is-justify-content-start ${props.isActive ? 'is-active': ''}`}>

      <div className={`modal-background ${styles.modalBackground} ${styles.isOverride}`}></div>

      <div className={`modal-content ${styles.modalContent} ${styles.isOverride}`}>
        <section className="section">
          <div className="container">
            { props.content }
          </div>
        </section>
      </div>

      <Button
        type='close'
        clickHandler={ props.closeHandler }
      />
    </div>
  )
}

export default Modal
