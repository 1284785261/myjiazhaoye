<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">生成水电账单</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>生成水电账单</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="pay-information-wrap">
          <div class="form-search-criteria">
            <div class="form-item">
              <b>社区：</b>
              <Select v-model="billCommunity" style="width:200px">
                <Option v-for="community in  billSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </div>
            <div class="form-item">
              当前公寓共合计 : <span style="font-weight: 700;color: black;">{{communityPayStatic.totalCount}}户</span>
            </div>
            <div class="form-item right-btn-group">
              <Button style="width: 100px;height: 30px;">抄表</Button>
              <Button style="width: 180px;height: 30px;margin-left: 30px;" :disabled="editing"><span v-if="editing">请保存正在编辑的账单</span><span v-else>生成账单并发送给租客</span></Button>
            </div>
          </div>
          <table class="payment-infirmation-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr class="tr1">
              <th class="th1">房间</th>
              <th class="th1">水电费情况</th>
              <th class="th1">服务费/元</th>
              <th class="th1">合计应收/元</th>
              <th class="th1">租客/联系人</th>
              <th class="th1">联系电话</th>
              <th class="th1" style="min-width: 85px;">操作</th>
            </tr>
            <tr class="tr1" v-for="(item,index) in billPaymentList">
              <td class="td1">{{item.roomNum}}</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="!item.isEdit">
                      <td class="td2">读数 :<span>{{item.waterData}}</span></td>
                      <td class="td2">用水量 :<span>{{item.waterSize}}m³</span></td>
                      <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" v-model="item.waterData"/></td>
                      <td class="td2">用水量 :<input type="text" v-model="item.waterSize"/>m³</td>
                      <td class="td2">水费 :<input type="text" v-model="item.waterCost"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="!item.isEdit">
                      <td class="td2">读数 :<span>{{item.energyData}}</span></td>
                      <td class="td2">用电量 :<span>{{item.energySize}}度</span></td>
                      <td class="td2">电费 :<span>{{item.energyCost}}元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" v-model="item.energyData"></td>
                      <td class="td2">用电量 :<input type="text"  v-model="item.energySize"/>度</td>
                      <td class="td2">电费 :<input type="text"  v-model="item.energyCost"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1"  v-if="!item.isEdit">{{item.serviceCost}}</td>
              <td class="td1" v-else><input type="text" style="height: 30px;width:70px;" v-model="item.serviceCost"></td>
              <td class="td1">{{item.totalMoney}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userName:""}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userPhone:""}}</td>
              <td class="td1" style="min-width: 85px;"><a @click="editBill(index,item.isEdit)">{{item.content}}</a></td>
            </tr>

          </table>
          <Page :total="billTotalNum" :current="billCurrent" :page-size="10" show-elevator show-total @on-change="pageSearch"></Page>
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
  import {allCommunity,billPayment,statisticsInfoOfUser,saveBillPayment} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeName2: 'first',
        model1:"",
        value:"",
        billSelects:[],//下拉选
        billCommunity:0,
        communityPayStatic:[],
        billPaymentList:[],
        billTotalNum:0,
        billCurrent:1,
      }
    },
    mounted(){
      this.getCommunityData();
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.billSelects = res.data.entity;
            }
            that.billCommunity = that.billSelects[0].communityId;
            that.getPayStatic({communityId:that.billSelects[0].communityId});
            that.getbillPayment({communityId:that.billSelects[0].communityId,pageNum:1});
          })
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
              for(var i =0;i<that.billPaymentList.length;i++){
                that.$set(that.billPaymentList[i],"isEdit",false);
                that.$set(that.billPaymentList[i],"content","修改账单");
              }
            }
            if(res.data.code == 10001){
              that.billPaymentList = [];
              that.billTotalNum = 0;
            }
          })
      },
      pageSearch(page){
        var params = {
          communityId : this.billCommunity,
          pageNum:page || 1
        }
        this.getbillPayment(params);
      },
      editBill(index,isEdit){
        if(!isEdit){//由正常改为编辑状态
          this.$set(this.billPaymentList[index],"isEdit",!isEdit);
          this.$set(this.billPaymentList[index],"content","保存");
        }else{//保存修改
          this.$set(this.billPaymentList[index],"isEdit",!isEdit);
          this.$set(this.billPaymentList[index],"content","修改账单");
          var obj = this.billPaymentList[index];
          var params = {
            roomId:obj.roomId,
            waterData:obj.waterData,
            waterSize:obj.waterSize,
            energyData:obj.energyData,
            energySize:obj.energySize,
            serviceCost:obj.serviceCost
          };
          this.saveBillPayment(params);
        }

      },
      saveBillPayment(params){
        var that = this;
        this.$http.post(saveBillPayment,qs.stringify(params))
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
            }
          })
      },
    },
    computed:{
      editing:function(){
        var flag = false;
        for(var i =0;i<this.billPaymentList.length;i++){
          if(this.billPaymentList[i].isEdit){
            flag = true;
            break;
          }
        }
        return flag;
      }
    },
    watch:{
      billCommunity:function(newValue,oldValue){
          var vm = this;
          setTimeout(function(){
            vm.getbillPayment({communityId:newValue,pageNum:1});
          });
      }
    }
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

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .form-item{
        display: inline-block;
        margin-right: 20px;
      }
      .right-btn-group{
        position: absolute;
        right: 0;
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
          input{
            width: 70px;
            height: 30px;
            margin: 5px;
            padding: 0 5px;
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

