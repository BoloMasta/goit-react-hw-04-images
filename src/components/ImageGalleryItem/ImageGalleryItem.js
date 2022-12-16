import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={css.imageGalleryItemImage}
        onClick={() => onImageClick(largeImageURL)}
      />
    </li>
  );
};
