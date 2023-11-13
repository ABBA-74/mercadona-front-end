import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Loader from '../../../components/Loader/Loader';
import ProductCard from '../../../components/ProductCard/ProductCard';
import CustomPagination from '../CustomPagination/CustomPagination';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import NoProductsFoundAlert from '../NoProductsFoundAlert/NoProductsFoundAlert';
import { fetchErrorMessage } from '../../../data/errorMessages';

import './ProductsSection.scss';

const ProductsSection = ({
  error,
  isLoading,
  products,
  currentPage,
  totalPages,
  handlePageChange,
}) => (
  <>
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
        ;
      </section>
    )}
    {products && products.length > 0 && (
      <section className='section-products-list'>
        <Row className='products-wrapper my-5'>
          {products.map((product) => {
            return (
              <Col
                sm={6}
                lg={4}
                xl={3}
                key={product.id}
                className='mb-5 d-flex justify-content-center'
              >
                <ProductCard
                  label={product.label}
                  discountPercentage={product.currentPromotionPercentage}
                  originalPrice={product.originalPrice}
                  discountedPrice={product.discountedPrice}
                  description={product.description}
                  category={product.category.label}
                  imgFile={product.image?.imgFile}
                  imgAlt={product.image?.label}
                />
              </Col>
            );
          })}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Row>
      </section>
    )}

    {(!products || products.length === 0) && !isLoading && (
      <section className='section-no-product-found-msg'>
        <NoProductsFoundAlert />
      </section>
    )}
  </>
);

ProductsSection.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  products: PropTypes.array,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
export default ProductsSection;
