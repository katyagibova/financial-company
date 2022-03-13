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
    getApp() {
        return apiClient.get(`/applications`);
    },
    getAppCities() {
        return apiClient.get(`/cities`);
    },
    postNewApplication(data) {
        return apiClient.post(`/applications`, data);
    },
    postNewUserApplication(data) {
        return apiAuth.post(`/user_applications`, data);
    },
    login(data) {
        return apiAuth.post(`/auth/login`, data);
    },
    getUserApplication() {
        return apiAuth.get(`/user_applications`);
    },
}