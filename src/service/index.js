import axios from "axios";
let token = localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    timeout: 10000,
});
const apiAuth = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    timeout: 10000,
});

export const api = {
    login(data) {
        return apiAuth.post(`/auth/login`, data);
    },
    getApp() {
        return apiClient.get(`/applications`);
    },
    postNewApplication(data) {
        return apiClient.post(`/applications`, data);
    },
    updateApplication({ appId, application }) {
        return apiClient.put(`/applications/${appId}`, application);
    },
    deleteApplication(appId) {
        return apiClient.delete(`/applications/${appId}`);
    },
    getAppCities() {
        return apiClient.get(`/cities`);
    },
    getUserApplication() {
        return apiAuth.get(`/user_applications`);
    },
    postNewUserApplication(data) {
        return apiAuth.post(`/user_applications`, data);
    },
    updateUserApplication({ appId, application }) {
        return apiAuth.put(`/user_applications/${appId}`, application);
    },
    deleteUserApplication(appId) {
        return apiAuth.delete(`/user_applications/${appId}`);
    },
}