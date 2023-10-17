import createHttp from './BaseService';

const http = createHttp(true);

export const getCurrentUser = () => http.get('/hackerp/user/current');

export const getUsersList = () => http.get('/hackerp/users/list?sortBy=createdAt:desc');

export const getUserDetail = (id) => http.get(`/hackerp/user/${id}`);

export const createUser = (user) => http.post('/hackerp/users/create', user);

export const deleteUser = (id) => http.delete(`/hackerp/users/${id}`);

export const updateUser = (id, user) => http.put(`/hackerp/user/${id}/edit`, user);
