import { Component } from 'react';
import { fetchImages } from 'services/api';
import '../index.css';

import { Searchbar } from './Searchbar/Searchbar';
import { Section } from './Section/Section';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    lastPage: 1,
    error: null,
    showModal: false,
    largeImageURL: '',
    noResults: false,
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  onClickClear = () => {
    this.setState({ query: '' });
  };

  fetchImagesByQuery = async searchQuery => {
    this.setState({ isLoading: true, error: null, noResults: false });
    try {
      const response = await fetchImages(searchQuery, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        lastPage: Math.ceil(response.totalHits / 12),
      }));
      if (response.totalHits === 0) {
        this.setState({ noResults: true });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query === '') {
      alert('Please enter your query');
      return;
    }
    this.setState({ images: [], page: 1 }, () => {
      this.fetchImagesByQuery(this.state.query);
    });
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchImagesByQuery(this.state.query);
    });
  };

  onImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  onClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const {
      page,
      images,
      isLoading,
      lastPage,
      error,
      showModal,
      largeImageURL,
      noResults,
    } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onClickClear={this.onClickClear}
          query={this.state.query}
        />
        <Section>
          {isLoading && <Loader />}
          {noResults && (
            <p className="alertStyle">
              No images found. Please try another query.
            </p>
          )}
          <ImageGallery images={images} onImageClick={this.onImageClick} />
          {error && (
            <p className="alertStyle">
              Whoops, something went wrong: {error.message}
            </p>
          )}
        </Section>
        {page < lastPage && !isLoading && !error ? (
          <ButtonLoadMore
            label={'Load more'}
            handleLoadMore={this.handleLoadMore}
          />
        ) : (
          <div style={{ height: 40 }}></div>
        )}
        {showModal && (
          <Modal onClose={this.onClose} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}
