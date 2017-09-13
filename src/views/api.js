
//共用接口
//const host = 'http://115.29.138.230:8080';

const host3 = 'http://192.168.26.191:8080';
//const host3 = 'http://120.78.16.234:8060';
//http://120.78.16.234:8063
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
const Complie ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityAdd200002';

//关闭或开放社区
const Open = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdown200012';

//修改介绍页面数据
const Present='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200003';

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
const Password = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityModifyPassword200055'

//获取验证码接口
const Authcode = '/cxkj-center/apis/verify/CxkjCenterSendcode10009'

const Oldphone = '/cxkj-center/apis/user/CxkjCenterValidPhone100018'
//修改手机号
const Phone = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityModifyPhone200047'

//公寓状态数据
const State = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityApartmentState200031'

//住户列表
const Household = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityHousehold200032'

//调价管理
const Table = '/cxkj-room/apis/pc/roomModifyPrice/CxkjCommunityAdjustThePriceTable200033'

//公寓状态房间信息
const Roominfo = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityRoomInfo200062'

//调价申请
const Price ='/cxkj-room/apis/pc/roomModifyPrice/CxkjCommunityAdjustThePrice200063'

//调价审核
const PriceInfo = '/cxkj-room/apis/pc/roomModifyPrice/CxkjCommunityAdjustThePriceInfo200064'


//工作台-管家收款
const Manager = '/cxkj-room/apis/pcManager/cxkjcommunity/CxkjCommunityManagerMoney200066'

//工作台-今日待办
const Workbench = '/cxkj-room/apis/pcManager/cxkjcommunity/CxkjCommunityManagerTodayTask200030'

//工作台-发起收款列表
const Payment = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityCollectPaymentTable200035'

//工作台-发起收款列表-发起收款
const Payment2 = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityCollectPayment200036'

//工作台 - 收款详情
const Details = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityGatheringDetails200037'

//工作台-办公场地状态
const Status ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeSpaceStatus200034'
//地区选择省/市/区
const Parent ='/cxkj-room/apis/cxkjsystemarea/parent-area';

//社区评论列表
const Comment = '/cxkj-room/apis/comment/CxkjCommunityCommentTable200069'

//社区评论详情
const CommentInfo = '/cxkj-room/apis/comment/CxkjCommunityCommentInfo200058'

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
export const hostState = host3 +State;
export const hostHousehold = host3 +Household;
export const hostTable = host3 + Table;
export const hostRoominfo = host3 +Roominfo;
export const hostPrice = host3 +Price;
export const hostPriceInfo = host3 + PriceInfo;
export const hostManager = host3 + Manager;
export const hostWorkbench = host3 + Workbench;
export const hostPayment = host3 +Payment;
export const hostPayment2 = host3 + Payment2;
export const hostDetails = host3 + Details;
export const hostStatus = host3 + Status;
export const hostComment = host3 + Comment;
export const hostCommentInfo = host3 + CommentInfo;
//export default {
//hosts:function(){
//		return{
//			hostlogin: host + login,
//			hostAuthor: host + Author
//		}
//}
//
//}

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
export const editFloor =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityEditFloor200061'

export const IntroduceInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduceInfo200065'
export const roomInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityRoomInfo200062'

//会员管理
export const memberTable =host3+'/cxkj-room/apis/pcManager/communityMember/CxkjCommunityMemberTable200018'//会员管理列表
export const editBlacklist =host3+'/cxkj-room/apis/pcManager/communityMember/CxkjCommunityEditBlacklist200067'//设置黑名单
export const eemberInformation =host3+'/cxkj-room/apis/pcManager/communityMember/CxkjCommunityMemberInformation200019'//会员信息
export const editWhilelist =host3+'/cxkj-room/apis/pcManager/communityMember/CxkjCommunityEditWhitelist200068'//设置为白名单



//订单管理
export const allOrder =host3+'/cxkj-room/apis/pc/officeOrderMgrCenter/CxkjOfficeOrderList300038'
export const officeDetail =host3+'/cxkj-room/apis/pc/officeOrderMgrCenter/CxkjMeetingOrderDetail300045'
export const placeDetail =host3+'/cxkj-room/apis/pc/officeOrderMgrCenter/CxkjPlaceOrderDetail300044'
export const officeOrderUsed =host3+'/cxkj-room/apis/pc/officeOrderMgrCenter/CxkjConfirmOfficeOrderUsed300068';
//合同管理
export const roomContract =host3+'/cxkj-room/apis/pc/contractMgrCenter/CxkjRoomContractList300064';
export const officeContract =host3+'/cxkj-room/apis/pc/contractMgrCenter/CxkjOfficeContractList300065';
export const propertyContract =host3+'/cxkj-room/apis/pc/contractMgrCenter/CxkjPropertyContractList300066';
export const contractDetai =host3+'/cxkj-room/apis/pc/contractMgrCenter/CxkjContractDetail300067';

//账单管理
export const roomBill =host3+'/cxkj-room/apis/pc/roomBillMgr/CxkjGetRoomBillList300039';
export const officeBill =host3+'/cxkj-room/apis/pc/roomBillMgr/CxkjGetOfficeBillList300040';
export const waterEnergyBill =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjGetWaterEnergyBillList300034';
export const roomBillDetail =host3+'/cxkj-room/apis/pc/roomBillMgr/CxkjGetRoomBillDetail300041';
export const officeBillDetail =host3+'/cxkj-room/apis/pc/roomBillMgr/CxkjGetOfficeBillDetail300042';
export const statisticsInfoOfUser =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjGetStatisticsInfoOfUser300036';
export const billPayment =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjGetWaterEnergyBillPaymentList300035';
export const saveBillPayment =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjSaveUsedWaterEnergy300037';
