
//共用接口
//const host = 'http://115.29.138.230:8080';

const host3 = 'http://192.168.26.191:8080';
//const host3 = 'http://120.78.16.234:8060';
//const host3 = 'http://192.168.20.108:8080';
//http://120.78.16.234:8063
//const host3 = 'http://192.168.26.135:8091';
//const host3 = 'http://192.168.20.114:8081';//周昭滨

//用户登录接口
const login='/cxkj-center/apis/user/CxkjCenterLogin100002';

//管家个人信息接口
const Author = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPersonalInformation200021';

//社区管理接口
const Commint = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200001';

//添加社区
const Complie ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityAdd200002';

//编辑社区
const addComplie = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySearch200054'

//关闭或开放社区
const Open = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdown200012';

//修改介绍页面数据
const Present='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200003';

//获取社区设置的方式(字典)
const Way ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunitySytemData200050'

//社区基本信息
const Title='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityInfo200011'

//社区编辑获取信息
const Rooms = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduceInfo200065'

//社区编辑设置信息
const Room ='/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduce200004'

//通知消息列表
const Bean = '/cxkj-room/apis/pc/message/CxkjAnnouncementMessage300017'

//系统通知消息列表
const Beans = '/cxkj-room/apis/pc/message/CxkjSystemMessage300018'

//获取系统消息发布范围
const Range = '/cxkj-room/apis/pc/message/CxkjGetPublishRange300046'

//发布系统消息
const Range2 = '/cxkj-room/apis/pc/message/CxkjPublishSystemMessage300019'

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
const Payment = '/cxkj-room/apis/pcManager/cxkjcommunityGathering/CxkjCommunityCollectPaymentTable200035'

//工作台-发起收款列表-发起收款
const Payment2 = '/cxkj-room/apis/pcManager/cxkjcommunityGathering/CxkjCommunityCollectPayment200036'

//工作台 - 收款详情
const Details = '/cxkj-room/apis/pcManager/cxkjcommunityGathering/CxkjCommunityGatheringDetails200037'

//工作台-办公场地状态 -会议室
const StatusMe = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeSpaceStatusMetting200076'

//工作台-办公场地状态 -办公室
const Statusof = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeSpaceStatusOffice200077'

//工作台-办公场地状态 -工位
const StatusPl = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeSpaceStatusPlace200034'

//地区选择省/市/区
const Parent ='/cxkj-room/apis/cxkjsystemarea/parent-area';

//社区评论列表
const Comment = '/cxkj-room/apis/comment/CxkjCommunityCommentTable200069'

//社区评论详情
const CommentInfo = '/cxkj-room/apis/comment/CxkjCommunityCommentInfo200058'

//导出
const daocu = '/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityHouseholdDownload200070'

//获取签约未出租房间列表
const RoomList = '/cxkj-room/apis/pcManager/cxkjcontractsign/RentRoomList500051'

//获取签约的用户个人信息
const RoomUser = '/cxkj-room/apis/pcManager/cxkjcontractsign/UserInfo500053'
//获取签约的信息
const Controller = '/cxkj-room/apis/pcManager/cxkjcontractsign/SignStart500057'

//公寓个人签约
const SigController = '/cxkj-room/apis/pcManager/cxkjcontractsign/SignPersonel500054'

//公寓公司签约
const SignCompany = '/cxkj-room/apis/pcManager/cxkjcontractsign/SignCompany500055'

//联合办公未出租办公室
const OfficeList = '/cxkj-room/apis/pcManager/cxkjcontractsign/RentOfficeList500052'

//联合办公签约
const SignOffice = '/cxkj-room/apis/pcManager/cxkjcontractsign/SignOffice500056'

//发起退款记录
const  Refund = '/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundList500060'

//发起退款
const  Refunds = '/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefund500059'

//退款详情
const Refunddetal = '/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundDetail500061'

//部门管理
const Department = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityDepartment200104'

//部门管理-获取上级信息
const Departments = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunitySuperiorDepartment200105'

//部门管理-新增部门
const addDepart = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityAddDepartment200106'

//部门管理-编辑部门
const EditDepart = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityEditDepartment200110'

//部门管理-开放或者关闭
const OffDepartment = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityTurnOffDepartment200107'

//部门管理-批量删除
const DeleteDepart = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityDeleteDepartment200108'

//部门管理-返回上级
const SuperiorDepart = '/cxkj-room/apis/pcManager/cxkjcommunityDepartment/CxkjCommunityReturnToSuperiorDepartment200109'

//员工管理
const Management = '/cxkj-room/apis/pcManager/cxkjcommunityEmployee/CxkjCommunityEmployeeManagement200124'

//所有职位信息
const AllPosition = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityAllPositionManagement200123'

//员工管理-新增员工
const Employee = '/cxkj-room/apis/pcManager/cxkjcommunityEmployee/CxkjCommunityAddEmployeeManagement200125'

//员工管理-开启关闭
const offEmployee = '/cxkj-room/apis/pcManager/cxkjcommunityEmployee/CxkjCommunityTurnOffEmployeeManagement200126'

//员工管理-批量删除
const DeleteEmployee = '/cxkj-room/apis/pcManager/cxkjcommunityEmployee/CxkjCommunityDeleteEmployeeManagement200127'

//员工管理-编辑员工
const EditEmployee = '/cxkj-room/apis/pcManager/cxkjcommunityEmployee/CxkjCommunityEditEmployeeManagement200128'

//社区人员配备
const UserRelation = '/cxkj-room/apis/pcManager/cxkjcommunityRelation/CxkjCommunityUserRelation200129'

//社区人员配备-员工信息
const EmpRelation = '/cxkj-room/apis/pcManager/cxkjcommunityRelation/CxkjCommunityEmployeeRelation200130'

//社区人员配备-配置信息
const MaintainRe = '/cxkj-room/apis/pcManager/cxkjcommunityRelation/CxkjCommunityMaintainRelation200131'

//社区人员配备-人员配备
const AddUserRelation = '/cxkj-room/apis/pcManager/cxkjcommunityRelation/CxkjCommunityAddUserRelation200132'

//职位管理数据
const PositionManage = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityPositionManagement200117'

//职位管理-权限分类
const PowerPosit = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityPowerPosition200120'

//职位管理-职位分类
const PositionMan = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityAllPositionManagement200123'

//职位管理-增加职位
const AddPosition = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityAddPositionManagement200119'

//职位管理-编辑职位
const EditPosition = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityEditPositionManagement200122'

//职位管理-关闭开启职位
const OffPosition = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityTurnOffPositionManagement200118'

//职位管理-删除职位
const DeletePosition = '/cxkj-room/apis/pcManager/cxkjcommunityPosition/CxkjCommunityDeletePositionManagement200121'

//权限管理-权限数据
const CommunityMan = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityManagement200111'

//权限管理-新增数据
const AddCommunityMan = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityAddManagement200112'

//权限管理-删除数据
const delCommunityMan = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityDeleteManagement200114'

//权限管理-开放关闭数据
const OffManagement = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityTurnOffManagement200113'

//权限管理-分配权限
const Allocation = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityAllocationManagement200115'

//权限管理-添加权限
const AddToManagement = '/cxkj-room/apis/pcManager/cxkjcommunityPower/CxkjCommunityAddToManagement200116'

//活动管理
const Activity = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivity200092'

//活动管理-详情
const ActivityInfo = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivityInfo200094'

//活动管理-活动范围
const ActivityArea = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivityArea200095'

//活动管理-新增活动
const ActivityAdd = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivityAdd200093'

//活动管理-活动编号随机码
const RangeRandom = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivityRangeRandom200096'

//活动管理-作废活动
const ActivityModify = '/cxkj-room/apis/pc/cxkjcommunityActivity/CxkjCommunityActivityModify200097'

//个人中心-我的业绩
const SignContr = '/cxkj-room/apis/pcManager/cxkjcontractsign/CxkjSignList500066'

//用户退租列表
const ThrowLease = '/cxkj-room/apis/pcManager/cxkjcommunitythrowlease/CxkjCommunityLeaseList500086'

//查看退租-确认退租
const wLeaseContr = '/cxkj-room/apis/pcManager/cxkjcommunitythrowlease/CxkjCommunityLeaseStart500087'

//查看退租-用户确认退租
const LeaseController = '/cxkj-room/apis/pcManager/cxkjcommunitythrowlease/CxkjCommunityLeasePass500088'
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
export const hostBean = host3 + Bean;
export const hostBeans = host3 + Beans;
export const hostAdvert = host3 + Advert;
export const hostAddadvert = host3 +Addadvert;
export const hostportrait = host3+portrait;
export const hostamend =host3 + amend;
export const hostAlter = host3 + Alter;
export const hostDelete = host3 + Delete;
export const hostPassword = host3 + Password;
export const hostAuthcode = host3 + Authcode;
export const hostPhone = host3 + Phone;
export const hostOldphone =host3 + Oldphone;
export const hostRange = host3 + Range;
export const hostRange2 = host3 + Range2;
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
export const hostComment = host3 + Comment;
export const hostCommentInfo = host3 + CommentInfo;
export const hostdaocu = host3 + daocu;
export const hostStatusMe = host3 +StatusMe;
export const hostStatusof = host3 +Statusof;
export const hostStatusPl = host3 +StatusPl;
export const hostRooms = host3 + Rooms;
export const hostController = host3 + Controller;
export const hostRoomList = host3 + RoomList;
export const hostRoomUser = host3 + RoomUser;
export const hostSigController = host3 + SigController;
export const hostOfficeList = host3 + OfficeList;
export const hostSignCompany = host3 + SignCompany;
export const hostSignOffice = host3 +SignOffice;
export const hostRefund = host3 + Refund;
export const hostRefunds = host3 + Refunds;
export const hostaddComplie = host3 + addComplie;
export const hostRefunddetal = host3 + Refunddetal;
export const hostDepartment = host3 + Department;
export const hostDepartments = host3 + Departments;
export const hostaddDepart = host3 +addDepart;
export const hostEditDepar = host3 + EditDepart;
export const hostOffDepartment = host3 + OffDepartment;
export const hostDeleteDepart = host3 + DeleteDepart;
export const hostSuperiorDepart = host3 + SuperiorDepart;
export const hostManagement = host3 + Management;
export const hostAllPosition = host3 + AllPosition;
export const hostEmployee = host3 + Employee;
export const hostoffEmployee = host3 + offEmployee;
export const hostDeleteEmployee = host3 + DeleteEmployee;
export const hostEditEmployee = host3 + EditEmployee;
export const hostUserRelation = host3 + UserRelation;
export const hostEmpRelation = host3 + EmpRelation;
export const hostMaintainRe = host3 + MaintainRe;
export const hostAddUserRelation = host3 + AddUserRelation;
export const hostPositionManage = host3 + PositionManage;
export const hostPowerPosit = host3 + PowerPosit;
export const hostPositionMan = host3 + PositionMan;
export const hostAddPosition = host3 + AddPosition;
export const hostEditPosition = host3 + EditPosition;
export const hostOffPosition = host3 + OffPosition;
export const hostDeletePosition = host3 + DeletePosition;
export const hostCommunityMan = host3 + CommunityMan;
export const hostAddCommunityMan = host3 + AddCommunityMan;
export const hostdelCommunityMan = host3 + delCommunityMan;
export const hostOffManagement = host3 + OffManagement;
export const hostAllocation = host3 + Allocation;
export const hostAddToManagement = host3 + AddToManagement;
export const hostActivity = host3 + Activity;
export const hostActivityInfo = host3 + ActivityInfo;
export const hostActivityArea = host3 + ActivityArea;
export const hostActivityAdd = host3 + ActivityAdd;
export const hostRangeRandom = host3 + RangeRandom;
export const hostActivityModify = host3 + ActivityModify;
export const hostSignContr = host3 + SignContr;
export const hostThrowLease = host3 + ThrowLease;
export const hostwLeaseContr = host3 + wLeaseContr;
export const hostLeaseController = host3 + LeaseController;
export const host = host3;
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

export const IntroduceInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityIntroduceInfo200065';
export const roomInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityRoomInfo200062';
export const deleteHouseType =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityHousetypeDelete200086';//删除户型
export const placeInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPlaceInfo200087';//工位详情
export const officeInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeAll200088';//办公室详情
export const deleteOffice =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOfficeDelete200089';//删除办公室
export const meetingInfo =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityMeetingInfo200091';//会议室信息
export const deleteMeeting =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityMeetingDelete200090';//删除会议室




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

//客服管理
export const complainList =host3+'/cxkj-room/apis/pc/complainCenter/CxkjComplainList300086';
export const complainDetail =host3+'/cxkj-room/apis/pc/complainCenter/CxkjComplainDetail300087';
export const addComplain =host3+'/cxkj-room/apis/pc/addComplain/CxkjAddComplain300093';


//设备管理
export const gateLock =host3+'/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityShutdown200012';

//财务管理
export const billInvoice =host3+'/cxkj-room/apis/pcManager/cxkjbillInvoice/CxkjBillInvoiceList500064';//发票管理
export const sendbillInvoice =host3+'/cxkj-room/apis/pcManager/cxkjbillInvoice/CxkjBillInvoiceDetailPass500067';//开发票
export const invoiceDetailSend =host3+'/cxkj-room/apis/pcManager/cxkjbillInvoice/CxkjBillInvoiceDetailSend500068';//寄出发票
export const invoiceDetail =host3+'/cxkj-room/apis/pcManager/cxkjbillInvoice/CxkjBillInvoiceDetail500065';//发票详情
export const financeList =host3+'/cxkj-room/apis/pcManager/cxkjcommunityfinance/CxkjCommunityFinanceList500095';//财务管理

export const refundHandle =host3+'/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundHandleList500058';//退款处理
export const refundDetail =host3+'/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundDetail500061';//退款详情
export const refundMoneyToUser =host3+'/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundDetailRefund500063';//确认退款
export const judgePass =host3+'/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundDetailPass500062'//审核通过
export const judgeNoPass =host3+'/cxkj-room/apis/pcManager/cxkjcommunityrefund/CxkjCommunityRefundDetailReject500096'//审核不通过

export const unsentWaterEnergyBillList =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjGetUnsentWaterEnergyBillList300101';//未发送给客户的水电账单列表
export const editUsedWaterEnergy =host3+'/cxkj-room/apis/pc/waterEnergyBill/CxkjEditUsedWaterEnergy300094';//编辑水电账单

//设备管理
export const shutdown =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationTable200138';//智能门锁
export const temporaryPwd =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationPassword200139';//临时密码
export const sendMessege =host3+'/cxkj-center/apis/verify/CxkjCenterSendcode';//发送短信
export const addDoorLock =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationAdd200140';//添加门锁
export const updateDL =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationUpdate200141';//修改门锁配置
export const deleteDL =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationDelete200142';//解除门锁
export const unLockDL =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationUnlock200143';//冻结/解冻门锁
export const doorLockNotes =host3+'/cxkj-room/apis/pc/roomLock/CxkjRoomLockRelationRecord200144';//开锁记录

