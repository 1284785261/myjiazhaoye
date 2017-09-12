<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="main-home">
          <div class="home-item">
            <h3>张之如<span>管家</span></h3>
            <Select v-model="selectModel1" style="width:240px" @on-change="temp(selectModel1)">
              <Option v-for="item in cityList" :value="item.communityName" :key="item.communityName" >{{ item.communityName }}</Option>
            </Select>
          </div>
          <ul class="list-data">
            <li v-for="data in datas" :class="data.classD">
              <span class="title">{{data.title}}</span>
              <span class="num"><em>￥</em>{{data.num}}</span>
            </li>
          </ul>
        </div>
        <Row>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>我的消息</h3>
            <ul class="info-list">
              <li v-for="myInfo in myInfos"> <span class="infoState"><i :class="myInfo.icon"></i>{{myInfo.state}}</span><router-link to="/">{{myInfo.content}}</router-link><span class="date">{{myInfo.date}}</span></li>
            </ul>
          </div>
          </Col>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>公寓管理</h3>
            <ul class="apartment-list">
              <li><router-link to="/">看房预约</router-link></li>
              <li><router-link to="/signed/lodgingHouse">公寓签约</router-link></li>
              <li><router-link :to="{path:'/signed/houseState',query:{communityId:communityId}}">公寓状态</router-link></li>
              <li><router-link to="/">直播管理</router-link></li>
              <li><router-link to="/">公寓租金账单</router-link></li>
              <li><router-link to="/">公寓水电订单</router-link></li>
              <li><router-link to="/">用户报修</router-link></li>
              <li><router-link to="/">合同管理</router-link></li>
              <li><router-link to="/">退租管理</router-link></li>
              <li><router-link to="/">发起退款</router-link></li>
              <li><router-link :to="{path:'/signed/gathering',query:{communityId:communityId}}">发起收款</router-link></li>
              <li><router-link to="/">用户投诉</router-link></li>
            </ul>
          </div>
          </Col >
        </Row>

        <Row>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>今日待办</h3>
            <ul class="remain-list" v-if="remains != null">
              <li v-if="remains.roomMoney != null"><router-link to="/">新增看房预约<span><span>{{remains.roomMoney}}人</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.roomCount != null"><router-link to="/">待收公寓租金<span>{{remains.roomCount}}笔<span>{{remains.roomMoney | roomMoney}}</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.officeCount != null"><router-link to="/">待收联合办公租金<span>{{remains.officeCount}}笔<span>{{remains.officeMoney | officeMoney}}</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.waterEnergyCount != null"><router-link to="/">待收水电账单<span>{{remains.waterEnergyCount}}笔<span>{{remains.waterEnergyMoney | waterEnergyMoney}}</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.roomMoney != null"><router-link to="/">用户报修<span><span>{{remains.roomMoney}}人</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.rentCount != null"><router-link to="/">用户退房<span><span>{{remains.rentCount}}人</span></span></router-link><i class="iconfont icon-you"></i></li>
              <li v-if="remains.expireCount != null"><router-link to="/">合同即将到期<span><span>{{remains.expireCount}}户</span></span></router-link><i class="iconfont icon-you"></i></li>
           		<li><router-link to="/">今日直播时间<span><span>18:00-19:00</span></span></router-link><i class="iconfont icon-you"></i></li>
           		<li><router-link to="/">待处理用户投诉<span><span>6人</span></span></router-link><i class="iconfont icon-you"></i></li>
            </ul>
            <div class="muvs" v-else>
            		<img src="../../../static/images/temp/ms_06.png" />
            </div>
          </div>
          </Col>
          <Col span="12">
          <div class="modular-box" style="height: 447px;">
            <h3><i class="icon icon-info"></i>联合办公管理</h3>
            <ul class="apartment-list">
              <li><router-link to="/">看房预约</router-link></li>
              <li><router-link to="/signed/lodgingwork">联合办公签约</router-link></li>
              <li><router-link :to="{path:'/signed/workState',query:{id:communityId}}">办公空间状态</router-link></li>
              <li><router-link to="/">直播管理</router-link></li>
              <li><router-link to="/">办公租金账单</router-link></li>
              <li><router-link to="/">办公订单</router-link></li>
              <li><router-link to="/">用户报修</router-link></li>
              <li><router-link to="/">合同管理</router-link></li>
              <li><router-link to="/">退租管理</router-link></li>
              <li><router-link to="/">发起退款</router-link></li>
              <li><router-link to="/">发起收款</router-link></li>
              <li><router-link to="/">用户投诉</router-link></li>
            </ul>
          </div>
          </Col >
        </Row>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { allCommunity,hostManager,hostWorkbench } from '../api.js';
export default {
  components:{
    rightHeader,
    menuBox,
    footerBox
  },
  data () {
    return {
      item2:true,
      cityList: [],
      selectModel1:null,
      model1: '123',
      datas:[{
          classD:"backOrange",
          title:"昨日收款",
          num:""
      },{
        classD:"backGreen",
        title:"待收账单",
        num:""
      },{
        classD:"backBlue",
        title:"昨日业绩",
        num:""
      }],
      myInfos:[{
        icon:"iconfont icon-baoxiu",
        state:"用户报修",
        content:"公寓 802 租客申请报修，请及时跟进",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      }],
      
      remains:null,
      communityId:null
    }
  },
  mounted(){
  	this.title();
  },
  filters:{
  	roomMoney(val){
  		if(val != null){
  			return val.toFixed(2)+'元';
  		}
  	},
  	officeMoney(val){
  		if(val != null){
  			return val.toFixed(2)+'元';
  		}
  	},
  	waterEnergyMoney(val){
  		if(val != null){
  			return val.toFixed(2)+'元';
  		}
  	}
  },
  methods:{
  	 title(){
  	 	axios.post(allCommunity).then((response)=>{   //获取社区分类数据
  	 		console.log(response);
  	 		this.cityList = response.data.entity;
  	 		this.selectModel1 =this.cityList[0].communityName;
  	 	})
  	 	.catch((error)=>{
  	 		console.log(error);
  	 	})
  	 	
  	 },
  	 temp(val){
		 		let Index =this.cityList[this.cityList.findIndex(item => item.communityName == val)].communityId;
		 		this.communityId = Index;
  	 		//console.log(Index);
	 		axios.post(hostManager,  //获取管家收款数据
	 			qs.stringify({
	 				communityId:Index
	 			})
	 		).then((response)=>{
	 			console.log(response);
	 			this.datas[0].num = response.data.result.yesterdayPay+'.00';
	 			this.datas[1].num = response.data.result.todayWaitPay+'.00';
	 			this.datas[2].num = response.data.result.yesterdayCount+'笔';
	 		})
	 		.catch((error)=>{
	 			console.log(error);
	 		})
  	 		
	 		axios.post(hostWorkbench,  //获取今日待办数据
	 			qs.stringify({
	 				communityId:Index
	 			})
	 		).then((response)=>{
	 			console.log(response);
	 			this.remains = response.data.result;
	 		})
	 		.catch((error)=>{
	 			console.log(error);
	 		})
  	 }
  },
  created(){
  	
  }
}
</script>



<style lang="scss" rel="stylesheet/scss" >
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/page/_workbench.scss';

  .ivu-row{
    margin: 20px -10px 0;
    overflow: hidden;
    .ivu-col-span-12{
      padding: 0 10px;
    }
  }
</style>
