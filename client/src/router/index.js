import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Auth from '@/components/Auth'
import ThreadDetail from '@/components/ThreadDetail'
import EditThread from '@/components/EditThread'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/registration',
      component: Auth
    },
    {
      path: '/thread',
      component: ThreadDetail
    },
    {
      path: '/edit',
      component: EditThread
    }
  ]
})
