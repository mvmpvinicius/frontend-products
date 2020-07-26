import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import products from './modules/products'

import createPersistedState from 'vuex-persistedstate'

import _ from 'lodash'

const modules = {
  auth,
  products
}

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    resetState(state) {
      _.forOwn(modules, (value, key) => {
        state[key] = _.cloneDeep(value.state)
      })
    },
  },
  modules,
  plugins: [
    createPersistedState({
      paths: ['auth', 'products'],
    }),
  ]
})