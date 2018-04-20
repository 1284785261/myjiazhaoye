
import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'

//import Workbench from '../views/apartment/workbench.vue'    //工作台
//import CommunityManagement from '../views/apartment/communityManagement.vue'  //社区管理
//import CommunityPresentation from '../views/apartment/communityPresentation.vue'  //社区介绍
//import CommunitySettings from '../views/apartment/communitySettings.vue'  //社区设置
//import CommunityMessage from '../views/apartment/communityMessage.vue'    //社区信息
//import CommunityComplie from '../views/apartment/communityCompile.vue'    //编辑社区信息
//import CommunityRoom from '../views/apartment/communityRoom.vue'      //编辑社区房间信息
//import CommunityPersonal from '../views/personal/communityPersonal.vue'   //个人信息



//import Workbench from '../views/apartment/workbench.vue'    //工作台
//import CommunityManagement from '../views/apartment/communityManagement.vue'  //社区管理
//import CommunityPresentation from '../views/apartment/communityPresentation.vue'  //社区介绍
//import CommunitySettings from '../views/apartment/communitySettings.vue'  //社区设置
//import CommunityMessage from '../views/apartment/communityMessage.vue'    //社区信息
//import CommunityComplie from '../views/apartment/communityCompile.vue'    //编辑社区信息


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve =>
      require(['../views/login.vue'],resolve)  //登录页面
    },{
      path: '/apartment/workbench',   //工作台
      name: 'workbench',
      component: resolve =>
      require(['../views/apartment/workbench.vue'],resolve)
    },{
      path: '/apartment/communityManagement',     //社区管理
      name: 'communityManagement',
      component: resolve =>
      require(['../views/apartment/communityManagement.vue'],resolve)
    },{
      path: '/apartment/communityPresentation',     //社区介绍
      name: 'communityPresentation',
      component: resolve =>
      require(['../views/apartment/communityPresentation.vue'],resolve)
    },{
      path: '/apartment/communitySettings',     //社区设置
      name: 'communitySettings',
      component: resolve =>
      require(['../views/apartment/communitySettings.vue'],resolve)
    },{
      path: '/apartment/communityMessage',     //社区信息
      name: 'communityMessage',
      component: resolve =>
      require(['../views/apartment/communityMessage.vue'],resolve)
    },{
      path: '/apartment/communityComplie',     //编辑社区信息
      name: 'communityComplie',

      component: resolve =>
      require(['../views/apartment/communityCompile.vue'],resolve)
    },{
      path: '/apartment/communityRoom',     //编辑社区房间信息
      name: 'communityRoom',
      component: resolve =>
      require(['../views/apartment/communityRoom.vue'],resolve)
    },{
      path: '/apartment/communityPersonal',     //个人信息
      name: 'communityPersonal',
      component: resolve =>
      require(['../views/personal/communityPersonal.vue'],resolve)
    },{
      path: '/apartment/orderManagement',     //订单管理
      name: 'orderManagement',
      component: resolve =>
        require(['../views/apartment/orderManagement.vue'],resolve)
    },{
      path:'/communityHouse',        //社区公寓信息
      name:'communityHouse',
      component: resolve =>
        require(['../views/apartment/communityHouse.vue'],resolve)
    },{
      path:'/loginPassword',				//修改登录密码
      name:'loginPassword',
      component: resolve =>
        require(['../views/personal/loginPassword'],resolve)
    },{
      path:'/lognPhone',				//修改手机号
      name:'loginPhone',
      component: resolve =>
        require(['../views/personal/loginPhone'],resolve)
    },{
      path:'/amendWin',				//修改登录密码/手机号成功
      name:'amendWin',
      component: resolve =>
        require(['../views/personal/amendWin'],resolve)
    },{
      path: '/apartment/communityHouseType',     //社区管理->管理户型
      name: 'communityHouseType',
      component: resolve =>
        require(['../views/apartment/communityHouseType.vue'],resolve)
    },{
      path: '/apartment/communityAddRoom',     //社区管理->批量添加房间
      name: 'communityAddRoom',
      component: resolve =>
        require(['../views/apartment/communityAddRoom.vue'],resolve)
    },{
      path: '/contract/contractIndex',     //合同管理首页
      name: 'contractIndex',
      component: resolve =>
        require(['../views/contract/contractIndex.vue'],resolve)
    },{
      path: '/apartment/orderDetail',     //订单详情
      name: 'orderDetail',
      component: resolve => require(['../views/apartment/orderDetail.vue'],resolve)
    },{
      path: '/contract/contractDetail',     //合同管理->合同详情
      name: 'contractDetail',
      component: resolve => require(['../views/contract/contractDetail.vue'],resolve)
    },{
      path: '/signed/lodgingHouse',     //公寓租客签约
      name: 'lodgingHouse',
      component: resolve => require(['../views/signed/lodgingHouse.vue'],resolve)
    },{
      path: '/bill/billManagement',     //账单管理首页
      name: 'billManagement',
      component: resolve => require(['../views/bill/billManagement.vue'],resolve)
    },{
      path: '/bill/billDetail',     //账单管理->账单详情
      name: 'billDetail',
      component: resolve => require(['../views/bill/billDetail.vue'],resolve)
    },{
      path: '/bill/paymentInformation',     //账单管理->水电账单缴费情况
      name: 'paymentInformation',
      component: resolve => require(['../views/bill/paymentInformation.vue'],resolve)
    },{
      path: '/bill/generateBill',     //账单管理->生成水电账单
      name: 'generateBill',
      component: resolve => require(['../views/bill/generateBill.vue'],resolve)
    }, {
      path: '/member/memberManagement',     //会员管理
      name: 'memberManagement',
      component: resolve => require(['../views/member/memberManagement.vue'], resolve)
    },{
      path: '/signed/lodgingwork',     //联合办公签约
      name: 'lodgingwork',
      component: resolve => require(['../views/signed/lodgingwork.vue'],resolve)
    },{
      path: '/signed/workState',     //办公空间状态
      name: 'workState',
      component: resolve => require(['../views/signed/workState.vue'],resolve)
    },{
      path: '/signed/houseState',     //公寓状态
      name: 'houseState',
      component: resolve => require(['../views/signed/houseState.vue'],resolve)
    },{
      path: '/signed/lodgingwork',     //联合办公签约
      name: 'lodgingwork',
      component: resolve => require(['../views/signed/lodgingwork.vue'],resolve)
    },{
      path: '/signed/workState',     //办公空间状态
      name: 'workState',
      component: resolve => require(['../views/signed/workState.vue'],resolve)
    },{
      path: '/signed/houseState',     //公寓状态
      name: 'houseState',
      component: resolve => require(['../views/signed/houseState.vue'],resolve)
    },{
      path: '/signed/houseDetail',     //公寓状态->公寓详情
      name: 'houseDetail',
      component: resolve => require(['../views/signed/houseDetail.vue'],resolve)
    },{
      path: '/signed/houseRecord',     //公寓状态->公寓详情->开门记录
      name: 'houseRecord',
      component: resolve => require(['../views/signed/houseRecord.vue'],resolve)
    },{
      path: '/signed/residentList',     //公寓状态->公寓详情->住户列表
      name: 'residentList',
      component: resolve => require(['../views/signed/residentList.vue'],resolve)
    },{
      path: '/signed/priceAdmin',     //公寓状态->公寓详情->调价管理
      name: 'priceAdmin',
      component: resolve => require(['../views/signed/priceAdmin.vue'],resolve)
    },{
      path: '/signed/priceCheck',     //公寓状态->公寓详情->调价管理->调价审核
      name: 'priceCheck',
      component: resolve => require(['../views/signed/priceCheck.vue'],resolve)
    },{
      path: '/signed/messageInform',     //消息中心
      name: 'messageInform',
      component: resolve => require(['../views/message/messageInform.vue'],resolve)
    },{
      path: '/member/memberInformation',     //会员管理
      name: 'memberInformation',
      component: resolve => require(['../views/member/memberInformation.vue'], resolve)
    },{
      path: '/apartment/equipmentManage',     //设备管理
      name: 'equipmentManage',
      component: resolve =>
        require(['../views/apartment/equipmentManage.vue'],resolve)
    },{
      path: '/apartment/doorRecord',     //设备管理/开门记录
      name: 'doorRecord',
      component: resolve =>
        require(['../views/apartment/doorRecord.vue'],resolve)
    },{
      path: '/apartment/meterReading',     //设备管理/抄电表/水表记录
      name: 'meterReading',
      component: resolve =>
        require(['../views/apartment/meterReading.vue'],resolve)
    },{
      path: '/advertising/advertiset',     //广告设置
      name: 'advertiset',
      component: resolve =>
        require(['../views/advertising/advertiset.vue'],resolve)
    },{
      path: '/advertising/addBanner',     //广告设置->添加banner
      name: 'addBanner',
      component: resolve =>
        require(['../views/advertising/addBanner.vue'],resolve)
    },{
      path: '/signed/gathering',     //工作台-发起收款
      name: 'gathering',
      component: resolve =>
        require(['../views/signed/gathering.vue'],resolve)
    },{
    	path:'/signed/gatherDetails',		//工作台-发起收款-收款详情
    	name:'gatherDetails',
    	component:resolve =>
    		require(['../views/signed/gatherDetails.vue'],resolve)
    },{
    	path:'/apartment/commentdetails',		//社区评论详情
    	name:'commentdetails',
    	component:resolve =>
    		require(['../views/apartment/commentdetails.vue'],resolve)
    },{
    	path:'/signed/housesubscribe',		//工作台-看房预约
    	name:'housesubscribe',
    	component:resolve =>
    		require(['../views/signed/housesubscribe.vue'],resolve)
    },{
      path:'/finance/financeManagement',		//财务管理
      name:'financeManagement',
      component:resolve =>
        require(['../views/finance/financeManagement.vue'],resolve)
    },{
      path:'/finance/invoiceDetail',		//财务管理-发票详情
      name:'invoiceDetail',
      component:resolve =>
        require(['../views/finance/invoiceDetail.vue'],resolve)
    },{
      path:'/finance/refundDetail',		//财务管理-发票详情
      name:'refundDetail',
      component:resolve =>
        require(['../views/finance/refundDetail.vue'],resolve)
    },{
      path:'/apartment/communityDevice',		//社区管理-设备管理
      name:'communityDevice',
      component:resolve =>
        require(['../views/apartment/communityDevice.vue'],resolve)
    },{
    path:'/operation/operationReport',		//运营报表
    name:'operationReport',
    component:resolve =>
    require(['../views/operation/operationReport.vue'],resolve)
    },{
      path:'/operation/operationDayReport',		//运营报表-日报
      name:'operationDayReport',
      component:resolve =>
        require(['../views/operation/operationDayReport.vue'],resolve)
    },{
      path:'/operation/operationMonthReport',		//运营报表-月报
      name:'operationMonthReport',
      component:resolve =>
        require(['../views/operation/operationMonthReport.vue'],resolve)
    },{
      path:'/custom/customServiceManagement',		//客服管理-投诉管理
      name:'customServiceManagement',
      component:resolve =>
        require(['../views/custom/customServiceManagement.vue'],resolve)
    },{
      path:'/custom/complainDetail',		//客服管理-投诉详情
      name:'complainDetail',
      component:resolve =>
        require(['../views/custom/complainDetail.vue'],resolve)
    },{
      path:'/custom/addComplain',		//客服管理-添加投诉
      name:'addComplain',
      component:resolve =>
        require(['../views/custom/addComplain.vue'],resolve)
    },{
      path:'/signed/openrefund',		//工作台-发起退款
      name:'openrefund',
      component:resolve =>
        require(['../views/signed/openrefund.vue'],resolve)
    },{
      path:'/signed/refundrecord',		//工作台-退款记录
      name:'refundrecord',
      component:resolve =>
        require(['../views/signed/refundrecord.vue'],resolve)
    },{
      path:'/signed/refunddetails',		//工作台-退款记录详情
      name:'refunddetails',
      component:resolve =>
        require(['../views/signed/refunddetails.vue'],resolve)
    },{
      path:'/activity/activitys',		//活动管理
      name:'activitys',
      component:resolve =>
        require(['../views/activity/activitys.vue'],resolve)
    },{
      path:'/activity/addactivity',		//活动管理-新增活动
      name:'addactivity',
      component:resolve =>
        require(['../views/activity/addactivity.vue'],resolve)
    },{
      path:'/activity/lookactivity',		//活动管理-查看活动
      name:'lookactivity',
      component:resolve =>
        require(['../views/activity/lookactivity.vue'],resolve)
    },{
      path:'/signed/repairs',		//工作台-发起报修
      name:'repairs',
      component:resolve =>
        require(['../views/signed/repairs.vue'],resolve)
    },{
      path:'/signed/repairsdetails',		//工作台-发起报修
      name:'repairsdetails',
      component:resolve =>
        require(['../views/signed/repairsdetails.vue'],resolve)
    },{
      path:'/corporate/corporateServices',		//企业服务-首页
      name:'corporateServices',
      component:resolve =>
        require(['../views/corporate/corporateServices.vue'],resolve)
    },{
      path:'/corporate/addCorporate',		//企业服务-增加企业
      name:'addCorporate',
      component:resolve =>
        require(['../views/corporate/addCorporate.vue'],resolve)
    },{
      path:'/system/systems',		//系统管理
      name:'systems',
      component:resolve =>
        require(['../views/system/systems.vue'],resolve)
    },{
      path:'/corporate/corporateDetail',		//企业详情
      name:'corporateDetail',
      component:resolve =>
        require(['../views/corporate/corporateDetail.vue'],resolve)
    },{
      path:'/system/staffdeploy',		//系统管理-人员配备
      name:'staffdeploy',
      component:resolve =>
        require(['../views/system/staffdeploy.vue'],resolve)
    },{
      path:'/system/allotjuris',		//系统管理-权限配置
      name:'allotjuris',
      component:resolve =>
        require(['../views/system/allotjuris.vue'],resolve)
    },{
      path:'/personal/performance',				//修改登录密码/手机号成功
      name:'performance',
      component: resolve =>
        require(['../views/personal/performance.vue'],resolve)
    },{
      path:'/signed/surrender',		//工作台-发起退租
      name:'surrender',
      component:resolve =>
        require(['../views/signed/surrender.vue'],resolve)
    },{
      path:'/signed/affirmsurrend',		//发起退租-确认退租
      name:'affirmsurrend',
      component:resolve =>
        require(['../views/signed/affirmsurrend.vue'],resolve)
    },{
      path:'/signed/surredendetal',		//发起退租-查看退租详情
      name:'surredendetal',
      component:resolve =>
        require(['../views/signed/surredendetal.vue'],resolve)
    },{
      path: '/bill/historyInformation',     //账单管理->生成水电账单
      name: 'historyInformation',
      component: resolve => require(['../views/bill/historyInformation.vue'],resolve)
    },{
      path: '/bill/historyMeter',     //账单管理->生成水电账单
      name: 'historyMeter',
      component: resolve => require(['../views/bill/historyMeter.vue'],resolve)
    },{
      path: '/bill/householdBill',     //账单管理->生成水电账单
      name: 'householdBill',
      component: resolve => require(['../views/bill/householdBill.vue'],resolve)
    },
    {
      path: '/bill/editGenerateBill',     //账单管理->住户总账单
      name: 'editGenerateBill',
      component: resolve => require(['../views/bill/editGenerateBill.vue'],resolve)
    },
    {
      path:'/signed/complain',		//工作台-用户投诉
      name:'complain',
      component:resolve =>
        require(['../views/signed/complain.vue'],resolve)
    },{
      path:'/signed/complaindetail',		//工作台-投诉详情
      name:'complaindetail',
      component:resolve =>
        require(['../views/signed/complaindetail.vue'],resolve)
    },{
      path:'/Patanjali/invitationlist',		//佳里人-帖子管理
      name:'invitationlist',
      component:resolve =>
        require(['../views/Patanjali/invitationlist.vue'],resolve)
    },{
      path:'/bill/officeHistoryBill',		//佳里人-帖子管理
      name:'officeHistoryBill',
      component:resolve =>
        require(['../views/bill/officeHistoryBill.vue'],resolve)
    },{
      path:'/bill/officeHistoryMeter',		//佳里人-帖子管理
      name:'officeHistoryMeter',
      component:resolve =>
        require(['../views/bill/officeHistoryMeter.vue'],resolve)
    },{
      path:'/activity/discountcom',		//活动管理-推送优惠券
      name:'discountcom',
      component:resolve =>
        require(['../views/activity/discountcom.vue'],resolve)
    },{
      path:'/Liverecording/recording',		//直播管理
      name:'recording',
      component:resolve =>
        require(['../views/Liverecording/recording.vue'],resolve)
    },{
      path:'/Industry/industry',		//工商注册
      name:'industry',
      component:resolve =>
        require(['../views/Industry/industry.vue'],resolve)
    },
    {
      path:'/operation/inviteRecord',		//工商注册
      name:'inviteRecord',
      component:resolve =>
        require(['../views/operation/inviteRecord.vue'],resolve)
    },
    {
      path:'/shortRent/shortRent',		//短租管理 - 入口
      name:'shortRent',
      component:resolve =>
        require(['../views/shortRent/shortRent.vue'],resolve)
    },
    {
      path:'/shortRent/shortOrderDetails',		//短租管理 - 订单详情
      name:'shortOrderDetails',
      component:resolve =>
        require(['../views/shortRent/shortOrderDetails.vue'],resolve)
    },
    {
      path:'/signed/shortTerm',		//工作台-短租房状态
      name:'shortTerm',
      component:resolve =>
        require(['../views/signed/shortTerm.vue'],resolve)
    },
    {
      path:'/signed/shortTermItem',		//工作台-短租房状态
      name:'shortTermItem',
      component:resolve =>
        require(['../views/signed/shortTermItem.vue'],resolve)
    },
    {
      path:'/signed/shortDetails',		//工作台-短租房状态-短租详情
      name:'shortDetails',
      component:resolve =>
        require(['../views/signed/shortDetails.vue'],resolve)
    },
    {
      path:'/signed/shortresident',		//工作台-短租房状态-住户列表
      name:'shortresident',
      component:resolve =>
        require(['../views/signed/shortresident.vue'],resolve)
    },
    {
      path:'/shortRent/newShortSetting',		//短租管理-新增短租配置
      name:'newShortSetting',
      component:resolve =>
        require(['../views/shortRent/newShortSetting.vue'],resolve)
    },
    {
      path:'/shortRent/checkIn',		//短租管理-新增短租配置
      name:'checkIn',
      component:resolve =>
        require(['../views/shortRent/checkIn.vue'],resolve)
    },
    //{
     // path:'/signed/H5invitation',		//工作台-H5邀请
     // name:'H5invitation',
     // component:resolve =>
     //   require(['../views/signed/H5invitation.vue'],resolve)
   // },

  ]
})
