import './PizzaDiscountBanner.scss';
import { Col, Row } from 'react-bootstrap';
import pizzaManosque from '../../../assets/images/manosque-pizza-discount.png';
import ButtonOutline from '../../../components/ButtonOutline/ButtonOutline';

const PizzaDiscountBanner = () => {
  return (
    <>
      <section className='section-pizza-discount'>
        <Row>
          <Col lg={6} className='section-pizza-discount__left'>
            <div className='arrow-left-wrapper'>
              <div className='arrow-left-part-1'></div>
              <div className='arrow-left-part-2'></div>
              <div className='arrow-left-part-3'></div>
            </div>
            <div className='content-wrapper'>
              <p className='title strong'>30% DE REMISE</p>
              <p className='subtitle'>SUR NOS PIZZA</p>
              <ButtonOutline label='EN SAVOIR PLUS' />
              {/* <button className='btn btn-outline'></button> */}
            </div>
          </Col>
          <Col lg={6} className='section-pizza-discount__right'>
            <div className='pizza-wrapper'>
              <img
                src={pizzaManosque}
                className='pizza-img'
                alt='pizza manosque'
              />
            </div>
            <div className='arrow-right-wrapper'>
              <div className='arrow-right-part-1'></div>
              <div className='arrow-right-part-2'></div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default PizzaDiscountBanner;
