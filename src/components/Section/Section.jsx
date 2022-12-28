import { Component } from 'react';
import css from './Section.module.css';
import PropTypes from 'prop-types';

export class Section extends Component {
  render() {
    return <section className={css.Section}>{this.props.children}</section>;
  }
}

Section.propTypes = {
  children: PropTypes.node,
};
