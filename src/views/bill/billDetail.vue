<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
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
            <img v-if="billDetailList.billState == 2" src="../../../static/images/icon/orderDetail_03.png" alt="订单详情-已支付">
            <img v-else src="../../../static/images/icon/orderDetail_01.png" alt="订单详情-待支付">
            <div class="order-detail-wrap-head-content">
              <h3>
                <!--<span style="padding-right: 10px;">6月</span>-->
                <span v-if="billType == 0">{{billDetailList.billName}}</span>
                <span v-if="billType == 1">{{billDetailList.billName}}</span>
                <span class="colorSpan" v-else-if="billDetailList.billState == 1">待支付</span>
                <span class="colorSpan" v-if="billDetailList.billState == 2">已支付</span>
                <span class="colorSpan" v-else-if="billDetailList.billState == 3">违约</span>
                <span class="colorSpan" v-else-if="billDetailList.billState == 4">违约办结</span>
              </h3>
            </div>
          </div>
          <ul class="order-detail-content">
            <li style="position: relative">
              <h3><i class="icon icon-iden"></i>{{billDetailList.communityName}}</h3>
              <table >
                <tr>
                  <td>房间 :</td>
                  <td v-if="billType == 0">公寓 {{billDetailList.floorName}}层 {{billDetailList.roomNum}}房间</td>
                  <td v-if="billType == 1">办公室 {{billDetailList.officeWorkNum}}人间 {{billDetailList.officeHouseNum}}</td>
                </tr>
                <tr>
                  <td>租期 :</td>
                  <td>{{billDetailList.beginDate | timefilter("yyyy.MM.dd")}}-{{billDetailList.endDate | timefilter("yyyy.MM.dd")}}</td>
                </tr>
                <tr>
                  <td>租金 :</td>
                  <td>{{billDetailList.generalRent}}元/月</td>
                </tr>
                <tr>
                  <td>服务费 :</td>
                  <td>{{billDetailList.serviceCost}}元/月</td>
                </tr>
              </table>
              <div class="check-contract-btn" @click="goToContract(billDetailList.contractSignId)">
                查看合同
              </div>
            </li>
            <li>
              <h3><i class="icon icon-iden"></i>订单信息</h3>
              <table>
                <tr>
                  <td>订单时间 :</td>
                  <td>{{billDetailList.createTime | timefilter("yyyy-MM-dd hh:mm:ss")}}</td>
                </tr>
                <tr>
                  <td>订单编号 :</td>
                  <td>{{billDetailList.billNo}}</td>
                </tr>
                <tr v-if="billDetailList.billState == 2">
                  <td>支付方式 :</td>
                  <td>
                    <span v-if="billDetailList.payType == 1">支付宝</span>
                    <span v-if="billDetailList.payType == 2">微信</span>
                    <span v-if="billDetailList.payType == 3">银联</span>
                    <span v-if="billDetailList.payType == 4">其他方式</span>
                  </td>
                </tr>
                <tr v-if="billDetailList.billState == 2">
                  <td>支付成功时间 :</td>
                  <td>{{billDetailList.paySuccessTime | timefilter("yyyy-MM-dd hh:mm:ss")}}</td>
                </tr>
                <!--<tr v-if="billDetailList.billState == 2">-->
                  <!--<td colspan="2" class="payInfo">待支付 剩余12分钟</td>--><!--（系统时间+规定支付时间）-下单时间-->
                <!--</tr>-->
              </table>
              <Button v-if="billDetailList.billState == 1" type="primary" style="width: 120px;margin-left: 40px">确认收款</Button>
            </li>
            <li v-if="billDetailList.billState == 2">
              <h3><i class="icon icon-iden"></i>用户评价</h3>
              <table>
                <tr>
                  <td>评价 :</td>
                  <td >
                    <el-rate
                      v-model="billDetailList.score"
                      disabled
                      show-text
                      text-color="#ff9900"
                      text-template="{value}">
                    </el-rate>
                  </td>
                </tr>
                <tr>
                  <td>评价内容 :</td>
                  <td>{{billDetailList.content}}</td>
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
  import {roomBillDetail,officeBillDetail} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"billManagement",
        value5: 4.8,
        billDetailList:[],
        billType:0,//0公寓，1办公室
      }
    },
    mounted(){
      var billId = this.$route.query.billId;
      this.billType = this.$route.query.type;
      if(this.billType == 0){
        this.getRoomBillDetail({billId:billId});
      }else{
        this.getOfficeBillDetail({billId:billId});
      }
    },
    methods:{
      getRoomBillDetail(data){
        var vm = this;
        this.$http.get(roomBillDetail,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              vm.billDetailList = res.data.entity;
            }

          })
      },
      getOfficeBillDetail(data){
        var vm = this;
        this.$http.get(officeBillDetail,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              vm.billDetailList = res.data.entity;
            }

          })
      },
      goToContract(contractSignId){
        this.$router.push({name:"contractDetail",query:{contractSignId:contractSignId,isOffice:this.billType}})
      },
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
      .check-contract-btn{
        position: absolute;
        right: 15px;
        bottom: 30px;
        width: 120px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border: solid 1px rgb(3,139,226);
        border-radius: 5px;
        color: rgb(3,139,226);
        cursor: pointer;
      }
    }
  }
</style>
