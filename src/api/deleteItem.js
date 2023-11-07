import axios from './axios';

/**
 * Delete item from the database using a full URL.
 * @param {string}  itemUrl - The full URL for the item to delete, e.g., '/api/users/18'.
 * @returns {Promise} A promise that resolves with the deletion status and message.
 */
export const deleteItem = async (itemUrl) => {
  // exception done on product route
  if (itemUrl.includes('products/active'))
    itemUrl = itemUrl.replace('/active', '');

  try {
    // // For loading test on delete btn
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await axios.delete(itemUrl);

    return {
      status: response.status,
      message:
        response.data.message ||
        "La suppression de l'élément a été réalisée avec succès.",
    };
  } catch (err) {
    console.error('Deletion failed:', err);
    throw err;
  }
};
