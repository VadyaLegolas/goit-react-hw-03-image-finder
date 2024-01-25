// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '39645635-7da43b24dbf787654135e35eb';

export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.perPage = 12;
    this.totalPageNumbers = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get page() {
    return this.pageNumber;
  }
  set page(newPage) {
    this.pageNumber = newPage;
  }

  get totalPages() {
    return this.totalPageNumbers;
  }

  set totalPages(newTotalPages) {
    this.totalPageNumbers = newTotalPages;
  }
  async fetchPhotos() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    });
    const url = `${BASE_URL}/?${params}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Ошибка поиска, повторите позже!');
    }
    return await res.json();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// export async function fetchPhotos(query = '', page = 1) {
//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: 12,
//   });
//   const url = `${BASE_URL}?${params}`;

//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error('Ошибка поиска, повторите позже!');
//   }
//   return await res.json();
// }
