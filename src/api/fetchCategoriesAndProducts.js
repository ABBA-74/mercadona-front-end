import axios from 'axios';

export const fetchCategoriesAndProducts = async () => {
  const apiUrlCategories = 'https://mercadona-api.abb-dev.fr/api/categories';
  const apiUrlProducts = 'https://mercadona-api.abb-dev.fr/api/products';

  const config = {
    headers: {
      Accept: 'application/ld+json',
    },
  };

  try {
    // Execute API calls in parallel with Promise.all()
    const responses = await Promise.all([
      axios.get(apiUrlCategories),
      axios.get(apiUrlProducts, config),
    ]);
    // Response in array according to the order of call api Promise.all()
    const categories = responses[0].data;
    const products = responses[1].data['hydra:member'];
    const totalItems = responses[1].data['hydra:totalItems'];

    return { categories, products, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
