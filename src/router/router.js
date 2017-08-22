
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
      path: '/apartment/workbench',
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
      path: '/apartment/orderDetail',     //订单管理
      name: 'orderDetail',
      component: resolve => require(['../views/apartment/orderDetail.vue'],resolve)
    },

  ]
})
