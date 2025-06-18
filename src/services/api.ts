import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.tu-backend.com',
  timeout: 10000,
});