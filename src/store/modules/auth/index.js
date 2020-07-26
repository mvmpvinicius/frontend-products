/* eslint-disable */

import ApiService from '../../../api/api.service'
import PassportService from '../../../common/passport.service'
// import Vue from 'vue'

const state = {
  token: null,
  errors: {
    login: [],
    register: []
  },
  name: null,
  email: null,
  role: null,
  isAuthenticated: false,
}

const getters = {
  getLoginErrors(state) {
    return state.errors.login
  },
  getRegistrationErrors(state) {
    return state.errors.register
  },
  getErrors(state) {
    return state.errors
  },
  currentUser(state) {
    const user = {
      name: state.name,
      email: state.email,
      role: state.role,
    }
    return user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  }
}

const mutations = {
  setUser(state, data) {
    state.isAuthenticated = true
    state.token = data.token
    state.role = data.role
    state.name = data.name
    state.email = data.email
    state.errors = {
      login: [],
      register: []
    }
    PassportService.setToken(data.token)
  },
  logout(state, payload) {
    PassportService.unsetToken()
  },
}

const actions = {
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('api/user/login', credentials)
        .then(({data}) => {
          context.commit(
            'setUser', data.user
          )
          resolve(data)
        })
        .catch(({response}) => {
          console.log(response)
          reject(response)
        })
    })
  },
  logout(context, payload) {
    context.commit('logout')
    context.commit('resetState', null, { root: true })
    return new Promise((resolve, reject) => {
      ApiService.get('api/user/logout')
        .then(({data}) => {
          context.commit('logout')
          resolve(data)
        })
        .catch(({response}) => {
          console.log('TEST')
          console.log(response)
          reject(response)
        })
    })
  },
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('api/user/register', credentials)
        .then(({data}) => {
          context.commit('setUser', { token: data.token })
          resolve(data)
        })
        .catch(({response}) => {
          console.log(response)
          reject(response)
        })
    })
  },
  checkAuth(context) {
    if (PassportService.getToken()) {
      ApiService.setHeader()
      return context.getters.currentUser
    } else {
      context.commit('logout')
      return false
    }
  },
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state
}