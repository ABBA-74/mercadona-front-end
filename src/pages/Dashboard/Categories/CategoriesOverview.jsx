import { useEffect, useState } from 'react';
import { getCategories } from '../../../api/getCategories';
import { API_URL_IMG } from '../../../api/apiConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthLogout } from '../../../hooks/useAuthLogout';

const CategoriesOverview = () => {
  const { logout } = useAuthLogout();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { categories } = await getCategories();
      setData(categories);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      setError(err);
      if (err.response && err.response?.data.code === 401) {
        setIsLoading(false);
        logout();
        return;
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='col-12 col-xl-5 col-xxl-4 section-category-create-overview gx-0 gx-xl-4'>
      <div className='overview-wrapper rounded border mb-5 mb-xl-3 mb-xxl-0 px-3 py-5 p-md-5 d-flex flex-column justify-content-start'>
        <h4 className='h5 mb-4'>Listing des catégories existantes</h4>
        <div className='overview-content mt-3'>
          <ul className='list-group'>
            {data &&
              !isLoading &&
              data.map((category) => (
                <li key={category.id} className='list-group-item item-category'>
                  <div className='img-wrapper me-3'>
                    <img
                      src={`${API_URL_IMG}/${category.image.imgFile}`}
                      className='img-category'
                      alt={category.label}
                    />
                  </div>
                  <span className='item-label'>{category.label}</span>
                </li>
              ))}
            {isLoading && (
              <li className='list-group-item item-loading'>
                <CircularProgress />
              </li>
            )}
            {error && (
              <li className='list-group-item item-error'>
                Erreur lors du chargement des catégories
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoriesOverview;
