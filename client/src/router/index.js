import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Stories from '@/components/Stories'
import Profile from '@/components/Profile'
import UserStories from '@/components/UserStories'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'stories',
      component: Stories
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/user-stories',
      name: 'userStories',
      component: UserStories
    }
  ]
})
