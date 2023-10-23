import axios from './axios';
import { CATEGORIES_ENDPOINT } from './apiConfig';

export const getCategories = async () => {
  try {
    const responses = await axios.get(CATEGORIES_ENDPOINT);
    const categories = responses.data['hydra:member'];

    return { categories };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
