import { useEffect } from 'react';
import './DashboardPage.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import { scrollTo } from '../../utils/scrollTo';

const DashboardPage = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <main className='dashboard'>
      <TopBar />
      <div className='container-dashboard'>
        <Sidebar />
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
