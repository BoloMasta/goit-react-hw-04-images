import { Component } from 'react';
import { fetchImages } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { Section } from './Section/Section';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
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
  };

  // fetch images after submit
  handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const query = form.elements.query.value;

    if (query === '') {
      alert('Please enter your query');
      return;
    }

    this.setState({
      query: query,
      page: 1,
      isLoading: true,
    });

    const fetchImagesByQuery = async query => {
      try {
        const response = await fetchImages(query, 1);
        this.setState(
          {
            images: response.hits,
            lastPage: Math.ceil(response.totalHits / 12),
          },
          () => {
            console.log(this.state);
          }
        );
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };

    fetchImagesByQuery(query, 1);
  };

  // modal open
  onImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  // modal close
  onClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  // load more images
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

  render() {
    const {
      page,
      images,
      isLoading,
      lastPage,
      error,
      showModal,
      largeImageURL,
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
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <Section>
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        </Section>

        {page < lastPage && !isLoading ? (
          <Button label={'Load more'} handleLoadMore={this.handleLoadMore} />
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
