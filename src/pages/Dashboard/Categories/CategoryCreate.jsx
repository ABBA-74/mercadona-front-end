import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCrudNotification from '../../../hooks/useCrudNotification';
import { postCategory } from '../../../api/postCategory';
import { postImage } from '../../../api/postImage';
import { scrollTo } from '../../../utils/scrollTo';
import CategoriesOverview from './CategoriesOverview';
import './CategoryCreate.scss';

const CategoryCreate = () => {
  const navigate = useNavigate();
  const { showNotification } = useCrudNotification();
  const [categoryValues, setCategoryValues] = useState({
    label: '',
    description: '',
    isActive: true,
  });
  const [imageValues, setImageValues] = useState({
    file: null,
    label: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    category: {},
    image: {},
  });

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;

    setCategoryValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleChangeImage = (e) => {
    const { name, value } = e.target;

    setImageValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const uploadImage = async (file) => {
    try {
      const uploadedImage = await postImage(
        file,
        imageValues.label,
        imageValues.description
      );
      return uploadedImage;
    } catch (error) {
      console.error('Error post image:', error);
      throw error;
    }
  };

  /*  Validation form  */
  const validationRules = {
    category: {
      label: { required: true, minLength: 2, maxLength: 100 },
      description: { required: true, minLength: 10, maxLength: 255 },
      isActive: {},
    },
    image: {
      label: { required: true, minLength: 2, maxLength: 100 },
      description: { required: true, minLength: 10, maxLength: 255 },
      imgFile: { required: true },
    },
  };

  const validateField = (type, name, value, rules) => {
    const errors = {};
    const ruleSet = rules[type][name];
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

    return errors;
  };

  const validateForm = (categoryValues, imageValues, rules) => {
    let formErrors = {
      category: {},
      image: {},
    };

    // Validation of category fields
    Object.keys(categoryValues).forEach((fieldName) => {
      const fieldErrors = validateField(
        'category',
        fieldName,
        categoryValues[fieldName],
        rules
      );
      if (fieldErrors[fieldName]) {
        formErrors.category[fieldName] = fieldErrors[fieldName];
      }
    });

    // Validation of image fields
    Object.keys(imageValues).forEach((fieldName) => {
      const fieldErrors = validateField(
        'image',
        fieldName,
        imageValues[fieldName],
        rules
      );
      if (fieldErrors[fieldName]) {
        formErrors.image[fieldName] = fieldErrors[fieldName];
      }
    });

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    scrollTo(0, 0);

    const formErrors = validateForm(
      categoryValues,
      imageValues,
      validationRules
    );
    setValidationErrors({});
    setValidationErrors(formErrors);

    if (
      Object.keys(formErrors.category).length > 0 ||
      Object.keys(formErrors.image).length > 0 ||
      !isFormComplet()
    ) {
      return;
    }

    try {
      setIsLoading(true);
      let newCategoryData = null;
      if (imgFile) {
        const imageResponse = await uploadImage(imgFile);
        newCategoryData = {
          ...categoryValues,
          image: `/api/images/${imageResponse.id}`,
        };
      } else {
        newCategoryData = {
          ...categoryValues,
          image: {
            label: imageValues.label,
            description: imageValues.description,
          },
        };
      }
      await postCategory(newCategoryData);

      showNotification('info', 'Mise à jour effectuée avec succès.');
      navigate('/dashboard/categories', { replace: true });
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

  const isFormComplet = () => {
    return (
      categoryValues.label &&
      categoryValues.description &&
      imageValues.label &&
      imageValues.description &&
      imgFile
    );
  };

  return (
    <section className='section-category-create px-5 '>
      <div className='section-category-create-header text-center text-md-start mb-4 ps-0 ps-md-4'>
        <h3 className='h5'>Créer une nouvelle categorie</h3>
      </div>
      <div className='section-category-create-main mb-5 ps-0 ps-md-5'>
        <div className='row g-5 justify-content-between'>
          <div className='col-12 col-xl-7 section-category-create-form border rounded mb-5 mb-lg-0 px-3 py-5 p-md-5'>
            <form onSubmit={handleSubmit} noValidate>
              <h4 className='h5 mb-4'>Informations de la catégorie</h4>
              <div className='row gx-4 form'>
                <div className='col-12 col-sm-6 mb-3'>
                  <label htmlFor='label' className='form-label'>
                    Nom de la catégorie
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='label'
                    name='label'
                    placeholder='Nom de la catégorie'
                    value={categoryValues.label}
                    onChange={handleChangeCategory}
                  />
                  {validationErrors.category.label && (
                    <div className='invalid-feedback-msg'>
                      {validationErrors.category.label}
                    </div>
                  )}
                </div>

                <div className='form-check form-switch col-12 col-sm-6 col-xxl-2 d-flex flex-column mb-3 px-4'>
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
                    id='activeStatus'
                    name='isActive'
                    checked={categoryValues.isActive}
                    onChange={(e) =>
                      setCategoryValues((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                </div>

                <div className='col-12 mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description de la catégorie
                  </label>
                  <textarea
                    className='form-control textarea-description'
                    placeholder='Description de la catégorie'
                    id='description'
                    name='description'
                    style={{ height: '120px' }}
                    value={categoryValues.description}
                    onChange={handleChangeCategory}
                  ></textarea>
                  {validationErrors.category.description && (
                    <div className='invalid-feedback-msg'>
                      {validationErrors.category.description}
                    </div>
                  )}
                </div>
              </div>

              <h4 className='h5 my-4'>Informations de l&apos;image</h4>
              <div className='row gx-4 form'>
                <div className='col-12 col-sm-6 mb-3'>
                  <label htmlFor='label' className='form-label'>
                    Nom de l&apos;image
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='label'
                    name='label'
                    placeholder='Label de la catégorie'
                    value={imageValues.label}
                    onChange={handleChangeImage}
                  />
                  {validationErrors.image.label && (
                    <div className='invalid-feedback-msg'>
                      {validationErrors.image.label}
                    </div>
                  )}
                </div>

                <div className='col-12 col-sm-6 mb-3'>
                  <label htmlFor='categoryImageFile' className='form-label'>
                    Image
                  </label>
                  <input
                    type='file'
                    name='imgFile'
                    className='form-control'
                    id='categoryImageFile'
                    onChange={(e) => setImgFile(e.target.files[0])}
                  />
                  {validationErrors.image.imgFile && (
                    <div className='invalid-feedback-msg'>
                      {validationErrors.image.imgFile}
                    </div>
                  )}
                </div>

                <div className='col-12 mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description de l&apos;image
                  </label>
                  <textarea
                    className='form-control textarea-description'
                    placeholder='Description de la catégorie'
                    id='description'
                    name='description'
                    style={{ height: '120px' }}
                    value={imageValues.description}
                    onChange={handleChangeImage}
                  ></textarea>
                  {validationErrors.image.description && (
                    <p className='invalid-feedback-msg'>
                      {validationErrors.image.description}
                    </p>
                  )}
                </div>
              </div>
              <button type='submit' className='btn btn-primary mt-4 px-4'>
                Sauvegarder
              </button>
            </form>
          </div>

          <CategoriesOverview />
        </div>
      </div>
    </section>
  );
};

export default CategoryCreate;
