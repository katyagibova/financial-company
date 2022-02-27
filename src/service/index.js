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
    baseURL: "http://localhost:5500",
    // withCredentials: false,
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   "x-access-token": token,
    // },
    // timeout: 10000,
});

export const api = {
    getApp() {
        return apiClient.get(`/applications`);
    },
    getAppCities() {
        return apiClient.get(`/cities`);
    },
    login(data) {
        return apiAuth.post(`/login`, data);
    },
}