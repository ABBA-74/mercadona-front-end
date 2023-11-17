import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCrudNotification from '../../../hooks/useCrudNotification';

import { fetchErrorMessage } from '../../../data/errorMessages';
import { getCategory } from '../../../api/getCategory';
import { patchCategory } from '../../../api/patchCategory';
import { postImage } from '../../../api/postImage';

import CategoryOverview from './CategoryOverview';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader/Loader';
import './CategoryEdit.scss';
import { scrollTo } from '../../../utils/scrollTo';
import { useAuthLogout } from '../../../hooks/useAuthLogout';

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { logout } = useAuthLogout();
  const { showNotification } = useCrudNotification();
  const { id } = useParams();
  const [categoryValues, setCategoryValues] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [initialCategoryValues, setInitialCategoryValues] = useState(null);
  const [initialImageValues, setInitialImageValues] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imageValues, setImageValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const createCategoryAndImageValues = (category) => ({
    categoryValues: {
      label: category.label,
      description: category.description,
      isActive: category.isActive,
    },
    imageValues: category.image
      ? {
          label: category.image.label,
          description: category.image.description,
        }
      : {
          label: '',
          description: '',
        },
  });

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const category = await getCategory(id);
      setData(category);
      const { categoryValues, imageValues } =
        createCategoryAndImageValues(category);

      setInitialCategoryValues(categoryValues);
      setInitialImageValues(imageValues);

      setCategoryValues(categoryValues);
      setImageValues(imageValues);

      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      setError(err);
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
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

    formErrors = validateFile(imgFile, formErrors);

    return formErrors;
  };

  const validateFile = (file, formErrors) => {
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];

    if (file) {
      if (!validTypes.includes(file.type)) {
        formErrors.image['imgFile'] =
          'Formats acceptés: JPG, JPEG, PNG, WEBP, SVG.';
      }
      if (file.size > 2048000) {
        formErrors.image['imgFile'] =
          'La taille du fichier ne doit pas dépasser 2 Mo.';
      }
    }

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
      Object.keys(formErrors.image).length > 0
    ) {
      return;
    }
    try {
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
      await patchCategory(data.id, newCategoryData);

      showNotification('info', 'Mise à jour effectuée avec succès.');
      navigate('/dashboard/categories', { replace: true });
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

  const checkIfModifiedForm = () => {
    return (
      initialCategoryValues.label !== categoryValues.label ||
      initialCategoryValues.description !== categoryValues.description ||
      initialCategoryValues.isActive !== categoryValues.isActive ||
      initialImageValues.label !== imageValues.label ||
      initialImageValues.description !== imageValues.description ||
      imgFile
    );
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return (
    <section className='section-category-edit px-5 '>
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
      {!error && !isLoading && categoryValues && (
        <>
          <div className='section-category-edit-header text-center text-md-start mb-4 ps-0 ps-md-4'>
            <h3 className='h5'>Editer la categorie : {categoryValues.label}</h3>
          </div>
          <div className='section-category-edit-main mb-5 ps-0 ps-md-5'>
            <div className='row g-5 justify-content-between'>
              <div className='col-12 col-xl-7 section-category-edit-form border rounded mb-5 mb-lg-0 px-3 py-5 p-md-5'>
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
                        Image (Max: 2Mo)
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
                  <button
                    type='submit'
                    disabled={!checkIfModifiedForm()}
                    className='btn btn-primary mt-4 px-4'
                  >
                    Sauvegarder
                  </button>
                </form>
              </div>

              <CategoryOverview
                data={data}
                imgError={imgError}
                setImgError={setImgError}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryEdit;
