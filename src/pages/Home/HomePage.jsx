import { Container } from 'react-bootstrap';
import './HomePage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';
import CarouselCategories from '../../components/CarouselCategories/CarouselCategories';

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
        </Container>
      </main>
    </>
  );
};

export default HomePage;
