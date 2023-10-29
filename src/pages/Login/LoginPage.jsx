import { useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import { checkLogin } from '../../api/checkLogin';
import AuthContext from '../../context/AuthProvider';
import fruitsVegatablesBg from './../../assets/images/fruits-vegetables-bg.webp';
import shoppingCartsBg from './../../assets/images/shopping-carts-bg.webp';

import LoginForm from './loginForm/loginForm';
import './LoginPage.scss';

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const userRef = useRef();
  const errRef = useRef();

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSuccessLogin = (data) => {
    const authState = { ...data, isAuthenticated: true };
    localStorage.setItem('auth', JSON.stringify(authState));
    setAuth(authState);
    navigate(from, { replace: true });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(false);
    } else {
      const { code, msg, data } = await checkLogin({
        email: email,
        password: password,
      });
      if (code === 200) {
        handleSuccessLogin(data);
      } else {
        setLoginError(msg);
      }
    }
    setValidated(true);
  };

  // focus on email input when component loaded
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setLoginError('');
  }, [email, password]);

  return (
    <>
      <section className='section-login'>
        <Container>
          <Row>
            <Col
              xs={{ span: 12, order: 2 }}
              lg={{ span: 6, order: 1 }}
              className='px-0'
            >
              <img
                src={fruitsVegatablesBg}
                alt='icone catégorie'
                className='menu-icon category-list-icon'
              />
            </Col>
            <Col
              xs={{ span: 12, order: 1 }}
              lg={{ span: 6, order: 2 }}
              className='px-0'
            >
              <img
                src={shoppingCartsBg}
                alt='paniers de shopping'
                className='shopping-carts-bg'
              />
              {loginError && (
                <Alert ref={errRef} variant='warning  w-100'>
                  <p className='mb-0'>{loginError}</p>
                </Alert>
              )}
            </Col>
          </Row>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            validated={validated}
            userRef={userRef}
            handleSubmit={handleSubmit}
          />
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
