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
          <h3><i class="icon icon-iden"></i>增加企业</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="add-corporate-wrap">
          <div class="add-corporate-content">
            <table>
              <tr>
                <td style="position: relative;top: -30px;">企业Logo :</td>
                <td>
                  <div class="corporate-logo"><img src="../../../static/images/icon/orderDetail_03.png" alt=""></div>
                </td>
              </tr>
              <tr>
                <td>企业名称 :</td>
                <td><Input placeholder="请填写租金"></Input></td>
              </tr>
              <tr>
                <td>企业地址 :</td>
                <td><Input placeholder="请填写租金"></Input></td>
              </tr>
            </table>
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

      }
    },
    mounted(){

    },
    methods:{

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

  #add-corporate-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .add-corporate-content{
      padding: 30px 0 50px 70px;
      table{
        tr{
          .corporate-logo{
            width: 90px;
            height: 90px;
            img{
              width: 90px;
              height: 90px;
            }
          }
          td:nth-child(1){
            font-weight: 700;
            color: black;
            text-align: right;
            padding-bottom: 20px;
          }
          td:nth-child(2){
            padding-bottom: 20px;
            text-align: left;
            padding-left: 10px;
          }
        }
      }
    }
  }



</style>

