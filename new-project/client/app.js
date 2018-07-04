import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import VueCircleSlider from 'vue-circle-slider'
import moment from 'moment'

Vue.use(VueCircleSlider)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY hh:mm')
  }
})

Vue.filter('getTranslationShortName', function(actionName) {
  if (store.state.translations[actionName]) {
    return store.state.translations[actionName].ShortName
  } else {
    return actionName
  }
})
Vue.filter('getTranslationDescription', function(actionName) {
  if (store.state.translations[actionName] && store.state.translations[actionName].Description) {
    return store.state.translations[actionName].Description
  } else {
    return actionName
  }
})

Vue.filter('number2digits', function(num) {
  let digits = 2
  var si = [
      { value: 1e18, symbol: 'E' },
      { value: 1e15, symbol: 'P' },
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'G' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' }
    ],
    rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
    i
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
    }
  }
  return num.toFixed(digits).replace(rx, '$1')
})
Vue.filter('number0digits', function(num) {
  let digits = 0
  var si = [
      { value: 1e18, symbol: 'E' },
      { value: 1e15, symbol: 'P' },
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'G' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' }
    ],
    rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
    i
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
    }
  }
  return num.toFixed(digits).replace(rx, '$1')
})

export { app, router, store }
