import { Link, useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ReportIcon from '@mui/icons-material/Report';
import ImageIcon from '@mui/icons-material/Image';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';

import './Sidebar.scss';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <section className='section-sidebar dataFeaturedItems show'>
      <div className='sidebar-wrapper'>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Interface de gestion</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard') ? 'active' : ''
              }`}
            >
              <HomeIcon className='sidebar-icon' />
              <Link to='/dashboard'>Accueil</Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/analyse-commerciale') ? 'active' : ''
              }`}
            >
              <BarChartIcon className='sidebar-icon' />
              <Link to='/dashboard/analyse-commerciale'>
                Analyse commerciale
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/ventes') ? 'active' : ''
              }`}
            >
              <TrendingUpIcon className='sidebar-icon' />
              <Link to='/dashboard/ventes'>Ventes</Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Gestion des produits</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/produits') ? 'active' : ''
              }`}
            >
              <ArticleIcon className='sidebar-icon' />
              <Link to='/dashboard/produits'>Produits</Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/promotions') ? 'active' : ''
              }`}
            >
              <DiscountIcon className='sidebar-icon' />
              <Link to='/dashboard/promotions'>Promotions</Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/images') ? 'active' : ''
              }`}
            >
              <ImageIcon className='sidebar-icon' />
              <Link to='/dashboard/images'>Images</Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/categories') ? 'active' : ''
              }`}
            >
              <CategoryIcon className='sidebar-icon' />
              <Link to='/dashboard/categories'>Catégories</Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Gestion du personnel</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/notifications') ? 'active' : ''
              }`}
            >
              <ReportIcon className='sidebar-icon' />
              <Link to='/dashboard/notifications'>Notifications</Link>
            </ListGroup.Item>
            <ListGroup.Item
              className={`sidebar-list-item ${
                isActive('/dashboard/utilisateurs') ? 'active' : ''
              }`}
            >
              <SupervisedUserCircleIcon className='sidebar-icon' />
              <Link to='/dashboard/utilisateurs'>Utilisateurs</Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
