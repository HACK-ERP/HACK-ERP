import createHttp from './BaseService';

const http = createHttp(true);

export const getCurrentUser = () => http.get('/hackerp/user/current');

export const getUsersList = () => http.get('/hackerp/users/list?sortBy=createdAt:desc');

export const getUserDetail = (id) => http.get(`/hackerp/user/${id}`);

export const createUser = (user) => http.post('/hackerp/users/create', user);
