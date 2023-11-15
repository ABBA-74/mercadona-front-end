import axios from './axios';
import { PROMOTIONS_ENDPOINT } from './apiConfig';

/**
 * Post promotion data
 * @param {Object} newPromotionData - An object with the promotion data to post.
 * @returns {Promise<Object>} A promise that resolves to the new promotion object.
 */
export const postPromotion = async (newPromotionData) => {
  try {
    if (!newPromotionData || Object.keys(newPromotionData).length === 0) {
      throw new Error('Promotion data is required');
    }

    const response = await axios.post(
      `${PROMOTIONS_ENDPOINT}`,
      newPromotionData
    );

    return response.data;
  } catch (err) {
    console.error('Error posting new promotion:', err);
    throw err;
  }
};
