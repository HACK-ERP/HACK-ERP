import createHttp from './BaseService';

const http = createHttp(true);

export const getMaterialList = () => http.get('/hackerp/rowMaterials/list?sortBy=createdAt:desc');

export const getMaterialDetail = (id) => http.get(`/hackerp/rowMaterial/${id}`);

export const createMaterial = (product) => http.post('/hackerp/rowMaterial/create', product);

export const updateMaterial = (id, product) => http.put(`/hackerp/rowMaterial/${id}/edit`, product);
