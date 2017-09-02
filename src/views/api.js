
//共用接口
//const host = 'http://115.29.138.230:8080';

const host2 = 'http://192.168.26.118:8080';
const host3 = 'http://120.78.16.234:8060';

//http://115.29.138.230:8080/apis/user/CxkjCenterLogin100002

//用户登录接口
//const login = '/apis/user/CxkjCenterLogin100002';
const login='/cxkj-center/apis/user/CxkjCenterLogin100002';

//管家个人信息接口
const Author = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPersonalInformation200021';
//http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPersonalInformation200021
//社区管理接口
const Commint = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200001';

//添加社区
const Complie ='/cxkj_room/apis/pc/community/CxkjCommunityAdd200002';

//关闭或开放社区
const Open = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdown200012';

//介绍页面数据
const Present='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityDetails200047';
//http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityDetails200047\

//获取社区设置的方式
const Way ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySytemData200050'

//社区基本信息
const Title='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityInfo200011'

//社区编辑设置信息
const Room ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduce200004'

//通知消息列表
const Bean = '/cxkj-room/apis/pc/message/CxkjAnnouncementMessage300017'
//系统通知消息列表
const Beans = '/cxkj-room/apis/pc/message/CxkjSystemMessage300018'

export const Housetype =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityHousetype200048'
export const SytemData =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySytemData200050'
export const RoomAdd =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityFloorRoomAdd200046'
export const Apartment =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityApartment200005'
export const Place =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPlace200008'
export const Office =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOffice200009'
export const Meeting =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityMeeting200010'
export const ShutdownRoom =host3+'cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdownRoom200049'


//地区选择省/市/区
//http://115.29.138.230:8080/cxkj-room/apis/cxkjsystemarea/parent-area
const Parent ='/cxkj-room/apis/cxkjsystemarea/parent-area';
export const hostlogin = host3 + login;
export const hostAuthor = host3 + Author;
export const hostCommint = host2 + Commint;
export const hostComplie = host3 + Complie;
export const hostParent = host3 + Parent;
export const hostOpen = host3 + Open;
export const hostPresent = host3 + Present;
export const hostWay = host3 + Way;
export const hostRoom = host3 +Room;
export const imgPath = 'http://kaisa-cxkj.oss-cn-shenzhen.aliyuncs.com/test';    //图片路径前缀
export const hostTitle = host2 + Title;
export const hostBean = host3 + Bean;
export const hostBeans = host3 +Beans;
//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//	
//}
		