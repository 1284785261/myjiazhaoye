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
        </div>
        <div class="marginT30">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部 <i v-if="!selectShow" class="el-icon-caret-bottom" ></i><i class="el-icon-caret-top" v-if="selectShow"></i></el-menu-item>
                <el-menu-item index="2">今日预离</el-menu-item>
                <el-menu-item index="3">明日预离</el-menu-item>
                <el-menu-item index="4">入住</el-menu-item>
                <el-menu-item index="5">已退未结</el-menu-item>
                <el-menu-item index="6">已结账</el-menu-item>
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
                        <el-checkbox label="今日预离" value="1"></el-checkbox>
                        <el-checkbox label="明日预离" value="2"></el-checkbox>
                    </el-checkbox-group>
                </li>
                <li>
                    <el-checkbox-group v-model="selectState.state">
                        <el-checkbox label="入住"></el-checkbox>
                        <el-checkbox label="已退未结"></el-checkbox>
                        <el-checkbox label="已结账"></el-checkbox>
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
                </tr>
            </table>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange3" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
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
  import {} from '../api.js';
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
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/shortRent.scss';
</style>