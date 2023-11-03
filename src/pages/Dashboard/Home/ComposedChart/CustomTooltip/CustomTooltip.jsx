import './CustomTooltip.scss';
import PropTypes from 'prop-types';

const getIntroOfPage = (label) => {
  if (label === 'Janv') {
    return 'Janvier';
  }
  if (label === 'Fev') {
    return 'Février';
  }
  if (label === 'Juil') {
    return 'Juillet';
  }
  if (label === 'Sept') {
    return 'Septembre';
  }
  if (label === 'Oct') {
    return 'Octobre';
  }
  if (label === 'Nov') {
    return 'Novembre';
  }
  if (label === 'Dec') {
    return 'Décembre';
  }
  return label;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label mb-2'>{`${getIntroOfPage(label)}`}</p>
        <p
          style={{ color: '#7DB7FD' }}
          className='label mb-2'
        >{`${payload[0].name} : ${payload[0].value} €`}</p>
        <p
          style={{ color: '#388e3c8a' }}
          className='label mb-2'
        >{`${payload[1].name} : ${payload[1].value} €`}</p>
        <p
          style={{ color: '#FF9800' }}
          className='label mb-2'
        >{`${payload[2].name} : ${payload[2].value} `}</p>
        <p
          style={{ color: '#D32F2F' }}
          className='label mb-0'
        >{`${payload[3].name} : ${payload[3].value} `}</p>
      </div>
    );
  }
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
export default CustomTooltip;
