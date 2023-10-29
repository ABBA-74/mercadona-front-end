import axios from './axios';
import { CHECK_LOGIN_ENDPOINT } from './apiConfig';

export const checkLogin = async (dataUser) => {
  try {
    const response = await axios.post(CHECK_LOGIN_ENDPOINT, {
      username: dataUser.email,
      password: dataUser.password,
    });

    return {
      code: response.status,
      data: response.data,
    };
  } catch (err) {
    console.error(err);

    if (!err.response) {
      return {
        code: 500,
        msg: 'Problème serveur. Veuillez réessayer.',
      };
    }

    switch (err.response.status) {
      case 400:
        return {
          code: 400,
          msg: 'Email ou mot de passe manquant',
        };
      case 401:
        return {
          code: 401,
          msg: err.response.data.message,
        };
      default:
        return {
          code: err.response.status,
          msg: 'Tentative de connexion échoué. Veuillez réessayer.',
        };
    }
  }
};
