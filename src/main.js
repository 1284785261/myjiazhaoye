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
	const Token = sessionStorage.getItem('token')==""? "":sessionStorage.getItem('token');
//  	const Token ="eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDQyMzI5MDMsInN1YiI6InQ2eUgzZDh2SDJHbjNMTEt3MUdOSC9JY3VXZThjdlJqbkwwQmVsZTdIY1NJNnFlcWFvc2U5YXYzRHl2RTBvRE1QWmZHMHkxb1VITVRcclxuWlJYR0MrMnlxZz09In0.SCMcQTGcu7sNfRB88jgQEeyYDDoDuOp2WzofGKZaxQI"
    console.log("请求....")

	//console.log(Token)
	//console.log(sessionStorage.getItem('token'));
	//console.log(1111)
    config.headers['Authorization'] = Token
    //eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDAwMDEiLCJpYXQiOjE1MDMyODc3OTIsInN1YiI6IlRiNm1EUWE2ZXFtSnY2cEpEQjdVUkE9PSJ9.tdUFIwfHMUoDFnZHRmbUTmeEldhvBHYxjJF4P6WbEXE
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
  components: { App },
  
})


