import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
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

Button.propTypes = {
  label: PropTypes.string,
  handleLoadMore: PropTypes.func,
};
