import Cookies from 'universal-cookie';
//import * as jwt from 'jsonwebtoken';

const cookies = new Cookies();

export const updateCookie = () => {
  const today = new Date();
  const expireDate = today.setMinutes(today.getMinutes() + 10);
  if (getCookie()){
    cookies.set('access_token', cookies.get('access_token'), { expires: new Date(expireDate) });
  }
};

export const removeCookie = () => {
  cookies.remove('access_token');
};

export const getCookie = () => {
  return cookies.get('access_token')
};