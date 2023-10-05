import { Col, Container, Row } from 'react-bootstrap';
import './HomePage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import CarouselCategories from '../../components/CarouselCategories/CarouselCategories';
import pizzaManosque from '../../assets/images/manosque-pizza-discount.png';
import { sellArgsList } from '../../data/sellArgsData';
import ButtonOutline from '../../components/ButtonOutline/ButtonOutline';
import facebookLogo from './../../assets/icons/facebook-logo.svg';
import tweeterLogo from './../../assets/icons/tweeter-logo.svg';
import instagramLogo from './../../assets/icons/instagram-logo.svg';
import youtubeLogo from './../../assets/icons/youtube-logo.svg';
import arrowUp from './../../assets/icons/arrow-up.svg';
import { Link } from 'react-router-dom';

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
        <footer>
          <Row className='footer-top'>
            <p>Nous suivre</p>
            <div className='social-links-wrapper'>
              <Link
                to='https://www.facebook.com/'
                target='_blank'
                className='social-link-item'
              >
                <img src={facebookLogo} alt='facebook logo' />
              </Link>
              <Link
                to='https://twitter.com/'
                target='_blank'
                className='social-link-item'
              >
                <img src={tweeterLogo} alt='tweeter logo' />
              </Link>
              <Link
                to='https://www.instagram.com/'
                target='_blank'
                className='social-link-item'
              >
                <img src={instagramLogo} alt='instagram logo' />
              </Link>
              <Link
                to='https://www.youtube.com/'
                target='_blank'
                className='social-link-item'
              >
                <img src={youtubeLogo} alt='youtube logo' />
              </Link>
            </div>
          </Row>
          <Row className='footer-bottom'>
            <p>
              Copyright © 2023 - ABBA-DEV - Mercadona. Tous droits réservés.
            </p>
          </Row>
          <Link
            className='top-page-link'
            to='/'
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <img src={arrowUp} alt='retour haut de page' />
          </Link>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
