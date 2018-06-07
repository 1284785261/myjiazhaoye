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
import echarts from 'echarts'

Vue.use(ElementUI);
Vue.use(iView);
Vue.prototype.$echarts = echarts
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
Vue.prototype.dateTime = function (t) {
  let date = new Date(parseInt(t))
  let year = date.getFullYear(),
    o = {
      MM:date.getMonth()+1,
      day:date.getDate()
    };
  for (let k in o){
    o[k] = o[k] < 10 ?  '0' + o[k]: o[k];
  }
  let times = year + '-' + o.MM + '-' + o.day;
  // console.log(times)
  return times;
};
Vue.prototype.dateTimes = function(t) {
  if(!t){
    return
  }
  let date = new Date(parseInt(t))
  let year = date.getFullYear(),
    o = {
      MM:date.getMonth()+1,
      day:date.getDate(),
      HH:date.getHours(),
      mm:date.getMinutes(),
      ss:date.getSeconds()
    };
  for (let k in o){
    o[k] = o[k] < 10 ?  '0' + o[k]: o[k];
  }
  let times = year + '-' + o.MM + '-' + o.day+' '+o.HH + ':' + o.mm + ':' + o.ss;
  // console.log(times)
  return times;
}
Vue.prototype.hours = function(t) {
  if(!t){
    return
  }
  let date = new Date(parseInt(t))
  let year = date.getFullYear(),
    o = {

      HH:date.getHours(),
      mm:date.getMinutes(),
      ss:date.getSeconds()
    };
  for (let k in o){
    o[k] = o[k] < 10 ?  '0' + o[k]: o[k];
  }
  let times = o.HH + ':' + o.mm + ':' + o.ss;
  // console.log(times)
  return times;
}

Array.prototype.remove = function(val){
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

Vue.prototype.DateDiff = function(sDate1,sDate2){
  var  aDate,  oDate1,  oDate2,  iDays
  // aDate  =  sDate1.split("-")
  // oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
  // aDate  =  sDate2.split("-")
  // oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
  iDays  = Math.abs(sDate1  -  sDate2)  /  1000  /  60  /  60  /24;   //把相差的毫秒数转换为天数
  if(sDate1 && sDate2){
    if(parseFloat(iDays) > 0 && parseFloat(iDays) < 1){
      return Math.ceil(iDays);
    }else{
      return  parseInt(iDays);
    }
  }else{
    return 0
  }
}

Vue.filter("Service", function(value) {  //企业服务
  let val = parseInt(value)
  let msg = '';
  switch (val){
    case 68: msg = '工商注册'; break;
    case 69: msg = '财税服务'; break;
    case 70: msg = '知识产权'; break;
    case 71: msg = '法律服务'; break;
    case 72: msg = '人力资源'; break;
    case 73: msg = '社保服务'; break;
    case 74: msg = '软件开发'; break;
    case 75: msg = '微信服务'; break;
    case 76: msg = '融资服务'; break;
    case 77: msg = '运动与健康'; break;
    case 78: msg = '营销推广'; break;
    default:
      msg = ''
  }
  return msg
});
Vue.filter("CertificateStatus", function(value) {  //企业服务
  let val = parseInt(value)
  let msg = '';
  switch (val){
    case 0: msg = '未认证'; break;
    case 1: msg = '认证通过'; break;
    case 2: msg = '认证失败'; break;

    default:
      msg = ''
  }
  return msg
});
Vue.prototype.jurisdiction = function(val){
  let arr = JSON.parse(sessionStorage.getItem("success") =="" ? " ":sessionStorage.getItem('success')) ;
  //console.log(arr);
  let index = arr.findIndex(item => item==val)
  if(index>=0){
    //console.log(1111);
    return true;
  }
  else{
    //console.log(2222);
    return false;
  }
}

//token配置
axios.interceptors.request.use(
  config => {
	const Token = sessionStorage.getItem('token')==""? "":sessionStorage.getItem('token');
    // console.log("请求....")
    config.headers['Authorization'] = Token;
    return config;
    // console.log(config);
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


