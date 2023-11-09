import axios from './axios';
import { ACTIVE_PRODUCTS_ENDPOINT, PRODUCTS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return products data
 * @param {number}  currentPage - The current page number for pagination.
 * @param {Object} [filters] - Optional filters to apply to the product retrieval.
 * @param {boolean} [isAdminMode = false] -  } [isAdminMode = false] - When true, the function will perform additional checks or retrieve extra data suitable for admin users.
 * @returns {Promise<{products: Array, totalItems: number}>} Resolves with 'products' array and filtered 'totalItems' count.
 */
export const getProducts = async (
  currentPage,
  filters,
  isAdminMode = false,
  withPagination = true
) => {
  const endpointBase = isAdminMode
    ? PRODUCTS_ENDPOINT
    : ACTIVE_PRODUCTS_ENDPOINT;
  let apiUrlProducts = currentPage
    ? `${endpointBase}?page=${currentPage}`
    : endpointBase;

  // Add filters to the query if they are provided
  if (filters && Object.keys(filters).length > 0) {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join('&');
    apiUrlProducts += `&${queryString}`;
  }

  apiUrlProducts += withPagination
    ? '?itemsPerPage=8&pagination=true'
    : '&pagination=false';

  try {
    const responses = await axios.get(apiUrlProducts);
    const products = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];
    return { products, totalItems };
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};
