import axios from 'axios';

const berryApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

export { berryApi, productApi };