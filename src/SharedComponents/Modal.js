import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({message, isOpen, onClose, children}) => {
    if (!isOpen) return null
    return ReactDOM.createPortal(
      <>
        <div style={OVERLAY_STYLES}></div>
        <div className="modal" style={MODAL_STYLES}>
            <span className="message">{message}</span>
            {onClose && <button onClick={onClose}>Close</button>}            
            {children}
        </div>
      </>
    , document.getElementById("portal")
    )
}

const MODAL_STYLES = {
  position: 'fixed', 
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1
}
const OVERLAY_STYLES = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: 1
}

export default Modal;
