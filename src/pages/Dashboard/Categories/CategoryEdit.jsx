import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import { API_URL_IMG } from '../../../api/apiConfig';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getCategory } from '../../../api/getCategory';
import './categoryEdit.scss';

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const category = await getCategory(id);
      setData(category);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      setError(err);
      if (err.response && err.response.data.code === 401) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return (
    <section className='section-category-edit px-5 '>
      {error && (
        <section className='section-error-fetch-msg'>
          <ErrorMessage
            title={fetchErrorMessage.title}
            message={fetchErrorMessage.message}
          />
        </section>
      )}
      {!error && !isLoading && data && (
        <>
          <div className='section-category-edit-header text-center text-md-start mb-4 ps-0 ps-md-4'>
            <h3 className='h5'>Editer la categorie : {data.label}</h3>
          </div>
          <div className='section-category-edit-main mb-5 ps-0 ps-md-5'>
            <div className='row g-5 justify-content-between'>
              <div className='col-12 col-xl-7 section-category-edit-form border rounded mb-5 mb-lg-0 px-3 py-5 p-md-5'>
                <form>
                  <h4 className='h5 mb-4'>Informations de la catégorie</h4>
                  <div className='row gx-4 form'>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='label' className='form-label'>
                        Label
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='label'
                        placeholder='Label de la catégorie'
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='categoryImageFile' className='form-label'>
                        Image
                      </label>
                      <input
                        type='file'
                        className='form-control'
                        id='categoryImageFile'
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label htmlFor='description' className='form-label'>
                        Description
                      </label>
                      <textarea
                        className='form-control textarea-description'
                        placeholder='Description de la catégorie'
                        id='description'
                      ></textarea>
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
                        value=''
                        id='activeStatus'
                      />
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary mt-4 px-4'>
                    Sauvegarder
                  </button>
                </form>
              </div>
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
                        {data.updated ? 'Mise à jour par' : 'Créé par'}:{' '}
                        {data.user?.fullName}
                      </p>
                      <p className='mb-0'>
                        Date de création:
                        <br />
                        {data.updated
                          ? moment(data.updatedAt).format('DD/MM/YYYY HH:MM:SS')
                          : moment(data.createdAt).format(
                              'DD/MM/YYYY HH:MM:SS'
                            )}
                      </p>
                    </div>
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

export default CategoryEdit;
