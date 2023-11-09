import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ReportIcon from '@mui/icons-material/Report';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import './Sidebar.scss';

const Sidebar = () => {
  const isNavLinkActive = (pathname, matchExact = true) => {
    return matchExact
      ? window.location.pathname === pathname
      : window.location.pathname.startsWith(pathname);
  };

  return (
    <section className='section-sidebar dataFeaturedItems show'>
      <div className='sidebar-wrapper'>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Interface de gestion</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <Link to='/dashboard'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard', true) ? 'active' : ''
                }`}
              >
                <HomeIcon className='sidebar-icon' />
                <span className='sidebar-label'>Accueil</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/analyse-commerciale'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/analyse-commerciale', false)
                    ? 'active'
                    : ''
                }`}
              >
                <BarChartIcon className='sidebar-icon' />
                <span className='sidebar-label'>Analyse commerciale</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/ventes'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/ventes', false) ? 'active' : ''
                }`}
              >
                <TrendingUpIcon className='sidebar-icon' />
                <span className='sidebar-label'>Ventes</span>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </div>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Gestion des produits</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <Link to='/dashboard/produits'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/produits', false) ? 'active' : ''
                }`}
              >
                <ArticleIcon className='sidebar-icon' />
                <span className='sidebar-label'>Produits</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/promotions'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/promotions', false)
                    ? 'active'
                    : ''
                }`}
              >
                <DiscountIcon className='sidebar-icon' />
                <span className='sidebar-label'>Promotions</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/categories'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/categories', false)
                    ? 'active'
                    : ''
                }`}
              >
                <CategoryIcon className='sidebar-icon' />
                <span className='sidebar-label'>Catégories</span>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </div>
        <div className='sidebar-menu'>
          <h2 className='sidebar-title h5'>Gestion du personnel</h2>
          <ListGroup variant='flush' className='sidebar-list'>
            <Link to='/dashboard/notifications'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/notifications', false)
                    ? 'active'
                    : ''
                }`}
              >
                <ReportIcon className='sidebar-icon' />
                <span className='sidebar-label'>Notifications</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/formations'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/formations', false)
                    ? 'active'
                    : ''
                }`}
              >
                <LocalLibraryIcon className='sidebar-icon' />
                <span className='sidebar-label'>Formations</span>
              </ListGroup.Item>
            </Link>
            <Link to='/dashboard/utilisateurs'>
              <ListGroup.Item
                className={`sidebar-list-item ${
                  isNavLinkActive('/dashboard/utilisateurs', false)
                    ? 'active'
                    : ''
                }`}
              >
                <SupervisedUserCircleIcon className='sidebar-icon' />
                <span className='sidebar-label'>Employés</span>
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
