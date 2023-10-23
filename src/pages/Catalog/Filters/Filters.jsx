import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Filters.scss';

const Filters = ({
  categories,
  handleChangeCategory,
  handleChangeOrder,
  handleChangePromoDisplay,
}) => {
  return (
    <>
      <Col sm={6} lg={4} xl={3}>
        <Form.Select
          size='md'
          onChange={(e) => handleChangeCategory(e.target.value)}
        >
          <option value={0}>Selectionner une catégorie</option>
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            );
          })}
        </Form.Select>
      </Col>
      <Col
        xs={{ order: 'first' }}
        sm={(12, { order: 1 })}
        md={(5, { order: 'last' })}
        lg={(4, { order: 1 })}
        xl={(3, { order: 0 })}
      >
        <Form.Check type='checkbox' id='check-promo'>
          <Form.Check.Input
            type='checkbox'
            isValid
            onClick={(e) => handleChangePromoDisplay(e.target.checked)}
          />
          <Form.Check.Label>Toutes les promotions</Form.Check.Label>
        </Form.Check>
      </Col>
      <Col sm={6} md={5} lg={4} xl={{ span: 3, offset: 3 }}>
        <Form.Select
          size='md'
          onChange={(e) => handleChangeOrder(e.target.value)}
        >
          <option value={0}>Trier par pertinence</option>
          <option value={1}>Nouveauté</option>
          <option value={2}>Meilleurs promotions</option>
          <option value={3}>Marques de A à Z</option>
          <option value={4}>Marques de Z à A</option>
        </Form.Select>
      </Col>
    </>
  );
};

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  handleChangeCategory: PropTypes.func,
  handleChangeOrder: PropTypes.func,
  handleChangePromoDisplay: PropTypes.func,
};
export default Filters;
