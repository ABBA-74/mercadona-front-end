import { useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const useAuthLogout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({});
    navigate('/login', { replace: true });
  };
  return { logout };
};
