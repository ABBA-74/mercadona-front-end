import axios from './axios';
import { CATEGORIES_ENDPOINT, ACTIVE_PRODUCTS_ENDPOINT } from './apiConfig';

export const getCategoriesAndProducts = async () => {
  try {
    // Execute API calls in parallel with Promise.all()
    const responses = await Promise.all([
      axios.get(CATEGORIES_ENDPOINT),
      axios.get(ACTIVE_PRODUCTS_ENDPOINT),
    ]);
    // Response in array according to the order of call api Promise.all()
    const categories = responses[0].data['hydra:member'];
    const products = responses[1].data['hydra:member'];
    const totalItems = responses[1].data['hydra:totalItems'];

    return { categories, products, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
