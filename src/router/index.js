import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Applications from '../views/Applications.vue'
import Admin from '../views/Admin.vue'
import Auth from '../views/Auth.vue'
import ApplicationPage from '../components/Applications/ApplicationPage.vue'
import ApplicationCatalog from '../components/Applications/ApplicationCatalog.vue'
import userProfile from '../components/Admin/UserProfile.vue'
import Login from '../components/Auth/Login.vue'

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
        path: '/applications/:appId',
        name: 'application-page',
        component: ApplicationPage,
        props: true,
      },
    ]
  },
  {
    path: '/login',
    name: 'auth',
    component: Auth,
    children: [
      { 
        path: '/',
        name: "login",
        component: Login,
      },
    ]
  },
  {
    path: '/user-profile',
    name: 'admin',
    component: Admin,
    children: [
      { 
        path: '/',
        name: "user-profile",
        component: userProfile,
        meta: { requiresAuth: true },
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
