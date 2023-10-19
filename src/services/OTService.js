//OT Service

import createHttp from "./BaseService";

const http = createHttp(true);

export const getOTList = () => http.get("/hackerp/ot/list");

export const getOTDetail = (id) => http.get(`/hackerp/ot/${id}`);

export const createOT = (ot) => http.post("/hackerp/ot/create", ot);

export const updateOTStatus = (id, body) => http.put(`/hackerp/ot/${id}`, body);

