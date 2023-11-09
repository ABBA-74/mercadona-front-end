import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import avatarMan from './../../../assets/images/avatar-man.webp';
import avatarWoman from './../../../assets/images/avatar-woman.webp';
import userLocationMap from './../../../assets/images/user-location-map.webp';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getUser } from '../../../api/getUser';
import './UserEdit.scss';

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await getUser(id);
      setData(user);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', error);
      setError(err);
      if (err.response && err.response.data.code === 401) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <section className='section-user-edit px-5 '>
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
          <div className='section-user-edit-header text-center text-md-start mb-4 ps-0 ps-md-4'>
            <h3 className='h5'>Editer le profil employé de {data.fullName}</h3>
          </div>
          <div className='section-user-edit-main mb-5 ps-0 ps-md-5'>
            <div className='row gx-5 justify-content-between'>
              <div className='col-12 col-xl-7 section-user-edit-form border rounded mb-5 mb-xl-0 px-3 py-5 p-md-5'>
                <form>
                  <h4 className='h5 mb-4'>Information générale</h4>
                  <div className='row gx-4 form'>
                    <div className='col-6 col-sm-6 col-xxl-2 mb-3 align-self-start'>
                      <label className='form-label' htmlFor='gender'>
                        Civilité
                      </label>
                      <select className='form-select' id='gender'>
                        <option defaultValue></option>
                        <option value='1'>Mr</option>
                        <option value='2'>Mme</option>
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-4 mb-3'>
                      <label htmlFor='firstname' className='form-label'>
                        Prénom
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='firstname'
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='lastname' className='form-label'>
                        Nom
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='lastname'
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='email' className='form-label'>
                        Email
                      </label>
                      <input type='email' className='form-control' id='email' />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='jobTitle' className='form-label'>
                        Intitulé du poste
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='jobTitle'
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='phone' className='form-label'>
                        Téléphone
                      </label>
                      <input type='text' className='form-control' id='phone' />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='role' className='form-label'>
                        Role
                      </label>
                      <input type='text' className='form-control' id='role' />
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-4 mb-3'>
                      <label htmlFor='employmentStatus' className='form-label'>
                        Statut du poste
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='employmentStatus'
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-3 mb-3'>
                      <label
                        htmlFor='qualificationLevel'
                        className='form-label'
                      >
                        Niveau
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='qualificationLevel'
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-3 mb-3'>
                      <label
                        htmlFor='qualificationCoefficient'
                        className='form-label'
                      >
                        Coefficient
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='qualificationCoefficient'
                      />
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
                  <h4 className='h5 my-4'>Coordonnées</h4>
                  <div className='row gx-5 form'>
                    <div className='col-12 mb-3'>
                      <label htmlFor='address' className='form-label'>
                        Adresse
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='address'
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-md-5 col-xxl-3 mb-3'>
                      <label htmlFor='postalCode' className='form-label'>
                        Code Postal
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='postalCode'
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-5 mb-3'>
                      <label htmlFor='city' className='form-label'>
                        Ville
                      </label>
                      <input type='text' className='form-control' id='city' />
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary mt-4 px-4'>
                    Sauvegarder
                  </button>
                </form>
              </div>
              <div className='col-12 col-xl-5 col-xxl-4 section-user-edit-overview d-flex flex-column justify-content-start justify-content-xxl-between gx-0 gx-xl-4'>
                <div className='overview-wrapper-top rounded border mb-5 mb-xl-3 mb-xxl-0'>
                  <div className='overview-map'>
                    <img
                      src={userLocationMap}
                      width='100%'
                      height='50px'
                      className='img-map-bg'
                      alt="localisation de l'utilisateur"
                    />
                    <div className='pict-user-wrapper'>
                      <AccountCircleIcon className='avatar-pict avatar-pict-default' />
                      {/* <img
                          src={avatarWoman}
                          alt="photo de l'utilisateur"
                          className='avatar-pict'
                        /> */}
                    </div>
                  </div>
                  <div className='overview-summary-info text-center px-2 py-5'>
                    <p className='h5 mb-3 pt-3 pt-md-0 '>{data.fullName}</p>
                    <div className='mb-3'>
                      <EmailIcon size={20} className='me-2' />
                      <span>{data.email}</span>
                    </div>
                    <p className='mb-4'>Marseille - France</p>
                    <button className='btn btn-primary mx-auto px-4'>
                      Envoyer un message
                    </button>
                  </div>
                </div>
                <div className='overview-wrapper-bottom rounded border mb-5 mb-lg-0 px-3 py-5 p-md-5 '>
                  <div className='overview-social-links'>
                    <div className='overview-social-link-item mb-3'>
                      <LanguageIcon size={20} className='me-2' />
                      <span>Site web :</span>
                    </div>
                    <div className='overview-social-link-item mb-3'>
                      <FacebookIcon size={20} className='me-2' />
                      <span>Facebook :</span>
                    </div>
                    <div className='overview-social-link-item mb-3'>
                      <InstagramIcon size={20} className='me-2' />
                      <span>Instagram :</span>
                    </div>
                    <div className='overview-social-link-item'>
                      <TwitterIcon size={20} className='me-2' />
                      <span>Twitter :</span>
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

export default UserEdit;
