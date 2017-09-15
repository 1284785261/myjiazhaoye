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
          <h3><i class="icon icon-iden"></i>退款详情</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="refund-detail-wrap">
          <div class="refund-detail-content-wrap">
            <ul>
              <li>
                <h3>所属社区 : <span>佳兆业航运WEWA空间</span></h3>
                <div class="refund-status">
                  <h3 style="color: rgb(255,102,18)">待审核</h3>
                  <h3 style="color: rgb(255,102,18)">待退款</h3>
                  <h3 style="color: rgb(255,102,18)">已退款</h3>
                </div>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>退款单号 :</span>
                    <span>654621313256456132</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款对象 :</span>
                    <span>佳兆业航运WEWA空间</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>用户注册手机号 :</span>
                    <span>13570276266</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款金额 :</span>
                    <span style="color: red;">300.00元</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款备注 :</span>
                    <span>退款结余</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>负责管家 :</span>
                    <span>张昆明</span>
                    <span>13570276266</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>退款至银行账户 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>账户名 :</span>
                    <span>叶晓婷</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>开户行 :</span>
                    <span>中国建设银行深圳国贸支行</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>账户 :</span>
                    <span>JHGJH545654651545</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>发起时间 :</span>
                    <span>2017-08-30 12:30</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>审核通过时间 :</span>
                    <span>2017-08-30 12:30</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>审核人 :</span>
                    <span>2017-08-30 12:30</span>
                  </div>
                </div>
              </li>
            </ul>
            <div style="text-align: center;">
              <p>审核不通过原因 : <span style="color: red;">退款对象跟银行账户不符</span></p>
            </div>
            <div style="text-align: center;margin-top: 70px;">
              <Button type="primary" style="width:120px;height: 36px;" @click="sureRefund()">确认退款</Button>
            </div>
            <div class="refund-examine-wrap">
              <div class="refund-examine-content">
                <div class="refund-examine-content-item1 padingBottom">
                  <span class="span-width">审批操作 :</span>
                  <RadioGroup v-model="animal">
                    <Radio label="0">通过</Radio>
                    <Radio label="1">不通过</Radio>
                  </RadioGroup>
                </div>
                <div class="refund-examine-content-item1">
                  <span class="span-width positionTop">不通过原因 :</span>
                  <textarea name="remarks" style="width:380px;height: 120px;resize: none;padding: 5px;" placeholder="请输入不通过原因" ></textarea>
                </div>
                <div style="text-align: center;margin-top: 30px;">
                  <Button type="primary" style="width:120px;height: 36px;">确定</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <div class="refund-detail-modal" v-if="refundModal" @click="closeRefundModal()"></div>
    <div class="refund-detail-modal-content" v-if="refundModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/refund01_03.png">
      </div>
      <p>确定将<span>300.00元</span>退还给用户吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="closeRefundModal()">确定</Button>
        <Button  @click="closeRefundModal()">取消</Button>
      </div>
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
        animal:0,
        refundModal:false,
      }
    },
    mounted(){
      this.userId = this.$route.query.id;
    },
    methods:{
      closeRefundModal(){
        this.refundModal = false;
      },
      sureRefund(){
        this.refundModal = true;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #refund-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .refund-detail-content-wrap{
      padding: 10px 50px;
      ul{
        li{
          width: 100%;
          padding: 30px 0;
          position: relative;
          border-bottom: 1px dashed #ccc;
          h3{
            color: #038be2;
            padding-bottom: 10px;
          }
          .refund-status{
            position: absolute;
            top: 30px;
            right: 50px;
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
      .refund-examine-wrap{
        height: 290px;
        width: 100%;
        background-color: rgb(250,250,250);
        padding: 30px;
        .refund-examine-content{
          width: 480px;
          height: 230px;
          margin: 0 auto;
          .refund-examine-content-item1{
            .span-width{
              display: inline-block;
              width: 90px;
              text-align: right;
              padding-right: 10px;
              font-weight: 700;
              color: black;
            }
            .positionTop{
              position: relative;
              top:-100px;
            }
          }
          .padingBottom{
            padding-bottom: 20px;
          }
        }
      }
    }
  }

  .refund-detail-modal{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.4);
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }
  .refund-detail-modal-content{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        width: 36px;
        height: 34px;
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
      span{
        color: red;
        font-weight: 700;
        padding: 0 10px;
      }
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }

</style>
