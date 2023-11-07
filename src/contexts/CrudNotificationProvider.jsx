import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const CrudNotificationContext = createContext({});

export const CrudNotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const clearNotificationTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const showNotification = (type, message) => {
    clearNotificationTimeout();
    setNotification({ type, message });

    const id = setTimeout(() => {
      setNotification(null);
    }, 3000);
    setTimeoutId(id);
  };

  // when component will unmount => cleanup setTimeout
  useEffect(() => {
    return () => {
      clearNotificationTimeout();
    };
  }, [timeoutId]);

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
