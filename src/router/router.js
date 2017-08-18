
import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
<<<<<<< HEAD
//import Workbench from '../views/apartment/workbench.vue'    //工作台
//import CommunityManagement from '../views/apartment/communityManagement.vue'  //社区管理
//import CommunityPresentation from '../views/apartment/communityPresentation.vue'  //社区介绍
//import CommunitySettings from '../views/apartment/communitySettings.vue'  //社区设置
//import CommunityMessage from '../views/apartment/communityMessage.vue'    //社区信息
//import CommunityComplie from '../views/apartment/communityCompile.vue'    //编辑社区信息
//import CommunityRoom from '../views/apartment/communityRoom.vue'      //编辑社区房间信息
//import CommunityPersonal from '../views/personal/communityPersonal.vue'   //个人信息


=======
import Workbench from '../views/apartment/workbench.vue'    //工作台
import CommunityManagement from '../views/apartment/communityManagement.vue'  //社区管理
import CommunityPresentation from '../views/apartment/communityPresentation.vue'  //社区介绍
import CommunitySettings from '../views/apartment/communitySettings.vue'  //社区设置
import CommunityMessage from '../views/apartment/communityMessage.vue'    //社区信息
import CommunityComplie from '../views/apartment/communityCompile.vue'    //编辑社区信息

import OrderManagement from '../views/apartment/orderManagement.vue'    //订单管理
>>>>>>> 458ba5e2a9856fd0cb98edf120cdc2e492daa90d
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve =>
      require(['../views/login.vue'],resolve)
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
      require(['../views/apartment/communityManagement.vue'],resolve)
    },{
      path: '/apartment/communityMessage',     //社区信息
      name: 'communityMessage',
      component: resolve =>
      require(['../views/apartment/communitySettings.vue'],resolve)
    },{
      path: '/apartment/communityComplie',     //编辑社区信息
      name: 'communityComplie',
<<<<<<< HEAD
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
=======
      component: CommunityComplie
    },{
      path: '/apartment/orderManagement',     //编辑社区信息
      name: 'orderManagement',
      component: OrderManagement
>>>>>>> 458ba5e2a9856fd0cb98edf120cdc2e492daa90d
    },

  ]
})
