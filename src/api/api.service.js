import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import PassportService from '../common/passport.service'
import { API_URL } from '../common/config'

const ApiService = {
  init(){
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader(){
    Vue.axios.defaults.headers.common = {
      // 'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${PassportService.getToken()}`
    }
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  put(resource, params, slug = "") {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },
}

export default ApiService