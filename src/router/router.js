import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
import Workbench from '../views/apartment/workbench.vue'    //工作台
import CommunityManagement from '../views/apartment/communityManagement.vue'  //社区管理
import CommunityPresentation from '../views/apartment/communityPresentation.vue'  //社区介绍
import CommunitySettings from '../views/apartment/communitySettings.vue'  //社区设置

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/apartment/workbench',
      name: 'workbench',
      component: Workbench
    },{
      path: '/apartment/communityManagement',     //社区管理
      name: 'communityManagement',
      component: CommunityManagement
    },{
      path: '/apartment/communityPresentation',     //社区介绍
      name: 'communityPresentation',
      component: CommunityPresentation
    },{
      path: '/apartment/communitySettings',     //社区设置
      name: 'communitySettings',
      component: CommunitySettings
    },
  ]
})
