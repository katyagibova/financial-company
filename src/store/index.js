import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applications: [],
    cities: [],
    user_applications: [],
    token: localStorage.getItem("token") || "",
  },
  getters: {
    loggedIn: (state) => !!state.token,
  },
  mutations: {
    SET_APP(state, app) {
      state.applications = app;
    },
    SET_APP_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_USER_APPLICATION(state, user_applications) {
      state.user_applications = user_applications;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token)
    },
    DELETE_TOKEN(state) {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  actions: {
    getApp({ commit }) {
      return api
        .getApp()
        .then((response) => {
          commit("SET_APP", response.data);
        })
        .catch((err) => console.log(err));
    },
    getAppCities({ commit }) {
      return api
        .getAppCities()
        .then((response) => {
          commit("SET_APP_CITIES", response.data);
        })
        .catch((err) => console.log(err));
    },
    loginUser({ commit }, data) {
      return api
        .login(data)
        .then((response) => {
          const { access_token } = response.data;
          commit("SET_TOKEN", access_token);
          // commit("SET_USERID", userId);
          // const notification = {
          //   type: "success",
          //   message: "Вы успешно вошли в систему",
          // };
          // dispatch("notification/add", notification, { root: true });
          // return userId;
        })
        .catch((error) => {
          console.log(error)
          // const notification = {
          //   type: "error",
          //   message:
          //     "При входе в учетную запись возникла проблема: " + error.response
          //       ? error.response.data.message
          //       : error,
          // };
          // dispatch("notification/add", notification, { root: true });
          throw error;
        });
    },
    logoutUser({ commit }) {
      commit("DELETE_TOKEN");
    },
    getUserApplication({ commit }) {
      return api
        .getUserApplication()
        .then((response) => {
          commit("SET_USER_APPLICATION", response.data);
        })
        .catch((err) => console.log(err));
    },
  },
})
