
//共用接口
const host = 'http://115.29.138.230:8080';
//const host = 'http://192.168.26.117:9080';

//http://115.29.138.230:8080/apis/user/CxkjCenterPCGetUserInfo100004
//用户登录接口
const login = '/apis/user/CxkjCenterLogin100002';

//用户个人信息
const Author = '/cxkj-center/apis/user/info';

const Commint = '/apis/community/pc/CxkjCommunity 200001';

export const hostlogin = host + login;
export const hostAuthor = host + Author;
export const hostCommint = host + Commint;
//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//	
//}
		