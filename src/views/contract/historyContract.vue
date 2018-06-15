
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site" style="z-index: 101">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/contract/contractIndex">合同管理</router-link><span>>历史合同</span>
        </div>
        <div id="contract-index-wrap" style="margin-top: 15px;z-index: 100">
          <Tabs type="card" @on-click="changeTab" v-model="activeName" >
            <Tab-pane label="历史合同" name="room">
              <div style="padding: 15px" v-if="roomTotalNum">社区：{{communityName}} {{isOffice == '0'?'房间：':'办公室：'}} {{roomNum}}</div>
              <table class="table ivu-table" v-if="roomTotalNum && isOffice == '0'" >
                <tr>
                  <th >合同编号</th>
                  <th>签约日期</th>
                  <th>所属社区</th>
                  <!--<th >公寓房间</th>-->
                  <th>租期</th>
                  <th >承租人</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="room in roomContractList">
                  <td>{{room.contractNumber}}</td>
                  <td>{{room.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.communityName}}</td>
                  <!--<td >{{room.floorName? room.floorName +'层 ':''}}{{room.roomNum}}</td>-->
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td style="color: red;">{{room.cyclePayMoney}}</td>
                  <td>
                    <span v-if="room.state == 1">已作废</span>
                    <span v-if="room.contractState == 1 && !room.state">待确认</span>
                    <span v-else-if="room.contractState == 2 && !room.state" style="color: rgb(255,102,18)">待付款</span>
                    <span v-else-if="room.contractState == 3 && !room.state" style="color: rgb(255,102,18)">待付首款</span>
                    <span v-else-if="room.contractState == 4 && !room.state" style="color: rgb(31,187,166)">履约中</span>
                    <span v-else-if="room.contractState == 5 && !room.state" style="color: rgb(31,187,166)">退租中</span>
                    <span v-else-if="room.contractState == 6 && !room.state" style="color: rgb(153,153,153)">退租办结</span>
                    <span v-else-if="room.contractState == 7 && !room.state" style="color: rgb(255,29,16)">违约</span>
                    <span v-else-if="room.contractState == 8 && !room.state" style="color: rgb(153,153,153)">违约办结</span>
                    <span v-else-if="room.contractState == 9 && !room.state" style="color: rgb(153,153,153)">到期办结</span>
                    <span v-else-if="room.contractState == 10 && !room.state" style="color: rgb(31,187,166)">申请退租</span>
                  </td>
                  <td v-if=" !room.state">
                    <router-link v-if="room.contractState == 1" :to="{path:'/signed/lodgingHouse',query:{contractSignId:room.contractSignId,communityId:communityId,Name:room.communityName}}">编辑</router-link>
                    <a v-if="room.contractState == 2 || room.contractState == 3" @click="collectionModelShow(room.billId,'room',room.contractSignId)">收款</a>
                    <a v-if="(room.contractState == 1 || room.contractState == 2 || room.contractState == 3) "  @click="delRoomSign(room.contractSignId)">作废</a>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:room.contractSignId,isOffice:'0'}}">查看详情</router-link>
                    <router-link v-if='room.contractState != 1' :to="{name:'householdBill',query:{contractSignId:room.contractSignId,isOffice:'0',communityName:room.communityName}}">查看总账单</router-link>
                    <!--<router-link v-if=" room.contractState == 4" :to="{path:'/signed/renewRoom',query:{contractSignId:room.contractSignId,communityId:communityId,Name:room.communityName}}">续签</router-link>-->
                    <a v-if=" room.contractState == 4" @click="renewModelShow(room.contractSignId,room.endDate)">续签</a>
                    <!--<router-link   v-if=" room.contractState == 4" :to="{path:'/contract/changeRooms',query:{contractSignId:room.contractSignId,communityId:communityId,Name:room.communityName}}">一键换房</router-link >-->
                  </td>
                  <td v-else></td>
                </tr>
              </table>

              <table class="table ivu-table"  v-if="roomTotalNum && isOffice == '1'" >
                <tr>
                  <th>合同编号</th>
                  <th>签约日期</th>
                  <th>社区        租期</th>
                  <!--<th>办公室</th>-->
                  <th>公司</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="office in roomContractList">
                  <td>{{office.contractNumber}}</td>
                  <td>{{office.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>
                    <p>{{office.communityName}}</p>
                    <p>租期：{{office.beginDate | timefilter("yyyy.MM.dd")}}-{{office.endDate | timefilter("yyyy.MM.dd")}}</p>
                  </td>
                  <!--<td>{{office.officeHouseNum}}</td>-->
                  <td>{{office.companyInfo}}</td>
                  <td>{{office.userName}}</td>
                  <td>{{office.userPhone}}</td>
                  <td>{{office.cyclePayMoney}}</td>
                  <td v-if="!office.state">

                    <span v-if="office.contractState == 1">待确认</span>
                    <span v-else-if="office.contractState == 2" style="color: rgb(255,102,18)">待付款</span>
                    <span v-else-if="office.contractState == 3" style="color: rgb(255,102,18)">待付首款</span>
                    <span v-else-if="office.contractState == 4" style="color: rgb(31,187,166)">履约中</span>
                    <span v-else-if="office.contractState == 5" style="color: rgb(31,187,166)">退租中</span>
                    <span v-else-if="office.contractState == 6" style="color: rgb(153,153,153)">退租办结</span>
                    <span v-else-if="office.contractState == 7" style="color: rgb(255,29,16)">违约</span>
                    <span v-else-if="office.contractState == 8" style="color: rgb(153,153,153)">违约办结</span>
                    <span v-else-if="office.contractState == 9" style="color: rgb(153,153,153)">到期办结</span>
                    <span v-else-if="office.contractState == 10" style="color: rgb(31,187,166)">申请退租</span>
                  </td>
                  <td v-else>
                    已作废
                  </td>
                  <td v-if="!office.state">
                    <!--<router-link v-if="room.contractState == 1" :to="{path:'/signed/lodgingHouse',query:{contractSignId:room.contractSignId,communityId:room.communityId,Name:room.communityName}}">编辑</router-link>-->
                    <router-link v-if="office.contractState == 1" :to="{path:'/signed/lodgingwork',query:{contractSignId:office.contractSignId,communityId:communityId,Name:office.communityName}}">编辑</router-link>
                    <a v-if="office.contractState == 2 || office.contractState == 3" @click="collectionModelShow(office.billId,'office',office.contractSignId)">收款</a>
                    <a v-if="(office.contractState == 1 || office.contractState == 2 || office.contractState == 3) "  @click="delRoomSign(office.contractSignId)">作废</a>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:office.contractSignId,isOffice:'1'}}">查看详情</router-link>
                    <router-link :to="{name:'householdBill',query:{contractSignId:office.contractSignId,isOffice:'1',communityName:office.communityName}}" v-if=" office.contractState != 1">查看总账单</router-link>
                    <a  v-if="office.contractState == 4" @click="renewModelShow(office.contractSignId,office.endDate)">续签</a>
                    <!--<router-link v-if="office.contractState == 4" :to="{path:'/contract/changeOffice',query:{contractSignId:office.contractSignId,communityId:communityId,Name:office.communityName}}">一键换房</router-link>-->
                  </td>
                  <td v-else>

                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="!roomTotalNum">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum"></Page>
            </Tab-pane>

          </Tabs>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
    <div class="black-member-modal" v-if="collectionShow" @click="closeWhileModal()"></div>
    <div class="blackModelCenter" v-if="collectionShow" style="height: 420px;">
      <p>收款登记</p>
      <div style="text-align: center;border-bottom: solid 1px #ccc;margin-bottom: 10px;">
        <template>
          <el-radio-group v-model="type">
            <el-radio :label="2">微信付款</el-radio>
            <el-radio :label="1">支付宝付款</el-radio>
            <el-radio :label="3">银行转账</el-radio>
            <el-radio :label="4">其他</el-radio>
            <el-radio :label="6">POS机刷卡</el-radio>
          </el-radio-group>
        </template>
      </div>
      <div v-if="type == 1">
        <div class="inputBox">
          <span class="span">转帐单号：</span><Input v-model="collection1.payNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection1.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('1',collection1.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection1.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 2">
        <div class="inputBox">
          <span class="span">转帐单号：</span><Input v-model="collection2.payNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection2.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('2',collection2.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection2.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 3">
        <div class="inputBox">
          <span class="span">银行流水号：</span><Input v-model="collection3.payNumbers" placeholder="银行流水号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">凭证号：</span><Input v-model="collection3.voucherNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection3.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('3',collection3.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection3.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 4">
        <div class="inputBox">
          <span class="span">收款方式：</span><Input v-model="collection4.payWay" placeholder="收款方式"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection4.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('4',collection4.gatheringMoney)"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款说明：</span><Input v-model="collection4.remark" placeholder="收款说明"></Input>
        </div>
      </div>

      <div v-if="type == 6">
        <div class="inputBox">
          <span class="span">终端编号：</span><Input v-model="collection6.payNumbers" placeholder="银行流水号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">凭证号：</span><Input v-model="collection6.voucherNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">参考号：</span><Input v-model="collection6.referNum" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">金额：</span><Input v-model="collection6.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('6',collection6.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker style="width: 150px;margin: 0;" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"  v-model="collection6.payDate"></Date-picker>
        </div>
      </div>

      <h5 style="text-align: center;color: red;">{{messageError}}</h5>
      <div class="modal-btn">
        <Button type="primary" @click="allIncome()">确认</Button>
        <Button  @click="setWhileMember()" style="margin-left: 50px;">取消</Button>
      </div>
      <div class="modal-close-btn" @click="closeWhileModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>
    <el-dialog
      title="续签操作"
      :visible.sync="renew"
      width="30%"
        center>
      <div class="block" style="margin-bottom: 10px;">
        <span class="demonstration">续租月份：</span>
        <el-input v-model="month"  class="monthInput" @change="countdatas(month)" style="width: 50px"></el-input> 个月
      </div>
      <div class="block">
        <span class="demonstration">续签截止日期：</span>
        <el-date-picker
          v-model="renewEndDate"
          type="date"
          disabled="true"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="renew = false">取 消</el-button>
    <el-button type="primary" @click="renewClick">确 定</el-button>
  </span>
    </el-dialog>
    <!--<el-dialog-->
      <!--:title="roomNum+'房间抄表'"-->
      <!--:visible.sync="dialogVisible"-->
      <!--width="30%"-->
      <!--:before-close="getRoomInfo">-->
      <!--<div>-->
        <!--<el-tabs v-model="activeName2" type="card" @tab-click="setActiveName2">-->
          <!--<el-tab-pane label="电表" name="2" v-if="housetderta.electricType == 1">-->
            <!--<div id="readingRecords">-->
              <!--<div class="readingRecordtitel">-->
                <!--<span>手动获取：</span><input type="text" v-model="waterrading">m³<a-->
                <!--@click="manualReading(waterrading)">抄表</a><a-->
                <!--@click="automaticReading">自动获取</a>-->
              <!--</div>-->
              <!--<div>-->
                <!--<table style="width: 100%">-->
                  <!--<thead>-->
                  <!--<td>序号</td>-->
                  <!--<td>电表读数</td>-->
                  <!--<td>抄表类型</td>-->
                  <!--<td>记录时间</td>-->
                  <!--<td>操作人</td>-->
                  <!--<td>操作时间</td>-->
                  <!--</thead>-->
                  <!--<tr v-for="(item,index) in elevtrRecords">-->
                    <!--<td>{{index+1}}</td>-->
                    <!--<td>{{item.waterElectricityData}}</td>-->
                    <!--<td>{{item.createTime | time}}</td>-->
                    <!--<td>{{item.userName}}</td>-->
                    <!--<td>{{item.newTime | time}}</td>-->
                  <!--</tr>-->
                <!--</table>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane label="水表" name="1" v-if="housetderta.waterType == 1">-->
            <!--<div id="readingRecords">-->
              <!--<div class="readingRecordtitel">-->
                <!--<span>手动获取：</span><input type="text" v-model="waterrading">m³<a-->
                <!--@click="manualReading(waterrading)">抄表</a><a-->
                <!--@click="automaticReading">自动获取</a>-->
              <!--</div>-->
              <!--<div>-->
                <!--<table style="width: 100%">-->
                  <!--<thead>-->
                  <!--<td>序号</td>-->
                  <!--<td>水表读数</td>-->
                  <!--<td>抄表类型</td>-->
                  <!--<td>记录时间</td>-->
                  <!--<td>操作人</td>-->
                  <!--<td>操作时间</td>-->
                  <!--</thead>-->
                  <!--<tr v-for="(item,index) in waterRecords">-->
                    <!--<td>{{index+1}}</td>-->
                    <!--<td>{{item.waterElectricityData}}</td>-->
                    <!--<td>{{item.chaozuotype}}</td>-->
                    <!--<td>{{item.createTime | time}}</td>-->
                    <!--<td>{{item.userName}}</td>-->
                    <!--<td>{{item.newTime | time}}</td>-->
                  <!--</tr>-->
                <!--</table>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-tab-pane>-->

        <!--</el-tabs>-->
      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="getRoomInfo">确 定</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->
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
  import {allCommunity,roomContract,officeContract,CxkjCommunityHistoryContractSignTable200252,CxkjCommunityContractSignRoomAdd200253,CxkjCommunityContractSignOfficeAdd200254,propertyContract,CxkjBillGatheringDetailPart500156,CxkjBillGatheringDetail500155,CxkjBillGatheringDetailWhole500157,CxkjBillGathering500164,delRoomSign200223} from '../api.js';
  import qs from 'qs';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data () {
      let _this = this;
      return {
        type:2,
        activeName:"room",
        RoomContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],//下拉选
        roomCommunity:-1,//当前选中
        roomContractList:[],//公寓合同数据
        roomTotalNum:0,//公寓合同总条数
        roomContractCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字
        collectionShow:false,//收款显示弹框
        collection:{
          id:"",
          contractSignId:'',//收款合同ID
          bankWater:'',//收款银行流水
          certificate:'',//收款凭证
          paymentAmount:''//收款金额
        },
        collection1:{
          payNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection2:{
          payNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection3:{
          payNumbers:"",
          voucherNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection4:{
          payWay:"",
          gatheringMoney:"",
          remark:""
        },
        collection6:{
          payNumbers:"",
          voucherNumbers:"",
          referNum:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },

        officeContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        officeContractList:[],
        officeCommunity:-1,//联合办公当前选中社区
        officeTotalNum:0,//联合办公合同总条数
        officeContractCurrent:1,//联合办公合同当前页
        officeStartDate:"",//联合办公签约开始时间
        officeEndDate:"",//联合办公签约结束时间
        officeSearchKey:"",//联合办公搜索关键字

        option1: {
          disabledDate (date) {
            return date && date.valueOf() < _this.roomStartDate;
          }
        },
        option2: {
          disabledDate (date) {
            return date && date.valueOf() < _this.officeStartDate;
          }
        },
        option3: {
          disabledDate (date) {
            return date && date.valueOf() < _this.propertyStartDate;
          }
        },
        option4: {
          disabledDate(date){
            if(_this.roomEndDate){
              return date &&  _this.roomEndDate < date.valueOf();
            }
          }
        },
        option5: {
          disabledDate(date){
            if(_this.officeEndDate){
              return date &&  _this.officeEndDate < date.valueOf();
            }
          }
        },
        option6: {
          disabledDate(date){
            if(_this.propertyEndDate){
              return date &&  _this.propertyEndDate < date.valueOf();
            }
          }
        },
        billId:"",
        signId:"",
        successModal:false,
        successMessage:"部分收款成功！",
        warningModal:false,
        warningMessage:"部分收款异常！",
        isMoney1:true,//判断输入是否合法
        isMoney2:true,
        isMoney3:true,
        isMoney4:true,
        isMoney6:true,
        messageError:"",
        paymentType:"room",//收款类型
        isUser:sessionStorage.getItem("userPhone") && sessionStorage.getItem("userPhone") =='13246715680'?true:false,
        communityId:'',
        roomId:'',
        isOffice:'',
        roomNum:'',
        communityName:'',
        renew:false,//续签弹框
        renewEndDate:'',//续签截止时间
        contractSignId:'',//续签合同Id
        month:'',//续租月份
        endDate:''//计算续租结束日期
      }
    },
    mounted(){
      let tab = sessionStorage.getItem("contractIndexTab");

      // if(tab){
      //   this.activeName = tab;
      // }
      this.communityId = this.$route.query.communityId;
      this.roomId = this.$route.query.roomId;
      this.isOffice = this.$route.query.isOffice;
      this.getRoomContract({pageNum:1,communityId:this.communityId,buildingId:this.roomId,isOffice:this.isOffice});
      // this.getOfficeContract({pageNum:1,communityId:this.communityId,roomId:this.roomId});
    },
    methods: {
      /**
       * 续签弹框
       * **/
      renewModelShow(contractSignId,endDate){
        this.renew = true
        this.contractSignId = contractSignId
        this.endDate = endDate
      },
      /**
       * 续签截止时间操作
       * **/
      countdatas(value){

        let nes = new Date(this.endDate);
        nes.setMonth(nes.getMonth() + parseInt(value));
        this.renewEndDate = nes;
      },
      /**
       * 续签操作
       * **/
      renewClick(){
        let url = '',
          vm = this
        if(this.isOffice == '0'){
          url = CxkjCommunityContractSignRoomAdd200253
        }else {
          url = CxkjCommunityContractSignOfficeAdd200254
        }
        if(!vm.renewEndDate){
          vm.warningMessage = '请选择续签截止日期!';
          vm.warningModal = true;
          return
        }
        vm.$http.post(url,qs.stringify({
          endDate:vm.renewEndDate,
          contractSignId:vm.contractSignId
        })).then(res => {
          if(res.data.code == 10000){
            vm.collectionShow = false;
            vm.successMessage = "续租成功!";
            vm.successModal = true;
            vm.renewEndDate = ''
            vm.renew = false
            vm.getRoomContract({pageNum:1,communityId:vm.communityId,buildingId:vm.roomId,isOffice:vm.isOffice});
            setTimeout(function(){
              vm.successModal = false;
            },1000);
          }else {
            vm.collectionShow = false;
            vm.warningMessage = res.data.content;
            vm.warningModal = true;

          }
        }).catch((error)=>{
          vm.warningMessage = '续租失败!';
          vm.warningModal = true;
          vm.renew = false
        })

      },
      changeTab(tab){
        sessionStorage.setItem("contractIndexTab",tab);
      },
      /**
       * 关闭错误提示
       **/
      closeWarningModal(){
        this.warningModal = false;
      },
      /**
       * 收款弹框显示
       **/
      collectionModelShow(billId,paymentType,contractSignId){
        let that = this;
        this.paymentType = paymentType;
        this.collectionShow = true;
        this.billId = billId;
        this.signId = contractSignId;

        //初始化收款时间
        this.collection1.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection2.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection3.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection6.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.messageError = "";
      },
      /**
       * 收款弹框隐藏
       **/
      closeWhileModal(){
        this.collectionShow = false;
        for(let key in this.collection1){
          this.collection1[key] = "";
        }
        for(let key in this.collection2){
          this.collection1[key] = "";
        }
        for(let key in this.collection3){
          this.collection1[key] = "";
        }
        for(let key in this.collection4){
          this.collection1[key] = "";
        }
        for(let key in this.collection6){
          this.collection1[key] = "";
        }
      },

      /**
       * 全部收款
       * @param value
       */
      allIncome(){
        let that = this;
        let _this = this;
        let params = {};
        switch(this.type){
          case 1:
            if(_this.collection1.payNumbers == "" || _this.collection1.gatheringMoney=="" ){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney1){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection1;
            params.payDate = new Date(_this.collection1.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;
          case 2:
            if(_this.collection2.payNumbers == "" || _this.collection2.gatheringMoney=="" ){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney2){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection2;
            params.payDate = new Date(_this.collection2.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;
          case 3:
            if(_this.collection3.payNumbers == "" ||  _this.collection3.voucherNumbers == "" ||  _this.collection3.gatheringMoney==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney3){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection3;
            params.payDate = new Date(_this.collection3.payDate).Format("yyyy-MM-dd hh:mm:ss");
            break;
          case 4:
            if(_this.collection4.remark == "" || _this.collection4.gatheringMoney=="" || _this.collection4.payWay==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney4){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection4;
            break;
          case 6:
            if(_this.collection6.referNum == "" || _this.collection6.voucherNumbers == "" ||  _this.collection6.gatheringMoney==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney6){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection6;
            params.payDate = new Date(_this.collection6.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;

        }

        params.billId = _this.billId;
        params.signId = _this.signId;
        params.type = _this.type;
        this.$http.post(CxkjBillGathering500164,
          qs.stringify(params)
        ).then(function(res){
          console.log(res);
          if(res.data.code == 10000 && res.status == 200){
            that.collectionShow = false;
            that.successMessage = "收款成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000);
            this.getRoomContract({pageNum:1,communityId:this.communityId,buildingId:this.roomId,isOffice:this.isOffice});
          }else{
            that.collectionShow = false;
            that.warningMessage = res.data.content;
            that.warningModal = true;
          }
          //清空
          that.closeWhileModal();
        })
      },

      /**
       * 金额正则
       * @param value
       */
      moneyChange(number,value){
        if(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/.test(value)){
          switch (number) {
            case '1':
              this.isMoney1 = true;
              break;
            case '2':
              this.isMoney2 = true;
              break;
            case '3':
              this.isMoney3 = true;
              break;
            case '4':
              this.isMoney4 = true;
              break;
            case '6':
              this.isMoney6 = true;
              break;
          }
        }else{
          switch (number) {
            case '1':
              this.isMoney1 = false;
              break;
            case '2':
              this.isMoney2 = false;
              break;
            case '3':
              this.isMoney3 = false;
              break;
            case '4':
              this.isMoney4 = false;
              break;
            case '6':
              this.isMoney6 = false;
              break;
          }
        }
        this.messageError = "";
      },
      getRoomContract(data){
        var that = this;
        this.$http.get(CxkjCommunityHistoryContractSignTable200252,{params:data})
          .then(function(res){
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.roomContractList = pageBean.contractSignPage.page;
              that.communityName =  that.roomContractList[0].communityName;
              that.roomTotalNum = pageBean.contractSignPage.totalPageNum;
              that.roomNum =  pageBean.roomNum;
            }
            else{
              that.roomContractList = [];
              that.roomTotalNum = 0;
            }
          })

      },
      roomSearch(page){
        var data = {
          pageNum:page || 1
        }
        if(this.roomCommunity != -1){
          data.communityId = this.roomCommunity;
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
        data.communityId=this.communityId
        data.buildingId=this.roomId
        data.isOffice=this.isOffice
        this.getRoomContract(data);
      },

      // getOfficeContract(data){
      //   var that = this;
      //   this.$http.get(officeContract,{params:data})
      //     .then(function(res){
      //       if(res.status == 200 && res.data.code == 10000){
      //         var pageBean = res.data.pageBean;
      //         that.officeContractList = pageBean.page;
      //         that.officeTotalNum = pageBean.totalNum;
      //       }
      //       else{
      //         that.officeContractList = [];
      //         that.officeTotalNum = 0;
      //       }
      //     })
      // },

      // officeSearch(page){
      //   var data = {
      //     pageNum:page || 1
      //   }
      //   if(this.officeCommunity != -1){
      //     data.communityId = this.officeCommunity;
      //   }
      //   if(this.officeSearchKey){
      //     data.keyWord = this.officeSearchKey;
      //   }
      //   if(this.officeStartDate){
      //     data.beginDate = new Date(this.officeStartDate).Format("yyyy-MM-dd");
      //   }
      //   if(this.officeEndDate){
      //     data.endDate = new Date(this.officeEndDate).Format("yyyy-MM-dd");
      //   }
      //   this.getOfficeContract(data);
      // },


      setWhileMember(){
        this.collectionShow = false;
      },
      delRoomSign(id){
        this.$http.post(delRoomSign200223,
          qs.stringify({
            contractSignId:id
          })
        ).then((res)=>{
          if(res.status == 200 && res.data.code == 10000){
            this.successMessage = "作废合同成功!";
            this.successModal = true;
            setTimeout(()=>{
              this.successModal = false;
              this.getRoomContract({pageNum:1,communityId:this.communityId,buildingId:this.roomId,isOffice:this.isOffice});

            },1000);
          }else{
            this.warningMessage = res.data.content;
            this.warningModal = true;
          }
        }).catch((error)=>{
          this.warningMessage = '作废合同失败!';
          this.warningModal = true;
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
    created(){
    }
  }
</script>



<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';

  #contract-index-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
    }
    .form-item .add{
      display: inline-block;
      width: 140px;
      height: 34px;
      border-radius: 5px;
      border: 1px solid #038be2;
      text-align: center;line-height: 34px;
      font-size: 12px;
      font-weight: bold;
      span{
        font-size:16px;
      }
    }
    table{
      tr{
        td,th{
          text-align: center;
        }
      }
    }
    .ivu-tabs-bar{
      background-color: rgb(240,240,240);

    }
    .ivu-tabs-tabpane{
      box-shadow:none;
    }
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
    .monthInput.el-input{
      display: inline-block;
      width: 100px!important;
       .el-input__inner{
        width: 100px!important;
      }
    }
  }


</style>
