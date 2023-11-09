import axios from './axios';
import { CATEGORIES_ENDPOINT } from './apiConfig';

/**
 * Fetch and return category data
 * @param {string}  categoryId - The ID of the category to fetch.
 * @returns {Promise<Object>} A promise that resolves to the category object.
 */
export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${CATEGORIES_ENDPOINT}/${categoryId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};
