import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Game from '../views/Game'
import Login from '../views/Login'
import Profile from '../views/Profile'
import SignUp from '../views/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/Game',
      component: Game,
      name: 'Game'
    },
    {
      path: '/Login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/Profile',
      component: Profile,
      name: 'Profile'
    },
    {
      path: '/SignUp',
      component: SignUp,
      name: 'SignUp'
    }
  ]
})
