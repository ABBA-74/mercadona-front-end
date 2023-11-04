import axios from './axios';
import { ACTIVE_PRODUCTS_ENDPOINT, PRODUCTS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return products data
 * @param {number}  currentPage - The current page number for pagination.
 * @param {Object} [filters] - An object containing filter parameters.
 * @param {boolean} [isActive=false] -  Flag to filter for active products only.
 * @returns {{products: Array, totalItems: Number}}
 */
export const getProducts = async (currentPage, filters, isActive = false) => {
  let apiUrlProducts = '';
  if (!isActive) {
    apiUrlProducts = currentPage
      ? `${ACTIVE_PRODUCTS_ENDPOINT}?page=${currentPage}`
      : ACTIVE_PRODUCTS_ENDPOINT;
  } else {
    apiUrlProducts = currentPage
      ? `${PRODUCTS_ENDPOINT}?page=${currentPage}`
      : PRODUCTS_ENDPOINT;
  }

  // Add filters to the query if they are provided
  if (filters && Object.keys(filters).length > 0) {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join('&');
    apiUrlProducts += `&${queryString}`;
  }

  try {
    const responses = await axios.get(apiUrlProducts);
    const products = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];
    return { products, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
