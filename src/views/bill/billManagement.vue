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
          <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="公寓租金账单" name="first">
              <div class="form-search-criteria" >

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
                <div class="form-item" v-if="jurisdiction('BILL_UPDATE')">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="createRoomOfficeBill(0)" >生成租金账单</Button>
                </div>
                <div class="form-item" v-if="jurisdiction('BILL_UPDATE')">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="sendRoomBill">发送缴费提醒</Button>
                </div>
                <!--<div class="form-item">-->
                  <!--<Button style="width: 160px;height: 40px;font-size: 18px;" @click="historyBill()">历史账单</Button>-->
                <!--</div>-->
              </div>
              <div v-if="item.roomList.length" v-for="(item,index) in roomBillList" >
                <div class="floorName">
                  {{item.floorName}} 层 <i class="el-icon-arrow-down" v-if="item.isShow" @click="updateShow(index)"></i> <i class="el-icon-arrow-up" v-if="!item.isShow" @click="updateShow(index)"></i>
                </div>

              <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="item.roomList && item.isShow">
                <tr>
                  <th>账单日期</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人电话</th>
                  <th>租金/月</th>
                  <th>押金</th>
                  <th>服务费/月</th>
                  <th>合计</th>
                  <th>账单日期</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="room in item.roomList">

                  <!--<td>{{room}}</td>-->
                  <td>{{room.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.floorName}}层 {{room.roomNum}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td>{{room.cyclePayMoney}}</td>
                  <td>{{room.isFirstPay?room.deposit:''}}</td>
                  <td>{{room.serviceCost}}</td>
                  <td>{{room.realPayMoney}}</td>
                  <td>{{room.billBeginDate | timefilter("yyyy-MM-dd")}}-{{room.billEndDate | timefilter("yyyy-MM-dd")}} </td>
                  <td>
                    <span v-if="room.billState == 1 && !room.isSend">未发送</span>
                    <span v-if="room.billState == 1 && room.isSend">待支付</span>
                    <span v-if="room.billState == 2" style="color: red;">已支付</span>
                    <span v-if="room.billState == 3" style="color: #ccc;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:room.billId,type:0}}"> 账单详情</router-link>
                    <router-link :to="{name:'historyMeter',query:{roomId:room.roomId,tab:3}}"> 历史账单</router-link>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:room.signId,isOffice:0}}"> 查看合同</router-link>
                    <a @click="ceneratedBill(room.roomId,0)" v-if="room.contractState == 4"> 生成账单</a>
                  </td>
                </tr>
              </table>
              </div>
              <!--<div class="blank-background-img" v-if="roomTotalNum == 0">-->
                <!--<img src="../../../static/images/blank/bill_space.png" >-->
                <!--<h2>暂无账单内容~</h2>-->
              <!--</div>-->
              <!--<Page :total="roomTotalNum" :current="roomBillCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>-->
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
                <div class="form-item" v-if="jurisdiction('BILL_UPDATE')">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="createRoomOfficeBill(1)" >生成租金账单</Button>
                </div>
                <div class="form-item" v-if="jurisdiction('BILL_UPDATE')">
                  <Button style="width: 160px;height: 40px;font-size: 18px;" @click="sendOfficeBill">发送缴费提醒</Button>
                </div>
              </div>
              <table class="office-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="officeTotalNum > 0">
                <tr>
                  <th>账单时间</th>
                  <th>办公室</th>
                  <th>租期</th>
                  <th width="150px">联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/月</th>
                  <th>押金</th>
                  <th>服务费/月</th>
                  <th>合计</th>
                  <th>账单日期</th>
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
                  <td>{{item.isFirstPay?item.deposit:''}}</td>
                  <td>{{item.serviceCost}}</td>
                  <td>{{item.realPayMoney}}</td>
                  <td>{{item.billBeginDate | timefilter("yyyy-MM-dd")}}-{{item.billEndDate | timefilter("yyyy-MM-dd")}} </td>
                  <td>
                    <span v-if="item.billState == 1 && !item.isSend">未发送</span>
                    <span v-if="item.billState == 1 && item.isSend">待支付</span>
                    <span v-if="item.billState == 2" style="color: red;">已支付</span>
                    <span v-if="item.billState == 3" style="color: #ccc;">违约</span>
                    <span v-if="item.billState == 4">违约办结</span>
                  </td>

                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:item.billId,type:1}}"> 账单详情</router-link>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:item.signId,isOffice:1}}"> 查看合同</router-link>
                    <router-link :to="{name:'officeHistoryMeter',query:{officeId:item.officeId}}"> 历史账单</router-link>
                    <a @click="ceneratedBill(item.officeId,1)" v-if="item.contractState == 4"> 生成账单</a>
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
              <div class="form-search-criteria" v-if="jurisdiction('BILL_GENERATE')">
                <div class="form-item">
                  <Button style="width: 120px;height: 40px;font-size: 18px;" @click="centerDialog=true" >生成账单</Button>
                </div>
                <!--<div class="form-item">-->
                  <!--<Button style="width: 120px;height: 40px;font-size: 18px;" @click="editBill()" v-if="jurisdiction('BILL_UPDATE')">编辑账单</Button>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<Button style="width: 120px;height: 40px;font-size: 18px;" @click="historyBill()">历史信息</Button>-->
                <!--</div>-->
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
                  <Button style="width: 180px;height: 30px;" @click="sendWaterBill">向未缴租客发送缴费提醒</Button>
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
                  <th class="th1">操作</th>
                </tr>
                <tr class="tr1" v-for="(item,index) in billPaymentList">
                  <td class="td1">{{item.roomNum}}</td>
                  <td class="td1">
                    <table class="table2">
                      <tr class="tr2">
                        <td v-if="item.waterChargeModel == 2">用水人数 :<span>{{item.count}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">读数 :<span>{{item.waterData}}</span></td>
                        <td v-if="item.waterChargeModel != 2" class="td2">用水量 :<span>{{item.waterSize}}m³</span></td>
                        <td class="td2">水费 :<span>{{item.waterCost}}元</span></td>
                      </tr>
                      <tr class="tr2">
                        <td v-if="item.waterChargeModel == 2">用电人数 :<span>{{item.count}}</span></td>
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
                    <span v-if="item.payStatus == 1 && item.isSend == 0">未发送</span>
                    <span v-if="item.payStatus == 1 && item.isSend == 1">待缴</span>
                    <span v-if="item.payStatus == 2" style="color: #ccc;">已缴</span>
                    <span v-if="item.payStatus == 3" style="color: red;">违约</span>
                    <span v-if="item.payStatus == 4" style="color: red;">违约办结</span>
                  </td>

                  <td class="td1">
                    <router-link :to="{name:'historyMeter',query:{roomId:item.roomId,tab:'2'}}">历史记录</router-link>
                    <a @click="ceneratedWaterChargeBill(item.roomId)"> 生成账单</a>
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
    <el-dialog
      title="操作提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定批量生成 <b style="color: red;font-size: 20px">全部房间的租金账单</b>吗？(请谨慎操作)</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createRoomOfficeBillModel">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="操作提示"
      :visible.sync="centerDialog"
      width="30%"
      center>
      <span>确定批量生成<b style="color: red;font-size: 20px">全部房间的水电账单</b>吗？(请谨慎操作)</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialog = false">取 消</el-button>
    <el-button type="primary" @click="createBill">确 定</el-button>
  </span>
    </el-dialog>
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
  import qs from 'qs'
  import {allCommunity,roomBill,officeBill,waterEnergyBill,statisticsInfoOfUser,billPayment,CreateCxkjBill500176,CreateCxkjWaterBill500177,CxkjBillOfficeSendAll500172,CxkjBillSendAll500171,CxkjWaterEnergyBillSendAll200240,billList500098,WaterEnergyBillList5000100,WaterEnergyBillList500099,RoomBillList500101,OfficeBillList500102,BillList5000103} from '../api.js';


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
        pageSize:0,
        pageNum:1,
        centerDialogVisible:false,
        isOffice:'',
        centerDialog:false
      }
    },
    mounted(){
      let tab = sessionStorage.getItem("billManagementTab");
      if(tab){
          this.activeName2 = tab;
      }
      else if(this.$route.query.tab){
        this.activeName2 = this.$route.query.tab;
      }
      else if(this.$route.query.name){
        this.activeName2 = this.$route.query.name;
      }
      this.getCommunityData();


    },
    methods:{
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
              that.getRoomBill({pageNum:1,pageSizw:50,communityId:that.communityId});
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
              that.roomBillList = pageBean.floorList;
              for(let i =0;i<pageBean.floorList.length;i++){
                that.$set(that.roomBillList[i],'isShow',true)
              }
              that.roomTotalNum = pageBean.totalNum;
            }else {
              // that.warningMessage=res.data.content+res.data.code
              // that.warningModal = true
            }
            if(res.data.code == 10001 || res.data.code == 10008){
              that.roomBillList = [];
              that.roomTotalNum = 0;
            }
          })
      },
      /**
       * 单个生成水电账单
       **/
      ceneratedWaterChargeBill(buildingId){
        let that = this;
        this.$http.post(CreateCxkjWaterBill500177,qs.stringify({
          communityId:that.communityId,
          buildingId:buildingId
        }))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }else {
              that.warningMessage=res.data.content+res.data.code
              that.warningModal = true
            }
          }).catch(function(err){
          that.warningMessage='生成账单失败'
          that.warningModal = true
          console.log(err);
        })
      },
      /**
       * 单个生成租金账单
       **/
      ceneratedBill(buildingId,isOffice){
        let that = this;
        this.$http.post(CreateCxkjBill500176,qs.stringify({
          communityId:that.communityId,
          isOffice:isOffice,
          buildingId:buildingId
        }))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
              if(isOffice){
                that.getOfficeBill({pageNum:that.pageNum,communityId:that.communityId});
              }else {
                that.getRoomBill({pageNum:that.pageNum,pageSizw:50,communityId:that.communityId});
              }
            }else {
              that.warningMessage=res.data.content+res.data.code
              that.warningModal = true
            }
          }).catch(function(err){
          that.warningMessage='生成账单失败'
          that.warningModal = true
          console.log(err);
        })
      },
      /**
       * 批量发送公寓租金账单
       **/
      sendRoomBill(){
        var that = this;
        console.log(that.communityId)
        this.$http.post(CxkjBillSendAll500171,qs.stringify({
          communityId:that.communityId,
          pageNum:1,
          pageSize:50
        })).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "发送账单成功!";
              that.successModal = true;
              that.getRoomBill({pageNum:that.pageNum,pageSizw:50,communityId:that.communityId});
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }else {
              that.warningMessage=res.data.content+res.data.code
              that.warningModal = true
            }
          }).catch(function(err){
          that.warningMessage='发送账单失败'
          that.warningModal = true
          console.log(err);
        })
      },
      /**
       * 批量发送办公租金账单
       **/
      sendOfficeBill(){
        var that = this;
        console.log(that.communityId)
        this.$http.post(CxkjBillOfficeSendAll500172,qs.stringify({
          communityId:that.communityId,
          pageNum:1,
          pageSize:that.officeTotalNum
        })).then(function(res){
          if(res.status == 200 && res.data.code == 10000){
            that.successMessage = "发送账单成功!";
            that.successModal = true;
            that.getOfficeBill({pageNum:that.pageNum,communityId:that.communityId});
            setTimeout(function(){
              that.successModal = false;
            },1000)
          }else {
            that.warningMessage=res.data.content+res.data.code
            that.warningModal = true
          }
        }).catch(function(err){
          that.warningMessage='发送账单失败'
          that.warningModal = true
          console.log(err);
        })
      },
      /**
       * 楼层显示或隐藏
       **/
      updateShow(index){
        this.$set(this.roomBillList[index],'isShow',!this.roomBillList[index].isShow)
      },
      roomSearch(page){
        this.pageNum = page
        var data = {
          communityId:this.communityId,
          pageNum:page || 1,
          pageSizw:50
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
      /**
       * 生成公寓或办公租金账单弹框
       * **/
      createRoomOfficeBill(isOffice){
        this.isOffice = isOffice
        this.centerDialogVisible = true
      },
      createRoomOfficeBillModel(){
        let that = this;
        this.$http.post(BillList5000103,qs.stringify({
          communityId:that.communityId,
          isOffice:that.isOffice
        }))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
              if(that.isOffice){
                that.getOfficeBill({pageNum:that.pageNum,communityId:that.communityId});
              }else {
                that.getRoomBill({pageNum:that.pageNum,pageSizw:50,communityId:that.communityId});
              }

            }else {
              that.warningMessage=res.data.content+res.data.code
              that.warningModal = true
            }
          }).catch(function(err){
          that.warningMessage='生成账单失败'
          that.warningModal = true
          console.log(err);
        })
        that.centerDialogVisible = false
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
        this.pageNum = page
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
      /**
       * 生成水电账单
       * **/
      createBill(){
        var that = this;
        this.$http.post(WaterEnergyBillList500099,qs.stringify({
          communityId:that.communityId
        })).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.successMessage = "生成水电账单成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
              that.getbillPayment({communityId:that.communityId,pageNum:that.pageNum});
            }else {
              that.warningMessage=res.data.content+res.data.code
              that.warningModal = true
            }
          }).catch(function(err){
          that.warningMessage='生成水电账单失败'
          that.warningModal = true
          console.log(err);
        })
        this.centerDialog = false
      },
      /**
       * 批量发送账单
       * **/
      sendWaterBill(){
        var that = this;
        this.$http.post(CxkjWaterEnergyBillSendAll200240,qs.stringify({
          communityId:that.communityId
        })).then(function(res){
          if(res.status == 200 && res.data.code == 10000){
            that.successMessage = "发送账单成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000)
            that.getbillPayment({communityId:that.communityId,pageNum:that.pageNum});
          }else {
            that.warningMessage=res.data.content+res.data.code
            that.warningModal = true
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

        this.getbillPayment(params);
      },
      filterBill(payStatus){
        this.activeStatus = payStatus;
        this.pageNum = 1
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
        this.getRoomBill({pageNum:1,pageSizw:50,communityId:this.communityId});
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
            top: 1px;
            cursor: pointer;
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
        text-align: center;
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
        text-align: center;
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
  .floorName{
    width: 100px;
    height: 40px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background: #038BE2;
    text-align: center;
    color: #fff;
    line-height: 40px;
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 18px;
  }



</style>

