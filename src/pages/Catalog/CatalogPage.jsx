import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CarouselHeader from '../../components/Carousel/CarouselHeader';
import Footer from '../../components/Footer/Footer';
import { getCategoriesAndProducts } from '../../api/getCategoriesAndProducts';
import { getProducts } from '../../api/getProducts';
import { getCategories } from '../../api/getCategories';
import { scrollTo } from './../../utils/scrollTo.js';
import { CATEGORIES_ENDPOINT } from './../../api/apiConfig';

import './CatalogPage.scss';
import Filters from './Filters/Filters';
import ProductsSection from './ProductsSection/ProductsSection';

const CatalogPage = () => {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const label = searchParams.get('label');

  const calculateTotalPages = (totalItems) => {
    return Math.ceil(totalItems / 8);
  };
  const orderFilterMap = {
    1: { 'order[createdAt]': 'desc' },
    2: { 'order[currentPromotionPercentage]': 'desc' },
    3: { 'order[label]': 'asc' },
    4: { 'order[label]': 'desc' },
  };

  /*  Handle Pagination */
  const handlePageChange = async (newPage) => {
    // scroll to the top of products listing
    scrollTo(0, 504);
    if (newPage != currentPage) {
      try {
        const { products, totalItems } = await getProducts(newPage, filters);
        setProducts(products);
        setCurrentPage(newPage);
        setTotalPages(calculateTotalPages(totalItems));
      } catch (err) {
        console.error(err);
      }
    }
  };

  /* Handle Category Select Input Filter */
  const handleChangeCategory = (idCategory) => {
    /* Filter by removing previous category filter only */
    const filteredFilters = Object.keys(filters).reduce((acc, key) => {
      if (!key.startsWith('category')) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});

    const newCategoryFilter =
      idCategory != 0
        ? { category: `${CATEGORIES_ENDPOINT}/${idCategory}` }
        : '';
    setFilters({ ...filteredFilters, ...newCategoryFilter });
  };

  /* Handle Promo Checkbox Input >>> promo is displayed only */
  const handleChangePromoDisplay = (isPromoDisplayed) => {
    /* Filter by removing previous promo filter only */
    if (isPromoDisplayed) {
      setFilters({ ...filters, 'exists[discountedPrice]': isPromoDisplayed });
    } else {
      setFilters((current) => {
        const { ['exists[discountedPrice]']: _, ...rest } = current;
        return rest;
      });
    }
  };

  /* Handle Input Order Filter */
  const handleChangeOrder = (idOrder) => {
    /* Filter by removing previous order filter only */
    const filteredFilters = Object.keys(filters).reduce((acc, key) => {
      if (!key.startsWith('order')) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});

    const newOrderFilter = orderFilterMap[idOrder] || {};
    setFilters({ ...filteredFilters, ...newOrderFilter });
  };

  /* Fetch Data after each new filter changement*/
  useEffect(() => {
    scrollTo(0, 504);
    const fetchAndSetProducts = async () => {
      setProducts(null);
      setIsLoading(true);
      try {
        const appliedFilters = label ? { ...filters, label } : filters;
        const { products, totalItems } = await getProducts(1, appliedFilters);
        setProducts(products);
        setCurrentPage(1);
        setTotalPages(calculateTotalPages(totalItems));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetProducts();
  }, [filters, label]);
  /* Fetch Data (category / products) on mounted phase of the component */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { categories, products, totalItems } =
          await getCategoriesAndProducts();
        setCategories(categories);
        setProducts(products);
        setTotalPages(calculateTotalPages(totalItems));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAndSetCategories = async () => {
      try {
        const { categories } = await getCategories();
        setCategories(categories);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    if (!label) {
      fetchData();
    } else {
      fetchAndSetCategories();
    }
  }, []);

  return (
    <>
      <CarouselHeader />
      <main className='main-catalog'>
        <Container>
          <h1 className='mb-5'>Explorez notre Catalogue</h1>
          <Row className='filters-wrapper g-3'>
            {categories && (
              <Filters
                categories={categories}
                handleChangeCategory={handleChangeCategory}
                handleChangeOrder={handleChangeOrder}
                handleChangePromoDisplay={handleChangePromoDisplay}
              />
            )}
          </Row>
          <ProductsSection
            error={error}
            isLoading={isLoading}
            products={products}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Container>
      </main>
    </>
  );
};

export default CatalogPage;
