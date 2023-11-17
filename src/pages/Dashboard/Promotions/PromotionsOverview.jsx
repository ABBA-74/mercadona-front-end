import { useEffect, useState } from 'react';
import { getPromotions } from '../../../api/getPromotions';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { useAuthLogout } from '../../../hooks/useAuthLogout';

const PromotionsOverview = () => {
  const { logout } = useAuthLogout();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const { promotions } = await getPromotions(1, false);
      setData(promotions);
    } catch (err) {
      console.log(err);
      setError(err);
      if (err.response && err.response.status === 401) {
        logout();
      }
    }
    setIsLoading(false);
  };

  const getPromotionStatus = (startDate, endDate) => {
    const now = moment();
    if (now.isBetween(startDate, endDate)) {
      return 'Encours';
    } else if (now.isAfter(endDate)) {
      return 'Terminé';
    } else {
      return 'À venir';
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div className='col-12 col-xl-5 col-xxl-4 section-promotion-create-overview d-flex flex-column justify-content-start justify-content-xxl-between gx-0 gx-xl-4'>
      <div className='overview-wrapper rounded border mb-5 mb-xl-3 mb-xxl-0 px-3 py-5 p-md-5'>
        <h4 className='h5 mb-4'>Listing des promotions</h4>
        <div className='overview-content'>
          <ul className='list-group'>
            {error && <p>Problème lors du chargement</p>}
            {!isLoading &&
              data &&
              data.map((promotion) => (
                <li
                  key={promotion.id}
                  className='list-group-item item-promotion'
                >
                  <div>
                    <span className='list-item-label'>Nom:</span>{' '}
                    {promotion.name}
                  </div>
                  <div>
                    <span className='list-item-label'>Statut:</span>{' '}
                    {getPromotionStatus(promotion.startDate, promotion.endDate)}
                  </div>
                </li>
              ))}
            {isLoading && (
              <li className='list-group-item item-loading item-loading'>
                <CircularProgress />
              </li>
            )}
            {error && (
              <li className='list-group-item item-error'>
                Erreur lors du chargement des promotions
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromotionsOverview;
