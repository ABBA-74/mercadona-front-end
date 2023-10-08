import axios from 'axios';

export const fetchProducts = async (currentPage, filters) => {
  const baseUrl = 'https://mercadona-api.abb-dev.fr/api/products';
  let apiUrlProducts = currentPage ? `${baseUrl}?page=${currentPage}` : baseUrl;

  // Add filters to the query if they are provided
  if (filters && Object.keys(filters).length > 0) {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join('&');
    apiUrlProducts += `&${queryString}`;
  }

  const config = {
    headers: {
      Accept: 'application/ld+json',
    },
  };

  try {
    const responses = await axios.get(apiUrlProducts, config);
    const products = responses.data['hydra:member'];
    const totalItems = responses.data['hydra:totalItems'];

    return { products, totalItems };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
