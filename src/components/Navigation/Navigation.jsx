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

const Navigation = () => {
  const navDropdownTitle = (
    <>
      <img
        src={categoryListIcon}
        alt=''
        className='menu-icon category-list-icon'
      />
      <span className='label-menu'>Rayons</span>
    </>
  );

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container fluid className='mx-3 mx-md-5'>
          <Navbar.Brand href='/'>
            <img src={mercadonaLogo} alt='' className='menu-icon search-icon' />
            <span className='brand-name'>Mercadona</span>
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
                  <img src={searchIcon} alt='' className='search-icon' />
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
              <Nav.Link className='mx-lg-2' href='/promotions'>
                <img
                  src={promotionsIcon}
                  alt=''
                  className='menu-icon promotions-icon'
                />
                <span className='label-menu'>Promotions</span>
              </Nav.Link>
              <Nav.Link className='mx-lg-2' href='/catalog'>
                <img
                  src={catalogIcon}
                  alt=''
                  className='menu-icon catalog-icon catalog-icon'
                />
                <span className='label-menu'>Catalogue</span>
              </Nav.Link>
              <Nav.Link className='mx-lg-2' href='/shopping-list'>
                <img
                  src={shoppingWishListIcon}
                  alt=''
                  className='menu-icon shopping-wish-list-icon'
                />
                <span className='label-menu'>Mes produits</span>
              </Nav.Link>
              <Nav.Link className='ms-lg-2' href='/login'>
                <img src={loginIcon} alt='' className='menu-icon login-icon' />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
