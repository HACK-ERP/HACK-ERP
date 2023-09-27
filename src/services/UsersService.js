import createHttp from './BaseService';

const http = createHttp(true);

export const getCurrentUser = () => http.get('/hackerp/user/current');