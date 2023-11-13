import PropTypes from 'prop-types';
import moment from 'moment';
import './CustomTooltip.scss';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const labelPayload = payload[0].name;
    const formattedLabelPayload =
      labelPayload.charAt(0).toUpperCase() + labelPayload.slice(1);
    return (
      <div className='custom-tooltip'>
        <p className='label mb-2'>{`${moment(label).format('DD/MM/YY')}`}</p>
        <p
          style={{ color: '#7DB7FD' }}
          className='label mb-2'
        >{`${formattedLabelPayload} : ${payload[0].value.toFixed(2)} €`}</p>
      </div>
    );
  }
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default CustomTooltip;
