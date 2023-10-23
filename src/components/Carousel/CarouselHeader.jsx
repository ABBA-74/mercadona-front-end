import Carousel from 'react-bootstrap/Carousel';
import { carouselItemsList } from '../../data/carouselData';
import './CarouselHeader.scss';
import { Col, Row } from 'react-bootstrap';

const CarouselHeader = () => {
  return (
    <section className='carousel-section'>
      <Carousel
        data-bs-theme='light'
        fade
        interval={7500}
        indicators={false}
        pause={'hover'}
        touch={true}
        slide={false}
      >
        {carouselItemsList.map((item) => {
          const imageUrl = new URL(
            `../../assets/images/${item.image.imgFile}`,
            import.meta.url
          ).href;
          return (
            <Carousel.Item key={item.id}>
              <Row>
                <Col
                  lg={6}
                  className='d-flex justify-content-center justify-content-lg-start'
                >
                  <Carousel.Caption>
                    <p className='text-center text-lg-start mb-0'>
                      Les Meilleures Affaires, C&apos;est chez&nbsp;
                      <span className='strong'>Mercadona</span>
                    </p>
                  </Carousel.Caption>
                </Col>
                <Col lg={6} className='d-flex justify-content-center'>
                  <div className='wrapper-img'>
                    <img
                      className='d-block w-100'
                      src={imageUrl}
                      alt='First slide'
                    />
                    <div className='discount-label'>{item.discount}%</div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
};

export default CarouselHeader;
