import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';

import { scrollTo } from '../../utils/scrollTo';
import './DashboardPage.scss';

const DashboardPage = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <main className='dashboard'>
      <TopBar />
      <div className='container-dashboard'>
        <div className='dashboard-sidebar'>
          <Sidebar />
        </div>
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
