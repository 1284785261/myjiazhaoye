<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">账单详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>账单详情</h3>
        </div>
        <div id="bill-detail-wrap">
          <div class="order-detail-wrap-head">
            <img v-if="true" src="../../../static/images/icon/orderDetail_03.png" alt="订单详情-已支付">
            <img v-else-if="false" src="../../../static/images/icon/orderDetail_02.png" alt="订单详情-已使用">
            <img v-else-if="false" src="../../../static/images/icon/orderDetail_01.png" alt="订单详情-待支付">
            <div class="order-detail-wrap-head-content">
              <h3>
                <span style="padding-right: 10px;">6月</span>
                <span>公寓租金</span>
                <span class="colorSpan" v-if="true">已支付</span>
                <span class="colorSpan" v-else-if="false">待支付</span>
              </h3>
              <h3 v-if="false">会议室订单
                <span>已使用</span>
              </h3>
            </div>
            <div class="order-detail-wrap-head-btn">
              确认用户已使用
            </div>
          </div>
          <ul class="order-detail-content">
            <li>
              <h3><i class="icon icon-iden"></i>佳兆航运WEVA空间</h3>
              <table>
                <tr>
                  <td>房间 :</td>
                  <td>1个</td>
                </tr>
                <tr>
                  <td>租期 :</td>
                  <td>2017/6/30 - 2017/7/3（共4天）</td>
                </tr>
                <tr>
                  <td>租金 :</td>
                  <td>100.00元/位·天</td>
                </tr>
              </table>
            </li>
            <li>
              <h3><i class="icon icon-iden"></i>订单信息</h3>
              <table>
                <tr>
                  <td>订单时间 :</td>
                  <td>2017-07-01 14:33:59</td>
                </tr>
                <tr>
                  <td>订单编号 :</td>
                  <td>2017063073</td>
                </tr>
                <tr v-if="true">
                  <td>支付时间 :</td>
                  <td>2017-07-01 14:33:59</td>
                </tr>
                <tr v-if="true">
                  <td>支付方式 :</td>
                  <td>支付宝</td>
                </tr>
                <!--<tr>-->
                  <!--<td>优惠券 :</td>-->
                  <!--<td>400.00元</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>实付 :</td>-->
                  <!--<td style="color: red;font-size: 20px;">400.00元</td>-->
                <!--</tr>-->
                <tr v-if="true">
                  <td>支付成功时间 :</td>
                  <td>2017-07-01 14:33:59</td>
                </tr>
                <tr>
                  <td colspan="2" class="payInfo">待支付 剩余12分钟</td>
                </tr>
              </table>
              <Button v-if="false" type="primary" style="width: 120px;margin-left: 40px">确认收款</Button>
            </li>
            <li v-if="true">
              <h3><i class="icon icon-iden"></i>用户评价</h3>
              <table>
                <tr>
                  <td>评价 :</td>
                  <td style="font-size: 20px;color: #EFB023">
                    <Icon type="ios-star"></Icon>
                    <Icon type="ios-star"></Icon>
                    <Icon type="ios-star"></Icon>
                    <Icon type="ios-star"></Icon>
                    <Icon type="ios-star-half"></Icon>
                  </td>
                </tr>
                <tr>
                  <td>评价内容 :</td>
                  <td>地铁口近，交通方便</td>
                </tr>
              </table>
            </li>
          </ul>
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
  import api from '../api.js';


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
    methods:{

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #bill-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .order-detail-wrap-head{
      position: relative;
      height: 160px;
      width: 100%;
      background-color: rgb(247,251,255);
      border-bottom: 1px solid rgb(220,220,220);
      img{
        margin:25px 0 24px 45px
      }
      .order-detail-wrap-head-content{
        display: inline-block;
        h3{
          padding-left: 40px;
          span.colorSpan{
            padding-left: 50px;
            color: rgb(255,102,18);
          }
        }
      }
      .order-detail-wrap-head-btn{
        position: absolute;
        right: 50px;
        top: 60px;
        display: inline-block;
        text-align: center;
        width: 140px;
        height: 40px;
        border-radius: 5px;
        border: solid 1px rgb(3,139,226);
        color: rgb(70,170,234);
        background-color: #fff;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
        &:hover{
          background-color: rgb(3,139,226);
          color: #fff;
        }
      }
    }

    ul{
      margin: 40px 50px;
      height: 100%;
      li{
        border-bottom:1px dashed #ccc;
        margin-top: 30px;
      }
      li:last-child{
        border-bottom: none;
      }
    }
    .order-detail-content{
      h3{
        display: inline-block;
        color: rgb(3,139,226);
        i{
          margin-right: 10px;
          background:url("/static/images/icon/iden.png") no-repeat;
          background-size: 80%;
          width: 6px;
          height: 24px;
        }
      }
      table{
        tr>td:nth-child(1){
          text-align: right;
        }
        tr{
          td{
            padding: 10px;
          }
          td:first-child{
            width:115px;
          }
          td.payInfo{
            text-align: left;
            padding-left: 40px;
            color: red;
          }
        }
      }
    }
  }
</style>
