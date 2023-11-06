import axios from './axios';
import { PROMOTIONS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return promotions data
 * @param {number}  currentPage - The current page number for pagination.
 * @returns {{promotions: Array, totalItems: Number}}
 */
export const getPromotions = async (currentPage) => {
  try {
    const responses = await axios.get(
      `${PROMOTIONS_ENDPOINT}?page=${currentPage}`
    );
    const promotions = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];
    return { promotions, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
