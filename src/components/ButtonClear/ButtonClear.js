import { Component } from 'react';
import css from './ButtonClear.module.css';
import PropTypes from 'prop-types';

export class ButtonClear extends Component {
  render() {
    return (
      <button
        type="button"
        className={css.ButtonClear}
        onClick={this.props.onClick}
      ></button>
    );
  }
}

ButtonClear.propTypes = {
  onClick: PropTypes.func,
};
