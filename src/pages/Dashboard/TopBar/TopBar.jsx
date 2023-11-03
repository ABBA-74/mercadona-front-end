import './TopBar.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopBar = () => {
  return (
    <section className='topbar'>
      <div className='topbar-wrapper'>
        <div className='topbar-left'>
          <h1 className='topbar-title'>Dashboard</h1>
        </div>
        <div className='topbar-right me-0 me-lg-3'>
          <div className='topbar-icon-wrapper'>
            <NotificationsIcon />
            <span className='topbar-icon-badge'>2</span>
          </div>
          <div className='topbar-icon-wrapper'>
            <SettingsIcon />
          </div>
          <div className='topbar-icon-wrapper'>
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
