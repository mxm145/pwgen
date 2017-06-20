import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import mainview from './components/mainview.vue'
import setting from './components/setting.vue'

Vue.use(Router)
Vue.use({
  install (Vue, options) {
    Vue.prototype.$ipc = global.ipcRenderer || {}
    Vue.prototype.$clipboard = global.clipboard || {}
  }
});

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: mainview },
    { path: '/setting', component: setting },
    { path: '/*', component: mainview}
  ]
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')