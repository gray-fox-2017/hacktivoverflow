import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Auth from '@/components/Auth'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/registration',
      component: Auth
    }
  ]
})
