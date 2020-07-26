/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ProductsCreate from '../views/ProductsCreate.vue'
import ProductsApprove from '../views/ProductsApprove.vue'
import ProductsView from '../views/ProductsView.vue'
import ErrorPage from '../views/Error.vue'

Vue.use(VueRouter)

const router =  new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/products/create',
      name: 'ProductsCreate',
      component: ProductsCreate,
      meta: {
        requiresAuth: true,
        requiresRole: 0
      }
    },
    {
      path: '/products/approve',
      name: 'ProductsApprove',
      component: ProductsApprove,
      meta: {
        requiresAuth: true,
        requiresRole: 1
      }
    },
    {
      path: '/products',
      name: 'ProductsView',
      component: ProductsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
    }
  ]
})

// Check authentication and roles for each visited route
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch('auth/checkAuth')]).then((res) => {
    if (to.meta.requiresAuth && !res[0]) {
      next('/login')
    } else if (to.meta.requiresAuth && (to.meta.requiresRole !== res[0].role && to.meta.requiresRole !== undefined)) {
      next('/error')
    } else {
      next()
    }
  })
)

export default router