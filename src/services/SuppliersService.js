import createHttp from './BaseService';

const http = createHttp(true);

export const getSuppliersList = () => http.get('/hackerp/suppliers/list?sortBy=createdAt:desc');

export const getSupplierDetail = (id) => http.get(`/hackerp/suppliers/${id}`);

export const createSupplier = (supplier) => http.post('/hackerp/suppliers/create', supplier);

export const deleteSupplier = (id) => http.delete(`/hackerp/suppliers/${id}`);

export const updateSupplier = (id, supplier) => http.put(`/hackerp/suppliers/${id}/edit`, supplier);