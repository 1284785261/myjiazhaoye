<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">生成水电账单</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>编辑水电账单</h3>
        </div>
        <div id="pay-information-wrap">
          <div class="form-search-criteria">
            <div class="form-item">
              <b>社区：</b>
              <span>{{communityName}}</span>
            </div>
            <div class="form-item">
              <b>当前公寓共合计 :</b> <span style="font-weight: 700;color: black;">{{billTotalNum}}户</span>
            </div>
            <div class="form-item">
              <Button style="width: 120px;height: 30px;" :disabled="true">全部抄表</Button>
              <Button style="width: 180px;height: 30px;margin-left: 30px;" :disabled="editing"><span v-if="editing">请保存正在编辑的账单</span><span v-else @click="sendBillToCostomer">生成账单并发送给租客</span></Button>
            </div>
          </div>
          <table class="payment-infirmation-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="billTotalNum > 0">
            <tr class="tr1">
              <th class="th1">房间</th>
              <th class="th1">水电费情况</th>
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
                      <td class="td2" v-if="item.waterChargeModel == 2">人数 :<span>{{item.enterCount}}</span></td>
                      <td class="td2" v-if="item.waterChargeModel != 2">上次水表读数 :<span>{{item.roomWater}}</span></td>
                      <td class="td2" v-if="item.waterChargeModel != 2">本次水表读数 :<span>{{item.waterData}}</span></td>
                      <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2" v-if="item.waterChargeModel == 2">人数 :<span>{{item.enterCount}}</span></td>
                      <td class="td2" v-if="item.waterChargeModel != 2">上次水表读数 :<span>{{item.roomWater}}</span></td>
                      <td class="td2" v-if="item.waterChargeModel != 2">本次水表读数 :<input type="text" v-model="item.waterData"/></td>
                      <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="!item.isEdit">
                      <td class="td2" v-if="item.electricChargeModel == 2">人数 :<span>{{item.enterCount}}</span></td>
                      <td class="td2" v-if="item.electricChargeModel != 2">上次电表读数 :<span>{{item.roomElectric}}</span></td>
                      <td class="td2" v-if="item.electricChargeModel != 2">本次电表读数 :<span>{{item.energyData}}</span></td>
                      <td class="td2">电费 :<span>{{item.energyCost}}元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2" v-if="item.electricChargeModel == 2">人数 :<span>{{item.enterCount}}</span></td>
                      <td class="td2" v-if="item.electricChargeModel != 2">上次电表读数 :<span>{{item.roomElectric}}</span></td>
                      <td class="td2" v-if="item.electricChargeModel != 2">本次电表读数 :<input type="text"  v-model="item.energyData"/></td>
                      <td class="td2">电费 :<span>{{item.energyCost}}元</span></td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">{{item.totalMoney}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userName:""}}</td>
              <td class="td1">{{item.userInfo?item.userInfo.userPhone:""}}</td>
              <td class="td1" style="min-width: 85px;"><a @click="editBill(index,item.isEdit)">{{item.content}}</a></td>
            </tr>
          </table>
          <div class="blank-background-img" v-if="billTotalNum == 0">
            <img src="../../../static/images/blank/bill_space.png" >
            <h2>暂无账单内容~</h2>
          </div>
          <Page :total="billTotalNum" :current="billCurrent" :page-size="10" show-elevator show-total @on-change="pageSearch" v-if="billTotalNum > 0"></Page>
        </div>

      </div>
      <footer-box></footer-box>
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
  import {allCommunity,unsentWaterEnergyBillList,statisticsInfoOfUser,editUsedWaterEnergy,hostTitle,sendAllToCustomer} from '../api.js';


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
        activeTabName:"billManagement",
        activeName2: 'first',
        model1:"",
        value:"",
        billSelects:[],//下拉选
        billCommunity:0,
        communityPayStatic:[],
        billPaymentList:[],
        billTotalNum:0,
        billCurrent:1,
        activePage:1,
        communityName:"",
        successMessage:"发送成功！",
        warningMessage:"没有可供发送的账单！",
        successModal:false,
        warningModal:false,
      }
    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.getCommunityInfo();
      this.getPayStatic({communityId:this.communityId});
      this.getbillPayment({communityId:this.communityId,pageNum:1});
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
      //获取社区信息
      getCommunityInfo(){
        var that = this;
        this.$http.post(hostTitle,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){
            that.communityName = res.data.result.community.communityName;
          }
        }).catch(function(err){
          console.log(err);
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
        this.$http.get(unsentWaterEnergyBillList,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.billPaymentList = pageBean.page;
              that.billTotalNum = pageBean.totalNum;
              for(var i =0;i<that.billPaymentList.length;i++){
                that.$set(that.billPaymentList[i],"isEdit",false);
                that.$set(that.billPaymentList[i],"content","修改账单");
                if(!that.billPaymentList[i].roomWater){
                  that.billPaymentList[i].roomWater = that.billPaymentList[i].waterInit;
                }
                if(!that.billPaymentList[i].roomElectric){
                  that.billPaymentList[i].roomElectric = that.billPaymentList[i].electricInit;
                }
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
        if(page){
          this.activePage = page;
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
          debugger
          var params = {
            waterElectricityBill:obj.waterElectricityBill,
            waterData:parseInt(obj.waterData),
            energyData:parseInt(obj.energyData)
          };
          if(obj.waterChargeModel == 1){
            params.waterSize=parseInt(obj.waterData)-parseInt(obj.roomWater);
            params.waterCost = parseInt(obj.waterPrice)*parseInt(params.waterSize);
          }else{
            params.count = obj.count;
            params.waterCost = parseInt(obj.waterPrice)*parseInt(obj.count);
          }

          if(obj.electricChargeModel == 1){
            params.energySize=parseInt(obj.energyData)-parseInt(obj.roomElectric);
            params.energyCost = parseInt(obj.energyPrice)*parseInt(params.energySize);
          }else{
            params.count = obj.count;
            params.energyCost = parseInt(obj.energyPrice)*parseInt(obj.count);
          }
          params.totalMoney=params.energyCost + params.waterCost;
          params.realMoney=params.energyCost + params.waterCost;
          if(obj.electricChargeModel == 2 || obj.waterChargeModel == 2){
            params.count = obj.count;
          }debugger
          this.saveBillPayment(params);
        }

      },
      saveBillPayment(params){
        var that = this;
        this.$http.post(editUsedWaterEnergy,qs.stringify(params))
          .then(function(res){
            if(res.status != 200 || res.data.code != 10000){
              that.warningModal = true;
              that.warningMessage = "编辑失败！";
            }
            that.pageSearch(that.activePage);
          })
      },
      sendBillToCostomer(){
        var that = this;
        this.$http.get(sendAllToCustomer,{params:{communityId:this.communityId}})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }
          })
      },
      closeWarningModal(){
        this.warningModal = false;
      }
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
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
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

