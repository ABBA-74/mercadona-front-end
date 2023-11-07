import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';

import { scrollTo } from '../../utils/scrollTo';
import './DashboardPage.scss';
import CrudNotification from './CrudNotification/CrudNotification';
import useCrudNotification from '../../hooks/useCrudNotification';

const DashboardPage = () => {
  const { notification } = useCrudNotification();
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <main className='dashboard'>
      {notification && (
        <CrudNotification
          key={Date.now()}
          type={notification.type}
          message={notification.message}
        />
      )}
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
