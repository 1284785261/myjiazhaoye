<template>
    <div class="shortOrderListClass">
        <div>
            <div class="form-item">
                <b>社区：</b>
                <Select v-model="communityId" style="width:180px" @on-change="selectCommunity()">
                    <Option v-for="community in  stationSelectList" :value="community.communityId"
                            :key="community.communityId">{{ community.communityName }}
                    </Option>
                </Select>
            </div>
            <div class="form-item">
              入住率：<span v-if="shortOrderInfo.occupancyRate">{{shortOrderInfo.occupancyRate}}</span><span v-else>0</span>
            </div>
            <div class="form-item">
                总房数/已订房：{{shortOrderInfo.totalCount}}/{{shortOrderInfo.bookedTotalCount}}
            </div>
        </div>
        <div class="marginT30">
            <div class="rentTypeBox" v-for="(item,index) in roomTypeList">
                <div class="rentTypeTitle">{{item.name}}</div>
                <div class="rentTypeMain" @click="createOrder(item.id)">
                    <ul>
                        <li>已订/入住：{{item.bookedTotalCount}}/{{item.isInTotalCount}}</li>
                        <li>剩余：{{item.remainingCount}}</li>
                    </ul>
                    <i></i>
                    <p>创建订单</p>
                </div>
            </div>
        </div>
        <div class="">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部 <i v-if="!selectShow" class="el-icon-caret-bottom" ></i><i class="el-icon-caret-top" v-if="selectShow"></i></el-menu-item>
                <el-submenu index="2">
                    <template slot="title">今日预抵</template>
                    <el-menu-item index="2-1">全部</el-menu-item>
                    <el-menu-item index="2-2">待排房</el-menu-item>
                    <el-menu-item index="2-3">已排房</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">明日预抵</template>
                    <el-menu-item index="3-1">全部</el-menu-item>
                    <el-menu-item index="3-2">待排房</el-menu-item>
                    <el-menu-item index="3-3">已排房</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">待入住</template>
                    <el-menu-item index="4-1">全部</el-menu-item>
                    <el-menu-item index="4-2">待排房</el-menu-item>
                    <el-menu-item index="4-3">已排房</el-menu-item>
                </el-submenu>
                <el-menu-item index="5">已入住</el-menu-item>
                <el-menu-item index="6">已取消</el-menu-item>
                <el-menu-item index="7">应到未到</el-menu-item>
                <el-menu-item index="8">全部订单</el-menu-item>
            </el-menu>
        </div>
        <div v-if="selectShow" class="selectShowClass">
            <ul class="selectStateUl">
                <li>
                   状态：
                </li>
                <li>
                    <!--<el-checkbox-group  mode="horizontal" @select="handleSelect">-->
                        <!--<el-checkbox label="全部" value="0"></el-checkbox>-->
                        <!--<el-checkbox label="今日预抵" value="1"></el-checkbox>-->
                        <!--<el-checkbox label="明日预抵" value="2"></el-checkbox>-->
                        <!--<el-checkbox label="待入住" value="3"></el-checkbox>-->
                        <!--<el-checkbox label="已入住" value="4"></el-checkbox>-->
                        <!--<el-checkbox label="已取消" value="5"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                    <el-radio-group v-model="selectState" @change="selsctRadio">
                        <el-radio :label="-1">全部</el-radio>
                        <el-radio :label="1">今日预抵</el-radio>
                        <el-radio :label="2">明日预抵</el-radio>
                        <el-radio :label="3">待入住</el-radio>
                        <el-radio :label="4">已入住</el-radio>
                        <el-radio :label="5">已取消</el-radio>
                        <el-radio :label="6">应到未到</el-radio>
                    </el-radio-group>
                </li>
                <!--<li>-->
                    <!--<el-checkbox-group v-model="selectState.eta">-->
                        <!--<el-checkbox label="今日预抵" value="1"></el-checkbox>-->
                        <!--<el-checkbox label="明日预抵" value="2"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<el-checkbox-group v-model="selectState.state">-->
                        <!--<el-checkbox label="待入住"></el-checkbox>-->
                        <!--<el-checkbox label="已入住"></el-checkbox>-->
                        <!--<el-checkbox label="已取消"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</li>-->
                <li>
                    <el-button @click="search()">查询</el-button>
                </li>
            </ul>
            <ul class="dateUl">
                <li>
                    <span>预订起止时间：</span>
                    <Date-picker type="date" :options="bookingStartTime" placeholder="选择日期" v-model="bookBeginDateKey"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="bookingEndTime" placeholder="选择日期" v-model="bookEndDateKey"></Date-picker>
                </li>
                <li>
                    <span>到店起止时间：</span>
                    <Date-picker type="date" :options="toShowStartTime" placeholder="选择日期" v-model="arriveBeginDateKey"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="toShowEndTime" placeholder="选择日期" v-model="arriveEndDateKey"></Date-picker>
                </li>
                <li>
                    <span>离店起止时间：</span>
                    <Date-picker type="date" :options="leaveStartTime" placeholder="选择日期" v-model="leaveBeginDatekey"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="leaveEndTime" placeholder="选择日期" v-model="leaveEndDateKey"></Date-picker>
                </li>
            </ul>
            <ul class="selectUl">
                <li>
                    <span>房型：</span>
                    <input v-model="selectConditions.roomType">
                </li>
                <li>
                    <span>房号：</span>
                    <input v-model="selectConditions.roomNumber">
                </li>
                <li>
                    <span>入住人手机号：</span>
                    <input v-model="selectConditions.stayPhone">
                </li>
            </ul>
            <ul class="selectUl">
                <!--<li>-->
                    <!--<span>订单号/渠道单号：</span>-->
                    <!--<input v-model="selectConditions.orderNumber">-->
                <!--</li>-->
                <li>
                    <span>入住单号：</span>
                    <input v-model="selectConditions.singleNumber">
                </li>
                <li>
                    <span>客户昵称：</span>
                    <input v-model="selectConditions.nickname">
                </li>
            </ul>
        </div>
        <div class="tableDiv">
            <table class="table ivu-table" >
                <tr>
                    <!--<th>入住状态</th>-->
                    <th>订单号</th>
                    <th>联系人</th>
                    <th>联系电话</th>
                    <!--<th>房型</th>-->
                    <!--<th>房号</th>-->
                    <!--<th>预订人</th>-->
                    <th>到店日期</th>
                    <th>离店日期</th>
                    <th>预付款</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,index) in shortOrderList">
                    <!--<td>-->
                      <!--<span v-if="item.isIn==0">未入住</span>-->
                      <!--<span v-if="item.isIn==1">已入住</span>-->
                    <!--</td>-->
                    <td>{{item.orderNum}}</td>
                    <td>{{item.userName}}</td>
                    <!--<td>{{item.contactPhone}}</td>-->
                    <!--<td>{{item.name}}</td>-->
                    <!--<td>{{item.roomNum}}</td>-->
                    <td>{{item.userName}}</td>
                    <td>{{item.arriveTime | timefilter('yyyy-MM-dd')}}</td>
                    <td>{{item.leaveTime | timefilter('yyyy-MM-dd')}}</td>
                    <td>{{item.payMoney}}</td>
                    <td>
                        <a v-if="item.isRoom == 0" @click="getPaifangData(item.roomCount,item.orderId)">排房</a>
                        <a v-if="item.isRoom == 1 && item.isIn==0" @click="checkIn(item.orderId,item)">入住</a>
                        <a @click="orderDetail(item.orderId)">查看详情</a>
                    </td>
                </tr>
            </table>
            <div class="block" style="margin-top: 40px;">
                <el-pagination @current-change="search" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
                </el-pagination>
            </div>
        </div>

      <!--入住-->
      <div class="upload-modal" v-if="isHide" ref="outCheckInOrder" @click="notcheckIn()"></div>
      <div class="checkInOrder" ref="checkInOrder" v-if="isHide">
        <p>房号：101<span style="margin-left: 40px;">标准大单间</span></p>
        <p>房间信息：<span class="span1">格局：daodjaod </span><span class="span1">面积：35.00 m²</span></p>
        <p>定房电话：<input class="ivu-input" style="width:130px;"> 定房姓名：王大妈</p>
        <p>门市价：</p>
        <p>入住时间：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker></p>
        <p>预计退房日期：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker>
          入住天数：
          <Select v-model="stationCommunity" style="width:70px">
            <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
          </Select>
        </p>
        <p>备注：<input class="ivu-input" style="width:300px;">
          市场细分：
          <Select v-model="stationCommunity" style="width:180px">
            <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
          </Select>
        </p>
        <p>入住人：
        <ul>
          <li>
            姓名：<input class="ivu-input " style="width:80px;" v-model="name">
            <el-radio class="radio" v-model="radio" label="1">男</el-radio>
            <el-radio class="radio" v-model="radio" label="2">女</el-radio>
            <Select v-model="stationCommunity" style="width:120px;">
              <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
            </Select>
            <input class="ivu-input" style="width:250px;">
          </li>
        </ul>
        </p>
        <a @click="checkIn()">提交</a>
        <a @click="notcheckIn()">取消</a>
        <span style="margin-left: 40px;color:red;">点击提交发送密码短信至登录人的手机中</span>
      </div>
      <!--入住-->

      <!--排房-->
      <div class="upload-modal" ref="outRoomChangeHide"  v-if="roomChangeHide" @click="closeRoomChange()"></div>
      <div class="roomchange" ref="roomChange" v-if="roomChangeHide">
        <ul class="state2 transition-box">
          <li>
            <div v-for="(item,index) in paiFangList" :class="{'active-color':hasRoom(index)}" @click="selectRoom(index)">
              <p></p>
              <span class="short">短租</span>
              <p style="font-size: 16px;">{{item.roomNum}}</p>
              <!-- <p v-else></p> -->
              <span></span>
              <!-- <span v-else></span> -->
              <span>{{item.name}}</span>
              <!-- <span v-else></span> -->
              <p>￥{{item.subTotal}}
                <i v-if="item.roomStatus == 0">维护中</i>
                <i v-if="item.roomStatus == 1">待出租</i>
                <i v-if="item.roomStatus == 2">已出租</i>
                <i v-if="item.roomStatus == 3">脏房</i>
              </p>
            </div>

          </li>
        </ul>
        <a @click="submit()">提交</a>
        <a @click="closeRoomChange()" style="left: 600px;">取消</a>
      </div>
      <!--排房-->

      <!--创建订单-->
      <div class="create-order-modal" v-if="createOrderModal" ref="outCreateOrderModal" @click="closeCreateOrderModal()"></div>
      <div class="create-order-content createOrderModal" v-if="createOrderModal" ref="createOrderModal">
        <div class="create-order-content-title">
          <span>创建订单</span>
        </div>
        <div class="modal-content-meddle">
          <div class="form-item">
            <b>入住时间: </b>
            <Date-picker type="date" :options="bookBeginDateOption" placeholder="选择日期" v-model="bookBeginDate"></Date-picker>
          </div>

          <div class="form-item">
            <b>离店时间: </b>
            <Date-picker type="date" :options="bookEndDateOption" placeholder="选择日期" v-model="bookEndDate"></Date-picker>
          </div>
          <br/>
          <div class="form-item">
            <b>市场细分: </b>
            <Select v-model="marketType" style="width:200px">
              <Option v-for="community in  marketTypeList" :value="community.id" :key="community.id">{{ community.name }}</Option>
            </Select>
          </div>
          <div class="form-item">
            <b>订单来源: </b>
            <Select v-model="sourceType" style="width:200px">
              <Option v-for="community in  sourceTypeList" :value="community.id" :key="community.id">{{ community.name }}</Option>
            </Select>
          </div>
          <div class="form-item">
            <b>联系人: </b>
            <Input style="width: 175px;" v-model="bookName"></Input>
            <Button type="primary" @click="settingInner">设为入住人</Button>
          </div>
          <div class="form-item">
            <b>联系电话: </b>
            <Input style="width: 175px;" v-model="bookPhone"></Input>
          </div>
          <div class="form-item">
            <b>房间数量: </b>
            <Input style="width: 175px;" v-model="roomCount"></Input>
          </div>
          <div class="form-item">
            <b>备注: </b>
            <Input style="width: 175px;" v-model="remark"></Input>
          </div>
        </div>
        <div class="form-btn-wrap">
          <Button type="primary" style="width: 120px;height: 36px;margin-right: 150px;" @click="setBliakMember" >提交</Button>
          <Button type="primary" style="width: 120px;height: 36px;" @click="closeCreateOrderModal" >取消</Button>
        </div>
        <div class="modal-close-btn" @click="closeCreateOrderModal()">
          <Icon type="ios-close-empty"></Icon>
        </div>
      </div>
      <!--创建订单-->
      <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
      <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
    </div>

</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import {CxkjGetOrderList300181,CxkjCreateOrder300193,allCommunity,CxkjGetRoomTypeBookDataList300194,CxkjGetOccupancyRate300120,CxkjGetRoomListOfForRoom300195,CxkjAssignRoom300196} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal,
    },
    data() {
      let _this = this;
      return {
        activeTabName: "shortRent",//右侧导航栏选中状态
        successModal: false,//成功弹框显示控制
        warningModal: false,//失败弹框显示控制
        successMessage: '',//成功弹框提示消息
        warningMessage: '',//失败弹框提示消息
        selectShow:false,//条件查询显示或隐藏
        stationSelectList:[],//社区列表
        communityId:'',//被选中的社区
//        selectState:{//状态查询控制
//          all:true,
//          eta:[],
//          state:[]
//        },
        selectState:'0',
        selectConditions:{
          roomType:'',//房型
          roomNumber:'',//房号
          stayPhone:'',//入住人手机号
          orderNumber:'',//订单号
          singleNumber:'',//入住单号
          nickname:''//客户昵称
        },
        pageNum:1,//当前页数
        totalNum:0,//总条数

        //搜索条件
        bookBeginDateKey:"",
        bookEndDateKey:"",
        arriveBeginDateKey:"",
        arriveEndDateKey:"",
        leaveBeginDatekey:"",
        leaveEndDateKey:"",
        bookingStartTime: {//预订开始时间验证
          disabledDate(date){
            if(_this.bookEndDateKey){
              return date &&  _this.bookEndDateKey < date.valueOf();
            }
          }
        },
        bookingEndTime: {//预订结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.bookBeginDateKey;
          }
        },
        toShowStartTime: {//到店开始时间验证
          disabledDate(date){
            if(_this.arriveEndDateKey){
              return date &&  _this.arriveEndDateKey < date.valueOf();
            }
          }
        },
        toShowEndTime: {//到店结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.arriveBeginDateKey;
          }
        },
        leaveStartTime: {//离店开始时间验证
          disabledDate(date){
            if(_this.leaveEndDateKey){
              return date &&  _this.leaveEndDateKey < date.valueOf();
            }
          }
        },
        leaveEndTime: {//离店结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.leaveBeginDatekey;
          }
        },
        roomNumKey:"",//房号
        nameKey:"",//户型名称
        userAlias:"",//昵称
        customOrderState:-1,
        isRoom:-1,

        createOrderModel:true,//创建订单弹框显示隐藏控制
        isHide:false,
        outCheckInOrder:false,//入住模态框
        roomChangeHide:false,//排房弹框
        createOrderModal:false,//创建订单弹窗控制

        shortOrderList:[],
        roomTypeList:[],//户型列表
        shortOrderInfo:{},//入住率等信息
        paiFangList:[],//可供排房列表
        activeIndex:0,
        activeOrderId:null,
        name:"",//入住人名称
        activeRoomCount:0,//排房个数
        roomList:[],//选中的房间
        checkInObj:{},//入住

        bookBeginDate:"",//创建订单入住时间
        bookEndDate:"",//创建订单离店时间
        marketType:0,//市场细分
        marketTypeList:[{name:"门市散客",id:0},{name:"内部员工",id:1},{name:"协议单位",id:2}],//市场细分下拉选
        sourceType:0,//订单来源
        sourceTypeList:[{name:"门店上门",id:0},{name:"门店电话",id:1},{name:"APP平台",id:2},{name:"OTA",id:3}],//订单来源下拉选
        roomNum:"",//房间号
        remark:"",//备注
        bookPhone:"",//联系电话
        bookName:"",//联系人
        roomCount:1,//房间数量
        activeRoomTypeId:null,//要添加房型的ID
        bookBeginDateOption: {//入住时间验证
          disabledDate(date){
            if(_this.bookEndDate){
              return date &&  _this.bookEndDate < date.valueOf();
            }
          }
        },
        bookEndDateOption: {//离店时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.bookBeginDate;
          }
        },

      }
    },
    mounted() {
//      sessionStorage.setItem("communityId",'');
      this.getCommunityData();
    },
    methods: {
      closeWarningModal(){
        this.warningModal = false;
      },
      //获取社区id
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.stationSelectList = res.data.entity;
              if(sessionStorage.getItem("communityId")){
                that.communityId = parseInt(sessionStorage.getItem("communityId"));
              }else{
                that.communityId = parseInt(that.stationSelectList[0].communityId);
              }
              that.getShortOrderInfo({communityId:that.communityId});
              that.getShortOrderList({pageNum:1,communityId:that.communityId});
              that.getRoomTypeBookDataList({pageNum:1,communityId:that.communityId});
            }
          })
      },
      //获取
      getShortOrderList(params){
        let vm = this;
        this.$http.get(CxkjGetOrderList300181,{params:params}).then(res=>{
          if(res.data.code == 10000){
            vm.shortOrderList = res.data.pageBean.page;
            vm.totalNum = res.data.pageBean.totalNum;
          }else{
            vm.shortOrderList = [];
            vm.totalNum = 0;
          }
        })
      },
      //获取房间入住率等信息
      getShortOrderInfo(params){
        let vm = this;
        this.$http.get(CxkjGetOccupancyRate300120,{params:params}).then(res=>{
          if(res.data.code == 10000){
            vm.shortOrderInfo = res.data.entity;
          }
        })
      },
      //户型列表查询
      getRoomTypeBookDataList(params){
        let vm = this;
        this.$http.get(CxkjGetRoomTypeBookDataList300194,{params:params}).then(res=>{
          if(res.data.code == 10000){
            vm.roomTypeList = res.data.pageBean.page;
          }else{
            vm.roomTypeList = [];
          }
        })
      },
      //社区选择
      selectCommunity(){
        let vm = this;
        if(vm.communityId){
          vm.getShortOrderList({pageNum:1,communityId:vm.communityId})
          vm.getRoomTypeBookDataList({pageNum:1,communityId:vm.communityId});
        }
      },
      /**
       * 设置为入住人
       **/
      settingInner(){
        sessionStorage.setItem("bookName",this.bookName)
      },
      /**
       * 选择房间
       **/
      selectRoom(index){
        if(this.activeRoomCount>0){
          if(this.roomList.length<this.activeRoomCount){
            if(this.roomList.indexOf(index)!=-1){
              this.roomList.splice(this.roomList.indexOf(index),1);
            }else{
              this.roomList.push(index);
            }
          }else{
            if(this.roomList.indexOf(index)!=-1){
              this.roomList.splice(this.roomList.indexOf(index),1);
            }else{
              this.roomList.splice(0,1);
              this.roomList.push(index);
            }
          }
        }
      },
      hasRoom(index){
        for(let i=0;i<this.roomList.length;i++){
            if(this.roomList[i] == index){
              return true;
              break;
            }
        }
        return false;
      },
      /**
       * 提交排房
       **/
      submit(){
        let ids = [];
        for(let i =0;i<this.roomList.length;i++){
          ids.push(this.paiFangList[this.roomList[i]].id)
        }

        this.$http.post(CxkjAssignRoom300196,qs.stringify({id:this.activeOrderId,roomIds:ids})).then(res=>{
          if(res.data.code == 10000){
            this.closeRoomChange();
          }
        })


      },

      /**
       * 分页插件
       **/
      handleCurrentChange3(){

      },
      /**
       * 导航菜单事件
       **/
      handleSelect(key, keyPath){

        if(key == 1){
          this.selectShow = !this.selectShow
        }else{
          this.selectShow = false;
          //清空搜索条件
          this.selectConditions = {
            roomType:'',//房型
            roomNumber:'',//房号
            stayPhone:'',//入住人手机号
            orderNumber:'',//订单号
            singleNumber:'',//入住单号
            nickname:''//客户昵称
          }
          this.bookBeginDateKey = "";
          this.bookEndDateKey = "";
          this.arriveBeginDateKey = "";
          this.arriveEndDateKey = "";
          this.leaveBeginDatekey = "";
          this.leaveEndDateKey = "";
          this.selectState = "";
      }
        let that = this;
        that.isRoom = -1;//初始化
        switch (keyPath[0]){
          case "1":
            break;
          case "2":
            that.customOrderState = 1;//1、今日预抵
            if(keyPath[1] == "2-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "2-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "2-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "3":
            that.customOrderState = 2;//明日预离
            if(keyPath[1] == "3-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "3-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "3-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "4":
            that.customOrderState = 3;//待入住
            if(keyPath[1] == "4-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "4-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "4-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "5":
            that.customOrderState = 4;//已入住
            break;
          case "6":
            that.customOrderState = 5;//已取消
            break;
          case "7":
            that.customOrderState = 6;//应到未到
            break;
          case "8":
            that.customOrderState = -1;//全部
            break;
        }
        if(keyPath[0] != 1){
          that.search();
        }
      },
      //状态查询选择
      selsctRadio(value){
        this.customOrderState = value;
      },
      /**
       * 点击创建订单显示弹框
       **/
      createOrderModelShow(id){
        this.createOrderModel = true
      },
      /**
       * 创建订单确定按钮
       **/
      setBliakMember(){
        let vm  = this;
        if(this.bookName == "" || this.bookPhone == "" || this.bookBeginDate == "" || this.bookEndDate=="" || this.roomCount=="" || this.roomNum){
          //信息填写不完整
          vm.$emit("openWarningModal","信息填写不完整")
          return;
        }
        let param = {
          bookName:this.bookName,
          bookPhone:this.bookPhone,
          bookBeginDate:new Date(this.bookBeginDate).Format("yyyy-MM-dd"),
          bookEndDate:new Date(this.bookEndDate).Format("yyyy-MM-dd"),
          marketType:this.marketType,
          sourceType:this.sourceType,
          roomCount:this.roomCount,
          remark:this.remark,
          roomTypeId:this.activeRoomTypeId,
          communityId:this.communityId
        };
        this.$http.post(CxkjCreateOrder300193,qs.stringify(param)).then(res=>{
          if(res.data.code == 10000){
              vm.bookName = "";
              vm.bookPhone = "";
              vm.remark = "";
              let orderId = res.data.entity;
              sessionStorage.setItem("orderId",orderId);
              vm.closeCreateOrderModal();
              vm.search(vm.pageNum);
          }else{
            vm.$emit("openWarningModal",res.data.content)
         }
        })
      },
      //条件搜索
      search(page){
        //接口待修改
        let params = {
          pageNum:page || 1,
          communityId:this.communityId,
        }
        if(page){
            this.pageNum = page;
        }
        if(this.customOrderState != -1){
          params.customOrderState = this.customOrderState;
        }
        if(this.isRoom != -1){
          params.isRoom = this.isRoom;
        }

        if(this.selectConditions.roomType != ""){
            params.name = this.selectConditions.roomType;
        }
        if(this.selectConditions.roomNumber != ""){
          params.roomNum = this.selectConditions.roomNumber;
        }
        if(this.selectConditions.nickname != ""){
          params.userAlias = this.selectConditions.nickname;
        }

        if(this.bookBeginDateKey != ""){
          params.bookBeginDate = this.bookBeginDateKey
        }
        if(this.bookEndDateKey != ""){
          params.bookEndDateKey = this.bookEndDateKey
        }
        if(this.arriveBeginDateKey != ""){
          params.arriveBeginDateKey = this.arriveBeginDateKey
        }
        if(this.arriveEndDateKey != ""){
          params.arriveEndDateKey = this.arriveEndDateKey
        }
        if(this.leaveBeginDatekey != ""){
          params.leaveBeginDatekey = this.leaveBeginDatekey
        }
        if(this.leaveEndDateKey != ""){
          params.leaveEndDateKey = this.leaveEndDateKey
        }
        if(this.selectConditions.stayPhone != ""){
          params.bookPhone = this.selectConditions.stayPhone;
        }
        if(this.selectConditions.singleNumber != ""){
          params.orderNum = this.selectConditions.singleNumber;
        }
        this.getShortOrderList(params);
      },
      getPaifangData(roomCount,orderId){
        let vm = this;
        this.activeRoomCount = roomCount;//缓存排房数量
        this.activeOrderId = orderId;//缓存订单id
        let param = {id:orderId,pageNum:1}
        this.$http.get(CxkjGetRoomListOfForRoom300195,{params:param}).then(res=>{
          if(res.data.code == 10000 && res.data.pageBean.page){
            vm.paiFangList = res.data.pageBean.page;
            vm.paifang();
          }else{
            vm.$emit("openWarningModal","没有房间信息!")
            vm.paiFangList = [];
          }
        })
      },
      /**
       * 取消创建订单按钮
       **/
      closeBlackModal(){

      },
      //查看详情按钮
      orderDetail(orderId){
        this.$router.push({name:"shortOrderDetails",query:{orderId:orderId}});
      },

      notcheckIn(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.checkInOrder);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outCheckInOrder);
      },
      //入住按钮
      checkIn(orderId,obj){
          this.$router.push({name:'checkIn',query:{orderId:orderId,roomId:obj.roomId}})
//        this.isHide = true;
//        this.checkInObj = obj;
//        if(sessionStorage.getItem("orderId") && sessionStorage.getItem("orderId")==orderId){
//          this.name = sessionStorage.getItem("bookName");
//        }else{
//          this.name = "";
//        }
//        setTimeout(() => {//将this.uploadModal = true;渲染完成后，否则找不到节点
//          this.$nextTick(() => {
//            document.querySelector("#app").firstChild.appendChild(this.$refs.checkInOrder);
//            document.querySelector("#app").firstChild.appendChild(this.$refs.outCheckInOrder);
//          })
//        }, 0)
      },
      paifang(){
//        this.getPaifangData(orderId);
        this.roomChangeHide = true;
        this.roomList = [];
        setTimeout(() => {//将this.uploadModal = true;渲染完成后，否则找不到节点
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.roomChange);
            document.querySelector("#app").firstChild.appendChild(this.$refs.outRoomChangeHide);
          })
        }, 0)
      },
      closeRoomChange(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.roomChange);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outRoomChangeHide);
      },
      //打开创建订单弹窗
      createOrder(id){
        this.activeRoomTypeId = id;
        this.createOrderModal = true;
        setTimeout(() => {
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.outCreateOrderModal);
            document.querySelector("#app").firstChild.appendChild(this.$refs.createOrderModal);
          })
        }, 0)
      },
      //关闭创建订单弹窗
      closeCreateOrderModal(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.createOrderModal);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outCreateOrderModal);
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
    @import '../../sass/page/shortRent.scss';


    .checkInOrder{
      width: 800px;
      height: 415px;
      background: #fff;
      z-index: 9999;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;

    }
    .active-color{
      background-color: #1dc0e9!important;
    }
    .checkInOrder p{
      margin-left: 20px;
      line-height: 40px;
    }
    .checkInOrder .ivu-input{
      height: 32px;
      margin-right: 10px;
    }
    .checkInOrder p .span1{
      margin-left: 20px;
    }
    .checkInOrder .ivu-select-selection{
      border-radius: 0%;
    }
    .checkInOrder a{
      width: 100px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      color: white;
      background: #038BE2;
      border-radius: 5px;
      margin-left: 115px;
      margin-top: 35px;
    }
    .checkInOrder ul{
      position: absolute;
      left: 86px;
      top: 271px;
    }

    .roomchange{
      width: 900px;
      min-height: 300px;
      background: #fff;
      z-index: 9999;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
    }
    .roomchange .state2{
      display: block;
    }
    .roomchange .state2 li{
      width: 194px;
      height: 160px;
      border: 1px solid #DCDCDC;
      border-radius: 5px;
      float: left;
      margin: 15px 15px;
      position: relative;
    }
    .roomchange .state2 li div{
      width: 194px;
      height: 160px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 5px;
      cursor: pointer;
    }
    .roomchange .state2 li div{
      width: 194px;
      height: 160px;
      background-color: #038be2;
      display: inline-block;
    }
    .roomchange .state2 li div .act{
      color: #1fbba6;
    }
    .roomchange .state2 li div .act2{
      color: #038be2;
    }
    .roomchange .state2 li div p:nth-child(1){
      font-size: 12px;
      font-weight: bold;
      margin:10px 0 7px 10px;
    }
    .roomchange .state2 li div p:nth-child(3){
      font-size: 12px;
      margin:0 0 8px 10px;
    }

    .roomchange .state2 li span{
      display: block;
      font-size: 12px;
      color: #ff1d10;
      margin:0 0 0 10px;
    }
    .roomchange .state2 li .short{
      position: absolute;
      right: 10px;
      top: 10px;
      width: 50px;
      height: 25px;
      display: inline-block;
      background: #ffffff;
      text-align: center;
      line-height: 25px;
      color: black;
    }
    .roomchange .state2 li p:nth-child(6){
      width: 100%;
      height: 46px;
      border-radius: 5px;
      border-top: 1px solid #dcdcdc;
      background: #1dc0e9;
      font-size: 12px;
      color: #000;
      line-height: 45px;
      padding-left: 10px;
      position: absolute;
      bottom: 0px;
    }
    .roomchange .state2 li p:nth-child(6) i{
      float: right;
      font-style: normal;
      margin-right: 10px;
    }
    .roomchange a{
      width: 100px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      color: white;
      background: #038BE2;
      border-radius: 5px;
      position: absolute;
      left: 200px;
      bottom: 20px;
    }



    .create-order-modal{
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

    .create-order-content{
      width: 800px;
      height: 460px;
      min-height:320px;
      background-color:#fff;
      border-radius: 5px;
      margin: auto;
      position: fixed;
      z-index:9999;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .create-order-content-title{
        height: 60px;
        width: 100%;
        font-size: 20px;
        color: #fff;
        background-color:rgb(53,154,240);
        text-align: center;
        line-height: 60px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      .modal-content-meddle{
        padding: 20px;
        .form-item{
          display: inline-block;
          margin-right: 30px;
          margin-bottom: 20px;
        }
      }
      .form-btn-wrap{
        text-align: center;
      }
      .modal-close-btn{
        position: absolute;
        top: -36px;
        right: -36px;
        width: 36px;
        height: 36px;
        color: #fff;
        background-color:rgba(0,0,0,0.7) ;
        border-radius: 100%;
        text-align: center;
        font-size: 36px;
        cursor: pointer;
        i{
          position: relative;
          top: -8px;
        }
      }
    }
</style>
