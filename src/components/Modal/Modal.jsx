import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const backDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={backDropClick} onClose={onClose}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
