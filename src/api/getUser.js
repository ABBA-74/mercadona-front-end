import axios from './axios';
import { USERS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return user data
 * @param {string}  userId - The ID of the user to fetch.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${USERS_ENDPOINT}/${userId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};
