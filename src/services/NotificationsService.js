
import createHttp from "./BaseService";

const http = createHttp(true);

export const getNotificationList = () => http.get("/hackerp/notification/list");
export const createNotification = (notification) => http.post("/hackerp/notification/create", notification);
export const detailNotification = (id) => http.get(`/hackerp/notification/${id}`);
export const updateNotification = (id, notification) => http.patch(`/hackerp/notification/${id}`, notification);
