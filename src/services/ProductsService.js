import createHttp from './BaseService';

const http = createHttp(true);

export const getProductList = () => http.get('/hackerp/products');

export const getProduct = (id) => http.get(`/hackerp/products/${id}`);

//export const buyProduct = (product) => http.post('/products/checkout', product);