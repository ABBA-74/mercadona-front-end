import PropTypes from 'prop-types';
import RadialChart from './../RadialChart/RadialChart';
import './FeaturedInfo.scss';

const FeaturedInfo = (props) => {
  const {
    index,
    title,
    signe,
    value,
    valuePercentage,
    titleValuePercentage,
    unit,
    color,
  } = props;
  return (
    <div className='featured'>
      <div className='featured-item'>
        <h4 className='featured-title h5'>{title}</h4>
        <div className='featured-value-container'>
          <div className='featured-item-left'>
            <div className='featured-value-icon-wrapper'>{signe}</div>
            <div className='featured-value-rate'>
              <span>{value}</span>&nbsp;
              <span className='featured-value-unit'>{unit}</span>
            </div>
          </div>
          <div className='featured-item-right'>
            <RadialChart
              index={index}
              valuePercentage={valuePercentage}
              color={color}
              titleValuePercentage={titleValuePercentage}
            />
            {/* <span title={titleValuePercentage}></span> */}
          </div>
        </div>
      </div>
      <div
        className='featured-bottom'
        style={{ backgroundColor: `${color}` }}
      ></div>
    </div>
  );
};

FeaturedInfo.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  signe: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
  valuePercentage: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  titleValuePercentage: PropTypes.string.isRequired,
};
export default FeaturedInfo;
