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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ images: [] });

    const query = event.target.elements.query.value;

    if (query === '') {
      alert('Please enter your query');
      return;
    }

    this.setState({
      query: query,
      page: 1,
      isLoading: true,
      noResults: false,
    });

    const fetchImagesByQuery = async query => {
      try {
        const response = await fetchImages(query, 1);
        this.setState({
          images: response.hits,
          lastPage: Math.ceil(response.totalHits / 12),
        });
        if (response.totalHits === 0) {
          this.setState({ noResults: true });
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };
    fetchImagesByQuery(query, 1);
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;
    const fetchImagesByQuery = async query => {
      try {
        const response = await fetchImages(query, page + 1);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };
    fetchImagesByQuery(query, page + 1);
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
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {error && (
          <p className="alertStyle">
            Whoops, something went wrong: {error.message}
          </p>
        )}
        {noResults && (
          <p className="alertStyle">
            No images found. Please try another query.
          </p>
        )}
        <Section>
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        </Section>
        {page < lastPage && !isLoading ? (
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
