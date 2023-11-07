import { useContext } from 'react';
import { CrudNotificationContext } from '../contexts/CrudNotificationProvider';

function useCrudNotification() {
  const contextValue = useContext(CrudNotificationContext);

  if (!contextValue) {
    throw new Error(
      'useCrudNotification must be used with CrudNotificationContext'
    );
  }
  const { notification, showNotification } = contextValue;

  return { notification, showNotification };
}

export default useCrudNotification;
