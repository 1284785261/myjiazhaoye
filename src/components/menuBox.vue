<template>
    <div class="left-menu" id="left-content">
        <div class="logo">
          <img src="/static/images/temp/logo.jpg">
        </div>
      <ul class="menu-list">
        <li v-if="this.jurisdiction('WORKBENCH')" :class="{'active-tab':activeTabName == 'workbench'}"><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-gongzuotai"></i>工作台</router-link></li>
        <li v-if="this.jurisdiction('MESSAGE')"><router-link :to="{ name: 'messageInform' , params: { id: 123 }}"><i class="iconfont icon-xiaoxi"></i>消息中心</router-link></li>
        <li v-if="this.jurisdiction('LIVE')"><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-zhibo"></i>直播管理</router-link></li>
        <li v-if="this.jurisdiction('ORDER')" :class="{'active-tab':activeTabName == 'orderManagement'}"><router-link :to="{ name: 'orderManagement' , params: { id: 123 }}"><i class="iconfont icon-dingdanguanli"></i>订单管理</router-link></li>
        <li v-if="this.jurisdiction('BILL')" :class="{'active-tab':activeTabName == 'billManagement'}"><router-link :to="{ name: 'billManagement' , params: { id: 123 }}"><i class="iconfont icon-hetong"></i>账单管理</router-link></li>
        <li v-if="this.jurisdiction('CONTRACT')" :class="{'active-tab':activeTabName == 'contractIndex'}"><router-link :to="{ name: 'contractIndex' , params: { id: 123 }}"><i class="iconfont icon-hetong"></i>合同管理</router-link></li>
        <li v-if="this.jurisdiction('COMMUNITY')" :class="{'active-tab':activeTabName == 'communityManagement'}"><router-link :to="{ name: 'communityManagement' , params: { id: 123 }}"><i class="iconfont icon-shequ"></i>社区管理</router-link></li>
        <li v-if="this.jurisdiction('ENTERPRISE')" :class="{'active-tab':activeTabName == 'corporateServices'}"><router-link :to="{ name: 'corporateServices' , params: { id: 123 }}"><i class="iconfont icon-fuwu"></i>企业服务</router-link></li>
        <li v-if="this.jurisdiction('MEMBER')" :class="{'active-tab':activeTabName == 'memberManagement'}"><router-link :to="{ name: 'memberManagement' , params: { id: 123 }}"><i class="iconfont icon-guanli1"></i>会员管理</router-link></li>
        <li v-if="this.jurisdiction('OPERATE')" :class="{'active-tab':activeTabName == 'operationReport'}"><router-link :to="{ name: 'operationReport' , params: { id: 123 }}"><i class="iconfont icon-yunying"></i>运营报表</router-link></li>
        <li v-if="this.jurisdiction('FINANCE')" :class="{'active-tab':activeTabName == 'financeManagement'}"><router-link :to="{ name: 'financeManagement' , params: { id: 123 }}"><i class="iconfont icon-caiwuguanli"></i>财务管理</router-link></li>
        <li v-if="this.jurisdiction('AD')"><router-link :to="{ name: 'advertiset' , params: { id: 123 }}"><i class="iconfont icon-guanggao"></i>广告设置</router-link></li>
        <li v-if="this.jurisdiction('JIAREN')"><router-link :to="{ name: 'invitationlist' , params: { id: 123 }}"><i class="iconfont icon-guanggao"></i>佳里人</router-link></li>
        <li v-if="this.jurisdiction('CUSTOMER')" :class="{'active-tab':activeTabName == 'billManagement'}"><router-link :to="{ name: 'customServiceManagement' , params: { id: 123 }}"><i class="iconfont icon-kefu"></i>客服管理</router-link></li>
        <li v-if="this.jurisdiction('STAFF')"><router-link :to="{ name: 'systems' , params: { id: 123 }}"><i class="iconfont icon-guanli"></i>系统管理</router-link></li>
        <li v-if="this.jurisdiction('ACTIVITY')"><router-link :to="{ name: 'activitys' , params: { id: 123 }}"><i class="iconfont icon-huodong"></i>活动管理</router-link></li>
      </ul>
    </div>
</template>

<script>
export default {
  props:["activeTabName"],
  data () {
    return {
        mts:false
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  @import '../sass/page/_leftMeun.scss';
</style>


