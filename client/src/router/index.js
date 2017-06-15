import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Content from '@/components/Content'
import Welcome from '@/components/Welcome'

// import
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
