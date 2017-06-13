import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import MainComment from '@/components/MainComment'



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Main },
    { path: '/comment/:id', component: MainComment }
  ]
})
