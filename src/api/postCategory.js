import axios from './axios';
import { CATEGORIES_ENDPOINT } from './apiConfig';

/**
 * Post category data
 * @param {Object} newCategoryData - An object with the category data to post.
 * @returns {Promise<Object>} A promise that resolves to the new category object.
 */
export const postCategory = async (newCategoryData) => {
  try {
    if (!newCategoryData || Object.keys(newCategoryData).length === 0) {
      throw new Error('Category data is required');
    }

    const response = await axios.post(
      `${CATEGORIES_ENDPOINT}`,
      newCategoryData
    );

    return response.data;
  } catch (err) {
    console.error('Error posting new category:', err);
    throw err;
  }
};
