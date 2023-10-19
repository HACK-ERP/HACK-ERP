import createHttp from './BaseService';

const http = createHttp(true);

export const getMaterialRequirementList = (id) => http.get(`/hackerp/requiredMaterials/ot/${id}`);
