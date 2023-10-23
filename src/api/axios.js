import axios from 'axios';
import { API_URL } from './apiConfig';

const config = {
  headers: {
    Accept: 'application/ld+json',
  },
};

export default axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
  headers: config.headers,
});
