import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { getProducts } from '../../../api/getProducts';
import { postPromotion } from '../../../api/postPromotion';
import { useAuthLogout } from '../../../hooks/useAuthLogout';
import useCrudNotification from '../../../hooks/useCrudNotification';
import PromotionsOverview from './PromotionsOverview';
import './PromotionCreate.scss';

const PromotionCreate = () => {
  const navigate = useNavigate();
  const { logout } = useAuthLogout();
  const { showNotification } = useCrudNotification();
  const [dataProducts, setDataProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      return errors;
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
      errors[
        name
      ] = `La valeur doit être supérieure ou égale à ${ruleSet.min}%.`;
    }
    if (ruleSet?.max && value > ruleSet.max) {
      errors[
        name
      ] = `La valeur doit être inférieure ou égale à ${ruleSet.max}%.`;
    }

    if (name === 'discountPercentage') {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        errors[name] = 'Veuillez entrer un nombre valide.';
      } else if (!Number.isInteger(numericValue)) {
        errors[name] = 'Veuillez entrer un entier compris entre 5 à 80.';
      }
    }

    return errors;
  };

  const validateDates = (startDate, endDate) => {
    const errors = {};

    // validation startDate
    if (moment(startDate).isBefore(moment())) {
      errors.startDate = 'La date de début doit être au minimum pour demain.';
    }

    if (moment(startDate).isSameOrAfter(moment().add(2, 'y'))) {
      errors.startDate = 'La date de début ne doit pas être supérieur à 2 ans.';
    }
    // validation endDate
    if (moment(endDate).isBefore(startDate)) {
      errors.endDate =
        'La date de fin doit être postérieure à la date de début.';
    }

    if (moment(endDate).isSameOrAfter(moment().add(2, 'y'))) {
      errors.endDate = 'La date de fin ne doit pas être supérieur à 2 ans.';
    }

    if (moment(endDate).isSame(moment())) {
      errors.endDate = 'La date de fin doit être au minimum pour demain.';
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

    if (Object.keys(formErrors).length > 0 || !isFormComplet()) {
      return;
    }

    try {
      let newPromotionData = formValues;

      const products = formValues.products?.map((item) =>
        item.replace('/active', '')
      );

      newPromotionData = {
        ...formValues,
        discountPercentage: parseInt(formValues.discountPercentage),
        startDate: moment.utc(newPromotionData.startDate).toISOString(),
        endDate: moment.utc(newPromotionData.endDate).toISOString(),
        products: products,
      };

      await postPromotion(newPromotionData);
      showNotification('info', 'Mise à jour effectuée avec succès.');
      navigate('/dashboard/promotions', { replace: true });
    } catch (err) {
      console.error('Error updating data:', err);

      let errorMessage = 'Une erreur est survenue lors de la mise à jour.';

      if (!err.response) {
        errorMessage = 'Problème de connexion ou erreur réseau.';
      } else if (err.response.status === 401) {
        logout();
        return;
      } else if (err.response.status === 400 || err.response.status === 422) {
        errorMessage =
          'Certains champs ne répondent pas aux exigences du serveur.';
      }

      showNotification('error', errorMessage);
    }
  };

  const isFormComplet = () => {
    return (
      formValues.name &&
      formValues.discountPercentage &&
      formValues.startDate &&
      formValues.endDate
    );
  };

  const fetchProducts = async () => {
    setError(null);
    try {
      setIsLoading(true);
      const { products } = await getProducts(1, null, true, false);
      setDataProducts(products);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      setError(err || 'Une erreur inattendue est survenue');
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className='section-promotion-create px-5 '>
      <div className='section-promotion-create-header text-center text-md-start mb-4 ps-0 ps-md-4'>
        <h3 className='h5'>Créer une nouvelle promotion</h3>
      </div>
      <div className='section-promotion-create-main mb-5 ps-0 ps-md-5'>
        <div className='row gx-5 justify-content-between align-items-start'>
          <div className='col-12 col-xl-7 section-promotion-create-form border rounded mb-5 mb-xl-0 px-3 py-5 p-md-5'>
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
                    {validationErrors.discountPercentage && (
                      <div className='invalid-feedback-msg'>
                        {validationErrors.discountPercentage}
                      </div>
                    )}
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
                    style={{ height: '100' }}
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
                    style={{ height: '100' }}
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
                  {dataProducts && (
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
                  )}
                  {isLoading && (
                    <div className='wrapper-loading-products'>
                      <CircularProgress />
                    </div>
                  )}
                  {error && (
                    <li className='wrapper-loading-products'>
                      Erreur lors du chargement des produits
                    </li>
                  )}
                </div>
              </div>
              <button type='submit' className='btn btn-primary mt-4 px-4'>
                Sauvegarder
              </button>
            </form>
          </div>
          <PromotionsOverview />
        </div>
      </div>
    </section>
  );
};

export default PromotionCreate;
