import './CrudNotification.scss';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

const CrudNotification = ({ type, message }) => {
  // type : error | warning | info | success
  return (
    <>
      <span className='alert-crud-notification'>
        <Alert variant='filled' severity={type}>
          {message}
        </Alert>
      </span>
    </>
  );
};

CrudNotification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default CrudNotification;
