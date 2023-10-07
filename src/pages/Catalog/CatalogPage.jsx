import { Col, Container, Form, Row } from 'react-bootstrap';
import './CatalogPage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';

const CatalogPage = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL de l'API à appeler
    const apiUrlCategories = 'https://mercadona-api.abb-dev.fr/api/categories';
    const apiUrlProducts = 'https://mercadona-api.abb-dev.fr/api/products';

    // Exécuter les appels API en parallèle avec Promise.all()
    Promise.all([axios.get(apiUrlCategories), axios.get(apiUrlProducts)])
      .then((responses) => {
        // Les réponses sont dans un tableau correspondant à l'ordre des Promesses dans Promise.all()
        setCategories(responses[0].data);
        setProducts(responses[1].data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  // Gérer les états de chargement et d'erreur
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!categories || !products) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CarouselHeader />
      <main className='main-catalog'>
        <Container>
          <h1 className='mb-5'>Explorez notre Catalogue</h1>
          <Row>
            <Col sm={6} md={4} lg={3}>
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
            {products ? (
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
              })
            ) : (
              <p>No data</p>
            )}
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
