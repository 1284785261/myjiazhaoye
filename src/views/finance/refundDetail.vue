<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
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
                <h3>所属社区 : <span>{{reRenfundDetail.communityName}}</span></h3>
                <div class="refund-status">
                  <h3 style="color: rgb(255,102,18)" v-if="reRenfundDetail.refundStatus==0">待审核</h3>
                  <h3 style="color: rgb(255,102,18)" v-if="reRenfundDetail.refundStatus==1">待退款</h3>
                  <h3 style="color: rgb(255,102,18)" v-if="reRenfundDetail.refundStatus==2">已退款</h3>
                  <h3 style="color: rgb(255,102,18)" v-if="reRenfundDetail.refundStatus==3">审核不通过</h3>
                </div>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>退款单号 :</span>
                    <span>{{reRenfundDetail.refundSn}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款对象 :</span>
                    <span>{{reRenfundDetail.userName}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>用户注册手机号 :</span>
                    <span>{{reRenfundDetail.userPhone}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款金额 :</span>
                    <span style="color: red;">{{reRenfundDetail.refundMoney}}元</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>退款备注 :</span>
                    <span>{{reRenfundDetail.refundInfo}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>负责管家 :</span>
                    <span>{{reRenfundDetail.managerName}}</span>
                    <span>{{reRenfundDetail.managerPhone}}</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>退款至银行账户 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>账户名 :</span>
                    <span>{{reRenfundDetail.name}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>开户行 :</span>
                    <span>{{reRenfundDetail.bankName}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>账户 :</span>
                    <span>{{reRenfundDetail.account}}</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>发起时间 :</span>
                    <span>{{reRenfundDetail.createTime | timefilter("yyyy-MM-dd hh:mm") }}</span>
                  </div>
                  <div class="invoice-detail-info-item" v-if="reRenfundDetail.refundStatus==1 || reRenfundDetail.refundStatus==2">
                    <span>审核通过时间 :</span>
                    <span>{{reRenfundDetail.passTime | timefilter("yyyy-MM-dd hh:mm") }}</span>
                  </div>
                  <div class="invoice-detail-info-item" v-if="reRenfundDetail.refundStatus==3">
                    <span>审核不通过时间 :</span>
                    <span>{{reRenfundDetail.passTime | timefilter("yyyy-MM-dd hh:mm") }}</span>
                  </div>
                  <div class="invoice-detail-info-item" v-if="reRenfundDetail.refundStatus!==0">
                    <span>审核人 :</span>
                    <span>{{reRenfundDetail.passName}}</span>
                    <span>{{reRenfundDetail.passDepartmentName}}</span>
                    <span>{{reRenfundDetail.passPositionName}}</span>
                  </div>
                  <div class="invoice-detail-info-item" v-if="reRenfundDetail.refundStatus==2">
                    <span>确认退款时间 :</span>
                    <span>{{reRenfundDetail.refundTime | timefilter("yyyy-MM-dd hh:mm") }}</span>
                  </div>
                  <div class="invoice-detail-info-item" v-if="reRenfundDetail.refundStatus==2">
                    <span>退款人 :</span>
                    <span>{{reRenfundDetail.refundName}}</span>
                    <span>{{reRenfundDetail.refundDepartmentName}}</span>
                    <span>{{reRenfundDetail.refundPositionName}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <div style="text-align: center;" v-if="reRenfundDetail.refundStatus==3">
              <p>审核不通过原因 : <span style="color: red;">{{reRenfundDetail.refundRemark}}</span></p>
            </div>
            <div style="text-align: center;margin-top: 70px;" v-if="reRenfundDetail.refundStatus==1">
              <Button type="primary" style="width:120px;height: 36px;" @click="sureRefund()">确认退款</Button>
            </div>
            <div class="refund-examine-wrap" v-if="reRenfundDetail.refundStatus==0">
              <div class="refund-examine-content">
                <div class="refund-examine-content-item1 padingBottom">
                  <span class="span-width">审批操作 :</span>
                  <RadioGroup v-model="judgeCode">
                    <Radio label="0">通过</Radio>
                    <Radio label="1">不通过</Radio>
                  </RadioGroup>
                </div>
                <div class="refund-examine-content-item1">
                  <span class="span-width positionTop">不通过原因 :</span>
                  <textarea name="remarks" style="width:380px;height: 120px;resize: none;padding: 5px;" placeholder="请输入不通过原因" v-model="refundInfo"></textarea>
                </div>
                <div style="text-align: center;margin-top: 30px;">
                  <Button type="primary" style="width:120px;height: 36px;" @click="judge">确定</Button>
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
      <p>确定将<span>{{reRenfundDetail.refundMoney}}元</span>退还给用户吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="refundMoneyToUser()">确定</Button>
        <Button  @click="closeRefundModal()">取消</Button>
      </div>
    </div>

    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>

  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import qs from 'qs';
  import {refundDetail,refundMoneyToUser,judgePass,judgeNoPass} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      warningModal,
      successModal
    },
    data(){
      return{
        activeTabName:"financeManagement",
        judgeCode:0,
        refundModal:false,
        refundId:"",
        reRenfundDetail:{},
        successModal:false,
        successMessage:"退款成功！",
        warningModal:false,
        warningMessage:"房间信息填写不完整，请填写完整后重新提交！",
        refundInfo:"",
      }
    },
    mounted(){
      this.refundId = this.$route.query.refundId;
      this.getRefundDetail({refundId:this.refundId});
    },
    methods:{
      getRefundDetail(data){
        var that = this;
        this.$http.post(refundDetail,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.reRenfundDetail = res.data.result;
            }
          })
      },
      refundMoneyToUser(){
        var that = this;
        this.$http.post(refundMoneyToUser,qs.stringify({refundId:this.reRenfundDetail.refundId}))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.refundModal = false;
              that.successModal = true;
              setTimeout(function(){
                that.getRefundDetail({refundId:this.refundId});
                that.successModal = false;
                that.$router.push('/finance/financeManagement');
              },1000);
            }
          })
      },
      closeRefundModal(){
        this.refundModal = false;
      },
      sureRefund(){
        this.refundModal = true;
      },
      closeWarningModal(){
        this.warningModal = false;
      },
      judge(){
        if(this.judgeCode == 0){
          this.judgeToPass();
        }else{
          this.judgeToNoPass();
        }
      },
      judgeToPass(){
        var that = this;
        this.$http.post(judgePass,qs.stringify({refundId:this.reRenfundDetail.refundId}))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.getRefundDetail({refundId:that.refundId});
            }
          })
      },
      judgeToNoPass(){
        var that = this;
        this.$http.post(judgeNoPass,qs.stringify({refundId:this.reRenfundDetail.refundId,refundInfo:this.refundInfo}))
          .then(function(res){
            that.refundInfo = "";
            if(res.status == 200 && res.data.code == 10000){
              that.getRefundDetail({refundId:that.refundId});
            }
          })
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
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
