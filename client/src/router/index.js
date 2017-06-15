import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Home from '@/components/Home'
import DetilQuestion from '@/components/DetilQuestion'
import Profile from '@/components/Profile'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detil_question/:id',
      name: 'DetilQuestion',
      component: DetilQuestion,
      props:true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props:true
    }
  ]
})
