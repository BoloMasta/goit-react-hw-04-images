import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => (
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
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
