<template>
    <div class="left-menu" id="left-content">
        <div class="logo">
          <img src="/static/images/temp/logo.jpg">
        </div>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-gongzuotai"></i>工作台</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-xiaoxi"></i>消息中心</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-zhibo"></i>直播管理</router-link></li>
        <li><router-link :to="{ name: 'orderManagement' , params: { id: 123 }}"><i class="iconfont icon-dingdanguanli"></i>订单管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-hetong"></i>账单管理</router-link></li>
        <li><router-link :to="{ name: 'contractIndex' , params: { id: 123 }}"><i class="iconfont icon-hetong"></i>合同管理</router-link></li>
        <li><router-link :to="{ name: 'communityManagement' , params: { id: 123 }}"><i class="iconfont icon-shequ"></i>社区管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-fuwu"></i>企业服务</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-guanli1"></i>会员管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-yunying"></i>运营报表</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-caiwuguanli"></i>财务管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-guanggao"></i>广告设置</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-guanggao"></i>佳里人</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-kefu"></i>客服管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-guanli"></i>系统管理</router-link></li>
        <li><router-link :to="{ name: 'workbench' , params: { id: 123 }}"><i class="iconfont icon-huodong"></i>活动管理</router-link></li>
      </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  @import '../sass/page/_leftMeun.scss';
</style>


