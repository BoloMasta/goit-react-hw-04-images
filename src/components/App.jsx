import { useState, useEffect, useCallback } from 'react';
import fetchImages from 'services/api';
import '../index.css';

import Searchbar from './Searchbar/Searchbar';
import Section from './Section/Section';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [noResults, setNoResults] = useState(false);

  const handleChange = event => {
    // setQuery(event.target.value);
    setInputValue(event.target.value);
  };

  const onClickClear = () => {
    setQuery('');
    setInputValue('');
  };

  const fetchImagesByQuery = useCallback(
    async searchQuery => {
      setIsLoading(true);
      setError(null);
      setNoResults(false);

      try {
        const response = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 && setNoResults(true);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  // const fetchImagesByQuery = async searchQuery => {
  //   setIsLoading(true);
  //   setError(null);
  //   setNoResults(false);

  //   try {
  //     const response = await fetchImages(searchQuery, page);
  //     setImages(prevState => [...prevState, ...response.hits]);
  //     setLastPage(Math.ceil(response.totalHits / 12));
  //     response.totalHits === 0 && setNoResults(true);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = event => {
    event.preventDefault();

    setQuery(inputValue);

    if (query === '') {
      alert('Please enter your query');
      return;
    }
    setImages([]);
    setPage(1);

    fetchImagesByQuery(query);
  };

  // const handleLoadMore = () => {
  //   setPage(prevState => prevState + 1);
  // };

  // const handleLoadMore = useCallback(() => {
  //   setPage(prevState => prevState + 1);
  //   //fetchImagesByQuery(query);
  // }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prevState => prevState + 1);
    // fetchImagesByQuery(query);
  }, []);

  // useEffect(() => {
  //   if (query !== inputValue) setImages([]);
  //   setPage(1);
  // }, [query, inputValue]);

  // useEffect(() => {
  //   setQuery(inputValue);
  // }, [handleChange, inputValue]);

  useEffect(() => {
    if (page === 1) return;
    if (page > 1 && query !== inputValue) {
      setImages([]);
      // setPage(1);
    }

    fetchImagesByQuery(query);
  }, [page]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

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
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClickClear={onClickClear}
        inputValue={inputValue}
      />
      <Section>
        {error && <p className="alertStyle">Something went wrong: {error.message}</p>}
        {noResults && <p className="alertStyle">No results found</p>}
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={handleImageClick} />
      </Section>
      {page < lastPage && !isLoading ? (
        <ButtonLoadMore label="Load more" handleLoadMore={handleLoadMore} />
      ) : (
        <div style={{ height: 40 }}></div>
      )}
      {showModal && <Modal onClose={toggleModal} largeImageURL={largeImageURL} />}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     lastPage: 1,
//     error: null,
//     showModal: false,
//     largeImageURL: '',
//     noResults: false,
//   };

//   handleChange = event => {
//     this.setState({ query: event.target.value });
//   };

//   onClickClear = () => {
//     this.setState({ query: '' });
//   };

//   fetchImagesByQuery = async searchQuery => {
//     this.setState({ isLoading: true, error: null, noResults: false });
//     try {
//       const response = await fetchImages(searchQuery, this.state.page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...response.hits],
//         lastPage: Math.ceil(response.totalHits / 12),
//       }));
//       if (response.totalHits === 0) {
//         this.setState({ noResults: true });
//       }
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.query === '') {
//       alert('Please enter your query');
//       return;
//     }
//     this.setState({ images: [], page: 1 }, () => {
//       this.fetchImagesByQuery(this.state.query);
//     });
//   };

//   handleLoadMore = () => {
//     this.setState({ page: this.state.page + 1 }, () => {
//       this.fetchImagesByQuery(this.state.query);
//     });
//   };

//   onImageClick = largeImageURL => {
//     this.setState({ showModal: true, largeImageURL: largeImageURL });
//   };

//   onClose = () => {
//     this.setState({ showModal: false, largeImageURL: '' });
//   };

//   render() {
//     const {
//       page,
//       images,
//       isLoading,
//       lastPage,
//       error,
//       showModal,
//       largeImageURL,
//       noResults,
//     } = this.state;

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: 16,
//           paddingBottom: 24,
//         }}
//       >
//         <Searchbar
//           onSubmit={this.handleSubmit}
//           onChange={this.handleChange}
//           onClickClear={this.onClickClear}
//           query={this.state.query}
//         />
//         <Section>
//           {isLoading && <Loader />}
//           {noResults && (
//             <p className="alertStyle">
//               No images found. Please try another query.
//             </p>
//           )}
//           <ImageGallery images={images} onImageClick={this.onImageClick} />
//           {error && (
//             <p className="alertStyle">
//               Whoops, something went wrong: {error.message}
//             </p>
//           )}
//         </Section>
//         {page < lastPage && !isLoading && !error ? (
//           <ButtonLoadMore
//             label={'Load more'}
//             handleLoadMore={this.handleLoadMore}
//           />
//         ) : (
//           <div style={{ height: 40 }}></div>
//         )}
//         {showModal && (
//           <Modal onClose={this.onClose} largeImageURL={largeImageURL} />
//         )}
//       </div>
//     );
//   }
// }

export default App;
