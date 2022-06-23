import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import SearchBar from './SearchBar';
import GetPicture from './../API';
import Button from './Button';
import ImageGallery from './ImageGallery';

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
      setStatus('pending');
      try {
        const newPicture = await GetPicture(query, page);

        setStatus('resolved');
        setPictures(prevPictures => [...prevPictures, ...newPicture.hits]);
        setTotalPictures(newPicture.totalHits);
        setTimeout(() => {
          window.scrollBy({
            top: document.body.clientHeight,
            behavior: 'smooth',
          });
        }, 100);

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
  }, [query, page]);

  const handleForSubmit = values => {
    if (query === values.name) {
      return;
    }
    setQuery(values.name);
    setPictures([]);
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
      <ImageGallery pictures={pictures} />
      {status === 'pending' && (
        <div className="Loader">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {pictures.length > 0 && totalPictures !== pictures.length && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
}
