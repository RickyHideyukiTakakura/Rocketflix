import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '939e096e7e9b8a049aab66733f4d9f7f'
  }
});

export function getMovie(movieId) {
  return movieApi.get(`/movie/${movieId}`);
}
