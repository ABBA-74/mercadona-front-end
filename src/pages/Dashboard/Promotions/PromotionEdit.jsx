import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getProducts } from '../../../api/getProducts';
import { getPromotion } from '../../../api/getPromotion';
import './PromotionEdit.scss';
import Loader from '../../../components/Loader/Loader';

const PromotionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataPromotion, setDataPromotion] = useState(null);
  const [dataProducts, setDataProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    discountPercentage: '',
    description: '',
    conditions: '',
    startDate: '',
    endDate: '',
    products: [],
  });

  const fetchPromotionAndProducts = async () => {
    setIsLoading(true);
    try {
      const [promotion, { products }] = await Promise.all([
        getPromotion(id),
        getProducts(1, null, true, false),
      ]);
      setDataPromotion(promotion);
      setDataProducts(products);
      setFormValues({
        name: promotion.name,
        discountPercentage: promotion.discountPercentage.toString(),
        description: promotion.description,
        conditions: promotion.conditions,
        startDate: moment(promotion.startDate).format('YYYY-MM-DD'),
        endDate: moment(promotion.endDate).format('YYYY-MM-DD'),
        products: promotion.products?.map((product) => product['@id']),
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

  useEffect(() => {
    fetchPromotionAndProducts();
  }, [id]);

  return (
    <section className='section-promotion-edit px-5 '>
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
      {!error && !isLoading && dataProducts && dataPromotion && (
        <>
          <div className='section-promotion-edit-header text-center text-md-start mb-4 ps-0 ps-md-4'>
            <h3 className='h5'>Editer la promotion {dataPromotion.name}</h3>
          </div>
          <div className='section-promotion-edit-main mb-5 ps-0 ps-md-5'>
            <div className='row gx-5 justify-content-between'>
              <div className='col-12 col-xl-7 section-promotion-edit-form border rounded mb-5 mb-xl-0 px-3 py-5 p-md-5'>
                <h4 className='h5 mb-4'>Informations de la promotion</h4>
                <form>
                  <div className='row gx-4 form'>
                    <div className='col-12 col-lg-6 mb-3'>
                      <label htmlFor='name' className='form-label'>
                        Nom
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        placeholder='Nom de la promotion'
                        value={formValues.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-6 col-lg-3 mb-3 form-group'>
                      <label htmlFor='discount' className='form-label'>
                        Réduction
                      </label>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control'
                          id='discount'
                          name='discountPercentage'
                          aria-label='Réduction en pourcentage (par exemple, 10%)'
                          value={formValues.discountPercentage}
                          onChange={handleChange}
                        />
                        <span className='input-group-text'>%</span>
                      </div>
                    </div>
                    <div className='col-6 col-lg-3 mb-3'>
                      <label htmlFor='status' className='form-label'>
                        Statut
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='status'
                        readOnly
                        aria-label='Information du statut actuel de la promotion'
                        style={{
                          color: moment(dataPromotion.endDate).isSameOrAfter(
                            moment()
                          )
                            ? 'green'
                            : 'red',
                        }}
                        value={
                          moment(dataPromotion.endDate).isSameOrAfter(moment())
                            ? 'Encours'
                            : 'Terminé'
                        }
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label htmlFor='description' className='form-label'>
                        Description
                      </label>
                      <textarea
                        className='form-control textarea-description'
                        placeholder='Description de la promotion'
                        id='description'
                        name='description'
                        style={{ height: '100' }}
                        value={formValues.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label htmlFor='conditions' className='form-label'>
                        Conditions
                      </label>
                      <textarea
                        className='form-control textarea-conditions'
                        placeholder='Conditions spécifiques que les clients doivent remplir pour bénéficier de la promotion'
                        id='conditions'
                        name='conditions'
                        style={{ height: '100' }}
                        value={formValues.conditions}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-lg-6 col-xxl-5 mb-3'>
                      <label htmlFor='startDate' className='form-label'>
                        Date de début
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        id='startDate'
                        name='startDate'
                        onChange={handleChange}
                        value={formValues.startDate}
                        aria-label='Date de début de la promotion'
                      />
                    </div>
                    <div className='col-12 col-lg-6 col-xxl-5 offset-xxl-2 mb-3'>
                      <label htmlFor='endDate' className='form-label'>
                        Date de fin
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        id='endDate'
                        name='endDate'
                        onChange={handleChange}
                        value={formValues.endDate}
                        aria-label='Date de fin de la promotion'
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label htmlFor='products' className='form-label'>
                        Produit(s) associé(s)
                      </label>
                      <select
                        className='form-select products-list'
                        multiple
                        name='products'
                        aria-label='Information de la liste des produits concernés par la promotion'
                        onChange={handleChange}
                        value={formValues.products}
                      >
                        {dataProducts.length > 0 &&
                          dataProducts.map((item) => (
                            <option
                              key={item.id}
                              value={'/api/products/active/' + item.id}
                            >
                              - {item.label}
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
              <div className='col-12 col-xl-5 col-xxl-4 section-promotion-edit-overview d-flex flex-column justify-content-start justify-content-xxl-between gx-0 gx-xl-4'>
                <div className='overview-wrapper rounded border mb-5 mb-xl-3 mb-xxl-0 px-3 py-5 p-md-5'>
                  <h4 className='h5 mb-4'>Détails de la promotion</h4>
                  <div className='overview-content'>
                    <ul className='list-group'>
                      <li className='list-group-item'>
                        Nom: {dataPromotion.name}
                      </li>
                      <li className='list-group-item'>
                        Date de début:
                        <br />
                        {moment(dataPromotion.startDate).format('DD/MM/YYYY')}
                      </li>
                      <li className='list-group-item'>
                        Date de fin:
                        <br />
                        {moment(dataPromotion.endDate).format('DD/MM/YYYY')}
                      </li>
                      <li className='list-group-item'>
                        Qtt de produits associés:{' '}
                        {dataPromotion.products.length}
                      </li>
                      <li className='list-group-item'>
                        Créé par:
                        <br />
                        {dataPromotion.user.fullName}
                      </li>
                      <li className='list-group-item'>
                        {dataPromotion.updated
                          ? 'Date de mise à jour'
                          : 'Date de création'}
                        : <br />
                        {dataPromotion.updated
                          ? moment(dataPromotion.updatedAt).format(
                              'DD/MM/YYYY HH:MM:SS'
                            )
                          : moment(dataPromotion.createdAt).format(
                              'DD/MM/YYYY HH:MM:SS'
                            )}
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

export default PromotionEdit;
