<template>
    <div class="header">
      <div class="inline-block">
        <Badge count="12">
          <Icon type="ios-bell-outline"></Icon>
        </Badge>
        <Dropdown trigger="hover" class="reset-dropdown">
          <a href="javascript:void(0)"><i class="iconfont icon-shujuappxiazai"></i>下载管家APP</a>
          <Dropdown-menu slot="list">
            <div class="imgBox">
              <div class="img">
                <img src="/static/images/temp/code01.png">
              </div>
              <img src="/static/images/temp/code02.png">
            </div>
          </Dropdown-menu>
        </Dropdown>
        <Dropdown trigger="click">
          <a href="javascript:void(0)"><img src="/static/images/temp/userHead.png">{{userID}} <Icon type="arrow-down-b"></Icon></a>
          <Dropdown-menu slot="list">
            <Dropdown-item  v-for="userBar in userBars"><router-link to="/"><i :class="userBar.icon"></i>{{userBar.userContent}}</router-link></Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        userID:"会飞的鱼~",
       userBars:[{
          icon:"iconfont icon-gerenxinxi1",
          userContent:"个人信息"
        },{
          icon:"iconfont icon-yeji",
          userContent:"我的业绩"
        },{
          icon:"iconfont icon-zhuxiao",
          userContent:"注销"
        }]
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  @import '../sass/page/_head.scss';

  .inline-block{
    display: inline-block;
  }
</style>


