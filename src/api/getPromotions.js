import axios from './axios';
import { PROMOTIONS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return promotions data
 * @param {number}  currentPage - The current page number for pagination.
 * @returns {{promotions: Array, totalItems: Number}}
 */
export const getPromotions = async (currentPage = 1, withPagination = true) => {
  let apiUrlPromotions = `${PROMOTIONS_ENDPOINT}?page=${currentPage}`;
  apiUrlPromotions += withPagination
    ? '?itemsPerPage=8&pagination=true'
    : '&pagination=false';

  try {
    const responses = await axios.get(apiUrlPromotions);
    const promotions = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];
    return { promotions, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
