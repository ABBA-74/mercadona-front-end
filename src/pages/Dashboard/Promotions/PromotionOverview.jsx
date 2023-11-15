import PropTypes from 'prop-types';
import moment from 'moment';

const PromotionOverview = ({ dataPromotion }) => {
  return (
    <div className='col-12 col-xl-5 col-xxl-4 section-promotion-edit-overview d-flex flex-column justify-content-start justify-content-xxl-between gx-0 gx-xl-4'>
      <div className='overview-wrapper rounded border mb-5 mb-xl-3 mb-xxl-0 px-3 py-5 p-md-5'>
        <h4 className='h5 mb-4'>Détails de la promotion</h4>
        <div className='overview-content'>
          <ul className='list-group'>
            <li className='list-group-item'>
              <span className='list-item-label'>Nom:</span> {dataPromotion.name}
            </li>
            <li className='list-group-item'>
              <span className='list-item-label'>Date de début:</span>
              <br />
              {moment(dataPromotion.startDate).format('DD/MM/YYYY HH:mm:ss')}
            </li>
            <li className='list-group-item'>
              <span className='list-item-label'>Date de fin:</span>
              <br />
              {moment(dataPromotion.endDate).format('DD/MM/YYYY HH:mm:ss')}
            </li>
            <li className='list-group-item'>
              <span className='list-item-label'>
                Qtt de produits associés:{' '}
              </span>{' '}
              {dataPromotion.products.length}
            </li>
            <li className='list-group-item'>
              <span className='list-item-label'>Créé par:</span>
              <br />
              {dataPromotion.user.fullName}
            </li>
            <li className='list-group-item'>
              <span className='list-item-label'>
                {dataPromotion.updated
                  ? 'Date de mise à jour'
                  : 'Date de création'}
                :
              </span>
              <br />
              {dataPromotion.updated
                ? moment(dataPromotion.updatedAt).format('DD/MM/YYYY HH:mm:ss')
                : moment(dataPromotion.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

PromotionOverview.propTypes = {
  dataPromotion: PropTypes.object.isRequired,
};

export default PromotionOverview;
