<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="">企业服务</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>企业服务详情</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="corporate-service-detail">
          <div class="corporate-service-content">
            <div class="service-detail-header">
              <div class="corporate-logo">
                <img src="../../../static/images/icon/orderDetail_03.png" alt="">
              </div>
              <div class="corporate-info">
                <h3>北京电子有限责任公司</h3>
                <ul>
                  <li>政策咨询</li>
                  <li>薪酬及架构管理</li>
                  <li>知识产权保护</li>
                  <li>政府补贴申请</li>
                </ul>
                <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
              </div>
            </div>
            <div class="service-detail-img">

            </div>
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
  import {allCommunity,complainList} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        complainTotalNum:10,
        complainCurrent:1,
      }
    },
    mounted(){

    },
    methods:{
      goToAddCorporate(){
        this.$router.push({name:"addCorporate"})
      },
      search(){

      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #corporate-service-detail{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .corporate-service-content{
      .service-detail-header{
        position: relative;
        height: 160px;
        width: 100%;
        background-color: rgb(248,252,255);
        border-bottom: 1px solid #ccc;
        .corporate-logo{
          width: 90px;
          height: 90px;
          margin:36px 20px 36px 60px;
          float: left;
          img{
            width: 90px;
            height: 90px;
          }
        }
        .corporate-info{
          float: left;
          text-align: left;
          display: inline-block;
          h3{
            margin-top: 46px;
            margin-bottom: 20px;
          }
          .address_position{
            position: absolute;
            right: 60px;
            bottom: 30px;
            margin: 5px 0 15px 0;
            display: inline-block;
            height: 19px;
            line-height: 19px;
            .diwei_map{
              display: inline-block;
              position: relative;
              top: 3px;
              width: 12px;
              height: 19px;
              background: url(../../../static/images/icon/service_map.png);
            }
            span{
              padding-left: 10px;
            }
          }
          ul{
            li{
              display: inline-block;
              padding: 3px 10px;
              border: solid 1px rgb(31,187,166);
              color: rgb(31,187,166);
              border-radius: 3px;
              margin-right: 10px;
            }
          }
        }
      }
      .service-detail-img{
        height: 320px;
        margin: 30px 60px;
        border: 1px solid #ccc;
      }
    }
  }



</style>

