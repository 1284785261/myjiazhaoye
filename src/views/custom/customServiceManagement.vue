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
          <!-- <span>佳兆业航运WEWA空间</span> -->
        </div>
        <div id="custom-service-management-wrap">
          <div class="form-search-criteria">
            <!--<div class="form-item">-->
              <!--<b>社区：</b>-->
              <!--<Select v-model="roomCommunity" style="width:150px">-->
                <!--<Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>-->
              <!--</Select>-->
            <!--</div>-->
            <div class="form-item">
              <b>类型：</b>
              <Select v-model="selectComplainType" style="width:100px">
                <Option v-for="item in  complainTypeList" :value="item.value" :key="item.value">{{ item.lable }}</Option>
              </Select>
            </div>
            <div class="form-item">
              <b>状态：</b>
              <Select v-model="selectStatus" style="width:100px">
                <Option v-for="item in  status" :value="item.value" :key="item.value">{{ item.lable }}</Option>
              </Select>
            </div>
            <div class="form-item">
              <div class="form-search">
                <i class="iconfont icon-sousuo"></i>
                <Input v-model="roomSearchKey" placeholder="搜索投诉人或手机号码"></Input>
                <input type="button" value="搜索" @click="search()">
              </div>
            </div>
            <div class="form-item">
              <a class="dcs" @click="toAddComplain()" v-if="jurisdiction('CUSTOMER_INCREASE')">添加</a>
              <a class="dcs" :href="url">导出</a>
            </div>
          </div>
          <div class="form-item" style="display: block;padding-bottom: 20px;padding-left: 20px;">
            <span>投诉时间：</span>
            <Date-picker type="date" :options="option2" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
            <span class="inline-block spanBar">-</span>
            <Date-picker type="date" :options="option1" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
          </div>
          <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="complainTotalNum > 0">
            <tr>
              <th>工单号</th>
              <th>所属社区</th>
              <th>工单类型</th>
              <th>社区类型</th>
              <th>投诉时间</th>
              <th>投诉人</th>
              <th>已注册手机号</th>
              <th>状态</th>
              <th>关闭时间</th>
              <th>处理时长</th>
              <th>操作</th>
            </tr>
            <tr v-for="(complain,index) in complainList">
              <td>{{complain.complainNum}}</td>
              <td>{{complain.communityName}}</td>
              <td>{{complain.complainType}}</td>
              <td>{{complain.communityType}}</td>
              <td>{{complain.createTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
              <td>{{complain.userName}}</td>
              <td>{{complain.userPhone}}</td>
              <td>
                <!--投诉状态 0、待确认1、店长处理中2、店长已处理3、客服处理中4、待回访5、已回访-->
                <span v-if="complain.complainStatus==0">待确认</span>
                <span v-if="complain.complainStatus==1">店长处理中</span>
                <span v-if="complain.complainStatus==2">店长已处理</span>
                <span v-if="complain.complainStatus==3">客服处理中</span>
                <span v-if="complain.complainStatus==4" style="color: #FF6612;">待回访</span>
                <span v-if="complain.complainStatus==5">已回访</span>
              </td>
              <td>
                <span v-if="complain.complainStatus==4 || complain.complainStatus==5">{{complain.newTime | timefilter("yyyy-MM-dd hh:mm")}}</span>
                <span v-else></span>
              </td>
              <td>
                <span v-if="complain.complainStatus==4 || complain.complainStatus==5">{{complain.processingTime}}</span>
                <span v-else></span>
              </td>
              <td>
                <router-link :to="{name:'complainDetail',query:{id:complain.complainId}}"> 查看详情</router-link>
                <router-link :to="{name:'complainDetail',query:{id:complain.complainId}}" v-if="complain.complainStatus==3 &&  jurisdiction('CUSTOMER_UPDATE')"> 确认处理</router-link>
                <router-link :to="{name:'complainDetail',query:{id:complain.complainId}}" v-if="complain.complainStatus==4 &&  jurisdiction('CUSTOMER_UPDATE')"> 确认回访</router-link>
              </td>
            </tr>
          </table>
          <div class="blank-background-img" v-if="complainTotalNum == 0">
            <img src="../../../static/images/blank/custom_space.png" >
            <h2>暂无投诉内容~</h2>
          </div>
          <Page :total="complainTotalNum" :current="complainCurrent" :page-size="10" show-elevator show-total @on-change="search" v-if="complainTotalNum > 0"></Page>
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
  import {allCommunity,complainList,ComplainListDownLoad200177} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      let _this = this;
      return{
        status:[{
          value:-1,
          lable:"全部"
        },{
          value:0,
          lable:"待确认"
        },{
          value:1,
          lable:"店长处理中"
        },{
          value:2,
          lable:"店长已处理"
        },{
          value:3,
          lable:"客服处理中"
        },{
          value:4,
          lable:"待回访"
        },{
          value:5,
          lable:"已回访"
        },
        ],
        complainTypeList:[
          {
            value:-1,
            lable:"全部"
          },
          {
            value:0,
            lable:"咨询"
          },
          {
            value:1,
            lable:"建议"
          },
          {
            value:2,
            lable:"投诉"
          },
        ],
        selectComplainType:-1,
        RoomBillSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        complainList:[],
        complainTotalNum:0,
        selectStatus:-1,
        roomCommunity:-1,
        roomSearchKey:"",
        roomStartDate:"",
        roomEndDate:"",
        complainCurrent:1,
        ComplainListDownLoad200177:'',
        pageNum:1,
        url:'',
        option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.roomStartDate;
					}
        },
        option2: {
          disabledDate(date){
						if(_this.roomEndDate){
							return date &&  _this.roomEndDate < date.valueOf();
						}
          }
        },
      }
    },
    mounted(){
      this.url = ComplainListDownLoad200177
      this.getCommunityData();
      this.getComplainData({pageNum:1});
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomBillSelects = that.RoomBillSelects.concat(res.data.entity);
            }
          })
      },
      getComplainData(data){
        var that = this;
        this.$http.get(complainList,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.complainList = pageBean.page;
              that.complainTotalNum = pageBean.totalNum;
            }else{
              that.complainList = [];
              that.complainTotalNum = 0;
            }
          })
      },
      search(page){
        // let vm = this;
        this.url = ComplainListDownLoad200177;
        var data = {
          pageNum:page || 1
        }
        this.url +='pageNum='+this.pageNum;
        if(this.roomCommunity != -1){
          data.communityId = this.roomCommunity;
          this.url +='&communityId='+data.communityId;
        }
        if(this.selectComplainType != -1){
          data.complainType = this.selectComplainType;
          this.url +='&complainType='+data.complainType;
        }
        if(this.selectStatus !=-1){
          data.complainStatus = this.selectStatus;
          this.url +='&complainStatus='+data.complainStatus;
        }
        if(this.roomSearchKey){
          data.keyWord = this.roomSearchKey;
          this.url +='&keyWord='+data.keyWord;
        }
        if(this.roomStartDate){
          data.beginDate = new Date(this.roomStartDate).Format("yyyy-MM-dd");
          this.url +='&beginDate='+data.beginDate;
        }
        if(this.roomEndDate){
          data.endDate = new Date(this.roomEndDate).Format("yyyy-MM-dd");
          this.url +='&endDate='+data.endDate;
        }
        console.log(this.url);
        this.pageNum = page || 1
        this.getComplainData(data);
      },

      toAddComplain(){
          this.$router.push({name:'addComplain'})
      }

    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
    watch:{

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #custom-service-management-wrap{
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
    .form-search-criteria{
      position: relative;
      padding: 0 0 21px 20px;
      .form-item{
        display: inline-block;
        margin-right: 20px;
        padding-top: 20px;
        .dcs{
            display: inline-block;
            width: 120px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            border-radius: 3px;
            margin-left: 10px;
            color:#666;
            background-color: #f7f7f7;
            border: 1px solid #dcdcdc;
        }
        .dcs:hover {
            color: #57a3f3;
            transition: color .2s linear,background-color .2s linear,border .2s linear;
            background-color: #fff;
            border-color: #57a3f3;
        }
        .form-search{
          position: relative;
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
          }
        }
      }
    }
    .house-bill-table{
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
    .ivu-date-picker{
      width: 150px;
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
  }



</style>

