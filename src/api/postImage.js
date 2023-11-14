import { IMAGES_ENDPOINT } from './apiConfig';
import axios from './axios';

/**
 * Post image data
 * @param {string} imageFile - The image file to be uploaded.
 * @param {string} label - The label for the image.
 * @param {string} description - The description of the image.
 * @returns {Promise<Object>} A promise that resolves to the response object.
 */
export const postImage = async (imageFile, label, description) => {
  if (!imageFile) {
    throw new Error('No image file provided');
  }

  if (!label) {
    throw new Error('No label provided');
  }

  if (!description) {
    throw new Error('No description provided');
  }

  try {
    if (!imageFile) {
      throw new Error('No image file provided');
    }

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('label', label);
    formData.append('description', description);

    const response = await axios.post(`${IMAGES_ENDPOINT}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
    console.error('Error posting image:', err);
    throw err;
  }
};
