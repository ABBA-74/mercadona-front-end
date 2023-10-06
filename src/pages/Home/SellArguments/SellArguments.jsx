import './SellArguments.scss';
import { Col, Row } from 'react-bootstrap';
import { sellArgsList } from '../../../data/sellArgsData';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SellArguments = () => {
  useEffect(() => {
    Aos.init({
      'data-aos-anchor-placement': 'bottom-bottom',
    });
  }, []);

  return (
    <>
      <section className='section-sell-arguments'>
        <Row className='sell-arguments-cards-wrapper'>
          {sellArgsList.map((sellArg, index) => {
            return (
              <Col key={sellArg.id} md={6} xl={4}>
                <div
                  className='card'
                  data-aos='fade-up'
                  data-aos-delay={index * 150}
                  data-aos-offset='190'
                >
                  <div className='card-header'>
                    <img
                      src={sellArg.image.imgPath}
                      alt={sellArg.image.label}
                    />
                  </div>
                  <div className='card-bottom'>
                    <p>{sellArg.txt.part1}</p>
                    <p className='strong'>{sellArg.txt.part2}</p>
                    <p></p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </section>
    </>
  );
};

export default SellArguments;
