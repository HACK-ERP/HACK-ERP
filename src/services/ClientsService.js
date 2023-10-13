//clients service
import createHttp from './BaseService';

const http = createHttp(true);

export const getClientsList = () => http.get('/hackerp/client/list');

export const getClientsDetail = (id) => http.get(`/hackerp/clients/${id}`);

export const createClients = (product) => http.post('/hackerp/clients/create', product);

export const updateClients = (id, product) => http.put(`/hackerp/clients/${id}/edit`, product);

export const deleteClients = (id) => http.delete(`/hackerp/clients/${id}/delete`);
