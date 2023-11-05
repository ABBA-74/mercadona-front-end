import axios from './axios';
import { CATEGORIES_ENDPOINT } from './apiConfig';

/**
 * Fetch and return categories data
 * @param {number} [currentPage=null] - The current page number for pagination.
 * @returns {{categories: Array, totalItems: Number}}
 */
export const getCategories = async (currentPage = null) => {
  let url = '';
  try {
    if (currentPage) {
      url = CATEGORIES_ENDPOINT + `/dashboard?page=${currentPage}`;
    } else {
      url = CATEGORIES_ENDPOINT;
    }
    const responses = await axios.get(url);
    const categories = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];

    return { categories, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
