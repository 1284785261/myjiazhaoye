<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/communityManagement">社区管理</router-link>

				</div>
				<Tabs type="card">
					<!--<button @click='cs'>clickhgfdhgfdh</button>-->
					<Tab-pane label="社区管理">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">

									<router-link to="/apartment/communityComplie" class="add"><span>+</span>添加社区</router-link>

								</div>
								<div class="form-item">
									<span>开业日期：</span>
									<Date-picker type="date" placeholder="选择日期" v-model="start"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" placeholder="选择日期" v-model="over"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="vague" placeholder="搜索联系人或联系电话"></Input>
										<input type="button" value="搜索" @click="btns()">
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th width="50px;">序号</th>
									<th>社区信息</th>
									<th width="140px;">资源概况</th>
									<th>人员配备</th>
									<th>社区设置</th>
									<th width="175px;">操作</th>
								</tr>
								<tr v-for="(item,index) in commint">
									<td>{{index+1}}</td>
									<td>
										<dl>
											<dt>{{item.communityName}}</dt>
											<dd>社区类型：<span> {{item.communityType | Form(item.communityType)}}</span></dd>
											<dd>开业日期：<span> {{item.communityOpeningDate | imata(item.communityOpeningDate)}}</span></dd>
											<dd>物业合同截止：<span> 2027年6月27日</span></dd>
											<dd>地址：<span> {{item.communityAddress}}</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.cxkjCommunityListHousetypeSize}}套</span></dd>
											<dd>工位：<span>{{item.cxkjCommunityPlaceSize}}套</span></dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd>店长联系电话：<span> <!--{{item.shopkeeper.userPhone}}--></span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.employee}}</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
											<dd>服务费：<span>  {{item.serviceCost}}元/月</span></dd>
											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId}}">社区介绍</router-link>
                    <router-link :to="{path:'/communityHouse',query:{communityId:item.communityId}}">资源管理</router-link>
										<router-link :to="{path:'/apartment/communitySettings',query:{id:item.communityId}}">社区设置</router-link>
										<a href="javascript:;">设备管理</a>
										<a href="javascript:;" @click="hub(community={id:item.communityId,Close:item.communityIsClose,Name:item.communityName})">{{item.communityIsClose | hubs(item.communityIsClose)}}</a>
									</td>
								</tr>

							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total=totalNum>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>

					<Tab-pane label="已关闭的社区">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">
									<span>开业日期：</span>
									<Date-picker type="date" placeholder="选择日期" v-model="start"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" placeholder="选择日期" v-model="over"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="vague" placeholder="搜索联系人或联系电话"></Input>
										<input type="button" value="搜索" @click="btusy">
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th width="50px;">序号</th>
									<th>社区信息</th>
									<th width="140px;">资源概况</th>
									<th>人员配备</th>
									<th>社区设置</th>
									<th width="175px;">操作</th>
								</tr>
								<tr v-for="(item,index) in commint2">
									<td>{{index+1}}</td>
									<td>
										<dl>
											<dt>{{item.communityName}}</dt>
											<dd>社区类型：<span> {{item.communityType | Form(item.communityType)}}</span></dd>
											<dd>开业日期：<span> {{item.communityOpeningDate | imata(item.communityOpeningDate)}}</span></dd>
											<dd>物业合同截止：<span> 2027年6月27日</span></dd>
											<dd>地址：<span> {{item.communityAddress}}</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.cxkjCommunityListHousetypeSize}}套</span></dd>
											<dd>工位：<span>{{item.cxkjCommunityPlaceSize}}套</span></dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>店长：<span>item.shopkeeper.userName</span></dd>
											<dd>店长联系电话：<span>item.shopkeeper.userPhone</span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.employee}}</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
											<dd>服务费：<span>  {{item.serviceCost}}元/月</span></dd>
											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId}}">社区介绍</router-link>
										<router-link to="/communityHouse">资源管理</router-link>
										<router-link to="/apartment/communitySettings">社区设置</router-link>
										<a href="javascript:;">设备管理</a>
										<a href="javascript:;" @click="hub(community={id:item.communityId,Close:item.communityIsClose,Name:item.communityName})">开放社区</a>
									</td>
								</tr>

							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange2" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total=totalNum2>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>

					<Tab-pane label="社区评价">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">
									<b>社区：</b>
									<Select v-model="model1" style="width:200px" @on-change="tems(model1)">
										<Option v-for="community in  communitys" :value="community.communityName" :key="community.communityName">{{ community.communityName }}</Option>
									</Select>
								</div>
								<div class="form-item">
									<span>评价时间：</span>
									<Date-picker type="date" placeholder="选择日期" v-model="createtimes"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" placeholder="选择日期" v-model="commentDate"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search" style="margin-left: 0;">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="valu" placeholder="搜索用户"></Input>
										<input type="button" value="搜索" @click="seek">
										<Button class="ivu-btn-export">导出</Button>
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th>评价时间</th>
									<th style="text-align: center">社区</th>
									<th style="text-align: center">用户</th>
									<th style="text-align: center">订单/账单</th>
									<th>评价内容</th>
									<th>操作</th>
								</tr>
								<tr v-for="tableEvaluate in tableEvaluates">
									<td><span class="text-default">{{tableEvaluate.createtime | createtime}}</span></td>
									<td style="text-align: center"><span class="text-black">{{tableEvaluate.cxkjCommunity.communityName}}</span></td>
									<td style="text-align: center"><span class="text-black">{{tableEvaluate.userInfo.userName}}</span></td>
									<td style="text-align: center">
										<span class="text-default" v-if="tableEvaluate.cxkjBill != null">{{tableEvaluate.cxkjBill.billName}}</span>
										<span class="text-default" v-if="tableEvaluate.cxkjOfficeOrder != null">{{tableEvaluate.cxkjOfficeOrder.orderName}}</span>
										<span class="text-default" v-else>--</span>
									</td>
									<td><span class="text-black">{{tableEvaluate.content}}</span></td>
									<td>
										<router-link :to="{path:'/apartment/commentdetails',query:{id:tableEvaluate.commentId}}">查看详情</router-link>
									</td>
								</tr>
							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange3" :current-page="currentPage1" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum3>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>

				</Tabs>
			</div>
			<footer-box></footer-box>
		</div>
		<div class="lose" v-show="isShow">
			<span>确认<i>{{community.Close | mv(community.Close)}}</i>以下社区吗？</span>
			<p>{{community.Name}}</p>
			<a @click="qsm()">确定</a>
			<a @click="qb()">取消</a>
		</div>
		<div class="zhezhao" v-show="isShow">

		</div>
	</div>

</template>

<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import { hostAuthor, hostCommint,hostOpen,allCommunity,hostComment } from '../api.js';
	import axios from 'axios';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				currentPage1: 1,
				communitys: [],   //社区介绍社区分类
				model1: '',
				isShow: false,
				tableEvaluates: [],
				commint: [], //社区管理全部数据展示
				commint2:[], //已关闭社区数据
				pageNum: 1, //第几页的数据
				pageNum2: 1, //已关闭社区第几页的数据
				pageNum3: 1,  //社区评价第几页
				totalNum: null, //数据总条数
				totalNum2:null, //已关闭社区数据条数
				totalNum3:null,  //社区评价数据条数
				pageSize: 3, //每页显示的数据数量
				community:{
					Close:null,
					id:0,
					Name:'佳兆业'
				}, //确定后需要的参数
				start:null,   //模糊查询开业开始时间
				over:null,   //模糊查询开业关闭时间
				vague:null, //模糊查询内容
				valu:null,
				createtimes:null,
				commentDate:null,
				communityId:null
			}
		},
		filters: { //过滤器
			Fors(data) {
				if(data == false) {
					return '未设置';
				}
				else if(data == true) {
					return '已设置';
				}
			},
			Form(data) {
				if(data == '0,1') {
					return '公寓+办公室'
				}
				else if(data == '0') {
					return '公寓'
				}
				else if(data == '1') {
					return '办公室'
				}
			},
			imata(ms) {
				//console.log(ms);
				if(ms != null) {
					var date = new Date(ms);
					var Y = date.getFullYear() + '年';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
					return Y + M + D;

				}
				return null;
			},
			hubs(val){
				if(val == '0'){
					return '关闭社区';
				}
				else if(val == '1'){
					return '开放社区';
				}
			},
			mv(val){
				if(val =='1'){
					return '关闭';
				}
				else if(val =='0'){
					return '开放';
				}
			},
			createtime(val){
				if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
					var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
					var ss = ((date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds()));
					return Y + M + D +'   '+ H + mm + ss;
				}
				return null;
			}
		},

		mounted() {
			 //初始化数据
			//console.log(111)
			this.befor();
			this.befors();
			this.classifys();
			this.comment();
		},
		methods: {
			classifys(){
				axios.post(allCommunity).then((response)=>{   //获取社区分类数据
					//console.log(111);
	  	 			//console.log(response);
	  	 			if(response.status == 200 && response.data.code == 10000){
	  	 				this.communitys = response.data.entity;
		  	 			this.model1 =this.communitys[0].communityName;
	  	 			}
		  	 		
		  	 	})
		  	 	.catch((error)=>{
		  	 		console.log(error);
		  	 	})
			},
			befor() {
				let vm = this
				//console.log(1111)
				vm.commint = [];
				let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
				axios.post(hostCommint, //请求数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000){
							vm.commint = response.data.result.communityData.page;
							vm.totalNum = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			btns(){       //模糊搜索数据
				let vm = this
				vm.commint = [];
				let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
				axios.post(hostCommint, //请求数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over,
							communityLikeName:vm.vague
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000){
							vm.commint = response.data.result.communityData.page;
							vm.totalNum = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			befors() {
				let vm = this
				//console.log(1111)
				let pageNum2 = vm.pageNum2 || 1;
				let pageSize = vm.pageSize || 3;
				axios.post(hostCommint, //请求已关闭社区数据列表
						qs.stringify({
							pageNum2: pageNum2,
							pageSize: pageSize,
							communityIsClose:1
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000){
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			btusy(){  //已关闭社区页面模糊查询
				let vm = this
				vm.commint2 = [];
				let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
				axios.post(hostCommint, //请求数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityIsClose:1,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over,
							communityLikeName:vm.vague
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000){
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			hub(val) {   //关闭社区按钮事件
				this.isShow = !this.isShow;
				//console.log(val);
				let vm = this
				if(val.Close == 0){
					vm.community.Close = 1;
					console.log('关闭')
					console.log(vm.community.Close)
					console.log('关闭')
				}
				else if(val.Close == 1){
					vm.community.Close = 0;
					console.log('开放')
					console.log(vm.community.Close)
					console.log('开放')
				}
				this.community.id=val.id;
				this.community.Name=val.Name;
			},
			qsm(){     //关闭社区按钮确定
				this.isShow = false;
				let vm= this
				axios.post(hostOpen,
						qs.stringify({
							communityId:vm.community.id,
							communityIsClose:vm.community.Close
						})
				)
				.then((response)=>{
					//console.log(response)
					vm.befor();
					vm.befors();
					alert('操作成功');
				})
				.catch((error)=>{
					alert('操作失败');
				})
			},
			qb() {
				this.isShow = false;
			},
			handleCurrentChange(val) { //分页事件
				//console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.befor();
			},
			handleCurrentChange2(val) {
				//console.log(`当前页: ${val}`);
				this.pageNum2 = val;
				this.befors();
			},
			handleCurrentChange3(val){
				this.pageNum3 = val;
			},
			comment(){
				let vm= this
				axios.post(hostComment,
					qs.stringify({
						pageNum:vm.pageNum
					})
				).then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						vm.tableEvaluates = response.data.entity.page;
						vm.totalNum3 = response.data.entity.totalNum;
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			tems(val){
				console.log(val);
				let Index =this.communitys[this.communitys.findIndex(item => item.communityName == val)].communityId;
		 		console.log(Index);
		 		this.communityId = Index;
			},
			seek(){
				let vm = this
				axios.post(hostComment,
					qs.stringify({
						createtime:this.createtime,
						commentDate:this.commentDate,
						userNameLike:this.valu,
						communityId:this.communityId,
					})
				).then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						vm.tableEvaluates = response.data.entity.page;
						vm.totalNum3 = response.data.entity.totalNum;
					}
				}).catch((error)=>{
					console.log(error);
				})
			}
		},

	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';
	.form-item .add {
		display: inline-block;
		width: 140px;
		height: 34px;
		border-radius: 5px;
		border: 1px solid #038be2;
		text-align: center;
		line-height: 34px;
		font-size: 12px;
		font-weight: bold;
		span {
			font-size: 16px;
		}
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #666;
		opacity: 0.5;
		z-index: 999;
	}

	.lose {
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 280px;
		height: 180px;
		border-radius: 10px;
		background: #fff;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.lose span {
		display: block;
		font-size: 12px;
		margin-top: 42px;
		margin-bottom: 18px;
	}

	.lose span i {
		font-style: normal;
		font-size: 10px;
		margin: 0 5px;
		color: #038be2;
	}

	.lose p {
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 35px;
	}

	.lose a {
		display: inline-block;
		width: 90px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		border-radius: 5px;
	}

	.lose a:nth-child(3) {
		background: #038be2;
		color: white;
		margin-right: 20px;
	}

	.lose a:nth-child(4) {
		background: #f8f8f8;
		color: #666;
		border: 1px solid #dcdcdc;
	}
	.message-ti{
		position: relative;
	}
	.message-ti .block {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.message-ti .block .el-pagination {
		text-align: center;
		margin-top: 40px;
	}

	.message-ti .block .el-pagination .el-pager .number {
		margin: 0 5px;
		border: 1px solid #DCDCDC;
	}

	.message-ti .block .el-pagination button {
		border: 1px solid #DCDCDC;
	}
</style>
