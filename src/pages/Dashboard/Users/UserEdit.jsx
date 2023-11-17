import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import avatarMan from './../../../assets/images/avatar-man.webp';
import avatarWoman from './../../../assets/images/avatar-woman.webp';
import userLocationMap from './../../../assets/images/user-location-map.webp';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { fetchErrorMessage } from '../../../data/errorMessages';
import { getUser } from '../../../api/getUser';
import './UserEdit.scss';
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';
import { useAuthLogout } from '../../../hooks/useAuthLogout';

const UserEdit = () => {
  const { logout } = useAuthLogout();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await getUser(id);

      setData(user);
      setFormValues({
        gender: user.gender,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phone: user.phone,
        isActive: user.isActive,
        internalNotes: user.internalNotes,
        jobTitle: user.jobs[0]?.jobTitle,
        jobCategory: user.jobs[0]?.jobCategory,
        jobLevel: user.jobs[0]?.jobLevel,
        coefficient: user.jobs[0]?.coefficient,
        employmentType: user.jobs[0]?.employmentType,
        hireDate: moment(user.jobs[0]?.hireDate).format('YYYY-MM-DD'),
        address: user.addresses[0]?.address,
        city: user.addresses[0]?.city,
        postalCode: user.addresses[0]?.postalCode,
        // image: '',
      });
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', error);
      setError(err);
      if (err.response && err.response.status === 401) {
        logout();
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
      {!error && !isLoading && data && formValues && (
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
                    <div className='col-4 col-sm-6 col-xxl-2 mb-3 align-self-start'>
                      <label className='form-label' htmlFor='gender'>
                        Civilité
                      </label>
                      <select
                        className='form-select'
                        id='gender required'
                        name='gender'
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        value={formValues.gender}
                      >
                        <option value=''> - </option>
                        <option value='Mr'>Mr</option>
                        <option value='Mme'>Mme</option>
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
                        name='firstname'
                        placeholder="Prénom de l'employé"
                        required
                        value={formValues.firstname}
                        onChange={handleChange}
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
                        name='lastname'
                        placeholder="Nom de l'employé"
                        required
                        value={formValues.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='email' className='form-label'>
                        Email
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        placeholder="Email de l'employé"
                        required
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-4 mb-3'>
                      <label htmlFor='phone' className='form-label'>
                        Téléphone
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='phone'
                        name='phone'
                        placeholder="Numéro de téléphone de l'employé"
                        value={formValues.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className='form-check form-switch col-12 col-sm-6 col-xxl-2 d-flex flex-column mb-3 px-4'>
                      <label
                        className='form-check-label mb-3'
                        htmlFor='isActive'
                      >
                        Actif
                      </label>
                      <input
                        className='form-check-input ms-0 mt-0'
                        type='checkbox'
                        role='switch'
                        id='isActive'
                        name='isActive'
                        checked={formValues.isActive}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label htmlFor='internalNotes' className='form-label'>
                        Notes internes
                      </label>
                      <textarea
                        className='form-control textarea-description'
                        placeholder="Notes internes sur l'employé (compétences, observations)"
                        id='internalNotes'
                        name='internalNotes'
                        style={{ height: '120px' }}
                        value={formValues.internalNotes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <h4 className='h5 my-4'>Information sur le poste</h4>
                  <div className='row gx-4 form'>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='jobTitle' className='form-label'>
                        Intitulé du poste
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='jobTitle'
                        name='jobTitle'
                        placeholder='ex. Technico-commercial'
                        required
                        value={formValues.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='jobCategory' className='form-label'>
                        Catégorie du poste
                      </label>
                      <select
                        className='form-select'
                        id='gender required'
                        name='gender'
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            jobCategory: e.target.value,
                          }))
                        }
                        value={formValues.jobCategory}
                      >
                        <option value=''> - </option>
                        <option value='Cadre'>Cadre</option>
                        <option value='Ingénieur'>Ingénieur</option>
                        <option value='Administratif'>Administratif</option>
                        <option value='Commercial'>Commercial</option>
                        <option value='Opérationnel'>Opérationnel</option>
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-3 mb-3'>
                      <label htmlFor='jobLevel' className='form-label'>
                        Echelon
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='jobLevel'
                        name='jobLevel'
                        placeholder='ex. 3, 4, 5'
                        required
                        value={formValues.jobLevel}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-3 mb-3'>
                      <label htmlFor='coefficient' className='form-label'>
                        Coefficient
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='coefficient'
                        name='coefficient'
                        placeholder='ex. 195, 225, 245'
                        required
                        value={formValues.coefficient}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 mb-3'>
                      <label htmlFor='jobCategory' className='form-label'>
                        Type du poste
                      </label>
                      <select
                        className='form-select'
                        id='gender required'
                        name='gender'
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            employmentType: e.target.value,
                          }))
                        }
                        value={formValues.employmentType}
                      >
                        <option value=''> - </option>
                        <option value='Temps plein'>Temps plein</option>
                        <option value='Temps partiel'>Temps partiel</option>
                        <option value='Contractuel'>Contractuel</option>
                        <option value='Stagiaire'>Stagiaire</option>
                        <option value='Temporaire'>Temporaire</option>
                      </select>
                    </div>
                    <div className='col-12 col-sm-6 col-xxl-5 mb-3'>
                      <label htmlFor='hireDate' className='form-label'>
                        Date d&apos;entrée
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        id='hireDate'
                        name='hireDate'
                        onChange={handleChange}
                        value={formValues.hireDate}
                        aria-label='Date de début de la promotion'
                      />
                    </div>
                  </div>
                  <h4 className='h5 my-4'>Coordonnées</h4>
                  <div className='row gx-4 form'>
                    <div className='col-12 mb-3'>
                      <label htmlFor='address' className='form-label'>
                        Adresse
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='address'
                        name='address'
                        placeholder='ex. 12 Rue de la Poste'
                        required
                        value={formValues.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-4 col-xxl-3 mb-3'>
                      <label htmlFor='postalCode' className='form-label'>
                        Code Postal
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='postalCode'
                        name='postalCode'
                        placeholder='ex. 74000'
                        required
                        value={formValues.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-5 mb-3'>
                      <label htmlFor='city' className='form-label'>
                        Ville
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='city'
                        name='city'
                        placeholder='ex. Annecy'
                        required
                        value={formValues.city}
                        onChange={handleChange}
                      />
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
                    <p className='mb-4'>{data.addresses[0].city} - France</p>
                    <button className='btn btn-primary mx-auto px-4'>
                      Envoyer un message
                    </button>
                  </div>
                </div>
                <div className='overview-wrapper-bottom rounded border mb-5 mb-lg-0 px-3 py-5 p-md-5 '>
                  <div className='overview-social-links'>
                    <ul className='list-group'>
                      <li className='list-group-item'>
                        <span className='list-item-label'>Nom Complet:</span>{' '}
                        {data.fullName}
                      </li>
                      <li className='list-group-item'>
                        <span className='list-item-label'>Age:</span>{' '}
                        {moment().diff(data.dateOfBirth, 'years')} ans
                      </li>
                      <li className='list-group-item'>
                        <span className='list-item-label'>
                          Intitulé du poste:
                        </span>
                        <br />
                        {data.jobs[0].jobTitle}
                      </li>
                      <li className='list-group-item'>
                        <span className='list-item-label'>Type de poste: </span>
                        {data.jobs[0].employmentType}
                      </li>
                      <li className='list-group-item'>
                        <span className='list-item-label'>Ancienneté: </span>
                        {moment().diff(
                          moment(data.jobs[0].hireDate),
                          'years'
                        )}{' '}
                        ans
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

export default UserEdit;
