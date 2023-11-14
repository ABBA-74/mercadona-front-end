import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader/Loader';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getProduct } from '../../../api/getProduct';
import { getCategories } from '../../../api/getCategories';
import { getPromotions } from '../../../api/getPromotions';
import { API_URL_IMG } from '../../../api/apiConfig';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import PriceHistoricChart from './PriceHistoricChart/PriceHistoricChart';
import './ProductEdit.scss';

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [dataPromotions, setDataPromotions] = useState(null);
  const [currentPromotions, setCurrentPromotions] = useState(null);
  const [currentPromotionApplied, setCurrentPromotionsApplied] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const [{ categories }, product, { promotions }] = await Promise.all([
        getCategories(),
        getProduct(id),
        getPromotions(),
      ]);
      setDataCategories(categories);
      setDataProduct(product);
      setDataPromotions(promotions);
      handleCurrentPromotionsAvailable(promotions);
      if (product.promotions.length > 0 && product.discountedPrice)
        getCurrentPromotionApplied(product.promotions);
      setFormValues({
        label: product.label,
        image: '',
        category: product.category['@id'],
        originalPrice: product.originalPrice,
        description: product.description,
        internalNotes: product.internalNotes,
        promotions: product.promotions?.map((promotion) => {
          if (moment(promotion.endDate).isSameOrAfter(moment())) {
            return promotion['@id'];
          }
        }),
        isActive: product.isActive,
      });
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      setError(err);
      if (err.response && err.response?.data.code === 401) {
        setIsLoading(false);
        navigate('/login', { replace: true });
        return;
      }
    }
    setIsLoading(false);
  };

  const getCurrentPromotionApplied = (promotions) => {
    const currentPromotionAppliedFiltered = promotions?.reduce(
      (prev, current) =>
        prev && prev.discountPercentage > current.discountPercentage
          ? prev
          : current
    );
    setCurrentPromotionsApplied(currentPromotionAppliedFiltered);
  };

  const handleCurrentPromotionsAvailable = (promotions) => {
    const currentPromotionFiltered = promotions.filter((promotion) =>
      moment(promotion.endDate).isSameOrAfter(moment())
    );
    setCurrentPromotions(currentPromotionFiltered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'products') {
      const selectedOptions = [...e.target.options]
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: selectedOptions,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleHistoricPromoData = (histoPromos, dataProduct) => {
    let dataPromo = [];
    histoPromos.forEach((promo) => {
      const discountedPrice =
        dataProduct.originalPrice -
        (promo.discountPercentage * dataProduct.originalPrice) / 100;

      if (moment(promo.startDate).isSameOrBefore(moment())) {
        dataPromo.push({
          date: promo.startDate,
          dateX: Date.now() - moment(promo.startDate).unix(),
          price: discountedPrice,
        });
      }

      if (moment(promo.endDate).isSameOrBefore(moment())) {
        dataPromo.push({
          date: promo.endDate,
          dateX: Date.now() - moment(promo.endDate).unix(),
          price: discountedPrice,
        });
      }
    });

    dataPromo.unshift({
      date: dataProduct.createdAt,
      dateX: Date.now() - moment(dataProduct.createdAt).unix(),
      price: dataProduct.originalPrice,
    });

    dataPromo.push({
      date: Date.now(),
      dateX: Date.now() - moment().unix(),
      price: dataProduct.discountedPrice
        ? dataProduct.discountedPrice
        : dataProduct.originalPrice,
    });
    return dataPromo;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <section className='section-product-edit px-5 '>
      {isLoading && (
        <section className='section-loader'>
          <Loader />
        </section>
      )}
      {error && (
        <section className='section-error-fetch-msg'>
          <ErrorMessage
            title={fetchErrorMessage.title}
            message={fetchErrorMessage.message}
          />
        </section>
      )}
      {!error &&
        !isLoading &&
        dataProduct &&
        dataCategories &&
        dataPromotions && (
          <>
            <div className='section-product-edit-header text-center text-md-start mb-4 ps-0 ps-md-4'>
              <h3 className='h5'>Editer le produit {dataProduct.label}</h3>
            </div>
            <div className='section-product-edit-main mb-5 ps-0 ps-md-5'>
              <div className='row gx-5 justify-content-between align-items-start'>
                <div className='col-12 col-xxl-7 section-product-edit-form border rounded mb-5 mb-xl-0 px-3 py-5 p-md-5'>
                  <form>
                    <h4 className='h5 mb-4'>Informations du produit</h4>
                    <div className='row gx-4 form'>
                      <div className='col-12 col-lg-6 mb-3'>
                        <label htmlFor='label' className='form-label'>
                          Label
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          id='label'
                          name='label'
                          placeholder='Nom du produit'
                          value={formValues.label}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='col-12 col-sm-6 mb-3'>
                        <label
                          htmlFor='productImageFile'
                          className='form-label'
                        >
                          Image
                        </label>
                        <input
                          type='file'
                          className='form-control'
                          id='productImageFile'
                        />
                      </div>
                      <div className='col-12 col-sm-6 mb-3'>
                        <label htmlFor='categories' className='form-label'>
                          Catégorie
                        </label>
                        <select
                          className='form-select categories-list'
                          name='categories'
                          aria-label='Liste des categories applicable pour le produit'
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              category: Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              ),
                            }))
                          }
                          value={formValues.category}
                        >
                          {dataCategories.map((item) => (
                            <option key={item['@id']} value={item['@id']}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='col-6 col-lg-3 mb-3 form-group'>
                        <label htmlFor='originalPrice' className='form-label'>
                          Prix
                        </label>
                        <div className='input-group'>
                          <input
                            type='text'
                            className='form-control'
                            id='originalPrice'
                            name='originalPrice'
                            aria-label='Réduction en pourcentage (par exemple, 10%)'
                            value={formValues.originalPrice}
                            onChange={handleChange}
                          />
                          <span className='input-group-text'>€</span>
                        </div>
                      </div>
                      <div className='col-12 col-sm-6 col-xxl-2 form-check form-switch d-flex flex-column mb-3 px-4'>
                        <label
                          className='form-check-label mb-3'
                          htmlFor='activeStatus'
                        >
                          Actif
                        </label>
                        <input
                          className='form-check-input ms-0 mt-0'
                          type='checkbox'
                          role='switch'
                          checked={formValues.isActive}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              isActive: e.target.checked,
                            }))
                          }
                          id='activeStatus'
                        />
                      </div>
                      <div className='col-12 mb-3'>
                        <label htmlFor='description' className='form-label'>
                          Description
                        </label>
                        <textarea
                          className='form-control textarea-description'
                          placeholder='Description du produit'
                          id='description'
                          name='description'
                          style={{ height: '120px' }}
                          value={formValues.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='col-12 mb-3'>
                        <label htmlFor='internalNotes' className='form-label'>
                          Notes internes
                        </label>
                        <textarea
                          className='form-control textarea-description'
                          placeholder='Toute information supplémentaire utile pour le personnel de gestion'
                          id='internalNotes'
                          name='internalNotes'
                          style={{ height: '120px' }}
                          value={formValues.internalNotes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <h4 className='h5 my-4'>Information sur les promotions</h4>
                    <div className='row gx-4 form'>
                      {currentPromotionApplied && (
                        <>
                          <div className='col-12 col-lg-6 mb-3'>
                            <label
                              htmlFor='actualPromotion'
                              className='form-label'
                            >
                              Promotion encours
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              disabled
                              id='actualPromotion'
                              name='actualPromotion'
                              value={currentPromotionApplied?.name}
                              placeholder='Nom de la promotion'
                            />
                          </div>
                          <div className='col-6 col-lg-3 mb-3 form-group'>
                            <label
                              htmlFor='currentPromotionPercentage'
                              className='form-label'
                            >
                              Remise
                            </label>
                            <div className='input-group'>
                              <input
                                type='text'
                                className='form-control'
                                disabled
                                id='currentPromotionPercentage'
                                name='currentPromotionPercentage'
                                aria-label='Réduction en pourcentage (par exemple, 10%)'
                                value={dataProduct.currentPromotionPercentage}
                              />
                              <span className='input-group-text'>%</span>
                            </div>
                          </div>
                          <div className='col-6 col-lg-3 mb-3 form-group'>
                            <label
                              htmlFor='discountedPrice'
                              className='form-label'
                            >
                              Prix soldé
                            </label>
                            <div className='input-group'>
                              <input
                                type='text'
                                className='form-control'
                                disabled
                                id='discountedPrice'
                                name='discountedPrice'
                                aria-label='Réduction en pourcentage (par exemple, 10%)'
                                value={dataProduct.discountedPrice}
                              />
                              <span className='input-group-text'>€</span>
                            </div>
                          </div>
                          <div className='col-12 col-lg-6 col-xxl-4 mb-3'>
                            <label htmlFor='startDate' className='form-label'>
                              Date de début
                            </label>
                            <input
                              type='date'
                              className='form-control'
                              disabled
                              id='startDate'
                              name='startDate'
                              value={moment(
                                currentPromotionApplied?.startDate
                              ).format('YYYY-MM-DD')}
                              aria-label='Date de début de la promotion encours sur le produit'
                            />
                          </div>
                          <div className='col-12 col-lg-6 col-xxl-4 mb-3'>
                            <label htmlFor='endDate' className='form-label'>
                              Date de fin
                            </label>
                            <input
                              type='date'
                              className='form-control'
                              disabled
                              id='endDate'
                              name='endDate'
                              value={moment(
                                currentPromotionApplied?.endDate
                              ).format('YYYY-MM-DD')}
                              aria-label='Date de fin de la promotion encours sur le produit'
                            />
                          </div>
                        </>
                      )}
                      <div className='col-12 mb-3'>
                        <label htmlFor='promotions' className='form-label'>
                          Ajouter une promotion
                        </label>
                        <select
                          className='form-select promotions-list'
                          multiple
                          name='promotions'
                          aria-label='Liste des promotions applicable pour le produit'
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              promotions: Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              ),
                            }))
                          }
                          style={{ height: '190px' }}
                          value={formValues.promotions}
                        >
                          {currentPromotions.map((item) => (
                            <option key={item['@id']} value={item['@id']}>
                              - {item.name} - Du{' '}
                              {moment(item.startDate).format('DD/MM/YY')} au{' '}
                              {moment(item.endDate).format('DD/MM/YY')} - Remise
                              : {item.discountPercentage}%
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button type='submit' className='btn btn-primary mt-4 px-4'>
                      Sauvegarder
                    </button>
                  </form>
                </div>
                <div className='col-12 col-xxl-5 col-xxl-4 section-product-edit-overview d-flex flex-column justify-content-start justify-content-xxl-between gx-0 gx-xl-4'>
                  <div className='overview-wrapper rounded border mb-5 mb-xl-3 mb-xxl-0 px-3 py-5 p-md-5'>
                    <h4 className='h5 mb-4'>Détails du produit</h4>
                    <div className='overview-img-wrapper w-100 d-flex align-items-center justify-content-center border my-4 p-3'>
                      {dataProduct.image ? (
                        <img
                          src={`${API_URL_IMG}/${dataProduct.image?.imgFile}`}
                          alt=''
                          className='img-fluid'
                        />
                      ) : (
                        <InsertPhotoRoundedIcon
                          style={{ fontSize: 74, color: '#EAE5DB' }}
                        />
                      )}
                    </div>

                    <p className='text-center mt-3'>Tendance de prix</p>
                    <PriceHistoricChart
                      data={handleHistoricPromoData(
                        dataProduct.promotions,
                        dataProduct
                      )}
                    />

                    <div className='overview-content mt-3'>
                      <ul className='list-group'>
                        <li className='list-group-item'>
                          <span className='list-item-label'>Label:</span>{' '}
                          {dataProduct.label}
                        </li>
                        <li className='list-group-item group-item-description'>
                          <span className='list-item-label'>Description:</span>{' '}
                          {dataProduct.description}
                        </li>
                        <li className='list-group-item'>
                          <span className='list-item-label'>Catégorie:</span>{' '}
                          {dataProduct.category.label}
                        </li>
                        <li className='list-group-item'>
                          <span className='list-item-label'>Prix:</span>{' '}
                          {dataProduct.originalPrice}€
                        </li>
                        <li className='list-group-item'>
                          <span className='list-item-label'>Statut:</span>{' '}
                          {dataProduct.isActive ? 'actif' : 'inactif'}
                        </li>
                        <li className='list-group-item group-item-promo-historic'>
                          <span className='list-item-label'>
                            Historique des promotions:
                          </span>
                          {dataProduct.promotions?.map((promotion) => {
                            return (
                              <Fragment key={promotion['@id']}>
                                <br /> - Nom : {promotion.name}
                                <br /> - Date de début :{' '}
                                {moment(promotion.startDate).format('DD/MM/YY')}
                                <br /> - Date de fin :{' '}
                                {moment(promotion.endDate).format('DD/MM/YY')}
                                <br /> - Remise : {promotion.discountPercentage}
                                %{dataProduct.promotions.length > 1 && <br />}
                              </Fragment>
                            );
                          })}
                        </li>
                        <li className='list-group-item'>
                          <span className='list-item-label'>
                            {dataProduct.updated
                              ? 'Date de mise à jour'
                              : 'Date de création'}
                            :
                          </span>
                          <br />
                          {dataProduct.updated
                            ? moment(dataProduct.updatedAt).format(
                                'DD/MM/YYYY HH:MM:SS'
                              )
                            : moment(dataProduct.createdAt).format(
                                'DD/MM/YYYY HH:MM:SS'
                              )}
                        </li>
                        <li className='list-group-item'>
                          <span className='list-item-label'>Créé par:</span>
                          <br />
                          {dataProduct.user.fullName}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default ProductEdit;
