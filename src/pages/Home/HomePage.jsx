import { Container } from 'react-bootstrap';
import './HomePage.scss';
import CarouselHeader from '../../components/Carousel/CarouselHeader';

const HomePage = () => {
  return (
    <>
      <CarouselHeader />
      <Container>
        <h1>Home Page</h1>
      </Container>
    </>
  );
};

export default HomePage;
