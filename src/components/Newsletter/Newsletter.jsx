import './Newsletter.scss';
import { Col, Row } from 'react-bootstrap';
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline';

const Newsletter = () => {
  return (
    <>
      <section className='section-newsletter'>
        <Row className='newsletter-wrapper'>
          <Col lg={6} className='newsletter-wrapper--part-left'>
            <p className='mb-3 mb-lg-0'>
              Bien informé, c&apos;est{' '}
              <span className='strong'>bien consommé en toute confiance</span>
              &nbsp; chaque jour.
            </p>
          </Col>
          <Col lg={6} className='newsletter-wrapper--part-right'>
            <p>Abonnez-vous à notre newsletter !</p>
            <form className='d-flex flex-column flex-md-row flex-lg-column flex-xl-row w-100'>
              <input
                autoComplete='off'
                id='email'
                name='email'
                type='text'
                placeholder='Votre email'
                className='mb-4 mb-sm-4 mb-md-0 mb-lg-4 mb-xxl-0 me-0 me-md-2 me-lg-0 me-xl-2'
              />
              <ButtonOutline label='Rejoignez-nous' />
            </form>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Newsletter;
