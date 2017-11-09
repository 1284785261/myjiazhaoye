<template>
	<div class="bugbox">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/apartment/workbench">发起收款记录</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>发起收款记录</h3>
					<span>{{Name}}</span>
				</div>
				<div id="gethering">
					<div class="residentlist">
						<a @click="mvvs()">发起收款</a>
						<span class="zhut">状态：</span>
						<el-select v-model="value" placeholder="请选择" @change="select(value)">
							<el-option v-for="item in options" :key="item.dataname" :value="item.dataname">
							</el-option>
						</el-select>
						<span class="zhut">发起时间：</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
						<span class="inline-block spanBar zhut2">—</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseEnd"></Date-picker>
						<div class="form-search">
							<i class="iconfont icon-sousuo"></i>
							<Input v-model="values" placeholder="搜索收款对象/手机号"></Input>
							<input type="button" value="搜索" @click="seek">
						</div>

					</div>
					<div v-if="Datas != null">
						<table>
							<thead>
								<td>订单号</td>
								<td>发起时间</td>
								<td>收款对象</td>
								<td>收款对象注册手机号</td>
								<td>金额/元</td>
								<td>状态</td>
								<td>收款备注</td>
								<td>操作</td>
							</thead>
							<tr v-for="item in Datas">
								<td>{{item.gatheringNo}}</td>
								<td>{{item.createTime | Date}}</td>
								<td>{{item.userName}}</td>
								<td>{{item.userPhone}}</td>
								<td :class="{'tas':item.gatheringMoney != null}">{{item.gatheringMoney | Money}}</td>
								<td :class="{'tasm':item.gatheringState == 0}">{{item.gatheringState | State}}</td>
								<td v-if="item.gatheringInfo != null">{{item.gatheringInfo}}</td>
								<td v-else>--</td>
								<td>
									<router-link :to="{path:'/signed/gatherDetails',query:{id:item.gatheringId,name:Name}}">查看详情</router-link>
								</td>
							</tr>

						</table>

						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>

						</el-pagination>
					</div>
					<div v-else class="kbt">
						<img src="../../../static/images/icon/kby_03.png" style="margin-top: 150px;">
					</div>
				</div>

			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="shade" v-show="isHide">
		</div>
		<div class="bruin" v-show="isHide">
			<i class="el-icon-circle-close" @click="mvvs()"></i>
			<p>发布收款</p>
			<table>
				<tr>
					<td>用户注册手机号：</td>
					<td>
						<input type="text" placeholder="请输入手机号" v-model="phone" />
					</td>
				</tr>
				<tr>
					<td>收款金额：</td>
					<td>
						<input type="text" placeholder="请输入金额" class="mongs" v-model="money" /><span>元</span>
					</td>
				</tr>
				<tr>
					<td>收款备注：</td>
					<td>
						<textarea placeholder="请输入收款备注" v-model="titl1">
							
						</textarea>
					</td>
				</tr>
			</table>
			<a @click="payment()">向用户收款</a>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/gethering.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostPayment, hostPayment2, hostWay } from '../api.js';
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
				activeTabName:"workbench",
				currentPage3: 1,
				options: [{
					dataname:'全部',
					id:-1
				},{
					dataname:'待支付',
					id:0
				},{
					dataname:'已支付',
					id:1
				}],
				values: null,
				value: '全部',
				communityLeaseBegin: null,
				communityLeaseEnd: null,
				pageNum: 1,
				communityId: null,
				Datas: null,
				totalNum: 1,
				isHide: false,
				phone: null,
				money: null,
				titl1: null,
				gatheringState: null,
				pageSize: 10,
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				Name:''
			}
		},
		mounted() {
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.matas();
			
		},
		filters: {
			Money(val) {
				if(val != null) {
					return val.toFixed(2);
				} else {
					return '--'
				}
			},
			State(val) {
				if(val == 0) {
					return '待支付'
				} else if(val == 1) {
					return '已支付'
				}
			},
			Date(val) {
				if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNum = val;
				this.seek();
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			matas() {
				let vm = this;//请求收款数据列表
				let param = new FormData();
				param.append("pageNum", this.pageNum);
				param.append("pageSize", this.pageSize);
				param.append("communityId", this.communityId);
				axios.post(hostPayment, param).then((response) => {
					console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.Datas = response.data.result.gatheringList;
						this.totalNum = response.data.result.totalNum;
						console.log(this.Datas);
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			mvvs() {
				this.isHide = !this.isHide;
			},
			payment() {
				let vm = this
				axios.post(hostPayment2, //发起新的收款
						qs.stringify({
							userPhone: this.phone,
							gatheringInfo: this.titl1,
							communityId: this.communityId,
							gatheringMoney: this.money
						})
					).then((response) => {
						console.log(11111);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = !this.isHide;
							this.successMessage = '发起收款成功';
							this.successModal = true;
							setTimeout(() => {
								this.matas();
								this.successModal = false;
							}, 2000);
						} else {
							this.warningMessage = response.data.content;
							this.warningModal = true;
						}

					})
					.catch((error) => {
						this.warningMessage = '刷新失败,服务器出现异常';
						this.warningModal = true;
					})
			},
			select(val) {
				this.gatheringState = this.options[this.options.findIndex(item => item.dataname == val)].id;
			},
			seek() {
				let vm = this;
				let param = new FormData();
				if(this.communityLeaseBegin) {
					this.communityLeaseBegin = new Date(this.communityLeaseBegin).Format('yyyy-MM-dd');
					param.append("startDate", this.communityLeaseBegin);
				}
				if(this.communityLeaseEnd) {
					this.communityLeaseEnd = new Date(this.communityLeaseEnd).Format('yyyy-MM-dd');
					param.append("endDate", this.communityLeaseEnd);
				}
				if(this.values) {
					param.append("keyWord", this.values);
				}
				if(this.gatheringState &&this.gatheringState != -1) {
					param.append("gatheringState", this.gatheringState);
				}
				param.append("pageNum", this.pageNum);
				param.append("pageSize", this.pageSize);
				param.append("communityId", this.communityId);
				axios.post(hostPayment, param).then((response) => {
					console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.Datas = response.data.result.gatheringList;
						this.totalNum = response.data.result.totalNum;
					}
				}).catch((error) => {
					console.log(error);
					this.warningMessage = '搜索失败，服务器异常';
					this.warningModal = true;
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	#gethering {
		.ivu-icon-ios-calendar-outline {
			color: #038be2;
			font-family: "iconfont" !important;
			font-size: 18px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			&:before {
				content: "\e60c";
			}
		}
		.form-search {
			position: relative;
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 50px;
			display: inline-block;
			.ivu-input-wrapper {
				width: auto;
			}
			input[type="text"] {
				width: 208px;
				height: 36px;
				border-radius: 0;
				padding-left: 30px;
			}
			i {
				position: absolute;
				left: 5px;
				top: 7px;
				z-index: 99;
				font-size: 18px;
				color: #999;
			}
			input[type=button] {
				width: 70px;
				text-align: center;
				height: 36px;
				line-height: 36px;
				background-color: #038be2;
				color: #fff;
				border: none;
				position: relative;
				left: -5px;
				top: 2px;
			}
		}
	}
</style>