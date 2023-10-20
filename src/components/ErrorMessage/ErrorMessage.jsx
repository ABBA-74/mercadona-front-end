import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({ title, message }) => {
  return (
    <div
      className='error-msg d-flex flex-column 
    align-items-center justify-content-center my-5'
    >
      <h2 className='mb-4'>{title}</h2>
      <p className='alert alert-warning'>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default ErrorMessage;
