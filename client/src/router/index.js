import Vue from 'vue'
import VueMaterial from 'vue-material'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Threadlist from '@/components/Threadlist'
import Threaddetail from '@/components/Threaddetail'
import 'vue-material/dist/vue-material.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueMaterial)
Vue.use(Router)

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'grey'
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/thread/:id',
      props: true,
      name: 'Threaddetail',
      component: Threaddetail
    },
    {
      path: '/thread',
      name: 'Threadlist',
      component: Threadlist
    }
    // {
    //   path: '/user',
    //   name: User
    // }
  ]
})
