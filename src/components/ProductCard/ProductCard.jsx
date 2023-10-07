import './ProductCard.scss';
import PropTypes from 'prop-types';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
// import { MdOutlineFavorite } from 'react-icons/md';
import redPennant from '../../assets/images/red-pennant.svg';
import { Badge } from 'react-bootstrap';

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
  const filledStars = Math.floor(Math.random() * 3) + 3;
  const rndReviews = Math.floor(Math.random() * 50) + 9;
  let imageUrl = `https://mercadona-api.abb-dev.fr/images/${imgFile}`;
  const discountedPriceFormatted = String(discountedPrice).replace('.', '€');
  const originalPriceFormatted = String(originalPrice).replace('.', '€');
  console.log(imageUrl);
  return (
    <>
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
                <li key={i}>
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
    </>
  );
};

ProductCard.propTypes = {
  label: PropTypes.string.isRequired,
  discountPercentage: PropTypes.number,
  originalPrice: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  imgFile: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};

export default ProductCard;
