import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ButtonClear } from 'components/ButtonClear/ButtonClear';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  onClick = () => {
    this.setState({ query: '' });
  };

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
            onChange={this.handleChange}
            value={this.state.query}
          />
          {this.state.query ? <ButtonClear onClick={this.onClick} /> : null}
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
