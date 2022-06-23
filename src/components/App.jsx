import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import SearchBar from './SearchBar';
import GetPicture from './../API';
import Button from './Button';
import ImageGallery from './ImageGallery';
// import Modal from './Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  //  const [error, setError] = useState(null);
  const [totalPictures, setTotalPictures] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchPicture() {
      try {
        const newPicture = await GetPicture(query, page);

        setStatus('resolved');
        setPictures(prevPictures => [...prevPictures, ...newPicture.hits]);
        setTotalPictures(newPicture.totalHits);

        if (newPicture.totalHits === 0) {
          setStatus('rejected');
          return;
        }
      } catch (error) {
        // setError(error);
        console.error(error);
        setStatus('rejected');
      }
    }
    fetchPicture();
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  }, [query, page]);

  const handleForSubmit = values => {
    setQuery(values.name);
    setPictures([]);
    setStatus('pending');
    setPage(1);
  };

  const loadMore = () => {
    setPage(p => p + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleForSubmit} />

      {status === 'rejected' && (
        <div className="Notification">Ooops, no data for "{query}" =(</div>
      )}

      {status === 'pending' && (
        <div className="Loader">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      )}

      <ImageGallery pictures={pictures} />
      {pictures.length > 0 && totalPictures !== pictures.length && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
}
