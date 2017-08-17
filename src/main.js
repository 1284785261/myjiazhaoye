// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import iView from 'iview';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.use(iView);
Vue.prototype.$http = axios;
Vue.config.productionTip = false



	//token配置
	axios.interceptors.request.use(
	  config => {
	  	let Token = sessionStorage.getItem('token')==""? "":sessionStorage.getItem('token');
//	    console.log("请求....")
	    config.headers['Authorization'] = Token
	    return config
	    console.log(config);
	  },
	  err => {
	    return Promise.reject(err)
	  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
