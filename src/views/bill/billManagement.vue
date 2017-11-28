<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">账单管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>账单管理</h3>
          <Select v-model="communityId" style="width:200px;margin-left: 20px;" @on-change="changeCommunityId">
            <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
          </Select>
        </div>
        <div id="bill-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="公寓租金账单" name="first">
              <div class="form-search-criteria">

                <!--<div class="form-item">-->
                  <!--<span>账单日期：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">-</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="roomSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="roomSearch()">
                  </div>
                </div>
                <div class="form-item">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="createRoomOfficeBill()" v-if="jurisdiction('BILL_UPDATE')">生成租金账单</Button>
                </div>
                <div class="form-item">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="historyBill()">历史账单</Button>
                </div>
              </div>
              <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="roomTotalNum > 0">
                <tr>
                  <th>账单日期</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人电话</th>
                  <th>金额/元</th>
                  <th>服务费</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="room in roomBillList">
                  <td>{{room.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.floorName}}层 {{room.roomNum}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td>{{room.cyclePayMoney}}</td>
                  <td>{{room.serviceCost}}</td>
                  <td>
                    <span v-if="room.billState == 1">待支付</span>
                    <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="room.billState == 3" style="color: red;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:room.billId,type:0}}"> 账单详情</router-link>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:room.signId,isOffice:0}}"> 查看合同</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomBillCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </el-tab-pane>


            <el-tab-pane label="办公室租金账单" name="second">
              <div class="form-search-criteria">
                <!--<div class="form-item">-->
                  <!--<b>社区：</b>-->

                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<span>开业日期：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="officeStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">-</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="officeEndDate"></Date-picker>-->
                <!--</div>-->
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="officeSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="officeSearch()">
                  </div>
                </div>
                <div class="form-item">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="createRoomOfficeBill()" v-if="jurisdiction('BILL_UPDATE')">生成租金账单</Button>
                </div>
                <div class="form-item">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="officeHistory()">历史账单</Button>
                </div>
              </div>
              <table class="office-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="officeTotalNum > 0">
                <tr>
                  <th>账单时间</th>
                  <th>会议室</th>
                  <th>使用时间</th>
                  <th width="150px">联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>服务费/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="item in officeBillList">
                  <td>{{item.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.officeWorkNum}}人间 {{item.officeHouseNum}}</td>
                  <td>{{item.beginDate|timefilter("yyyy.MM.dd")}}-{{item.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{item.userName}}</td>
                  <td>{{item.userPhone}}</td>
                  <td>{{item.cyclePayMoney}}</td>
                  <td>{{item.serviceCost}}</td>
                  <td>
                    <span v-if="item.billState == 1">待支付</span>
                    <span v-if="item.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="item.billState == 3" style="color: red;">违约</span>
                    <span v-if="item.billState == 4">违约办结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:item.billId,type:1}}"> 账单详情</router-link>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:item.signId,isOffice:1}}"> 查看合同</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="officeTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="officeTotalNum" :page-size="10" show-elevator show-total @on-change="officeSearch" v-if="officeTotalNum > 0"></Page>
            </el-tab-pane>

            <el-tab-pane label="水电账单" name="third">
              <div class="form-search-criteria">
                <div class="form-item">
                  <Button style="width: 120px;height: 40px;font-size: 18px;" @click="createBill()" v-if="jurisdiction('BILL_INCREASE')">生成账单</Button>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 40px;font-size: 18px;" @click="editBill()" v-if="jurisdiction('BILL_UPDATE')">编辑账单</Button>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 40px;font-size: 18px;" @click="historyBill()">历史信息</Button>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>账单月份：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="waterEnergyStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">-</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="waterEnergyEndDate"></Date-picker>-->
                <!--</div>-->
              </div>
              <!--<div class="pay-information-wrap-head">-->
                <!--<ul>-->
                  <!--<li>所属社区 :<span style="color: #038be2;font-weight: 700;">{{communityPayStatic.communityName}}</span></li>-->
                  <!--<li>出账日期 :<span>{{communityPayStatic.waterEnergyPayDate | timefilter("yyyy-MM-dd")}}</span></li>-->
                  <!--<li>全部租客 :<span>{{communityPayStatic.totalCount}}户</span></li>-->
                  <!--<li>待缴 :<span style="color:red;font-weight: 700;">{{communityPayStatic.notyetCount}}户</span></li>-->
                  <!--<li>已缴 :<span style="color:black;font-weight: 700;">{{communityPayStatic.alreadyCount}}户</span></li>-->
                <!--</ul>-->
              <!--</div>-->
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
              <table class="payment-infirmation-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="billTotalNum > 0">
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
                        <td v-if="item.waterChargeModel == 2">人数 :<span>{{item.count}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">读数 :<span>{{item.waterData}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">用水量 :<span>{{item.waterSize}}m³</span></td>
                        <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                      </tr>
                      <tr class="tr2">
                        <td v-if="item.waterChargeModel == 2">人数 :<span>{{item.count}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">读数 :<span>{{item.energyData}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">用电量 :<span>{{item.energySize}}度</span></td>
                        <td class="td2">电费 :<span>{{item.energyCost}}元</span></td>
                      </tr>
                    </table>
                  </td>
                  <!--<td class="td1">{{item.serviceCost}}</td>-->
                  <td class="td1">{{item.realMoney}}</td>
                  <td class="td1">{{item.userName}}</td>
                  <td class="td1">{{item.userPhone}}</td>
                  <td class="td1">
                    <span v-if="item.payStatus == 1">待缴</span>
                    <span v-if="item.payStatus == 2" style="color: #ccc;">已缴</span>
                    <span v-if="item.payStatus == 3" style="color: red;">违约</span>
                    <span v-if="item.payStatus == 4" style="color: red;">违约办结</span>
                  </td>
                </tr>
              </table>
              <Page :total="billTotalNum" :current="billCurrent" :page-size="10" show-elevator show-total @on-change="search" v-if="billTotalNum > 0"></Page>
              <div class="blank-background-img" v-if="billTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
            </el-tab-pane>
          </el-tabs>

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
  import {allCommunity,roomBill,officeBill,waterEnergyBill,statisticsInfoOfUser,billPayment,billList500098,WaterEnergyBillList5000100,WaterEnergyBillList500099,RoomBillList500101,OfficeBillList500102,BillList5000103} from '../api.js';


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
        activeName2: 'first',
        model1:"",

        roomBillList:[],
        RoomBillSelects:[],//下拉选
        communityId:null,//当前选中
        roomTotalNum:0,//公寓合同总条数
        roomBillCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字


        officeBillList:[],

        officeCommunity:-1,
        officeTotalNum:0,
        officeBillCurrent:1,
        officeStartDate:"",
        officeEndDate:"",
        officeSearchKey:"",

        waterEnergyStartDate:"",
        waterEnergyEndDate:"",
        activeStatus:0,

        communityPayStatic:[],
        billPaymentList:[],
        billTotalNum:0,
        billCurrent:1,
        searchKey:"",
        createtime:0,
        communityName:"",

        successModal:false,
        successMessage:"生成账单成功！",
        warningModal:false,
        warningMessage:"账单已生成！",
      }
    },
    mounted(){
      let tab = sessionStorage.getItem("billManagementTab");
      if(tab){
          this.activeName2 = tab;
      }
      if(this.$route.query.tab){
        this.activeName2 = this.$route.query.tab;
      }
      this.getCommunityData();


    },
    methods:{
      handleClick(tab, event) {
        sessionStorage.setItem("billManagementTab",tab.name);
      },
      closeWarningModal(){
        this.warningModal = false;
      },

      getCommunityData(){
        var that = this;
        var value = sessionStorage.getItem("billManagement_communityId");
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomBillSelects = res.data.entity;
              if(value){
                that.communityId = value;
              }else{
                that.communityId = that.RoomBillSelects[0].communityId;
              }
              that.getRoomBill({pageNum:1,communityId:that.communityId});
              that.getOfficeBill({pageNum:1,communityId:that.communityId});
              //水电账单
              that.getbillPayment({communityId:that.communityId,pageNum:1});
            }
          })
      },
      getRoomBill(data){
        var that = this;
        this.$http.get(RoomBillList500101,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.roomBillList = pageBean.roomList;
              that.roomTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001 || res.data.code == 10008){
              that.roomBillList = [];
              that.roomTotalNum = 0;
            }
          })
      },
      roomSearch(page){
        var data = {
          communityId:this.communityId,
          pageNum:page || 1
        }

        if(this.roomSearchKey){
          data.keyWord = this.roomSearchKey;
        }
        if(this.roomStartDate){
          data.beginDate = new Date(this.roomStartDate).Format("yyyy-MM-dd");
        }
        if(this.roomEndDate){
          data.endDate = new Date(this.roomEndDate).Format("yyyy-MM-dd");
        }
        this.getRoomBill(data);
      },

      createRoomOfficeBill(){
        var that = this;
        this.$http.post(BillList5000103)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
              that.getRoomBill({pageNum:1,communityId:that.communityId});
              that.getOfficeBill({pageNum:1,communityId:that.communityId});
            }
          })
      },

      getOfficeBill(data){
        var that = this;
        this.$http.get(OfficeBillList500102,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.officeBillList = pageBean.officeList;
              that.officeTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001 || res.data.code == 10008){
              that.officeBillList = [];
              that.officeTotalNum = 0;
            }
          })
      },

      officeSearch(page){
        var data = {
          communityId:this.communityId,
          pageNum:page || 1
        }
        if(this.officeCommunity != -1){
          data.communityId = this.officeCommunity;
        }
        if(this.officeSearchKey){
          data.keyWord = this.officeSearchKey;
        }
        if(this.officeStartDate){
          data.beginDate = new Date(this.officeStartDate).Format("yyyy-MM-dd");
        }
        if(this.officeEndDate){
          data.endDate = new Date(this.officeEndDate).Format("yyyy-MM-dd");
        }
        this.getOfficeBill(data);
      },

      createBill(){
        var that = this;
        this.$http.post(WaterEnergyBillList500099)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
              that.getbillPayment({communityId:that.communityId,pageNum:1});
            }
          })
      },
      editBill(){
        this.$router.push({path:"/bill/editGenerateBill",query:{communityId:this.communityId}});
      },
      historyBill(){
        this.$router.push({path:"/bill/historyInformation",query:{communityId:this.communityId}});
      },
      officeHistory(){
        this.$router.push({path:"/bill/officeHistoryBill",query:{communityId:this.communityId}});
      },

//      getPayStatic(data){
//        var that = this;
//        this.$http.get(statisticsInfoOfUser,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              if(res.data.entity){
//                that.communityPayStatic = res.data.entity;
//              }else{
//                that.communityPayStatic = [];
//              }
//
//            }
//          })
//      },
      getbillPayment(data){
        var that = this;
        this.$http.get(billList500098,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.billPaymentList = pageBean.waterList;
              that.billTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001 || res.data.code == 10008){
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
        if(this.waterEnergyStartDate){
          params.beginDate = new Date(this.waterEnergyStartDate).Format("yyyy-MM-dd");
        }
        if(this.waterEnergyEndDate){
          params.endDate = new Date(this.waterEnergyEndDate).Format("yyyy-MM-dd");
        }
        debugger
        this.getbillPayment(params);
      },
      filterBill(payStatus){
        this.activeStatus = payStatus;
        var params = {
          pageNum:1,
          keyWord : this.searchKey,
          communityId:this.communityId,
        }
        if(this.waterEnergyStartDate){
          params.beginDate = new Date(this.waterEnergyStartDate).Format("yyyy-MM-dd");
        }
        if(this.waterEnergyEndDate){
          params.endDate = new Date(this.waterEnergyEndDate).Format("yyyy-MM-dd");
        }
        if(this.activeStatus != 0){
          params.payStatus = this.activeStatus;
        }
        this.getbillPayment(params);
      },
      changeCommunityId(){
        this.communityId = this.RoomBillSelects[this.RoomBillSelects.findIndex(item => item.communityId == this.communityId)].communityId;
        sessionStorage.setItem("billManagement_communityId",this.communityId);
        if(this.RoomBillSelects){
          for(var i =0;i<this.RoomBillSelects.length;i++){
            if(this.RoomBillSelects[i].communityId == this.communityId){
              this.communityName = this.RoomBillSelects[i].communityName;
              break;
            }
          }
        }
        this.getRoomBill({pageNum:1,communityId:this.communityId});
        this.getOfficeBill({pageNum:1,communityId:this.communityId});
        this.getbillPayment({communityId:this.communityId});

      },

    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
    watch:{
//      communityId:function(newValue,oldValue){
//        var vm = this;
//        if(newValue){
//          sessionStorage.setItem("billManagement_communityId",newValue);
//        }
//        if(this.RoomBillSelects && newValue){
//            for(var i =0;i<this.RoomBillSelects.length;i++){
//                if(this.RoomBillSelects[i].communityId == newValue){
//                    this.communityName = this.RoomBillSelects[i].communityName;
//                    break;
//                }
//            }
//        }
//        setTimeout(function(){
//          vm.getRoomBill({pageNum:1,communityId:newValue});
//          vm.getOfficeBill({pageNum:1,communityId:newValue});
////          vm.getPayStatic({communityId:newValue});
//          vm.getbillPayment({communityId:newValue});
//        },10);
//      },

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #bill-management-wrap{
    height: 100%;
    min-height: 1000px;
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
    .el-tabs__header{
      border-bottom: 1px solid #038be2;
      .el-tabs__nav{
        margin-left:20px;
        .el-tabs__item{
          margin-top: 30px;
          height: 50px;
          line-height:50px;
          font-size: 20px;
          padding: 0 35px;
        }
        .is-active{
          border: 1px solid #038BE2;
          border-bottom-color: #fff;
          border-radius: 4px 4px 0 0;
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
          margin-left: 50px;
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

    .house-bill-table,.water-bill-table,.office-bill-table{
      border-collapse:collapse;
      text-align: center;
      th{
        background-color: #f8f8f9;
      }
      th,td{
        border: 1px solid #ccc;
        padding: 10px 10px;
      }
      tr>td:first-child,tr>th:first-child{
        border-left-width: 0;
      }
      tr>td:last-child,tr>th:last-child{
        border-right-width: 0;
      }
    }

    .house-bill-table{
      tr>td:nth-child(7){
        color: red;
      }
      tr>td:nth-child(9){
        color: #FF6612;
      }
    }

    .water-bill-table{
      tr>td:nth-child(9){
        color: red;
      }
    }

    .office-bill-table{
      tr>td:nth-child(8){
        color: #FF6612;
      }
      tr>td:nth-child(7){
        color: red;
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

  }



</style>

