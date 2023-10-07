import './CatalogPage.scss';
import { Col, Container, Form, Row } from 'react-bootstrap';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';

const CatalogPage = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiUrlCategories = 'https://mercadona-api.abb-dev.fr/api/categories';
    const apiUrlProducts = 'https://mercadona-api.abb-dev.fr/api/products';
    setIsLoading(true);
    // Execute API calls in parallel with Promise.all()
    Promise.all([axios.get(apiUrlCategories), axios.get(apiUrlProducts)])

      .then((responses) => {
        // response in array according to the order of call api Promise.all()
        setCategories(responses[0].data);
        setProducts(responses[1].data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const renderErrorMessage = () => {
    return (
      <div className='alert-msg d-flex justify-content-center'>
        <p className='alert alert-warning w-75'>
          Nous avons rencontré un problème de chargement des données. Nous
          travaillons à résoudre ce problème rapidement.
          <br />
          Nous nous excusons pour tout désagrément que cela pourrait causer.
          <br />
          La qualité de votre expérience utilisateur est notre priorité, et nous
          faisons tout notre possible pour résoudre ce problème rapidement. Nous
          vous remercions de votre compréhension et de votre patience.
        </p>
      </div>
    );
  };

  const renderNoDataMessage = () => {
    return (
      <div className='no-data-msg d-flex justify-content-center'>
        <p className='alert alert-warning w-50'>Aucune donnée disponible</p>
      </div>
    );
  };

  return (
    <>
      <CarouselHeader />
      <main className='main-catalog'>
        <Container>
          <h1 className='mb-5'>Explorez notre Catalogue</h1>
          {error && <p>{error.message}</p>}
          {!error && isLoading && (!categories || !products) && (
            <p>Chargement en cours...</p>
          )}
          <Row>
            <Col sm={6} md={5} lg={4} xl={3}>
              <div className='filters-wrapper'>
                <Form.Select size='md'>
                  {categories?.map((category, index) => {
                    return index == 0 ? (
                      <option key={0}>Selectionner une catégorie</option>
                    ) : (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </Col>
          </Row>
          <Row className='products-wrapper my-5'>
            {products &&
              !isLoading &&
              products.map((product) => {
                return (
                  <Col md={6} lg={4} xl={3} key={product.id} className='mb-5'>
                    <ProductCard
                      label={product.label}
                      discountPercentage={product.currentPromotionPercentage}
                      originalPrice={product.originalPrice}
                      discountedPrice={product.discountedPrice}
                      description={product.description}
                      category={product.category.label}
                      imgFile={product.image.imgFile}
                      imgAlt={product.image.label}
                    />
                  </Col>
                );
              })}
            {!products && !isLoading && renderNoDataMessage()}
            {!error && isLoading && <Loader />}
            {error && renderErrorMessage()}
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
