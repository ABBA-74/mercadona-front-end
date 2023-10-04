import { categoriesList } from '../../data/categoriesData';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import './CarouselCategories.scss';

const CarouselCategories = () => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 54,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={1500}
      className='carousel-categories-container'
    >
      {categoriesList.map((category) => {
        return (
          <SwiperSlide key={category.id}>
            <div className='card'>
              <div className='card__face card__face--front'>
                <div className='card__face--content'>
                  <div className='card__face--content-header'>
                    <img
                      src={
                        new URL(
                          `../../assets/images/${category.image.imgFile}`,
                          import.meta.url
                        ).href
                      }
                      alt=''
                    />
                  </div>
                  <div className='card__face--content-bottom'>
                    <p>{category.label}</p>
                  </div>
                </div>
              </div>
              <div className='card__face card__face--back'>
                <img
                  src={
                    new URL(
                      '../../assets/images/back-card.png',
                      import.meta.url
                    ).href
                  }
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarouselCategories;
