import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/service"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applications: [],
    cities: [],
    user_applications: [],
    application: {},
    maxRevenue: null,
    maxSum: null,
    token: localStorage.getItem("token") || "",
  },
  getters: {
    loggedIn: (state) => !!state.token,
  },
  mutations: {
    SET_APP(state, app) {
      state.applications = app
    },
    SET_MAX_REVENUE(state, maxRevenue) {
      state.maxRevenue = maxRevenue
    },
    SET_MAX_SUM(state, maxSum) {
      state.maxSum = maxSum
    },
    SET_APP_INFO(state, app) {
      state.application = app
    },
    SET_APP_CITIES(state, cities) {
      state.cities = cities
    },
    SET_USER_APPLICATION(state, user_applications) {
      state.user_applications = user_applications
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem("token", token)
    },
    DELETE_TOKEN(state) {
      localStorage.removeItem("token")
      state.token = ""
    },
    ADD_USER_APP(state, user_app) {
      state.user_applications.push(user_app)
    },
    ADD_APP(state, app) {
      state.applications.push(app)
    },
    DELETE_USER_APP(state, appId) {
      state.user_applications = state.user_applications.filter((x) => x.id !== appId)
    },
    DELETE_APP(state, appId) {
      state.applications = state.applications.filter((x) => x.id !== appId)
    },
  },
  actions: {
    getApp({ commit }, filters) {
      return api
        .getApp(filters)
        .then((response) => {
          commit("SET_APP", response.data)
          
          let maxRevenue = 0
          let maxSum = 0
          if(response.data.length != 0){
            const sortRevenue = [...response.data]
            sortRevenue.sort((a, b) => b.revenue - a.revenue)
            maxRevenue = Number(sortRevenue[0].revenue)

            const sortSum = [...response.data]
            sortSum.sort((a, b) => b.sum - a.sum)
            maxSum = Number(sortSum[0].sum)
            
          } else {
            maxRevenue = 0
            maxSum = 0
          }
          commit("SET_MAX_REVENUE", maxRevenue)
          commit("SET_MAX_SUM", maxSum)
        })
        .catch((err) => console.log(err))
    },
    getAppCities({ commit }) {
      return api
        .getAppCities()
        .then((response) => {
          commit("SET_APP_CITIES", response.data)
        })
        .catch((err) => console.log(err))
    },
    loginUser({ commit }, data) {
      return api
        .login(data)
        .then((response) => {
          const { access_token } = response.data
          commit("SET_TOKEN", access_token)
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    },
    logoutUser({ commit }) {
      commit("DELETE_TOKEN")
    },
    getUserApplication({ commit }) {
      return api
        .getUserApplication()
        .then((response) => {
          commit("SET_USER_APPLICATION", response.data)
        })
        .catch((err) => console.log(err))
    },
    postNewApplication({ commit }, data) {
      return api
        .postNewApplication(data)
        .then((response) => {
          const res = response.data
          commit("ADD_APP", res)
          return res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateApplication(_commit, data) {
      return api
        .updateApplication(data)
        .then((response) => {
          const res = response.data
          return res
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
    },
    deleteApplication({ commit }, appId ) {
      return api
        .deleteApplication(appId)
        .then(() => {
          commit("DELETE_APP", appId)
        })
        .catch((err) => console.log(err))
    },
    postNewUserApplication({ commit }, data) {
      return api
        .postNewUserApplication(data)
        .then((response) => {
          const res = response.data
          commit("ADD_USER_APP", res)
          return res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateUserApplication(_commit, data) {
      return api
        .updateUserApplication(data)
        .then((response) => {
          const res = response.data
          return res
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
    },
    deleteUserApplication({ commit }, appId ) {
      return api
        .deleteUserApplication(appId)
        .then(() => {
          commit("DELETE_USER_APP", appId)
        })
        .catch((err) => console.log(err))
    },
    getAppInfo({ commit }, appId) {
      return api
        .getAppInfo(appId)
        .then((response) => {
          commit("SET_APP_INFO", response.data)
        })
        .catch((err) => console.log(err))
    },
  },
})
