import createHttp from './BaseService';

const http = createHttp(true);

export const getMaterialList = () => http.get('/hackerp/rowMaterials/list?sortBy=createdAt:desc');

export const getMaterialDetail = (id) => http.get(`/hackerp/rowMaterial/${id}`);

export const createMaterial = (product) => http.post('/hackerp/rowMaterial/create', product);

export const updateMaterial = (id, product) => http.patch(`/hackerp/rowMaterial/${id}/edit`, product);
//update stock in this route '/rowMaterial/:id/stock'
export const purchaseMaterials = (id, data) => http.patch(`/hackerp/rowMaterial/${id}/stock`, data);
