import axios from 'axios';

const GetPicture = async (query, page) => {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  axios.defaults.headers.post['Content-Type'] =
    'application/json; charset=utf-8';

  const KEY = '26749427-98c3432f7608211f00519cfab';
  const MAIN_CONFIG = 'image_type=photo&orientation=horizontal&safesearch=true';
  const PAGE_CONFIG = `per_page=12&page=${page}`;
  const response = await axios.get(
    `?key=${KEY}&q=${query}&${MAIN_CONFIG}&${PAGE_CONFIG}`
  );
  return response.data;
  //   console.log(response.data);
};

export default GetPicture;
