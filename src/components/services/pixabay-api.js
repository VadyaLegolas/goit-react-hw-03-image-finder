import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39645635-7da43b24dbf787654135e35eb';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = BASE_URL

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export async function fetchPhotos(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  const url = `${BASE_URL}?${params}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Ошибка поиска, повторите позже!');
  }
  // this.incrementPage();
  return await res.json();
}
