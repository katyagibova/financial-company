import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applications: [],
    cities: [],
    token: "",
  },
  mutations: {
    SET_APP(state, app) {
      state.applications = app;
    },
    SET_APP_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token)
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
          console.log(
            response
          );
          const { accessToken } = response.data;
          commit("SET_TOKEN", accessToken);
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
  },
  getters: {
  }
})
