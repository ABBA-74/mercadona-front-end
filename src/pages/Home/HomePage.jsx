import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import CarouselCategories from '../../components/CarouselCategories/CarouselCategories';
import arrowShapeLeft from '../../assets/images/arrow-shape-p1.svg';
import arrowShapeRight from '../../assets/images/arrow-shape-p2.svg';
import pizzaManosque from '../../assets/images/manosque-pizza-discount.png';
import { sellArgsList } from '../../data/sellArgsData';

const HomePage = () => {
  return (
    <>
      <CarouselHeader />
      <main className='main-homepage'>
        <Container>
          <h1>
            Ne cherchez plus, vos produits préférés sont là en permanence !
          </h1>

          <CarouselCategories />

          <section className='section-pizza-discount'>
            <Row>
              <Col lg={6} className='section-pizza-discount__left'>
                <div className='arrow-left-wrapper'>
                  <img src={arrowShapeLeft} alt='forme fleche svg' />
                </div>
                <div className='content-wrapper'>
                  <p className='title'>30% DE REMISE</p>
                  <p className='subtitle'>SUR NOS PIZZA</p>
                  <button className='btn btn-outline'>EN SAVOIR PLUS</button>
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
                  <img
                    src={arrowShapeRight}
                    className='arrow-right-img'
                    alt='forme fleche svg'
                  />
                </div>
              </Col>
            </Row>
          </section>

          <section className='section-sell-arguments'>
            <Row className='sell-arguments-cards-wrapper'>
              {sellArgsList.map((sellArg) => {
                return (
                  <Col key={sellArg.id} md={6} xl={4}>
                    <div className='card'>
                      <div className='card-header'>
                        <img
                          src={sellArg.image.imgPath}
                          alt={sellArg.image.label}
                        />
                      </div>
                      <div className='card-bottom'>
                        <p>{sellArg.txt.part1}</p>
                        <p>{sellArg.txt.part2}</p>
                        <p></p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
};

export default HomePage;
