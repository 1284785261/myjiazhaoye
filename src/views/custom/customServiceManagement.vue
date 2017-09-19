<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">客服管理>投诉管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>投诉管理</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="bill-management-wrap">
          <div class="form-search-criteria">
            <div class="form-item">
              <b>社区：</b>
              <Select v-model="roomCommunity" style="width:200px">
                <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </div>
            <div class="form-item">
              <b>状态：</b>
              <Select v-model="roomCommunity" style="width:200px">
                <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </div>
            <div class="form-item">
              <span>投诉时间：</span>
              <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
              <span class="inline-block spanBar">-</span>
              <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
            </div>
            <div class="form-item">
              <div class="form-search">
                <i class="iconfont icon-sousuo"></i>
                <Input v-model="roomSearchKey" placeholder="搜索投诉人或联系电话"></Input>
                <input type="button" value="搜索" @click="roomSearch()">
              </div>
            </div>
          </div>
          <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr>
              <th>工单号</th>
              <th>所属社区</th>
              <th>投诉时间</th>
              <th>投诉人</th>
              <th>已注册手机号</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="room in roomBillList">
              <td>{{room.createTime | timefilter("yyyy-MM-dd")}}</td>
              <td>{{room.communityName}}</td>
              <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
              <td>{{room.userName}}</td>
              <td>{{room.userPhone}}</td>
              <td>
                <span v-if="room.billState == 1">待支付</span>
                <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                <span v-if="room.billState == 3" style="color: red;">违约</span>
                <span v-if="room.billState == 4">违约办结</span>
              </td>
              <td>
                <router-link :to="{name:'billDetail',query:{billId:room.billId,type:0}}"> 账单详情</router-link>
                <router-link to="/bill/billDetail"> 查看合同</router-link>
              </td>
            </tr>
          </table>
          <Page :total="roomTotalNum" :current="roomBillCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch"></Page>
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
  import {allCommunity,roomBill,officeBill,waterEnergyBill} from '../api.js';


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
        communitys: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],

      }
    },
    mounted(){


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
              that.RoomBillSelects = that.RoomBillSelects.concat(res.data.entity);
              that.officeBillSelects = that.officeBillSelects.concat(res.data.entity);
              that.waterEnergyBillSelects = that.waterEnergyBillSelects.concat(res.data.entity);
            }
          })
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
      waterEnergyStartDate:function(newValue,oldValue){
        var vm = this;
        setTimeout(function(){
          vm.waterEnergySearch();
        },50);
      },

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

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .form-item{
        display: inline-block;
        margin-right: 20px;
        .form-search{
          position: relative;
          margin-left: 108px;
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
  }



</style>

