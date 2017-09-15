<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">财务管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>发票详情</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="invoice-detail-wrap">
          <div class="inivoice-detail-content-wrap">
            <ul>
              <li>
                <h3>订单信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>订单类型 :</span>
                    <span>新签公寓合同</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>所属社区 :</span>
                    <span>佳兆业航运WEWA空间</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>房间信息 :</span>
                    <span>19号小区24栋5楼601号</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请时间 :</span>
                    <span>2017-08-30</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请人 :</span>
                    <span>留存街</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请电话 :</span>
                    <span>13570276266</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>发票信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>发票状态 :</span>
                    <span style="font-weight: 700;color: black;">已寄出</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票抬头 :</span>
                    <span>佳兆业航运WEWA空间</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>纳税人识别码 :</span>
                    <span>JHGJH545654651545</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票类型 :</span>
                    <span>2017-08-30</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票金额 :</span>
                    <span>留存街</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票内容 :</span>
                    <span>13570276266</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>开票人信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>开票人 :</span>
                    <span>李杨</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>开票时间 :</span>
                    <span>2017-08-30</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>快递信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>快递公司 :</span>
                    <span>顺丰快递</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>快递单号 :</span>
                    <span>6544687321321332</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>付款方式 :</span>
                    <span>货到付款</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>寄出时间 :</span>
                    <span>2017-08-30</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>收件人信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>收件人 :</span>
                    <span>新签公寓合同</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>联系电话 :</span>
                    <span>13570276266</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>收件人地址 :</span>
                    <span>深圳市南山区香蜜湖19号小区24栋5楼601号</span>
                  </div>
                </div>
              </li>
            </ul>
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

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #invoice-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .inivoice-detail-content-wrap{
      padding: 10px 50px;
      ul{
        li{
          width: 100%;
          padding: 30px 0;
          border-bottom: 1px dashed #ccc;
          h3{
            color: #038be2;
            padding-bottom: 10px;
          }
          .invoice-detail-info{
            .invoice-detail-info-item{
              display: inline-block;
              float: left;
              padding: 12px 80px 12px 0;
              color: rgb(51,51,51);
              span:nth-child(2){
                padding-left: 10px;
              }
            }
          }
        }
        li:after {
          content: "\0020";
          display: block;
          height: 0;
          clear: both;
        }
      }
    }
  }

</style>
