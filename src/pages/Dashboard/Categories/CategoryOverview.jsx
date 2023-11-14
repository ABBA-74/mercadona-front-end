import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { API_URL_IMG } from '../../../api/apiConfig';
import moment from 'moment';

const CategoryOverview = ({ data, imgError, setImgError }) => {
  return (
    <div className='col-12 col-xl-5 col-xxl-4 section-category-edit-overview gx-0 gx-xl-4'>
      <div className='overview-wrapper rounded border mb-5 mb-lg-0 px-3 py-5 p-md-5'>
        <h4 className='h5 mb-4'>Détails de la catégorie</h4>
        <div className='category-item-wrapper border rounded '>
          <div className='category-item-img-wrapper me-3 me-xl-0 mb-xl-2 p-5'>
            <Avatar variant='rounded' className='img-category'>
              {!imgError && data.image?.imgFile ? (
                <img
                  src={`${API_URL_IMG}/${data.image.imgFile}`}
                  alt='Image de la catégorie'
                  onError={() => setImgError(true)}
                  className='img-category-default'
                />
              ) : (
                <CategoryIcon />
              )}
            </Avatar>
          </div>
          <div className='category-item-content p-3'>
            <h5 className='h5 mb-3'>{data.label}</h5>
            <p className='mb-2'>Statut: actif</p>
            <p className='mb-2'>
              {data.updatedAt ? 'Mise à jour par' : 'Créé par'}:{' '}
              {data.user?.fullName}
            </p>
            <p className='mb-0'>
              {data.updatedAt ? 'Date de mise à jour' : 'Date de création'}
              : <br />
              {data.updatedAt
                ? moment(data.updatedAt).format('DD/MM/YYYY HH:mm:ss')
                : moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryOverview.propTypes = {
  data: PropTypes.object.isRequired,
  imgError: PropTypes.bool.isRequired,
  setImgError: PropTypes.func.isRequired,
};

export default CategoryOverview;
