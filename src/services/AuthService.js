import createHttp from './BaseService';

const http = createHttp();

export const register = (user) => http.post('/hackerp/user/register', user);

export const loginMail = (user) => http.post('/hackerp/user/login-mail', user);
export const loginPhone = (user) => http.post('/hackerp/user/login-phone', user);