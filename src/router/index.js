import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Applications from '../views/Applications.vue'
import ApplicationPage from '../components/Applications/ApplicationPage.vue'
import ApplicationCatalog from '../components/Applications/ApplicationCatalog.vue'
import userProfile from '../views/Admin/UserProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/applications',
    name: 'applications',
    component: Applications,
    children: [
      { 
        path: '/',
        name: 'application-catalog',
        component: ApplicationCatalog,
        props: true,
      },
      { 
        path: '/applications/:appId', //?????
        name: 'application-page',
        component: ApplicationPage,
        props: true,
      },
    ]
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user-profile",
    name: "user-profile",
    component: userProfile,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
