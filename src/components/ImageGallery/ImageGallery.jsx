import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ pictures }) => {
  return (
    <section>
      <ul className={s.ImageGallery}>
        {pictures.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
          />
        ))}
      </ul>
    </section>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
