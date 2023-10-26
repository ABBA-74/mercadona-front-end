import axios from './axios';
import { CHECK_LOGIN_ENDPOINT } from './apiConfig';

export const checkLogin = async (dataUser) => {
  let res = {};
  try {
    await axios
      .post(CHECK_LOGIN_ENDPOINT, {
        username: dataUser.email,
        password: dataUser.password,
      })
      .then((response) => {
        res = response?.data;
        res = {
          code: response?.status,
          data: response?.data,
        };
      })
      .catch((err) => {
        if (!err?.message) {
          res = {
            code: err.response?.status,
            msg: 'Problème serveur. Veuillez réessayer.',
          };
        } else if (err.response?.status === 400) {
          res = {
            code: err.response?.status,
            msg: 'Email ou mot de passe manquant',
          };
        } else if (err.response?.status === 401) {
          res = {
            code: err.response?.status,
            msg: err.response?.data.message,
          };
        } else {
          res = {
            code: err.response?.status,
            msg: 'Tentative de connexion échoué. Veuillez réessayer.',
          };
        }
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
  return res;
};
