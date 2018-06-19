import './promise-polyfill'
import { app } from './app'
import Axios from 'axios'

// Enable progressive web app support (with offline-plugin)
if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

app.$mount('#app')

function nFormatter(num, digits) {
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
}
