import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'Login' }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        }
      ]
    }
  ]
})
