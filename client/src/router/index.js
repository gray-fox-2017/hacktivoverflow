import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Content from '@/components/Content'
import DetailQuestion from '@/components/DetailQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/detail/:id',
      props: true,
      name: 'DetailQuestion',
      component: DetailQuestion
    }
  ]
})
