import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from 'react-bootstrap';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import redPennant from '../../assets/images/red-pennant.svg';
import { API_URL_IMG } from '../../api/apiConfig';
import './ProductCard.scss';

const ProductCard = ({
  label,
  discountPercentage,
  originalPrice,
  discountedPrice,
  description,
  category,
  imgFile,
  imgAlt,
}) => {
  const filledStars = 4;
  const rndReviews = 39;
  // const filledStars = Math.floor(Math.random() * 3) + 3;
  // const rndReviews = Math.floor(Math.random() * 50) + 9;
  const imageUrl = `${API_URL_IMG}/${imgFile}`;
  const discountedPriceFormatted = String(discountedPrice?.toFixed(2)).replace(
    '.',
    '€'
  );
  const originalPriceFormatted = String(originalPrice.toFixed(2)).replace(
    '.',
    '€'
  );

  return (
    <div className='product-card'>
      {discountPercentage && (
        <div className='product-card__label-discount'>
          <img src={redPennant} alt='fanion discount' />
          <span>{discountPercentage}%</span>
        </div>
      )}
      <div className='product-card__top'>
        <div className='product-card__img-wrapper'>
          <img src={imageUrl} alt={imgAlt} />
        </div>
        <Badge className='mt-3' bg='secondary'>
          {category}
        </Badge>
      </div>
      <div className='product-card__content'>
        <div className='product-card__price'>
          {discountPercentage ? (
            <>
              <span className='total-price'>{discountedPriceFormatted}</span>
              <span className='ms-3 previous-price'>
                {originalPriceFormatted}
              </span>
            </>
          ) : (
            <span className='total-price'>{originalPriceFormatted}</span>
          )}
        </div>
        <div className='product-card__reviews'>
          <ul className='star-list'>
            {[...Array(5)].map((_, i) => (
              <li key={uuidv4()}>
                {i < filledStars ? (
                  <BsStarFill color='orange' />
                ) : (
                  <BsStar color='orange' />
                )}
              </li>
            ))}
            <li>&nbsp;&nbsp;{rndReviews}</li>
          </ul>
        </div>
        <p className='product-card__label'>{label}</p>
        <p className='product-card__description'>{description}</p>
        <button className='btn btn-primary'>
          <MdOutlineFavoriteBorder />
          &nbsp; Ajouter à ma liste
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  label: PropTypes.string.isRequired,
  discountPercentage: PropTypes.number,
  originalPrice: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  imgFile: PropTypes.string,
  imgAlt: PropTypes.string,
};
export default ProductCard;
