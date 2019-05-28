// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Loading from 'components/lib/loading'
import CenterContainer from 'components/lib/center-container'
import {AppInsights} from 'applicationinsights-js'

const prod = process.env.NODE_ENV === 'production'
const shouldSW = 'serviceWorker' in navigator && prod
const shouldSWDev = 'serviceWorker' in navigator && !prod

if (shouldSW) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service Worker Registered!')
  })
} else if (shouldSWDev) {
  navigator.serviceWorker.register('/service-worker-dev.js').then(() => {
    console.log('Service Worker Registered!')
  })
}

AppInsights.downloadAndSetup({ instrumentationKey: '95ad5e59-65cb-41f4-852f-3759163e1a41' })

Vue.config.productionTip = false

Vue.component('loading', Loading)
Vue.component('center-container', CenterContainer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
