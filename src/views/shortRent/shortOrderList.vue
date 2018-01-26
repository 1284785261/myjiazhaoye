<template>
    <div class="shortOrderListClass">
        <div>
            <div class="form-item">
                <b>社区：</b>
                <Select v-model="stationCommunity" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId"
                            :key="community.communityId">{{ community.communityName }}
                    </Option>
                </Select>
            </div>
            <div class="form-item">
                入住率：
            </div>
            <div class="form-item">
                总房数/已订房：
            </div>
        </div>
        <div class="marginT30">
            <div class="rentTypeBox" >
                <div class="rentTypeTitle">标准大单间</div>
                <div class="rentTypeMain">
                    <ul>
                        <li>已订/入住：10/6</li>
                        <li>剩余：3</li>
                    </ul>
                    <i></i>
                    <p @click="createOrderModelShow">创建订单</p>
                </div>
            </div>
            <div class="rentTypeBox" >
                <div class="rentTypeTitle">豪华大床房</div>
                <div class="rentTypeMain">
                    <ul>
                        <li>已订/入住：10/6</li>
                        <li>剩余：3</li>
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
                <el-menu-item index="7">NoShow</el-menu-item>
            </el-menu>
        </div>
        <div v-if="selectShow" class="selectShowClass">
            <ul class="selectStateUl">
                <li>
                   状态：
                </li>
                <li>
                    <el-checkbox-group v-model="selectState.all">
                        <el-checkbox label="全部"></el-checkbox>
                    </el-checkbox-group>
                </li>
                <li>
                    <el-checkbox-group v-model="selectState.eta">
                        <el-checkbox label="今日预抵" value="1"></el-checkbox>
                        <el-checkbox label="明日预抵" value="2"></el-checkbox>
                    </el-checkbox-group>
                </li>
                <li>
                    <el-checkbox-group v-model="selectState.state">
                        <el-checkbox label="待入住"></el-checkbox>
                        <el-checkbox label="已入住"></el-checkbox>
                        <el-checkbox label="已取消"></el-checkbox>
                        <el-checkbox label="NoShow"></el-checkbox>
                    </el-checkbox-group>
                </li>
                <li>
                    <el-button>查询</el-button>
                </li>
            </ul>
            <ul class="dateUl">
                <li>
                    <span>预订起止时间：</span>
                    <Date-picker type="date" :options="bookingStartTime" placeholder="选择日期" v-model="dateUl.bookingTime.startTime"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="bookingEndTime" placeholder="选择日期" v-model="dateUl.bookingTime.endTime"></Date-picker>
                </li>
                <li>
                    <span>到店起止时间：</span>
                    <Date-picker type="date" :options="toShowStartTime" placeholder="选择日期" v-model="dateUl.toShowTime.startTime"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="toShowEndTime" placeholder="选择日期" v-model="dateUl.toShowTime.endTime"></Date-picker>
                </li>
                <li>
                    <span>离店起止时间：</span>
                    <Date-picker type="date" :options="leaveStartTime" placeholder="选择日期" v-model="dateUl.leaveTime.startTime"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="leaveEndTime" placeholder="选择日期" v-model="dateUl.leaveTime.endTime"></Date-picker>
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
                    <th>操作</th>
                </tr>
                <tr >
                    <td>已入住</td>
                    <td>123456</td>
                    <td>李杨</td>
                    <td>13651412541</td>
                    <td>标准大床房</td>
                    <td>10003</td>
                    <td>李杨</td>
                    <td>2018/1/23</td>
                    <td>2018/1/15</td>
                    <td>900</td>
                    <td>
                        <a @click="paifang">排房</a>
                        <a @click="createOrder">入住</a>
                        <a>查看详情</a>
                    </td>
                </tr>
            </table>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange3" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
                </el-pagination>
            </div>
        </div>

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
            姓名：<input class="ivu-input " style="width:80px;">
            <el-radio class="radio" v-model="radio" label="1">男</el-radio>
            <el-radio class="radio" v-model="radio" label="2">女</el-radio>
            <Select v-model="stationCommunity" style="width:120px">
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

      <div class="upload-modal" ref="outRoomChangeHide"  v-if="roomChangeHide" @click="closeRoomChange()"></div>
      <div class="roomchange" ref="roomChange" v-if="roomChangeHide">
        <ul class="state2 transition-box">
          <li>
            <div>
              <p></p>
              <span class="short">短租</span>
              <p></p>
              <!-- <p v-else></p> -->
              <span></span>
              <!-- <span v-else></span> -->
              <span>租期剩余天</span>
              <!-- <span v-else></span> -->
              <p>￥.00
                <!-- <i :class="[{'act':its.roomStatus == 0},{'act2':its.roomStatus == 1}]">{{its.roomStatus | states(its.roomStatus)}}</i> -->
              </p>
            </div>

          </li>
        </ul>
        <a @click="roomchange()">提交</a>
        <a @click="closeRoomChange()" style="left: 600px;">取消</a>
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
  import {} from '../api.js';
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
      return {
        activeTabName: "shortRent",//右侧导航栏选中状态
        successModal: false,//成功弹框显示控制
        warningModal: false,//失败弹框显示控制
        successMessage: '',//成功弹框提示消息
        warningMessage: '',//失败弹框提示消息
        selectShow:false,//条件查询显示或隐藏
        stationSelectList:[],//社区列表
        stationCommunity:'',//被选中的社区
        selectState:{//状态查询控制
          all:true,
          eta:[],
          state:[]
        },
        dateUl:{//条件查询时间查询
          bookingTime:{//预订起止时间
            startTime:'',
            endTime:''
          },
          toShowTime:{//到店起止时间
            startTime:'',
            endTime:''
          },
          leaveTime:{//离店起止时间
            startTime:'',
            endTime:''
          }
        },
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
        bookingStartTime: {//预订开始时间验证
          disabledDate(date){
          }
        },
        bookingEndTime: {//预订结束时间验证
          disabledDate(date){
          }
        },
        toShowStartTime: {//到店开始时间验证
          disabledDate(date){
          }
        },
        toShowEndTime: {//到店结束时间验证
          disabledDate(date){
          }
        },
        leaveStartTime: {//离店开始时间验证
          disabledDate(date){
          }
        },
        leaveEndTime: {//离店结束时间验证
          disabledDate(date){
          }
        },
        createOrderModel:true,//创建订单弹框显示隐藏控制
        isHide:false,
        outCheckInOrder:false,
        roomChangeHide:false,
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 分页插件
       **/
      handleCurrentChange3(){

      },
      /**
       * 导航菜单事件
       **/
      handleSelect(key, keyPath){
        console.log(key)
        if(key == 1){
          this.selectShow = !this.selectShow
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

      notcheckIn(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.checkInOrder);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outCheckInOrder);
      },
      //创建订单按钮
      createOrder(){
        this.isHide = true;
        setTimeout(() => {//将this.uploadModal = true;渲染完成后，否则找不到节点
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.checkInOrder);
            document.querySelector("#app").firstChild.appendChild(this.$refs.outCheckInOrder);
          })
        }, 0)
      },
      paifang(){
        this.roomChangeHide = true;
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
      top: 282px;
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
</style>
