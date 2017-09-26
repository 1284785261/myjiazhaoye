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
                    <span v-if="invoiceDetailData.orderType == 0">公寓合同</span>
                    <span v-else-if="invoiceDetailData.orderType == 1">办公租金账单</span>
                    <span v-else-if="invoiceDetailData.orderType == 2">水电账单</span>
                    <span v-else-if="invoiceDetailData.orderType == 3">工位订单</span>
                    <span v-else-if="invoiceDetailData.orderType == 4">会议室订单</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>所属社区 :</span>
                    <span>{{invoiceDetailData.communityName}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>房间信息 :</span>
                    <span>{{invoiceDetailData.roomInfo}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请时间 :</span>
                    <span>{{invoiceDetailData.createTime | timefilter("yyyy-MM-dd")}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请人 :</span>
                    <span>{{invoiceDetailData.userName}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>申请电话 :</span>
                    <span>{{invoiceDetailData.userPhone}}</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>发票信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>发票状态 :</span>
                    <span style="font-weight: 700;color: black;" v-if="invoiceDetailData.invoiceState == 0">待开票</span>
                    <span style="font-weight: 700;color: black;" v-else-if="invoiceDetailData.invoiceState == 1">已开票</span>
                    <span style="font-weight: 700;color: black;" v-else-if="invoiceDetailData.invoiceState == 2">已寄出</span>
                    <span style="font-weight: 700;color: black;" v-else-if="invoiceDetailData.invoiceState == 3">已收件</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票抬头 :</span>
                    <span>{{invoiceDetailData.invoiceHeader}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>纳税人识别码 :</span>
                    <span>{{invoiceDetailData.invoiceCode}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票类型 :</span>
                    <span v-if="invoiceDetailData.invoiceType == 0">增值税发票</span>
                    <span v-else-if="invoiceDetailData.invoiceType == 1">普通发票</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票金额 :</span>
                    <span style="color: red;font-weight: 700;">{{invoiceDetailData.invoiceMoney}}元</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>发票内容 :</span>
                    <span>{{invoiceDetailData.invoiceContent}}</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>开票人信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>开票人 :</span>
                    <span>{{invoiceDetailData.passName}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>开票时间 :</span>
                    <span>{{invoiceDetailData.passTime}}</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>快递信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>快递公司 :</span>
                    <span>{{invoiceDetailData.expressCompany}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>快递单号 :</span>
                    <span>{{invoiceDetailData.expressNo}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>付款方式 :</span>
                    <span>{{invoiceDetailData.expressPayType}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>寄出时间 :</span>
                    <span>{{invoiceDetailData.sendTime | timefilter("yyyy-MM-dd")}}</span>
                  </div>
                </div>
              </li>
              <li>
                <h3>收件人信息 :</h3>
                <div class="invoice-detail-info">
                  <div class="invoice-detail-info-item">
                    <span>收件人 :</span>
                    <span>{{invoiceDetailData.consignee}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>联系电话 :</span>
                    <span>{{invoiceDetailData.phone}}</span>
                  </div>
                  <div class="invoice-detail-info-item">
                    <span>收件人地址 :</span>
                    <span>{{invoiceDetailData.address}}</span>
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
  import {invoiceDetail} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        invoiceDetailData:{},
      }
    },
    mounted(){
      this.invoiceId = this.$route.query.invoiceId;
      this.getInvoiceDetail({invoiceId:this.invoiceId})
    },
    methods:{
      getInvoiceDetail(data){
        var that = this;
        this.$http.post(invoiceDetail,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.invoiceDetailData = res.data.result.invoice;
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
