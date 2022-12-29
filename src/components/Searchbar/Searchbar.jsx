import { Component } from 'react';
import { ButtonClear } from 'components/ButtonClear/ButtonClear';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  render() {
    const { onSubmit, onChange, onClickClear, query } = this.props;
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={onSubmit}>
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
            onChange={onChange}
            value={query}
          />
          {query && <ButtonClear onClickClear={onClickClear} />}
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
