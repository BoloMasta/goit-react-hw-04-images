import React, { Component } from 'react';
import { fetchImages } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
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
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await fetchImages('', 1);
      this.setState({ images: response });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onImageClick = event => {
    <Modal />;
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

        <ImageGallery images={images} onImageClick={this.onImageClick} />
        <Button label={'Load more'} />
      </div>
    );
  }
}
