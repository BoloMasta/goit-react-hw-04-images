import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.imageGalleryItem}>
        <img
          src={this.props.webformatURL}
          alt=""
          className={css.imageGalleryItemImage}
          onClick={() => this.props.onImageClick(this.props.largeImageURL)}
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
