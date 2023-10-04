import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { categoriesList } from '../../data/categoriesData';
import categoryListIcon from '../../assets/icons/category-list-menu.png';
import promotionsIcon from '../../assets/icons/promotions-menu.png';
import catalogIcon from '../../assets/icons/catalog-menu.png';
import shoppingWishListIcon from '../../assets/icons/shopping-wish-list-menu.png';
import loginIcon from '../../assets/icons/login-menu.png';
import searchIcon from '../../assets/icons/search-menu.png';
import mercadonaLogo from '../../assets/images/mercadona-logo.svg';
import './Navigation.scss';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Navigation = () => {
  const refPromotionsNavItem = useRef(null);
  const refCatalogNavItem = useRef(null);
  const refWishListNavItem = useRef(null);
  const refLoginNavItem = useRef(null);

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
                <Form.Control
                  placeholder='Rechercher des produits...'
                  aria-label="Recipient's username"
                  aria-describedby='basic-addon2'
                />
                <InputGroup.Text id='basic-addon2'>
                  <img
                    src={searchIcon}
                    alt='icone loupe'
                    className='search-icon'
                  />
                </InputGroup.Text>
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
