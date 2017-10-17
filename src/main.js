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

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

Array.prototype.remove = function(val){
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};


//token配置
axios.interceptors.request.use(
  config => {
	const Token = sessionStorage.getItem('token')==""? "":sessionStorage.getItem('token');
    console.log("请求....")

	//console.log(Token)
	//console.log(sessionStorage.getItem('token'));
	//console.log(1111)
    config.headers['Authorization'] = Token;
    return config;
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


