import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Register from '../views/register.vue'
//import Login from '../views/login.vue'
import TrainerHome from '../views/TrainerHome.vue'
import UserHome from '../views/UserHome.vue'
import Trainerregister from '../views/Trainerregister.vue'
import TrainerSignIn from '../views/TrainerSignIn.vue'
import FindTrainer from '../views/MainFindTrainer.vue'
import MainExPeople from '../views/MainExPeople.vue'
import MainCreateRoom from '../views/MainCreateRoom.vue'
import ProfileSetting from '../views/Setting.vue'
import UserTable from '../views/UserTable.vue'
import register2 from '../views/register2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register/auth',
    name: 'register2',
    component: register2
  },
  {
    path: '/Trainerregister',
    name: 'Trainerregister',
    component: Trainerregister
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login

  // },
  {
    path: '/User',
    name: 'User',
    component: UserHome
  },
  {
    path: '/TrainerHome',
    name: 'TrainerHome',
    component: TrainerHome
  },
  {
    path: '/TrainerSignIn',
    name: 'TrainerSignIn',
    component: TrainerSignIn
  },
  {
    path: '/User/FindTrainer',
    name: 'FindTrainer',
    component: FindTrainer
  },
  {
    path: '/Excercise',
    name: 'Excercise',
    component: MainExPeople
  },
  {
    path: '/CreateRoom',
    name: 'CreateRoom',
    component: MainCreateRoom
  },
  {
    path: '/ProfileSetting',
    name: 'ProfileSetting',
    component: ProfileSetting
  },
  {
    path: '/User/Table',
    name: 'UserTable',
    component: UserTable
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
