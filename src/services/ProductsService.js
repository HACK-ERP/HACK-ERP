import createHttp from './BaseService';

const http = createHttp(true);

export const getProductList = () => http.get('/hackerp/products?sortBy=createdAt:desc');

export const getProduct = (id) => http.get(`/hackerp/products/${id}`);

export const createProduct = (product) => http.post('/hackerp/products/create', product);

export const deleteProduct = (id) => http.delete(`/hackerp/products/${id}`);

export const updateProduct = (id, product) => http.put(`/hackerp/products/${id}/edit`, product);

//export const buyProduct = (product) => http.post('/products/checkout', product);