
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
      path:'/custom/complainDetail',		//客服管理-投诉管理
      name:'complainDetail',
      component:resolve =>
        require(['../views/custom/complainDetail.vue'],resolve)
    }


  ]
})
