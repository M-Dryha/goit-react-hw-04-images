import { useState } from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const ImageGalleryItem = ({ webformatURL, tags, id }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={s.ImageGalleryItemImage}
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <img src={webformatURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default ImageGalleryItem;
