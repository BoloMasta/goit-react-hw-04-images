import { Component } from 'react';
import css from './ButtonLoadMore.module.css';
import PropTypes from 'prop-types';

export class ButtonLoadMore extends Component {
  render() {
    const { label, handleLoadMore } = this.props;
    return (
      <button
        type="button"
        className={css.ButtonLoadMore}
        onClick={handleLoadMore}
      >
        {label}
      </button>
    );
  }
}

ButtonLoadMore.propTypes = {
  label: PropTypes.string,
  handleLoadMore: PropTypes.func,
};
