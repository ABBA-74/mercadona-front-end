// useAuthRedirect.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

function useAuthRedirect(Component, roles) {
  const { auth } = useContext(AuthContext);
  const isAuthenticatedAndAuthorized =
    auth?.isAuthenticated && roles.some((role) => auth.roles?.includes(role));

  return !isAuthenticatedAndAuthorized ? (
    <Navigate to='/login' replace />
  ) : (
    <Component />
  );
}

export default useAuthRedirect;
