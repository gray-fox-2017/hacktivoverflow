import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Stories from '@/components/Stories'
import UserStories from '@/components/UserStories'
import Home from '@/components/Home'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stories',
      name: 'stories',
      component: Stories
    },
    {
      path: '/user-stories',
      name: 'userStories',
      component: UserStories
    }
  ]
})
