import createHttp from './BaseService';

const http = createHttp(true);

export const getBudgetList = () => http.get('/hackerp/budget/list');

export const getBudgetDetail = (id) => http.get(`/hackerp/budget/${id}`);

export const createBudget = (product, userId) => http.post('/hackerp/budget/create', product, userId);

export const updateBudget = (id, product) => http.put(`/hackerp/budget/${id}`, product);

export const statusUpdate = (id, status) => http.patch(`/hackerp/budget/status/${id}`, status);