import axios from './axios';
import { USERS_ENDPOINT } from './apiConfig';

/**
 * Fetch and return users data
 * @param {number}  currentPage - The current page number for pagination.
 * @returns {{users: Array, totalItems: Number}}
 */
export const getUsers = async (currentPage) => {
  try {
    const responses = await axios.get(`${USERS_ENDPOINT}?page=${currentPage}`);
    const users = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];
    return { users, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
