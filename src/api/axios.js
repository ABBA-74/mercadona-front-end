import axios from 'axios';
import { API_URL } from './apiConfig';

export default axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
  headers: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
