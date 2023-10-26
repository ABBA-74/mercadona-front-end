import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import mercadonaLogo from './../../../assets/images/mercadona-logo.svg';
import './LoginForm.scss';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  validated,
  userRef,
  handleSubmit,
}) => {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className='form-brand-name-wrapper'>
        <img src={mercadonaLogo} alt='Mercadona Logo' />
        <span className='brand-name'>Mercadona</span>
      </div>
      <h1 className='h4 mb-3'>Connexion</h1>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='validationCustomUsername'>
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={userRef}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Merci de renseigner votre email
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-4'>
        <Form.Group as={Col} controlId='validationCustom03'>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type='password'
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Merci de renseigner votre mot de passe
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button disabled={email === '' || password === ''} type='submit'>
        SE CONNECTER
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  validated: PropTypes.bool.isRequired,
  userRef: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default LoginForm;
