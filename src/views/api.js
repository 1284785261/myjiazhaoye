
//共用接口
const host = 'http://115.29.138.230:8080';
//const host = 'http://192.168.26.117:9080';

//http://115.29.138.230:8080/apis/community/pc/CxkjCommunity 200001
//http://115.29.138.230:8080/apis/user/CxkjCenterPCGetUserInfo100004
//http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityInfo200004 

//用户登录接口
const login = '/apis/user/CxkjCenterLogin100002';

//用户个人信息接口
const Author = '/apis/user/info';

//社区管理接口
const Commint = '/apis/community/pc/CxkjCommunity';

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
		