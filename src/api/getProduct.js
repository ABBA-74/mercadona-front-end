import axios from './axios';
import { PRODUCTS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return product data
 * @param {string}  productId - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCTS_ENDPOINT}/${productId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching product:', err);
    throw err;
  }
};
