<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="rightwork">
			<right-header @communityId="communityIdm"></right-header>
			<div class="wordbench-box woram">
				<div class="main-home">
					<div class="home-item">
						<!--<h3>{{user.name}}<span>{{user.quanxian | quanxian}}</span></h3>-->
						<!--<h3></h3>-->
						<Select v-model="selectModel1" style="width:240px;margin: 20px" @on-change="temp(selectModel1)">
							<Option v-for="item in cityList" :value="item.communityName" :key="item.communityName">{{ item.communityName }}</Option>
						</Select>
					</div>
					<ul class="list-data">
						<li v-for="data in datas" :class="data.classD">
							<span class="title">{{data.title}}</span>
							<span class="num"><em>{{data.prc}}</em>{{data.num}}</span>
						</li>
					</ul>
				</div>
				<Row>
					<Col span="12">
					<div class="modular-box" style="min-height:300px;">
						<h3><i class="icon icon-info"></i>我的消息</h3>
						<ul class="info-list" v-if="myInfos">
							<li v-for="myInfo in myInfos">
								<span class="infoState"><i :class="myInfo.inco"></i>{{myInfo.messageType | types}}</span>
								<router-link to="/signed/messageInform">{{myInfo.content}}</router-link>
								<span class="date">{{myInfo.createtime | times}}</span>
							</li>
						</ul>
						<div class="muvs" v-else>
							<img src="../../../static/images/temp/nores_03.png" style="transform: translate(0,15%);" />
						</div>
					</div>
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<div class="modular-box" style="min-height:300px;margin-bottom: 20px;" v-if="havepers == 1">
						<h3><i class="icon icon-info"></i>公寓管理</h3>
						<ul class="apartment-list workbens" v-if="show1">
							<li>
								<!-- <Badge :count="messsaget[5]" v-if='messsaget[5]'></Badge> -->
								<a @click="eliminat(5,0)">看房预约</a>

							</li>
							<li>
								<router-link :to="{path:'/signed/lodgingHouse',query:{communityId:communityId,Name:selectModel1}}">公寓签约</router-link>
							</li>
							<li>
								<router-link :to="{path:'/signed/houseState',query:{communityId:communityId,Name:selectModel1}}">公寓状态</router-link>
							</li>
							<!-- <li v-if="userType">
								<router-link :to="{path:'/signed/shortTerm',query:{communityId:communityId,Name:selectModel1}}">短租房状态</router-link>
							</li> -->
							<li v-if="jurisdiction('LIVE_QUERY')">
								<router-link  to="/Liverecording/recording">直播管理</router-link>
							</li>
							<li v-if="jurisdiction('BILL_QUERY')">
								<!-- <Badge :count="messsaget[2]" v-if='messsaget[2]'></Badge> -->
								<a @click="eliminateg(2)">公寓租金账单</a>
							</li>
							<li v-if="jurisdiction('BILL_QUERY')">
								<!-- <Badge :count="messsaget[6]" v-if='messsaget[6]'></Badge> -->
								<a @click="eliminate6(6)">公寓水电帐单</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[12]" v-if='messsaget[12]'></Badge> -->
								<router-link :to="{path:'/signed/repairs',query:{communityId:this.communityId,Name:this.selectModel1,type:0}}">用户报修</router-link>
							</li>
							<li v-if="jurisdiction('CONTRACT_QUERY')">
								<!-- <Badge :count="messsaget[4]" v-if='messsaget[4]'></Badge> -->
								<a @click="eliminateg4(4)">合同管理</a>
							</li>
							<li>
								<router-link :to="{path:'/signed/surrender',query:{communityId:communityId,Name:selectModel1}}">退租管理</router-link>
							</li>
							<li>
								<!-- <Badge :count="messsaget[8]" v-if='messsaget[8]'></Badge> -->
								<a @click="eliminate8(8)">发起退款</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[7]" v-if='messsaget[7]'></Badge> -->
								<a @click="eliminate7(7)">发起收款</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[13]" v-if='messsaget[13]'></Badge> -->
								<a @click="eliminate13(13)">用户投诉</a>
							</li>
							<li>
								<router-link :to="{path:'/signed/artificialCertification',query:{communityId:communityId,Name:selectModel1}}">人工认证</router-link>
							</li>
						</ul>
					</div>
					</Col>
					<Col span="12">
					<div class="modular-box" style="min-height:300px;" v-if="havepers === 1">
						<h3><i class="icon icon-info"></i>联合办公管理</h3>
						<ul class="apartment-list workbens" v-if="show2">
							<li>
								<!-- <Badge :count="messsaget[5]" v-if='messsaget[5]'></Badge> -->
								<a @click="eliminat(5,1)">看房预约</a>
							</li>
							<li>
								<router-link :to="{path:'/signed/lodgingwork',query:{communityId:communityId,Name:selectModel1}}">联合办公签约</router-link>
							</li>
							<li>
								<router-link :to="{path:'/signed/workState',query:{id:communityId,Name:selectModel1}}">办公空间状态</router-link>
								<!-- <router-link to="/apartment/workbench" v-else>办公空间状态</router-link> -->
							</li>
							<li v-if="jurisdiction('LIVE_QUERY')">
								<router-link  to="/Liverecording/recording">直播管理</router-link>
							</li>
							<li v-if="jurisdiction('BILL_QUERY')">
								<!-- <Badge :count="messsaget[2]" v-if='messsaget[2]'></Badge> -->
								<a @click="eliminateb(2)">办公租金账单</a>
							</li>
							<li v-if="jurisdiction('ORDER_QUERY')">
								<!-- <Badge :count="messsaget[3]" v-if='messsaget[3]'></Badge> -->
								<a @click="eliminate3(3)">办公订单</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[12]" v-if='messsaget[12]'></Badge> -->
								<router-link :to="{path:'/signed/repairs',query:{communityId:this.communityId,Name:this.selectModel1,type:1}}">用户报修</router-link>
							</li>
							<li v-if="jurisdiction('CONTRACT_QUERY')">
								<!-- <Badge :count="messsaget[4]" v-if='messsaget[4]'></Badge> -->
								<a @click="eliminateb4(4)">合同管理</a>
							</li>
							<li>
								<router-link :to="{path:'/signed/surrender',query:{communityId:communityId,Name:selectModel1}}">退租管理</router-link>
							</li>
							<li>
								<!-- <Badge :count="messsaget[8]" v-if='messsaget[8]'></Badge> -->
								<a @click="eliminate8(8)">发起退款</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[7]" v-if='messsaget[7]'></Badge> -->
								<a @click="eliminate7(7)">发起收款</a>
							</li>
							<li>
								<!-- <Badge :count="messsaget[13]" v-if='messsaget[13]'></Badge> -->
								<a @click="eliminate13(13)">用户投诉</a>
							</li>
							<li>
								<router-link to="/signed/artificialCertification">人工认证</router-link>
							</li>
						</ul>
					</div>
					</Col>
				</Row>
			</div>
			<div class="newdatas">
				<h3>今日待办</h3>
				<ul class="remain-list" v-if="show3 == 1 && remains">
					<li v-if="remains.appointmentCount != 0">
						<router-link :to="{path:'/signed/housesubscribe',query:{communityId:communityId,Name:selectModel1}}">新增看房预约<span><span>{{remains.appointmentCount}}人</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.roomCount != 0">
						<router-link to="/bill/billManagement">待收公寓租金<span>{{remains.roomCount}}笔<span>{{remains.roomMoney | roomMoney}}</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.officeCount != 0">
						<router-link to="/bill/billManagement">待收联合办公租金<span>{{remains.officeCount}}笔<span>{{remains.officeMoney | officeMoney}}</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.waterEnergyCount != 0">
						<router-link :to="{ name:'billManagement',query:{tab:'third'}}">待收水电账单<span>{{remains.waterEnergyCount}}笔<span>{{remains.waterEnergyMoney | waterEnergyMoney}}</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.repairCount != 0">
						<router-link :to="{path:'/signed/repairs',query:{communityId:communityId,Name:selectModel1}}">用户报修<span><span>{{remains.repairCount}}人</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.rentCount != 0">
						<router-link :to="{path:'/signed/surrender',query:{communityId:communityId,Name:selectModel1}}">用户退房<span><span>{{remains.rentCount}}人</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.expireCount != 0">
						<router-link to="/contract/contractIndex">合同即将到期<span><span>{{remains.expireCount}}户</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.beginHour">
						<router-link to="/Liverecording/recording">今日直播时间<span><span> {{remains.beginHour | time}}</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
					<li v-if="remains.complaintCount != 0">
						<router-link :to="{path:'/signed/complain',query:{communityId:communityId,Name:selectModel1}}">待处理用户投诉<span><span>{{remains.complaintCount}}人</span></span>
						</router-link><i class="iconfont icon-you"></i></li>
				</ul>
				<div class="muvs" v-else-if="show3 == 2">
					<img src="../../../static/images/temp/nores_06.png" style="margin-left:50%;transform: translate(-50%,0);padding:40px 0;"/>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { hostAppMgCxkjCo, hostgCxkjCommun, hostaCommunityCo, hostPcMessage,hostReadMessage,hostessageUpdate,hostUserMessagey,MllCommunity300145 } from '../api.js';
	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				item2: true,
				cityList: [],
				selectModel1: null,
				model1: '123',
				datas: [{
					classD: "backOrange",
					title: "昨日收款",
					num: "",
					prc:'￥'
				}, {
					classD: "backGreen",
					title: "待收账单",
					num: "",
					prc:'￥'
				}, {
					classD: "backBlue",
					title: "昨日业绩",
					num: ""
				}],
				myInfos: null,

				remains: null,
				communityId: null,
				user: {
					name: '',
					quanxian: ''
				},
				type:'',
				messsaget:null,
				show1:false,
				show2:false,
				show3:1,
				userType:false,
				havepers:1
			}
		},
		mounted() {

          if(sessionStorage.getItem('urlType') && ( sessionStorage.getItem('urlType') == '测试'|| sessionStorage.getItem('urlType') == '研发')){
            this.userType = true
		  }
		  let Model = sessionStorage.getItem('communityId');
		  if(Model){
			this.communityId = Model;
			this.title(Model);
		  }
			this.mtsbv();
			this.datas2();
		},
		filters: {
			roomMoney(val) {
				if(val != null) {
					return val.toFixed(2) + '元';
				}
			},
			officeMoney(val) {
				if(val != null) {
					return val.toFixed(2) + '元';
				}
			},
			waterEnergyMoney(val) {
				if(val != null) {
					return val.toFixed(2) + '元';
				}
			},
			types(val){
    			if(val == 1){
    				return '系统消息'
    			}
    			else if(val == 2){
    				return '账单消息'
    			}
    			else if(val == 3){
    				return '办公订单消息'
    			}
    			else if(val == 4){
    				return '合同消息'
    			}
    			else if(val == 5){
    				return '预约消息'
    			}
    			else if(val == 6){
    				return '水电账单消息'
    			}
    			else if(val == 7){
    				return '管家收款消息'
				}
				else if(val == 8){
    				return '管家退款消息'
				}
				else if(val == 9){
    				return '优惠券消息'
				}
				else if(val == 10){
    				return '现金券消息'
				}
				else if(val == 11){
    				return '红包消息'
				}
				else if(val == 12){
    				return '报修消息'
				}
				else if(val == 13){
    				return '投诉消息'
				}
				else if(val == 14){
    				return '呼叫管家消息'
				}
				else if(val == 15){
    				return '发票消息'
    			}
			},
			time(val){
				if(val){
					return new Date(val).Format('hh:mm');
				}
			},
			times(val){
				if(val){
					return new Date(val).Format('yyyy-MM-dd hh:mm');
				}
			}
		},
		methods: {
			communityIdm(data){
				// console.log(data);
				this.havepers = data.havepers;
				// console.log(this.havepers);
				if(data.communityId && data.havepers == 1){
					this.communityId = data.communityId;
					this.title(data.communityId);
				}else{
					this.datas[0].num = '0.00';
					this.datas[1].num = '0.00';
					this.datas[2].num = '0笔';
					this.show3 = 2;
				}
			},
      temp(val){
        let Index = this.cityList[this.cityList.findIndex(item => item.communityName == val)].communityId;
        // console.log(val);
        sessionStorage.setItem('communityId', Index);
        sessionStorage.setItem('communityName', val);
        this.title();
      },
			datas2(){
				axios.post(hostUserMessagey)
				.then((res)=>{
					//console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						// this.nums = res.data.entity.messageCount;
						sessionStorage.setItem('nums', res.data.entity.messageCount);
					}
				}).catch((err)=>{
					// console.log(err);
				})
			},
			title(Model) {
				let vm = this
				// console.log(Model);
					axios.post(MllCommunity300145).then((response) => { //获取社区分类数据
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.cityList = response.data.pageBean;
						// console.log(this.cityList);
						vm.type = this.cityList[this.cityList.findIndex(item => item.communityId == Model)].communityType;
						vm.selectModel1 = this.cityList[this.cityList.findIndex(item => item.communityId == Model)].communityName;
						let arr = vm.type.split(',');
						// console.log(arr);
						for(let i=0;i<arr.length;i++){
							if(arr[i] == 0 && arr.length == 1){
								this.show1 = true;
								this.show2 = false;
							}
							else if(arr[i] == 1 && arr.length == 1){
								this.show1 = false;
								this.show2 = true;
							}
							else if(arr.length == 2){
								this.show1 = true;
								this.show2 = true;
							}
						}
					}
					})
					.catch((error) => {
						// console.log(error);
					})
					this.mtsbv();
					axios.post(hostgCxkjCommun, //获取管家收款数据
						qs.stringify({
							communityId: Model
						})
					).then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.datas[0].num = parseFloat(response.data.result.yesterdayPay).toFixed(2);
							this.datas[1].num = parseFloat(response.data.result.todayWaitPay).toFixed(2);
							this.datas[2].num = response.data.result.yesterdayCount + '笔';
						}
					})
					.catch((error) => {
						// console.log(error);
					})

					axios.post(hostaCommunityCo, //获取今日待办数据
						qs.stringify({
							communityId: Model
						})
					).then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.remains = response.data.result;
							if(this.remains.appointmentCount == 0 && this.remains.roomCount == 0 && this.remains.officeCount == 0 && this.remains.waterEnergyCount == 0 && this.remains.repairCount == 0 && this.remains.rentCount == 0 && this.remains.expireCount == 0 && this.remains.beginHour == '' && this.remains.complaintCount == 0){
								vm.show3 = 2;
							}else{
								vm.show3 = 1;
							}
						}

					})
					.catch((error) => {
						// console.log(error);
					})

			},
			mtsbv(){
				axios.post(hostReadMessage).then((res)=>{
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						// for(let k in res.data.entity){
						// 	vm.$set(this.messsaget,k,res.data.entity[k])
						// }
						this.messsaget = res.data.entity;
						// console.log(this.messsaget);
					}
				}).catch((err)=>{
					// console.log(err);
				})

				axios.post(hostPcMessage,
					qs.stringify({
						pageSize:5,
						userType:1
					})
				).then((res)=>{
					//console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.myInfos = res.data.entity.page;
						for(let i = 0;i < this.myInfos.length;i++){
							if(this.myInfos[i].messageType == '1'){
								this.$set(this.myInfos[i], "inco", 'iconfont icon-xiaoxi1');
							}
							else{
								this.$set(this.myInfos[i], "inco", 'iconfont icon-baoxiu');
							}
						}
					}
				}).catch((err)=>{
					// console.log(err);
				})
			},
			share(value){
				// console.log(value);

				axios.post(hostessageUpdate,
					qs.stringify({
						messageType:parseInt(value)
					})
				).then((res)=>{
					// console.log(res.data);
					// console.log(res);
				}).catch((err)=>{
					// console.log(err);
				})
			},
			eliminateg(value){
				// console.log(value);
				this.share(value);
				sessionStorage.setItem("billManagement_communityId",this.communityId);
				this.$router.push({path:'/bill/billManagement',query:{name:'first'}});
				this.datas2();
			},
			eliminateb(value){
				// console.log(value);
				this.share(value);
				sessionStorage.setItem("billManagement_communityId",this.communityId);
				this.$router.push({path:'/bill/billManagement',query:{name:'second'}});
				this.datas2();
			},
			eliminat(value,num){
				this.share(value);
				let isOffice = num
				this.$router.push({path:'/signed/housesubscribe',query:{communityId:this.communityId,Name:this.selectModel1,isOffice:isOffice}});
				this.datas2();
			},
			eliminate6(value){
				this.share(value);
				sessionStorage.setItem("billManagement_communityId",this.communityId);
				this.$router.push({name:'billManagement',query:{tab:'third'}});
				this.datas2();
			},
			eliminateg4(value){
				this.share(value);
				sessionStorage.setItem("contractIndexTab",'room');
				this.$router.push('/contract/contractIndex');
				this.datas2();
			},
			eliminateb4(value){
				this.share(value);
				sessionStorage.setItem("contractIndexTab",'office');
				this.$router.push('/contract/contractIndex');
				this.datas2();
			},
			eliminate8(value){
				this.share(value);
				this.$router.push({path:'/signed/refundrecord',query:{communityId:this.communityId,Name:this.selectModel1}});
				this.datas2();
			},
			eliminate7(value){
				this.share(value);
				this.$router.push({path:'/signed/gathering',query:{communityId:this.communityId,Name:this.selectModel1}});
				this.datas2();
			},
			eliminate13(value){
				this.share(value);
				this.$router.push({path:'/signed/complain',query:{communityId:this.communityId,Name:this.selectModel1}});
				this.datas2();
			},
			eliminate3(value){
				this.share(value);
				this.$router.push({name: 'orderManagement'});
				this.datas2();
			},
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/page/_workbench.scss';
	.ivu-row {
		margin: 20px -10px 0;
		overflow: hidden;
		.ivu-col-span-12 {
			padding: 0 10px;
			width: 70%;
		}
	}
	// #rightwork{
	// 	margin-left: 240px;
	//     position: relative;
	//     padding-bottom: 160px;
	// 	min-height: 1200px;
	// 	background-color: #f0f0f0!important;
	// }
	.workbens li{
		position: relative;
	}
	.workbens .ivu-badge{
		position: absolute;
		right: 50px;
    	top: 15px;
	}
	.workbens .ivu-badge .ivu-badge-count{
		padding: 0;
	}
	.woram{
		min-height:1020px;
		background-color: #f0f0f0;
	}
	.infoState{
		width: 120px;
	}
	.newdatas{
		width: 28%;
		position: absolute;
		right: 0;
		top: 200px;
		margin-right: 20px;
		padding-bottom: 20px;
		background: #ffffff;
		h3{
				height: 50px;
				line-height: 50px;
				background: #00afcc;
				font-size: 16px;
				color: #ffffff;
				padding-left: 18px;
		}
		.remain-list{
			padding: 0 15px;
			li{
			line-height: 43px;
			border-top: 1px dashed #dcdcdc;
			position: relative;
			padding-right: 25px;
			&:first-child{
				border-top: none;
			}
			&:hover{
				background-color: #f7fbff;
				a{
				color:#00afcc;
				&:after{
					background-color: #329cf6;
				}
				}
			}
			a{
				display: block;
				color:#333;
				padding-left: 20px;
				&:after{
				content: "";
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -2.5px;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: #999;
				}
				&>span{
				position: absolute;
				right:30px;
				top: 0;
				color:#00afcc;
				span{
					margin-left: 15px;
					color:#f9ce34;
				}
				}
			}
			.icon-you{
				position: absolute;
				right: 0;
				top: 0;
				font-size: 18px;
				color:#bebebe;
			}
			}
		}
	}
</style>
