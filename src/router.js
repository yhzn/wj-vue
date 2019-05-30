import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import PhSign from './views/phone/sign'
import PhLayout from './views/phone/layout'
import PhAns from './views/phone/ans'

import Layout from './views/layout'
import InputQuestion from './views/input-question'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path:"/phsign",
          name:"PhSign",
          component:PhSign
      },
    {
      path: '/',
      name: 'PhLayout',
      component: PhLayout,
      children:[
          {
              path:'/',
              name:'PhAns',
              component:PhAns
          }
      ]
    },
    {
        path:"/layout",
        name:"layout",
        component:Layout,
        children:[
            {
                path:'/',
                name:"inputQuestion",
                component:InputQuestion
            }
        ]

     },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
