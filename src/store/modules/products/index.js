// /* eslint-disable */

import ApiService from '../../../api/api.service'
// import Vue from 'vue'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  approveProduct(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.put('api/product', credentials, credentials.id)
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          console.log(response)
          reject(response)
        })
    })
  },
  createProduct(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('api/product', credentials)
        .then(({data}) => {
          resolve(data)
        })
        .catch(({response}) => {
          console.log(response)
          reject(response)
        })
    })
  },
  getProducts(context, credentials) {
      return new Promise((resolve, reject) => {
          ApiService.get('api/product', credentials)
            .then(({data}) => {
              resolve(data)
            })
            .catch(({response}) => {
              console.log(response)
              reject(response)
            })
      })
  }
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state
}