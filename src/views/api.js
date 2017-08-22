
//共用接口
const host = 'http://115.29.138.230:8080';
//const host2 = 'http://192.168.26.117:9080';
const host2 = 'http://localhost:9080';
const host3 = 'http://192.168.26.164:8080';
//http://115.29.138.230:8080/apis/community/pc/CxkjCommunity 200001

//用户登录接口
const login = '/apis/user/CxkjCenterLogin100002';

//用户个人信息接口
const Author = '/apis/user/info';

//社区管理接口
//http://localhost:9080/cxkj_room/apis/pc/cxkjcommunity/CxkjCommunity200001
const Commint = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200001';


//添加社区
//http://115.29.138.230:8080/apis/community/pc/CxkjCommunityAdd200002
const Complie ='/apis/community/pc/CxkjCommunityAdd200002';


//地区选择省/市/区
//http://115.29.138.230:8080/cxkj-room/apis/cxkjsystemarea/parent-area
const Parent ='/cxkj-room/apis/cxkjsystemarea/parent-area';
export const hostlogin = host + login;
export const hostAuthor = host + Author;
export const hostCommint = host3 + Commint;
export const hostComplie = host3 + Complie;
export const hostParent = host3 + Parent;
//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//	
//}
		