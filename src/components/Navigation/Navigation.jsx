import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useRef, useState } from 'react';

import catalogIcon from '../../assets/icons/catalog-menu.png';
import { categoriesList } from '../../data/categoriesData';
import categoryListIcon from '../../assets/icons/category-list-menu.png';
import loginIcon from '../../assets/icons/login-menu.png';
import mercadonaLogo from '../../assets/images/mercadona-logo.svg';
import promotionsIcon from '../../assets/icons/promotions-menu.png';
import searchIcon from '../../assets/icons/search-menu.png';
import shoppingWishListIcon from '../../assets/icons/shopping-wish-list-menu.png';

import './Navigation.scss';
import { scrollTo } from '../../utils/scrollTo';

const Navigation = () => {
  const refPromotionsNavItem = useRef(null);
  const refCatalogNavItem = useRef(null);
  const refWishListNavItem = useRef(null);
  const refLoginNavItem = useRef(null);
  const inputSearchRef = useRef();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const navDropdownTitle = (
    <>
      <img
        src={categoryListIcon}
        alt='icone catégorie'
        className='menu-icon category-list-icon'
      />
      <span className='label-menu'>Rayons</span>
    </>
  );

  const handleClickNavbarBrand = () => {
    [
      refPromotionsNavItem,
      refCatalogNavItem,
      refWishListNavItem,
      refLoginNavItem,
    ].forEach((el) => {
      el.current.classList.remove('active');
    });
  };

  // handle change search value
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // handle submit search value
  const handleSubmit = (e) => {
    e.preventDefault();

    /* record to localStorage searchQuery */
    localStorage.setItem('searchQuery', searchValue);

    refCatalogNavItem.current.classList.add('active');

    inputSearchRef.current.blur();
    if (!searchValue.trim()) {
      navigate(`/catalogue`);
      return;
    }
    navigate(`/catalogue?label=${searchValue}`);
    // scroll to the top of products listing
    scrollTo(0, 504);
  };

  useEffect(() => {
    if (location.pathname != '/catalogue') {
      setSearchValue('');
      localStorage.removeItem('searchQuery');
    } else {
      const savedQuery = localStorage.getItem('searchQuery');
      if (savedQuery) {
        setSearchValue(savedQuery);
      }
    }
  }, [location]);

  // On mounted component phase load searchQuery from localStorage
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setSearchValue(savedQuery);
    }
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        fixed='top'
        className='bg-body-tertiary'
      >
        <Container fluid className='mx-3 mx-md-5'>
          <Navbar.Brand>
            <Link
              as={Link}
              eventkey='1'
              to='/'
              className='d-flex'
              onClick={handleClickNavbarBrand}
            >
              <img
                src={mercadonaLogo}
                alt='Mercadona Logo'
                className='menu-icon search-icon'
              />
              <span className='brand-name'>Mercadona</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='w-100'>
            <Nav className=''>
              <InputGroup className='input-search mt-3 mt-lg-0 mb-3 mb-lg-0'>
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    ref={inputSearchRef}
                    id='search-products'
                    placeholder='Rechercher des produits...'
                    aria-label='Rechercher des produits'
                    aria-describedby='search-products'
                    autoComplete='off'
                    onChange={handleChange}
                    value={searchValue}
                  />
                  <InputGroup.Text id='basic-addon2'>
                    <img
                      src={searchIcon}
                      alt='icone loupe'
                      className='search-icon'
                    />
                  </InputGroup.Text>
                </Form>
              </InputGroup>
              <NavDropdown
                className='me-auto'
                title={navDropdownTitle}
                id='basic-nav-dropdown'
              >
                <Container>
                  <Row className='dropdown-content'>
                    {categoriesList.map((category) => {
                      const imageUrl = new URL(
                        `../../assets/images/${category.image.imgFile}`,
                        import.meta.url
                      ).href;
                      return (
                        <Col
                          key={category.id}
                          sm={6}
                          md={4}
                          xl={3}
                          className='p-0 p-lg-4'
                        >
                          <NavDropdown.Item href='#action/3.4'>
                            <div className='category-item-wrapper'>
                              <img
                                src={imageUrl}
                                alt={category.image.label}
                                className='category-img'
                              />
                              <span>{category.label}</span>
                            </div>
                          </NavDropdown.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </NavDropdown>
              <Nav.Link
                as={Link}
                eventKey='2'
                className='mx-lg-2'
                to='/promotions'
                ref={refPromotionsNavItem}
              >
                <img
                  src={promotionsIcon}
                  alt='icone promotions'
                  className='menu-icon promotions-icon'
                />
                <span className='label-menu'>Promotions</span>
              </Nav.Link>
              <Nav.Link
                eventKey='3'
                as={Link}
                className='mx-lg-2'
                to='/catalogue'
                ref={refCatalogNavItem}
              >
                <img
                  src={catalogIcon}
                  alt='icone catalogue'
                  className='menu-icon catalog-icon catalog-icon'
                />
                <span className='label-menu'>Catalogue</span>
              </Nav.Link>
              <Nav.Link
                eventKey='4'
                as={Link}
                className='mx-lg-2'
                to='/liste-favoris'
                ref={refWishListNavItem}
              >
                <img
                  src={shoppingWishListIcon}
                  alt='icone liste des souhaits'
                  className='menu-icon shopping-wish-list-icon'
                />
                <span className='label-menu'>Mes produits</span>
              </Nav.Link>
              <Nav.Link
                eventKey='5'
                as={Link}
                className='ms-lg-2'
                to='/login'
                ref={refLoginNavItem}
              >
                <img
                  src={loginIcon}
                  alt='icone login'
                  className='menu-icon login-icon'
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
