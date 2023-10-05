import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import CarouselCategories from '../../components/CarouselCategories/CarouselCategories';
import pizzaManosque from '../../assets/images/manosque-pizza-discount.png';
import { sellArgsList } from '../../data/sellArgsData';
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline';

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
                  <div className='arrow-left-part-1'></div>
                  <div className='arrow-left-part-2'></div>
                  <div className='arrow-left-part-3'></div>
                </div>
                <div className='content-wrapper'>
                  <p className='title strong'>30% DE REMISE</p>
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
                  <div className='arrow-right-part-1'></div>
                  <div className='arrow-right-part-2'></div>
                  <div className='arrow-right-part-3'></div>
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
                        <p className='strong'>{sellArg.txt.part2}</p>
                        <p></p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </section>

          <section className='section-newsletter'>
            <Row className='newsletter-wrapper'>
              <Col lg={6} className='newsletter-wrapper--part-left'>
                <p className='mb-3 mb-lg-0'>
                  Bien informé, c&apos;est{' '}
                  <span className='strong'>
                    bien consommé en toute confiance
                  </span>
                  &nbsp; chaque jour.
                </p>
              </Col>
              <Col lg={6} className='newsletter-wrapper--part-right'>
                <p>Abonnez-vous à notre newsletter !</p>
                <form>
                  <input
                    type='text'
                    placeholder='Votre email'
                    className='mb-4 mb-sm-4 mb-md-0 mb-lg-4 mb-xxl-0'
                  />
                  <ButtonOutline label='Rejoignez-nous' />
                </form>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
};

export default HomePage;
