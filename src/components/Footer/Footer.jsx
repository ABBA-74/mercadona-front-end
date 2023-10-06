import './Footer.scss';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import facebookLogo from './../../assets/icons/facebook-logo.svg';
import tweeterLogo from './../../assets/icons/tweeter-logo.svg';
import instagramLogo from './../../assets/icons/instagram-logo.svg';
import youtubeLogo from './../../assets/icons/youtube-logo.svg';
import arrowUp from './../../assets/icons/arrow-up.svg';

const Footer = () => {
  return (
    <>
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
          <p>Copyright © 2023 - ABBA-DEV - Mercadona. Tous droits réservés.</p>
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
    </>
  );
};

export default Footer;
