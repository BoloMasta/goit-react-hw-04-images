import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => (
  <header class={css.searchBar}>
    <form class={css.searchForm}>
      <button type="submit" class={css.searchFormButton}>
        <span class={css.searchFormButtonLabel}>Search</span>
      </button>

      <input
        class={css.searchFormInput}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
