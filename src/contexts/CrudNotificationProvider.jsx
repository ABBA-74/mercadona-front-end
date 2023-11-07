import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CrudNotificationContext = createContext({});

export const CrudNotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <CrudNotificationContext.Provider
      value={{ notification, showNotification }}
    >
      {children}
    </CrudNotificationContext.Provider>
  );
};

CrudNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
