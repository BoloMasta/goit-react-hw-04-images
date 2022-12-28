import { Component } from 'react';
import { ButtonClear } from 'components/ButtonClear/ButtonClear';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.searchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.props.onChange}
            value={this.props.query}
          />
          {this.props.query && (
            <ButtonClear onClickClear={this.props.onClickClear} />
          )}
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClickClear: PropTypes.func,
  query: PropTypes.string,
};
