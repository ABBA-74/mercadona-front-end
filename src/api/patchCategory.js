import axios from './axios';
import { CATEGORIES_ENDPOINT } from './apiConfig';

/**
 * Patch category data
 * @param {string}  categoryId - The ID of the category to update.
 * @param {Object} updateData - An object with the category data to patch.
 * @returns {Promise<Object>} A promise that resolves to the updated category object.
 */
export const patchCategory = async (categoryId, updateData) => {
  try {
    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('No update data provided');
    }

    const response = await axios.patch(
      `${CATEGORIES_ENDPOINT}/${categoryId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error updating category:', err);
    throw err;
  }
};
