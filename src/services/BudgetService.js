import createHttp from './BaseService';

const http = createHttp(true);

export const getBudgetList = () => http.get('/hackerp/budget/list?sortBy=createdAt:desc');

export const getBudgetDetail = (id) => http.get(`/hackerp/budget/${id}`);

export const createBudget = (product) => http.post('/hackerp/budget/create', product);

export const updateBudget = (id, product) => http.put(`/hackerp/budget/${id}`, product);

export const statusUpdate = (id, status) => http.patch(`/hackerp/budget/status/${id}`, status);