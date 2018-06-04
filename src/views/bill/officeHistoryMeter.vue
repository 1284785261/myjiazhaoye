
<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <div id="office-history-meter-wrap">
          <Tabs type="card">
            <Tab-pane label="联合办公历史账单">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>办公室：</b>
                  <span>{{officeNum}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">&#45;&#45;</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >账单日期</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人手机号</th>
                  <th>租金/月（元）</th>
                  <th>押金（元）</th>
                  <th>服务费/月（元）</th>
                  <th>合计（元）</th>
                  <th>账单日期</th>
                  <th>状态</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(room,index) in roomContractList">
                  <td>{{room.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td v-if="!room.isEditor">{{room.cyclePayMoney}}</td>
                  <td v-if="!room.isEditor">{{room.isFirstPay?room.deposit:''}}</td>
                  <td v-if="!room.isEditor">{{room.serviceCost}}</td>
                  <td v-if="!room.isEditor">{{room.realPayMoney}}</td>
                  <td v-if="!room.isEditor">{{room.billBeginDate |  timefilter("yyyy-MM-dd")}}- {{room.billEndDate |  timefilter("yyyy-MM-dd")}}</td>
                  <td v-if="room.isEditor"> <el-input placeholder="请输入租金"  v-model="editRental.rentMoney" clearable></el-input></td>
                  <td v-if="room.isEditor"> <el-input placeholder="请输入押金"  v-if="room.isFirstPay" v-model="editRental.depositMoney" disabled="true" clearable></el-input></td>
                  <td v-if="room.isEditor"><el-input placeholder="请输入服务费" v-model="editRental.serviceMoney" clearable></el-input></td>
                  <!--+parseFloat(editRental.depositMoney)-->
                  <td v-if="room.isEditor">{{room.isFirstPay?parseFloat(editRental.rentMoney)+parseFloat(editRental.serviceMoney):parseFloat(editRental.rentMoney) +parseFloat(editRental.serviceMoney)}}</td>
                  <td v-if="room.isEditor">
                    <el-date-picker v-model="editRental.startDate"  type="date" placeholder="选择账单开始日期"></el-date-picker> - <el-date-picker v-model="editRental.endDate" type="date" placeholder="选择账单结束日期"></el-date-picker>
                  </td>
                  <td>
                    <span v-if="room.billState == 1 && !room.isSend">未发送</span>
                    <span v-if="room.billState == 1 && room.isSend">待支付</span>
                    <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="room.billState == 3" style="color: red;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                  <td v-if="room.isEditor"><el-input placeholder="请输入备注"  v-model="editRental.content" clearable></el-input></td>
                  <td v-if="!room.isEditor">{{room.remark}}</td>
                  <td>
                    <a v-if="room.billState == 1  && !room.isSend && !room.isEditor " @click="updateBill(index)"> 编辑</a>
                    <a v-if="room.billState == 1 && room.isEditor" @click="saveUpdateBill(index)">保存</a>
                    <a v-if="room.billState == 1" @click="collectionModelShow(room.billId)"> 收款</a>
                    <a v-if="room.billState == 1 && !room.isSend" @click="sendBill(room.billId)"> 发送账单</a>
                    <router-link :to="{name:'billDetail',query:{billId:room.billId,type:1}}"> 账单详情</router-link>
                    <a v-if="room.billState == 1" @click="delectBill(room.billId)"> 删除</a>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </Tab-pane>
          </Tabs>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
    <!--收款相关-->
    <div class="black-member-modal" v-if="collectionShow" @click="closeWhileModal()" style="z-index: 999"></div>
    <div class="blackModelCenter" v-if="collectionShow" style="height: 420px;z-index: 9999">
      <p>收款登记</p>
      <div style="text-align: center;border-bottom: solid 1px #ccc;margin-bottom: 10px;">
        <template>
          <el-radio-group v-model="type">
            <el-radio :label="2">微信付款</el-radio>
            <el-radio :label="1">支付宝付款</el-radio>
            <el-radio :label="3">银行转账</el-radio>
            <el-radio :label="4">其他</el-radio>
            <!--<el-radio :label="4"></el-radio>-->
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
    <!--收款相关-->
  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {allCommunity,OfficeBillHistoryList500105,CxkjBillGathering500168,CxkjBillDelete500170,CxkjBillEdit500167,CxkjBillSend500169 } from '../api.js';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
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
      return {
        activeTabName:"billManagement",
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
        officeId:null,
        historyOfficeHouseNum:"",
        historyOfficeWorkNum:"",
        communityName:"",
        officeNum:'',
        successModal: false,
        warningModal: false,
        successMessage: '操作成功',
        warningMessage: '',
        //编辑租金账单相关参数
        editRental:{
          rentalId:'',//租金账单ID
          rentMoney:'',//租金
          depositMoney:'',//押金
          serviceMoney:'',//服务费
          combined:'',//合计
          startDate:'',//开始日期
          endDate:'',//结束日期
          content:''//备注
        },
        //收款相关
        type:2,
        paymentType:'',//收款类型
        collectionShow:'',//弹框显示
        billId:'',//账单ID
        //时间初始化
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
        messageError:'',
      }
    },
    mounted(){
      this.historyOfficeHouseNum = sessionStorage.getItem('historyOfficeHouseNum');
      this.historyOfficeWorkNum = sessionStorage.getItem('historyOfficeWorkNum');
      this.communityName = sessionStorage.getItem('officeHistoryCommunityName');
      this.officeId = this.$route.query.officeId;
      this.getCommunityData();
      this.getRoomContract({officeId:this.officeId,pageNum:1});
    },
    methods: {
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomContractSelects = that.RoomContractSelects.concat(res.data.entity);
            }
          })
      },
      getRoomContract(data){
        var that = this;
        this.$http.get(OfficeBillHistoryList500105,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.communityName = res.data.result.communityName;
              that.officeNum = res.data.result.officeNum;
              that.roomContractList = pageBean.officeList;
              for(let i = 0;i<pageBean.officeList.length;i++){
                that.$set(that.roomContractList[i],'isEditor',false)
              }
              that.roomTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.roomContractList = [];
              that.roomTotalNum = 0;
            }
          })
      },
      /**
       *
       * **/
      /**
       * 编辑租金账单，显示输入框
       **/
      updateBill(index){
        let vm = this
        // vm.roomContractList[index].isEditor = true
        vm.$set(vm.roomContractList[index],'isEditor',true)
        vm.editRental={
          rentalId:vm.roomContractList[index].billId,//租金账单I
          rentMoney:vm.roomContractList[index].cyclePayMoney?vm.roomContractList[index].cyclePayMoney:'',//租
          depositMoney:'',//押
          serviceMoney:vm.roomContractList[index].serviceCost?vm.roomContractList[index].serviceCost:'',//服务
          combined:'',//合
          startDate:vm.roomContractList[index].billBeginDate?vm.roomContractList[index].billBeginDate:'',//开始日
          endDate:vm.roomContractList[index].billEndDate?vm.roomContractList[index].billEndDate:'',//结束日
          content:vm.roomContractList[index].remark?vm.roomContractList[index].remark:'',//结束日
        }
      },
      /**
       * 保存租金账单
       **/
      saveUpdateBill(index){
        let vm = this
        vm.editRental.combined = parseFloat(vm.editRental.rentMoney) +parseFloat(vm.editRental.serviceMoney)
        vm.$http.post(CxkjBillEdit500167,qs.stringify({
          billId:vm.editRental.rentalId,
          cyclePayMoney:vm.editRental.rentMoney,
          // deposit:vm.editRental.depositMoney,
          serviceCost:vm.editRental.serviceMoney,
          realPayMoney:vm.editRental.combined,
          billBeginDate:new Date(vm.editRental.startDate).Format("yyyy-MM-dd hh:mm:ss"),
          billEndDate:new Date(vm.editRental.endDate).Format("yyyy-MM-dd hh:mm:ss"),
          remark:vm.editRental.content
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='修改租金账单成功'
            vm.successModal = true
            vm.getRoomContract({officeId:vm.officeId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
            vm.$set(vm.roomContractList[index],'isEditor',false)
          }
        }).catch(function(err){
          vm.warningMessage='修改租金账单失败'
          vm.warningModal = true
          vm.$set(vm.roomContractList[index],'isEditor',false)
          console.log(err);
        })
      },
      /**
       * 删除租金账单
       **/
      delectBill(billId){
        let vm = this
        vm.$http.post(CxkjBillDelete500170,qs.stringify({
          billId:billId
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='删除租金账单成功'
            vm.successModal = true
            vm.getRoomContract({officeId:vm.officeId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='删除租金账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      /**
       * 发送租金账单
       **/
      sendBill(billId){
        let vm = this
        vm.$http.post(CxkjBillSend500169,qs.stringify({
          billId:billId
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='发送租金账单成功'
            vm.successModal = true
            vm.getRoomContract({officeId:vm.officeId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='发送租金账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      /**
       * 租金账单收款弹框
       * **/
      collectionModelShow(waterElectricityBill){
        let that = this;
        // this.paymentType = 'waterElectricity';
        this.collectionShow = true;
        this.billId = waterElectricityBill;
        // this.billType = billType
        // this.signId = contractSignId;

        //初始化收款时间
        this.collection1.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection2.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection3.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection6.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.messageError = "";
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
       * 关闭失败弹框
       **/
      closeWarningModal() {
        this.warningModal = false;
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
        params.type = _this.type;
        this.$http.post(CxkjBillGathering500168,
          qs.stringify(params)
        ).then(function(res){
          console.log(res);
          if(res.data.code == 10000 && res.status == 200){
            that.collectionShow = false;
            that.successMessage = "收款成功!";
            that.successModal = true;
            that.getRoomContract({officeId:that.officeId,pageNum:that.page});
            setTimeout(function(){
              that.successModal = false;
            },1000);

            that.collectionShow=''
            that.billId=''
            //时间初始化
            that.collection1={
              payNumbers:"",
              gatheringMoney:"",
              payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that.collection2={
              payNumbers:"",
              gatheringMoney:"",
              payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that. collection3={
              payNumbers:"",
              voucherNumbers:"",
              gatheringMoney:"",
              payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that.collection4={
              payWay:"",
              gatheringMoney:"",
              remark:""
            }
            that.collection6={
              payNumbers:"",
              voucherNumbers:"",
              referNum:"",
              gatheringMoney:"",
              payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            },
              that.messageError=''
            that.type=2//默认收款类型
          }else{
            that.collectionShow = false;
            that.warningMessage = res.data.content;
            that.warningModal = true;
          }
          //清空
          that.closeWhileModal();
        })
      },
      roomSearch(page){
        var data = {
          pageNum:page || 1,
          officeId:this.officeId
        };
        this.getRoomContract(data);
      },
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

  #office-history-meter-wrap{
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
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
  }


</style>
