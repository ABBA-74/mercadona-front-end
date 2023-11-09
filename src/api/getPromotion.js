import axios from './axios';
import { PROMOTIONS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return promotion data
 * @param {string}  promotionId - The ID of the promotion to fetch.
 * @returns {Promise<Object>} A promise that resolves to the promotion object.
 */
export const getPromotion = async (promotionId) => {
  try {
    const response = await axios.get(`${PROMOTIONS_ENDPOINT}/${promotionId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching promotion:', err);
    throw err;
  }
};
