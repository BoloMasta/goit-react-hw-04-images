import React, { Component } from 'react';
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
    error: null,
  };

  // fetch images after submit
  onSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const query = form.elements.query.value;

    // if (query === '') {
    //   alert('Please enter your query');
    //   return;
    // }

    this.setState({
      query: query,
      page: 1,
      isLoading: true,
    });

    const fetchImagesByQuery = async query => {
      try {
        const response = await fetchImages(query, 1);
        this.setState({ images: response });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };

    fetchImagesByQuery(query, 1);
  };

  // default first fetch of images
  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   try {
  //     const response = await fetchImages('', 1);
  //     this.setState({ images: response });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  onImageClick = event => {
    <Modal />;
  };

  handleLoadMore = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    const fetchImagesByQuery = async query => {
      try {
        const response = await fetchImages(query, page + 1);
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
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
    const { images, isLoading, error } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}

        <Section>
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        </Section>

        {images.length > 0 && !isLoading ? (
          <Button label={'Load more'} handleLoadMore={this.handleLoadMore} />
        ) : (
          <div style={{ height: 40 }}></div>
        )}
      </div>
    );
  }
}
