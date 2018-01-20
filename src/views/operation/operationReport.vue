<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>运营报表</h3>
        </div>
        <div id="operation-report-wrap">
          <div class="operation-report-content-wrap">
            <div class="report-item" style="border-right: 1px solid #ccc;">
              <div class="img-content-wrap isActive" @click="goToDay()">
                <img src="../../../static/images/icon/operation_ri_03.png" alt="日报">
                <span>日报</span>
              </div>
            </div>
            <div class="report-item" style="border-right: 1px solid #ccc;">
              <div class="img-content-wrap isActive" @click="goToMonth()">
                <img src="../../../static/images/icon/operation_yue_03.png" alt="月报">
                <span>月报</span>
              </div>
            </div>
            <div class="report-item">
              <div class="img-content-wrap isActive" @click="goToInvite()">
                <span>邀请记录</span>
              </div>
            </div>
          </div>
          <div class="report-center-wrap" >
            <img src="../../../static/images/icon/operation_null.png" alt="月报">
          </div>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
      }
    },
    mounted(){
      this.userId = this.$route.query.id;
    },
    methods:{
      goToDay(){
          this.$router.push({name:"operationDayReport"})
      },
      goToMonth(){
          this.$router.push({name:"operationMonthReport"})
      },
      goToInvite(){
          this.$router.push({name:"inviteRecord"})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #operation-report-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    .operation-report-content-wrap{
      height: 180px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 3px 1px #ccc;
      .report-item{
        height: 100%;
        width: 33.33%;
        display: inline-block;
        float: left;
        .img-content-wrap{
          margin: 40px auto;
          height: 100px;
          width: 320px;
          text-align: center;
          padding-top: 25px;
          cursor: pointer;
          span{
            color: #038be2;
            font-size: 22px;
            font-weight: 500;
            padding-left: 40px;
          }
        }
        .img-content-wrap:hover{
          border: solid 1px #038be2;
          border-radius: 10px;
        }
      }
    }
    .report-center-wrap{
      height: 820px;
      width: 100%;
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 0 3px 1px #ccc;
      img{
        display: block;
        margin: 0 auto;
        padding-top: 150px;
      }
    }
  }

</style>
