
//共用接口
//const host = 'http://115.29.138.230:8080';

const host3 = 'http://192.168.26.186:8080';
//const host3 = 'http://120.78.16.234:8060';
const host1 = 'http://192.168.26.135:8091';

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

//修改介绍页面数据
const Present='/cxkj-room/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200003';

//获取社区设置的方式
const Way ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySytemData200050'

//社区基本信息
const Title='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityInfo200011'

//社区编辑设置信息
const Room ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduce200004'

//通知消息列表
const Bean = '/apis/pc/message/CxkjAnnouncementMessage300017'

//系统通知消息列表
const Beans = '/cxkj-room/apis/pc/message/CxkjSystemMessage300018'

//获取系统消息发布范围
const Range = '/apis/pc/message/CxkjGetPublishRange300046'

//发布系统消息
const Range2 = '/apis/pc/message/CxkjPublishSystemMessage300019'

//广告页面管理数据
const Advert = '/cxkj-room/apis/pc/ad/CxkjAdIndexPage300008'

//广告修改信息接口
const amend = '/cxkj-room/apis/pc/ad/CxkjGoAdEdit300020'

//广告页面添加banner
const Addadvert = '/cxkj-room/apis/pc/ad/CxkjAdAdd300009'

//用户个人信息上传头像
const portrait ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPersonalUpdate200060'

//广告修改上传
const Alter = '/cxkj-room/apis/pc/ad/CxkjAdEdit300010';

//广告删除
const Delete = '/cxkj-room/apis/pc/ad/CxkjAdDel300011'

//修改登录密码
const Password = '/cxkj-center/apis/user/CxkjCenterUpdatePassword100007'

//获取验证码接口
const Authcode = '/cxkj-center/apis/verify/CxkjCenterSendcode10009'

const Oldphone = '/cxkj-center/apis/user/CxkjCenterValidPhone100018'
//修改手机号
const Phone = '/cxkj-center/apis/user/CxkjCenterUpdatePhone100008'

export const Housetype =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityHousetype200048'
export const SytemData =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySytemData200050'
export const RoomAdd =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityFloorRoomAdd200046'
export const Apartment =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityApartment200005'
export const Place =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPlace200008'
export const Office =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOffice200009'
export const Meeting =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityMeeting200010'
export const ShutdownRoom =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdownRoom200049'
export const addRoom =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityRoom200007'
export const updateRoom =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityEditRoom200051'
export const deleteFloor =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdownFloor200052'
export const copyFloor =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityCopyFloor200053'
export const addHouseType =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityResource200006'
export const allCommunity =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityAll200059'
export const allOrder =host3+'/apis/pc/officeOrderMgrCenter/CxkjOfficeOrderList300038'
export const editFloor =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityEditFloor200061'
export const officeDetail =host3+'/apis/pc/officeOrderMgrCenter/CxkjMeetingOrderDetail300045'
export const placeDetail =host3+'/apis/pc/officeOrderMgrCenter/CxkjPlaceOrderDetail300044'
export const officeOrderUsed =host3+'/apis/pc/officeOrderMgrCenter/CxkjConfirmOfficeOrderUsed300068';
export const roomContract =host3+'/apis/pc/contractMgrCenter/CxkjRoomContractList300064';
export const officeContract =host3+'/apis/pc/contractMgrCenter/CxkjOfficeContractList300065';
export const propertyContract =host3+'/apis/pc/contractMgrCenter/CxkjPropertyContractList300066';
export const contractDetai =host3+'/apis/pc/contractMgrCenter/CxkjContractDetail300067';


//地区选择省/市/区
//http://115.29.138.230:8080/cxkj-room/apis/cxkjsystemarea/parent-area
const Parent ='/cxkj-room/apis/cxkjsystemarea/parent-area';
export const hostlogin = host3 + login;
export const hostAuthor = host3 + Author;
export const hostCommint = host3+ Commint;
export const hostComplie = host3 + Complie;
export const hostParent = host3 + Parent;
export const hostOpen = host3 + Open;
export const hostPresent = host3 + Present;
export const hostWay = host3 + Way;
export const hostRoom = host3 +Room;
export const imgPath = 'http://kaisa-cxkj.oss-cn-shenzhen.aliyuncs.com/test';    //图片路径前缀
export const hostTitle = host3 + Title;
export const hostBean = host1 + Bean;
export const hostBeans = host3 + Beans;
export const hostAdvert = host1 + Advert;
export const hostAddadvert = host1 +Addadvert;
export const hostportrait = host3+portrait;
export const hostamend =host3 + amend;
export const hostAlter = host3 + Alter;
export const hostDelete = host3 + Delete;
export const hostPassword = host3 + Password;
export const hostAuthcode = host3 + Authcode;
export const hostPhone = host3 + Phone;
export const hostOldphone =host3 + Oldphone;
export const hostRange = host1 + Range;
export const hostRange2 = host1 + Range2;
//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//
//}
