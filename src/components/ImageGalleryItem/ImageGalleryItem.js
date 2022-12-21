import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, onImageClick } = this.props;
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
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};
