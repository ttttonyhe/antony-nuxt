// Making Cookies Features to be available globally
import Vue from 'vue'
import cookies from 'vue-cookie'
var cookie = {
  install(Vue) {
    Vue.prototype.cookie = cookies;
  }
}
Vue.use(cookie);