
//共用接口
const host = 'http://115.29.138.230:8080';
//const host = 'http://192.168.26.117:9080';

//用户登录接口
const login = '/apis/user/CxkjCenterLogin100002';

//用户个人信息
const Author = '/cxkj-center/apis/user/info';

export const hostlogin = host + login;
export const hostAuthor = host + Author;

//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//	
//}
		