import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import PhSign from './views/phone/sign'
import PhLayout from './views/phone/layout'
import PhAns from './views/phone/ans'
import PhTestList from './views/phone/test-list'
import Developer from './views/developer'

import Sign from './views/sign'
import Layout from './views/layout'
import InputQuestion from './views/input-question'
import CreatePapers from './views/create-papers'
import TestResult from './views/test-result'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path:"/",
          name:"Sign",
          component:Sign
      },
      {
          path: "/:page",
          name: "Sign",
          component:Sign
      },
      {
          path:"/ph/mobile",
          name:"PhSign",
          component:PhSign
      },
    {
      path: '/phlayout',
      name: 'PhLayout',
      component: PhLayout,
      children:[
          {
              path:'phans',
              name:'PhAns',
              component:PhAns
          },
          {
              path:"phtestlist",
              name:"PhTestList",
              component:PhTestList
          },
          {
              path:"developer",
              name:"Developer",
              component:Developer
          },
      ]
    },
    {
        path:"/layout",
        name:"layout",
        component:Layout,
        children:[
            {
                path:'home',
                name:"home",
                component:Home
            },
            {
                path:'testresult',
                name:"TestResult",
                component:TestResult
            },
            {
                path:'createpapers',
                name:"CreatePapers",
                component:CreatePapers
            },
            {
                path:'inputquestion',
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
