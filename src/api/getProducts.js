import axios from './axios';
import { ACTIVE_PRODUCTS_ENDPOINT } from './apiConfig';

export const getProducts = async (currentPage, filters) => {
  // const baseUrl = `${API_URL}${ACTIVE_PRODUCTS_ENDPOINT}`;
  const baseUrl = `${ACTIVE_PRODUCTS_ENDPOINT}`;
  let apiUrlProducts = currentPage ? `${baseUrl}?page=${currentPage}` : baseUrl;
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
