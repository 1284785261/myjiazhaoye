<template>
    <div class="shortOrderListClass">
        <div>
            <div class="form-item">
                <b>社区：</b>
                <Select v-model="communityId" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId"
                            :key="community.communityId">{{ community.communityName }}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="marginT30">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部 <i v-if="!selectShow" class="el-icon-caret-bottom" ></i><i class="el-icon-caret-top" v-if="selectShow"></i></el-menu-item>
                <el-menu-item index="2">今日预离</el-menu-item>
                <el-menu-item index="3">明日预离</el-menu-item>
                <el-menu-item index="4">入住</el-menu-item>
                <el-menu-item index="5">已退未结</el-menu-item>
                <el-menu-item index="6">已结账</el-menu-item>
                <el-menu-item index="8">全部订单</el-menu-item>
            </el-menu>
        </div>
        <div v-if="selectShow" class="selectShowClass">
            <ul class="selectStateUl">
                <li>
                    状态：
                </li>
                <li>
                    <el-radio-group v-model="selectState" @change="selsctRadio">
                        <el-radio :label="-1">全部</el-radio>
                        <el-radio :label="1">今日预离</el-radio>
                        <el-radio :label="2">明日预离</el-radio>
                        <el-radio :label="3">入住</el-radio>
                        <el-radio :label="4">已退未结</el-radio>
                        <el-radio :label="5">已结账</el-radio>
                    </el-radio-group>
                </li>
                <!--<li>-->
                    <!--<el-checkbox-group v-model="selectState.eta">-->
                        <!--<el-checkbox label="今日预离" value="1"></el-checkbox>-->
                        <!--<el-checkbox label="明日预离" value="2"></el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<el-checkbox-group v-model="selectState.state">-->
                        <!--<el-checkbox label="入住"></el-checkbox>-->
                        <!--<el-checkbox label="已退未结"></el-checkbox>-->
                        <!--<el-checkbox label="已结账"></el-checkbox>-->
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
                <li>
                    <span>订单号/渠道单号：</span>
                    <input v-model="selectConditions.orderNumber">
                </li>
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
                    <th>入住状态</th>
                    <th>订单号</th>
                    <th>联系人</th>
                    <th>联系电话</th>
                    <th>房型</th>
                    <th>房号</th>
                    <th>预订人</th>
                    <th>到店日期</th>
                    <th>离店日期</th>
                    <th>预付款</th>
                </tr>
              <tr v-for="(item,index) in shortOrderList">
                <td>
                  <span v-if="item.isIn==0">未入住</span>
                  <span v-if="item.isIn==1">已入住</span>
                </td>
                <td>{{item.orderNum}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.contactPhone}}</td>
                <td>{{item.name}}</td>
                <td>{{item.roomNum}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.arriveTime | timefilter('yyyy-MM-dd')}}</td>
                <td>{{item.leaveTime | timefilter('yyyy-MM-dd')}}</td>
                <td>{{item.payMoney}}</td>
              </tr>
            </table>
            <div class="block">
                <el-pagination @current-change="search" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
                </el-pagination>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import {allCommunity,CxkjGetPersonnelList300180} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
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
        isRoom:-1,
        customPersonnelState:-1,

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
        createOrderModel:true,//创建订单弹框显示隐藏控制
        shortOrderList:[],
      }
    },
    mounted() {
      this.getCommunityData();
    },
    methods: {
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
              that.getShortOrderList({pageNum:1,communityId:that.communityId});
            }
          })
      },
      //获取
      getShortOrderList(params){
        let vm = this;
        this.$http.get(CxkjGetPersonnelList300180,{params:params}).then(res=>{
          if(res.data.code == 10000){
            vm.shortOrderList = res.data.pageBean.page;
            vm.totalNum = res.data.pageBean.totalNum;
          }else{
            vm.shortOrderList = [];
            vm.totalNum = 0;
          }
        })
      },
      //状态查询选择
      selsctRadio(value){
        this.customPersonnelState = value;
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
        if(this.customPersonnelState != -1){
          params.customPersonnelState = this.customPersonnelState;
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
          params.bookBeginDate = new Date(this.bookBeginDateKey).Format("yyyy-MM-dd");
        }
        if(this.bookEndDateKey != ""){
          params.bookEndDateKey = new Date(this.bookEndDateKey).Format("yyyy-MM-dd");
        }
        if(this.arriveBeginDateKey != ""){
          params.arriveBeginDateKey = new Date(this.arriveBeginDateKey).Format("yyyy-MM-dd");
        }
        if(this.arriveEndDateKey != ""){
          params.arriveEndDateKey = new Date(this.arriveEndDateKey).Format("yyyy-MM-dd");
        }
        if(this.leaveBeginDatekey != ""){
          params.leaveBeginDatekey = new Date(this.leaveBeginDatekey).Format("yyyy-MM-dd");
        }
        if(this.leaveEndDateKey != ""){
          params.leaveEndDateKey = new Date(this.leaveEndDateKey).Format("yyyy-MM-dd");
        }
        if(this.selectConditions.stayPhone != ""){
          params.bookPhone = this.selectConditions.stayPhone;
        }
        if(this.selectConditions.singleNumber != ""){
          params.orderNum = this.selectConditions.singleNumber;
        }
        this.getShortOrderList(params);
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
            that.customPersonnelState = 1;//1、今日预抵
            if(keyPath[1] == "2-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "2-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "2-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "3":
            that.customPersonnelState = 2;//明日预离
            if(keyPath[1] == "3-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "3-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "3-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "4":
            that.customPersonnelState = 3;//待入住
            if(keyPath[1] == "4-1"){//全部
              that.isRoom = -1;
            }else if(keyPath[1] == "4-2"){//待排房
              that.isRoom = 0;
            }else if(keyPath[1] == "4-3"){//已排房
              that.isRoom = 1;
            }
            break;
          case "5":
            that.customPersonnelState = 4;//已入住
            break;
          case "6":
            that.customPersonnelState = 5;//已取消
            break;
          case "7":
            that.customPersonnelState = 6;//应到未到
            break;
          case "8":
            that.customPersonnelState = -1;//全部
            break;
        }
        if(keyPath[0] != 1){
          that.search();
        }
      },
      /**
       * 点击创建订单显示弹框
       **/
      createOrderModelShow(){
        this.createOrderModel = true
      },
      /**
       * 创建订单确定按钮
       **/
      setBliakMember(){

      },
      /**
       * 取消创建订单按钮
       **/
      closeBlackModal(){

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
    @import '../../sass/page/shortRent.scss';
</style>
