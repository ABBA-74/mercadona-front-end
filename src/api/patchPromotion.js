import axios from './axios';
import { PROMOTIONS_ENDPOINT } from './apiConfig';

/**
 * Patch promotion data
 * @param {string}  promotionId - The ID of the promotion to update.
 * @param {Object} updateData - An object with the promotion data to patch.
 * @returns {Promise<Object>} A promise that resolves to the updated promotion object.
 */
export const patchPromotion = async (promotionId, updateData) => {
  try {
    if (!promotionId) {
      throw new Error('Promotion ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('No update data provided');
    }

    const response = await axios.patch(
      `${PROMOTIONS_ENDPOINT}/${promotionId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error updating promotion:', err);
    throw err;
  }
};
