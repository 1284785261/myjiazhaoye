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
										<Input v-model="vague" placeholder="搜索社区名称"></Input>
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
											<dd>物业合同截止：<span> {{item.communityLeaseEnd | imata}}</span></dd>
											<dd>地址：
												<span v-if="item.province.areaName == item.city.areaName"> {{item.province.areaName + item.district.areaName +item.communityAddress}}</span>
												<span v-else> {{item.province.areaName + item.city.areaName + item.district.areaName +item.communityAddress}}</span>
											</dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.cxkjCommunityListHousetypeSize}}套</span></dd>
											<dd>工位：
												<span v-if="item.cxkjCommunityPlaceSize != null">{{item.cxkjCommunityPlaceSize}}套</span>
												<span v-else>0套</span>
											</dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd v-if="item.shopkeeper != null">店长：<span> {{item.shopkeeper.userName}}</span></dd>
											<dd v-else>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd v-if="item.shopkeeper != null">店长联系电话：<span> {{item.shopkeeper.userPhone}}</span></dd>
											<dd v-else>店长联系电话：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.cxkjCommunityListUserRelationSize}}人</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd><p v-if="item.communityType == 0"><span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
												<span v-else>公寓付款方式：未设置</span></p>
												<p v-else-if="item.communityType == 1"><span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
												<span v-else>办公付款方式：未设置</span></p>
												<p v-else-if="item.communityType == 0,1">
												<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
												<span v-else>公寓付款方式：未设置</span><br>
												<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
												<span v-else>办公付款方式：未设置</span>
												</p>
											</dd>
											<dd v-if="item.serviceCost != null">服务费：<span>  {{item.serviceCost}}元/月</span></dd>
											<dd v-else>服务费：<span>  未设置</span></dd>
											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId,Name:item.communityName}}">社区介绍</router-link>
										<router-link :to="{path:'/communityHouse',query:{communityId:item.communityId}}">资源管理</router-link>
										<router-link :to="{path:'/apartment/communitySettings',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区设置</router-link>
										<router-link :to="{name:'equipmentManage',query:{communityId:item.communityId}}">设备管理</router-link>
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
										<Input v-model="vague" placeholder="搜索社区名称"></Input>
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
											<dd>物业合同截止：<span> {{item.communityLeaseEnd | imata}}</span></dd>
											<dd>地址：
												<span v-if="item.province.areaName == item.city.areaName"> {{item.province.areaName + item.district.areaName +item.communityAddress}}</span>
												<span v-else> {{item.province.areaName + item.city.areaName + item.district.areaName +item.communityAddress}}</span>
											</dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.cxkjCommunityListHousetypeSize}}套</span></dd>
											<dd>工位：
												<span v-if="item.cxkjCommunityPlaceSize != null">{{item.cxkjCommunityPlaceSize}}套</span>
												<span v-else>0套</span>
											</dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd v-if="item.shopkeeper != null">店长：<span> {{item.shopkeeper.userName}}</span></dd>
											<dd v-else>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd v-if="item.shopkeeper != null">店长联系电话：<span> {{item.shopkeeper.userPhone}}</span></dd>
											<dd v-else>店长联系电话：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.cxkjCommunityListUserRelationSize}}人</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd><p v-if="item.communityType == 0"><span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
												<span v-else>公寓付款方式：未设置</span></p>
												<p v-else-if="item.communityType == 1"><span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
												<span v-else>办公付款方式：未设置</span></p>
												<p v-else-if="item.communityType == 0,1">
												<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
												<span v-else>公寓付款方式：未设置</span><br>
												<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
												<span v-else>办公付款方式：未设置</span>
												</p>
											</dd>
											<dd v-if="item.serviceCost != null">服务费：<span>  {{item.serviceCost}}元/月</span></dd>
											<dd v-else>服务费：<span>  未设置</span></dd>
											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId,Name:item.communityName}}">社区介绍</router-link>
										<router-link :to="{path:'/communityHouse',query:{communityId:item.communityId}}">资源管理</router-link>
										<router-link :to="{path:'/apartment/communitySettings',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区设置</router-link>
										<router-link :to="{name:'equipmentManage',query:{communityId:item.communityId}}">设备管理</router-link>
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
									<Select v-model="model1" style="width:200px">
										<Option v-for="community in  communitys" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
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
										<Input v-model="searchKey" placeholder="搜索用户"></Input>
										<input type="button" value="搜索" @click="handleCurrentChange3()">
										<!--<a class="exports" :href="host+communityId">导出</a>-->
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
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
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
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import { hostAuthor, hostCommint, hostOpen, allCommunity, hostComment, host } from '../api.js';
	import axios from 'axios';
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
				currentPage1: 1,
				communitys: [{
					communityId: -1,
					communityName: '全部'
				}], //社区介绍社区分类
				model1: -1,
				isShow: false,
				tableEvaluates: [],
				host3: '',
				commint: [], //社区管理全部数据展示
				commint2: [], //已关闭社区数据
				pageNum: 1, //第几页的数据
				pageNum2: 1, //已关闭社区第几页的数据
				pageNum3: 1, //社区评价第几页
				totalNum: null, //数据总条数
				totalNum2: null, //已关闭社区数据条数
				totalNum3: null, //社区评价数据条数
				pageSize: 3, //每页显示的数据数量
				community: {
					Close: null,
					id: 0,
					Name: '佳兆业'
				}, //确定后需要的参数
				start: null, //模糊查询开业开始时间
				over: null, //模糊查询开业关闭时间
				vague: null, //模糊查询内容
				valu: null,
				createtimes: null,
				commentDate: null,
				communityId: null,
				chack: false,
				chack2: false,
				searchKey: '',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
			}
		},
		filters: { //过滤器
			Fors(data) {
				if(data == false) {
					return '未设置';
				} else if(data == true) {
					return '已设置';
				}
			},
			Form(data) {
				if(data == '0,1') {
					return '公寓+办公室'
				} else if(data == '0') {
					return '公寓'
				} else if(data == '1') {
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
			hubs(val) {
				if(val == '0') {
					return '关闭社区';
				} else if(val == '1') {
					return '开放社区';
				}
			},
			mv(val) {
				if(val == '1') {
					return '关闭';
				} else if(val == '0') {
					return '开放';
				}
			},
			createtime(val) {
				if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					var H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
					var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
					var ss = ((date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()));
					return Y + M + D + '   ' + H + mm + ss;
				}
				return null;
			},
			timefilter(value, format) {
				if(value) {
					return new Date(value).Format(format)
				}
			},
			payment(val){
				let arr = [];
				let arr2 = [];
				arr = val.split(','); 
				for(let i = 0;i<arr.length;i++){
					if(arr[i] == '1'){
						arr2.push('押二付一');
					}
					if(arr[i] == '2'){
						arr2.push('押一付一');
					}
					if(arr[i] == '3'){
						arr2.push('季付');
					}
					if(arr[i] == '4'){
						arr2.push('年付');
					}
				}
				return arr2.join(',');
			},
			paymentOffice(val){
				let arr = [];
				let arr2 = [];
				arr = val.split(','); 
				for(let i = 0;i<arr.length;i++){
					if(arr[i] == '1'){
						arr2.push('押二付一');
					}
					if(arr[i] == '2'){
						arr2.push('押一付一');
					}
					if(arr[i] == '3'){
						arr2.push('季付');
					}
					if(arr[i] == '4'){
						arr2.push('年付');
					}
				}
				return arr2.join(',');
			}
		},

		mounted() {
			//初始化数据
			//console.log(111)
			//    		this.host3 = host+'/cxkj-room/apis/pc/communityMgrDownload/CxkjCommunityCommentDownload200071?communityId='
			this.befor();
			this.befors();
			this.classifys();
			this.comment({
				pageNum: 1
			});
		},
		methods: {
			classifys() {
				axios.post(allCommunity).then((response) => { //获取社区分类数据
						//console.log(111);
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.communitys = this.communitys.concat(response.data.entity);
						}

					})
					.catch((error) => {
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
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint = response.data.result.communityData.page;
							vm.totalNum = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			btns() { //模糊搜索数据
				let vm = this
				vm.commint = [];
				let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
				this.start = new Date(this.start).Format('yyyy-MM-dd');
				this.over = new Date(this.over).Format('yyyy-MM-dd');
				axios.post(hostCommint, //请求数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over,
							communityLikeName: vm.vague
						})).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.chack = true;
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
				let pageNum = vm.pageNum2 || 1;
				let pageSize = vm.pageSize || 3;
				axios.post(hostCommint, //请求已关闭社区数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityIsClose: 1
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			bitch() { //条件查询分页
				let vm = this
				//console.log(1111)
				let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
				this.start = new Date(this.start).Format('yyyy-MM-dd');
				this.over = new Date(this.over).Format('yyyy-MM-dd');
				axios.post(hostCommint,
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over,
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint = response.data.result.communityData.page;
							vm.totalNum = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			btusy() { //已关闭社区页面模糊查询
				let vm = this
				vm.commint2 = [];
				let pageNum = vm.pageNum2 || 1;
				let pageSize = vm.pageSize || 3;

				this.start = new Date(this.start).Format('yyyy-MM-dd');
				this.over = new Date(this.over).Format('yyyy-MM-dd');
				axios.post(hostCommint, //请求数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityIsClose: 1,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over,
							communityLikeName: vm.vague
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.chack2 = true;
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			bitch2() { //查询分页-已关闭页面
				let vm = this
				//console.log(1111)
				let pageNum = vm.pageNum2 || 1;
				let pageSize = vm.pageSize || 3;
				this.start = new Date(this.start).Format('yyyy-MM-dd');
				this.over = new Date(this.over).Format('yyyy-MM-dd');
				axios.post(hostCommint,
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize,
							communityIsClose: 1,
							communityOpeningDate: vm.start,
							communityNewOpeningDate: vm.over
						})
					).then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
			},
			hub(val) { //关闭社区按钮事件
				this.isShow = !this.isShow;
				//console.log(val);
				let vm = this
				if(val.Close == 0) {
					vm.community.Close = 1;
					//					console.log('关闭')
					//					console.log(vm.community.Close)
					//					console.log('关闭')
				} else if(val.Close == 1) {
					vm.community.Close = 0;
					//					console.log('开放')
					//					console.log(vm.community.Close)
					//					console.log('开放')
				}
				this.community.id = val.id;
				this.community.Name = val.Name;
			},
			qsm() { //关闭社区按钮确定
				this.isShow = false;
				let vm = this
				axios.post(hostOpen,
						qs.stringify({
							communityId: vm.community.id,
							communityIsClose: vm.community.Close
						})
					)
					.then((response) => {
						console.log(response)
						if(response.status == 200 && response.data.code == 10000) {
							
							this.successMessage = '操作成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								vm.befor();
								vm.befors();
							}, 2000);
						} else {
							this.warningMessage = response.data.content;
							this.warningModal = true;
						}

					})
					.catch((error) => {
						this.warningMessage = '操作失败,服务器出现异常';
						this.warningModal = true;
					})
			},
			qb() {
				this.isShow = false;
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			handleCurrentChange(val) { //分页事件
				//console.log(`当前页: ${val}`);
				this.pageNum = val;
				if(this.chack == true) {
					this.bitch();
				} else {
					this.befor();
				}

			},
			handleCurrentChange2(val) {
				//console.log(`当前页: ${val}`);
				this.pageNum2 = val;

				if(this.chack2 == true) {
					this.bitch2();
				} else {
					this.befors();
				}

			},
			handleCurrentChange3(page) {
				var data = {
					pageNum: page || 1
				};
				if(this.model1 !== -1) {
					data.communityId = this.model1;
				}
				if(this.createtimes) {
					data.createtime = new Date(this.createtimes).Format("yyyy-MM-dd");
				}
				if(this.commentDate) {
					data.commentDate = new Date(this.commentDate).Format("yyyy-MM-dd");
				}
				if(this.searchKey) {
					data.userNamePhone = this.searchKey;
				}
				this.comment(data);
				//debugger
			},
			comment(data) {
				let vm = this
				axios.post(hostComment,
					qs.stringify(data)
				).then((response) => {
					//debugger
					if(response.status == 200 && response.data.code == 10000) {
						vm.tableEvaluates = response.data.entity.page;
						vm.totalNum3 = response.data.entity.totalNum;
					} else {
						vm.tableEvaluates = [];
						vm.totalNum3 = 0;
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			//			seek(){
			//				let vm = this
			//				axios.post(hostComment,
			//					qs.stringify({
			//						createtime:this.createtime,
			//						commentDate:this.commentDate,
			//						userNameLike:this.valu,
			//						communityId:this.communityId,
			//					})
			//				).then((response)=>{
			//					console.log(response);
			//					if(response.status == 200 && response.data.code == 10000){
			//						alert('搜索成功');
			//						vm.tableEvaluates = response.data.entity.page;
			//						vm.totalNum3 = response.data.entity.totalNum;
			//					}
			//				}).catch((error)=>{
			//					console.log(error);
			//				})
			//			}
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
	
	.message-ti {
		position: relative;
	}
	
	.message-ti .block {
		position: absolute;
		left: 50%;
		margin-top: 120px;
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