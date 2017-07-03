import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      name: "Home"
    },
    {
      path: '/Login',
      component: Login,
      name: "Login"
    },
    {
      path: '/SignUp',
      component: SignUp,
      name: "SignUp"
    }
  ]
})
