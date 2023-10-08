import { Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import CarouselHeader from '../../components/Carousel/CarouselHeader';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchCategoriesAndProducts } from '../../api/fetchCategoriesAndProducts';
import { fetchProducts } from '../../api/fetchProducts';

import CustomPagination from './CustomPagination/CustomPagination';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import NoDataMessage from './NoDataMessage/NoDataMessage';

import './CatalogPage.scss';

const CatalogPage = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { categories, products, totalItems } =
        await fetchCategoriesAndProducts();
      setCategories(categories);
      setProducts(products);
      setTotalPages(calculateTotalPages(totalItems));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPages = (totalItems) => {
    return Math.ceil(totalItems / 8);
  };

  const handlePageChange = async (newPage) => {
    // scroll to the top of products listing
    window.scroll({
      top: 504,
      left: 0,
      behavior: 'smooth',
    });
    if (newPage != currentPage) {
      try {
        const { products, totalItems } = await fetchProducts(newPage);
        setProducts(products);

        setCurrentPage(newPage);
        setTotalPages(calculateTotalPages(totalItems));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChangeCategory = async (idCategory) => {
    const filter =
      idCategory != 0 ? { category: `/api/categories/${idCategory}` } : '';
    const { products, totalItems } = await fetchProducts(1, filter);
    setProducts(products);
    setCurrentPage(1);
    setTotalPages(calculateTotalPages(totalItems));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CarouselHeader />
      <main className='main-catalog'>
        <Container>
          <h1 className='mb-5'>Explorez notre Catalogue</h1>
          {error && <p className='alert alert-info w-25'>{error.message}</p>}
          <Row>
            {categories && (
              <Col sm={6} md={5} lg={4} xl={3}>
                <div className='filters-wrapper'>
                  <Form.Select
                    size='md'
                    onChange={(e) => handleChangeCategory(e.target.value)}
                  >
                    <option value={0}>Selectionner une catégorie</option>
                    {categories?.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </Col>
            )}
          </Row>
          <Row className='products-wrapper my-5'>
            {products?.length > 0 &&
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
                      imgFile={product.image?.imgFile}
                      imgAlt={product.image?.label}
                    />
                  </Col>
                );
              })}
            {products?.length == 0 && !isLoading && <NoDataMessage />}
            {!error && isLoading && <Loader />}
            {error && <ErrorMessage />}
            {products?.length > 0 && !isLoading && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
