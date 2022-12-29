import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img className={css.modal__image} src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
