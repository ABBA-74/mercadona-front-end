import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCrudNotification from '../../../hooks/useCrudNotification';
import moment from 'moment';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader/Loader';
import PromotionOverview from './PromotionOverview';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getProducts } from '../../../api/getProducts';
import { getPromotion } from '../../../api/getPromotion';
import { patchPromotion } from '../../../api/patchPromotion';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HistoryIcon from '@mui/icons-material/History';
import UpdateIcon from '@mui/icons-material/Update';
import './PromotionEdit.scss';

const PromotionEdit = () => {
  const { showNotification } = useCrudNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataPromotion, setDataPromotion] = useState(null);
  const [dataProducts, setDataProducts] = useState(null);
  const [error, setError] = useState(null);
  const [initialPromotionValues, setInitialPromotionValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPromoStatus, setCurrentPromoStatus] = useState({
    color: '',
    value: '',
    icon: null,
  });
  const [validationErrors, setValidationErrors] = useState({
    promotion: {},
  });
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
      setInitialPromotionValues(promotion);
      setFormValues({
        name: promotion.name,
        discountPercentage: promotion.discountPercentage.toString(),
        description: promotion.description,
        conditions: promotion.conditions,
        startDate: moment(promotion.startDate).format('YYYY-MM-DD'),
        endDate: moment(promotion.endDate).format('YYYY-MM-DD'),
        products: promotion.products?.map((product) => product['@id']),
      });
      const { status, color, icon } = getPromotionStatus(
        promotion.startDate,
        promotion.endDate
      );
      setCurrentPromoStatus({ value: status, color: color, icon: icon });
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

  /*  Validation form  */
  const validationRules = {
    name: { required: true, minLength: 2, maxLength: 100 },
    discountPercentage: { required: true, min: 5, max: 80 },
    description: { minLength: 2, maxLength: 300 },
    conditions: { minLength: 2, maxLength: 300 },
    startDate: { required: true },
    endDate: { required: true },
  };

  const validateField = (name, value, rules) => {
    const errors = {};
    const ruleSet = rules[name];
    const trimmedValue = typeof value === 'string' ? value.trim() : '';

    if (ruleSet?.required && !trimmedValue) {
      errors[name] = 'Ce champ est requis.';
    }
    if (
      ruleSet?.minLength &&
      trimmedValue &&
      trimmedValue.length < ruleSet.minLength
    ) {
      errors[name] = `Doit contenir au moins ${ruleSet.minLength} caractères.`;
    }
    if (ruleSet?.maxLength && trimmedValue.length > ruleSet.maxLength) {
      errors[name] = `Doit contenir moins de ${ruleSet.maxLength} caractères.`;
    }
    if (ruleSet?.min && value < ruleSet.min) {
      errors[name] = `La valeur doit être supérieure à ${ruleSet.min} %.`;
    }
    if (ruleSet?.max && value > ruleSet.max) {
      errors[name] = `La valeur doit être inférieure à ${ruleSet.max} %.`;
    }

    return errors;
  };

  const validateDates = (startDate, endDate) => {
    const errors = {};
    const startDatePromotion = moment(dataPromotion.startDate).format(
      'YYYY-MM-DD'
    );
    const endDatePromotion = moment(dataPromotion.endDate).format('YYYY-MM-DD');

    if (startDate !== startDatePromotion) {
      errors.startDate = 'La date de début ne doit pas être modifié.';
    }

    if (endDate !== endDatePromotion) {
      errors.endDate = 'La date de fin ne doit pas être modifié.';
    }

    return errors;
  };

  const validateForm = (dataPromotion, rules) => {
    let formErrors = {};

    // Validation of category fields
    Object.keys(dataPromotion).forEach((fieldName) => {
      const fieldErrors = validateField(
        fieldName,
        dataPromotion[fieldName],
        rules
      );
      if (fieldErrors[fieldName]) {
        formErrors[fieldName] = fieldErrors[fieldName];
      }
    });

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    scrollTo(0, 0);

    let formErrors = validateForm(formValues, validationRules);
    const dateErrors = validateDates(formValues.startDate, formValues.endDate);
    formErrors = { ...formErrors, ...dateErrors };

    setValidationErrors({});
    setValidationErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const products = formValues.products.map((item) =>
      item.replace('/active', '')
    );

    const newPromotionData = {
      ...formValues,
      discountPercentage: +formValues.discountPercentage,
      products,
    };
    delete newPromotionData.startDate;
    delete newPromotionData.endDate;

    try {
      await patchPromotion(dataPromotion.id, newPromotionData);
      showNotification('info', 'Mise à jour effectuée avec succès.');
      navigate('/dashboard/promotions', { replace: true });
    } catch (error) {
      console.error('Error updating data:', error);
      if (!error.response) {
        showNotification('error', 'Problème de connexion ou erreur réseau.');
      } else if (
        error.response.status === 400 ||
        error.response.status === 422
      ) {
        showNotification(
          'error',
          'Certains champs ne répondent pas aux exigences du serveur.'
        );
      } else {
        showNotification(
          'error',
          'Une erreur est survenue lors de la mise à jour.'
        );
      }
    }
  };

  const getPromotionStatus = (startDate, endDate) => {
    const now = moment();
    if (now.isBetween(startDate, endDate)) {
      return {
        status: 'Encours',
        color: 'green',
        icon: <UpdateIcon style={{ color: '#06690680' }} />,
      };
    } else if (now.isAfter(endDate)) {
      return {
        status: 'Terminé',
        color: 'red',
        icon: <HistoryIcon style={{ color: '#ff000080' }} />,
      };
    } else {
      return {
        status: 'À venir',
        color: '#095262',
        icon: (
          <EventAvailableIcon
            style={{ color: '#09526280', fontWeight: '400' }}
          />
        ),
      };
    }
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };
  const checkIfModifiedForm = () => {
    const formatInitialPromoStartDate = formatDate(
      initialPromotionValues.startDate
    );
    const formatInitialPromoEndDate = formatDate(
      initialPromotionValues.endDate
    );

    return (
      initialPromotionValues.name !== formValues.name ||
      initialPromotionValues.description !== formValues.description ||
      initialPromotionValues.conditions !== formValues.conditions ||
      initialPromotionValues.discountPercentage !==
        +formValues.discountPercentage ||
      formatInitialPromoStartDate !== formValues.startDate ||
      formatInitialPromoEndDate !== formValues.endDate ||
      initialPromotionValues.products.toString() !==
        formValues.products.toString()
    );
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
                <form onSubmit={handleSubmit} noValidate>
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
                      {validationErrors.name && (
                        <div className='invalid-feedback-msg'>
                          {validationErrors.name}
                        </div>
                      )}
                    </div>
                    <div className='col-6 col-lg-3 col-xl-6 col-xxl-3 mb-3 form-group'>
                      <label htmlFor='discount' className='form-label'>
                        Réduction
                      </label>
                      <div className='input-group'>
                        <input
                          type='number'
                          className='form-control'
                          id='discount'
                          name='discountPercentage'
                          min={5}
                          max={80}
                          aria-label='Réduction en pourcentage (par exemple, 10%)'
                          value={formValues.discountPercentage}
                          onChange={handleChange}
                        />
                        <span className='input-group-text'>%</span>
                        {validationErrors.discountPercentage && (
                          <div className='invalid-feedback-msg'>
                            {validationErrors.discountPercentage}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='col-6 col-lg-3 col-xl-6 col-xxl-3 mb-3'>
                      <label htmlFor='status' className='form-label'>
                        Statut
                      </label>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control'
                          id='status'
                          disabled
                          aria-label='Information du statut actuel de la promotion'
                          style={{ color: currentPromoStatus.color }}
                          value={currentPromoStatus.value}
                        />

                        <span className='input-group-text'>
                          {currentPromoStatus.icon}
                        </span>
                      </div>
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
                        style={{ height: '120px' }}
                        value={formValues.description}
                        onChange={handleChange}
                      />
                      {validationErrors.description && (
                        <div className='invalid-feedback-msg'>
                          {validationErrors.description}
                        </div>
                      )}
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
                        style={{ height: '120px' }}
                        value={formValues.conditions}
                        onChange={handleChange}
                      />
                      {validationErrors.conditions && (
                        <div className='invalid-feedback-msg'>
                          {validationErrors.conditions}
                        </div>
                      )}
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
                        disabled
                        onChange={handleChange}
                        value={formValues.startDate}
                        aria-label='Date de début de la promotion'
                      />
                      {validationErrors.startDate && (
                        <div className='invalid-feedback-msg'>
                          {validationErrors.startDate}
                        </div>
                      )}
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
                        disabled
                        onChange={handleChange}
                        value={formValues.endDate}
                        aria-label='Date de fin de la promotion'
                      />
                      {validationErrors.endDate && (
                        <div className='invalid-feedback-msg'>
                          {validationErrors.endDate}
                        </div>
                      )}
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
                  <button
                    type='submit'
                    disabled={!checkIfModifiedForm()}
                    className='btn btn-primary mt-4 px-4'
                  >
                    Sauvegarder
                  </button>
                </form>
              </div>

              <PromotionOverview dataPromotion={dataPromotion} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PromotionEdit;
