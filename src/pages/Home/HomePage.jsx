import './HomePage.scss';
import { Container } from 'react-bootstrap';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import CarouselCategories from './CarouselCategories/CarouselCategories';

import PizzaDiscountBanner from './PizzaDiscountBanner/PizzaDiscountBanner';
import SellArguments from './SellArguments/SellArguments';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

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
          <PizzaDiscountBanner />
          <SellArguments />
          <Newsletter />
        </Container>
      </main>
    </>
  );
};

export default HomePage;
