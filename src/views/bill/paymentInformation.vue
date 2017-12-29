<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">水电账单缴费情况</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>水电账单缴费情况</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="pay-information-wrap">
          <div class="pay-information-wrap-head">
            <ul>
              <li>所属社区 :<span style="color: #038be2;font-weight: 700;">{{communityPayStatic.communityName}}</span></li>
              <li>出账日期 :<span>{{createtime | timefilter("yyyy-MM-dd")}}</span></li>
              <li>全部租客 :<span>{{communityPayStatic.totalCount}}户</span></li>
              <li>待缴 :<span style="color:red;font-weight: 700;">{{communityPayStatic.notyetCount}}户</span></li>
              <li>已缴 :<span style="color:black;font-weight: 700;">{{communityPayStatic.alreadyCount}}户</span></li>
            </ul>
          </div>
          <div class="form-search-criteria">
            <div class="form-item pay-btn-group">
              <span>筛选: </span>
              <Button :class="{'active-btn':activeStatus == 0}" @click="filterBill(0)">全部</Button>
              <Button :class="{'active-btn':activeStatus == 1}" @click="filterBill(1)">待缴</Button>
              <Button :class="{'active-btn':activeStatus == 2}" @click="filterBill(2)">已缴</Button>
            </div>
            <div class="form-item">
              <div class="form-search">
                <i class="iconfont icon-sousuo"></i>
                <Input v-model="searchKey" placeholder="搜索账单联系人或联系电话"></Input>
                <input type="button" value="搜索" @click="search()">
              </div>
            </div>
            <div class="form-item">
              <Button style="width: 180px;height: 30px;">向未缴租客发送缴费提醒</Button>
            </div>
          </div>
          <table class="payment-infirmation-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr class="tr1">
              <th class="th1">房间</th>
              <th class="th1">水电费情况</th>
              <!--<th class="th1">服务费/元</th>-->
              <th class="th1">合计应收/元</th>
              <th class="th1">租客/联系人</th>
              <th class="th1">联系电话</th>
              <th class="th1">状态</th>
            </tr>
            <tr class="tr1" v-for="(item,index) in billPaymentList">
              <td class="td1">{{item.roomNum}}</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>{{item.waterData}}</span></td>
                    <td class="td2">用水量 :<span>{{item.waterSize}}m³</span></td>
                    <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>{{item.energyData}}</span></td>
                    <td class="td2">用电量 :<span>{{item.energySize}}度</span></td>
                    <td class="td2">电费 :<span>{{item.energyCost}}元</span></td>
                  </tr>
                </table>
              </td>
              <!--<td class="td1">{{item.serviceCost}}</td>-->
              <td class="td1">{{item.totalMoney}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userName:""}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userPhone:""}}</td>
              <td class="td1">
                <span v-if="item.payStatus == 1">待缴</span>
                <span v-if="item.payStatus == 2" style="color: #ccc;">已缴</span>
                <span v-if="item.payStatus == 3" style="color: red;">违约</span>
                <span v-if="item.payStatus == 4" style="color: red;">违约办结</span>
              </td>
            </tr>
          </table>
          <Page :total="billTotalNum" :current="billCurrent" :page-size="10" show-elevator show-total @on-change="search"></Page>
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
  import {statisticsInfoOfUser,billPayment} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"billManagement",
        activeName2: 'first',
        model1:"",
        value:"",
        communityId:"",
        communityPayStatic:[],

        billPaymentList:[],
        billTotalNum:0,
        billCurrent:1,
        searchKey:"",
        activeStatus:0,
        createtime:0,

      }
    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.getPayStatic({communityId:this.communityId});
      this.getbillPayment({communityId:this.communityId,pageNum:1});
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getPayStatic(data){
        var that = this;
        this.$http.get(statisticsInfoOfUser,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.communityPayStatic = res.data.entity;
            }
          })
      },
      getbillPayment(data){
        var that = this;
        this.$http.get(billPayment,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.billPaymentList = pageBean.page;
              that.billTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001){
              that.billPaymentList = [];
              that.billTotalNum = 0;
            }
          })
      },
      search(page){
          //接口待修改
        var params = {
          pageNum:page || 1,
          communityId:this.communityId,
        }
        if(this.searchKey){
          params.keyWord = this.searchKey
        }
        if(this.activeStatus != 0){
          params.payStatus = this.activeStatus;
        }
        this.getbillPayment(params);
      },
      filterBill(payStatus){
        this.activeStatus = payStatus;
        var params = {
          pageNum:1,
          keyWord : this.searchKey,
          communityId:this.communityId,
        }
        if(this.activeStatus != 0){
          params.payStatus = this.activeStatus;
        }
        this.getbillPayment(params);
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

  #pay-information-wrap{
    min-height: 1000px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .pay-information-wrap-head{
      height: 80px;
      background-color: #f7fbff;
      border-bottom: 1px solid #ccc;
      line-height: 80px;
      ul{
        margin-left: 20px;
        li{
          display: inline-block;
          margin-right: 50px;
          span{
            padding-left: 5px;
          }
        }
      }
    }

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .pay-btn-group{
        button{
          width: 80px;
          height: 30px;
          margin-left: 10px;
        }
        .active-btn{
          border: solid 1px #038be2;
          color: #038be2;
          background-color: #fff;
        }
      }
      .form-item{
        display: inline-block;
        margin-right: 20px;
        .form-search{
          position: relative;
          margin-left: 108px;
          .ivu-input-wrapper{
            width: auto;
          }
          input[type="text"]{
            width: 208px;
            height: 36px;
            border-radius: 0;
            padding-left: 30px;
          }
          i{
            position: absolute;
            left: 5px;
            top: 7px;
            z-index: 99;
            font-size: 18px;
            color: #999;
          }
          input[type=button]{
            width: 70px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            background-color: #038be2;
            color:#fff;
            border:none;
            position: relative;
            left: -5px;
            top: 2px;
          }
        }
      }
    }
    .ivu-page{
      margin: 50px 0 160px 0;
      text-align: center;
    }
    .ivu-icon-ios-calendar-outline{
      color:#038be2;
      font-family: "iconfont" !important;
      font-size: 18px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before{
        content: "\e60c";
      }
    }

    .payment-infirmation-table{
      border-collapse:collapse;
      text-align: center;
      .th1{
        background-color: #f8f8f9;
      }
      .th1,.td1{
        border: 1px solid #ccc;
        padding: 10px 10px;
      }
      .tr1>.td1:first-child,.tr>.th1:first-child{
        border-left-width: 0;
      }
      .tr1>.td1:last-child,.tr1>.th1:last-child{
        border-right-width: 0;
      }
      .tr1>.td1:last-child{
        color: #FF6612;
      }
    }
    .table2{
      display: inline-block;
      .tr2{
        .td2{
          text-align: left;
          padding: 0 30px;
          color: rgb(153,153,153);
          span{
            padding-left: 5px;
            color: black;
          }
        }
      }
    }


    .payment-infirmation-table{
      .tr1>.td1:nth-child(4){
        color: red;
        font-weight: 700;
      }
    }

    .bill-title-p{
      padding-left: 20px;
      font-weight: 700;
      padding-bottom: 10px;
    }
  }



</style>

