import LineBarAreaComposedChart from './ComposedChart/LineBarAreaComposedChart';
import { dataFeaturedItems } from '../../../data/featuredItemsData';
import FeaturedInfo from './FeaturedInfo/FeaturedInfo';
import './HomeDashboard.scss';

const HomeDashboard = () => {
  return (
    <section className='section-home-dashboard'>
      <div className='home-dashboard-top'>
        {dataFeaturedItems.map((dataFeaturedItem, index) => (
          <FeaturedInfo
            key={dataFeaturedItem.id}
            {...dataFeaturedItem}
            index={index}
          />
        ))}
      </div>
      <div className='home-dashboard-middle'>
        <LineBarAreaComposedChart />
      </div>
    </section>
  );
};

export default HomeDashboard;
