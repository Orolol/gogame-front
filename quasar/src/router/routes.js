
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
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
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
