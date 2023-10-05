import PropTypes from 'prop-types';
import './ButtonOutline.scss';

const ButtonOutline = ({ label }) => {
  return (
    <>
      <button className='btn btn-outline'>{label}</button>
    </>
  );
};

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
};
export default ButtonOutline;
