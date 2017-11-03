<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/apartment/workbench">活动管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>活动管理</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="addactivity">
					<table>
						<tr>
							<td>活动范围：</td>
							<td>
								<el-select v-model="value" placeholder="请选择范围" @change="actives(value)">
									<el-option v-for="item in options" :key="item.areaName" :value="item.areaName">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td>活动ID：</td>
							<td><input type="text" placeholder="根据针对范围直接生成" class="mt" v-model="Activity.activityNum" /></td>
						</tr>
						<tr>
							<td>活动主题：</td>
							<td><input type="text" placeholder="请输入活动主题" class="mt" v-model="Activity.activityTheme" maxlength="20" /></td>
						</tr>
						<tr>
							<td>开始时间：</td>
							<td>
								<Date-picker type="date" placeholder="请选择开始时间" v-model="Activity.beginDate"></Date-picker>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">活动介绍：</td>
							<td><textarea placeholder="请输入活动内容" v-model="Activity.activityContent" maxlength="50"></textarea></td>
						</tr>
						<tr>
							<td>活动规则：</td>
							<td>
								<el-checkbox-group v-model="checkList" @change="mvs(checkList)">
									<el-checkbox label="到期结束" :disabled="disabled"></el-checkbox>
									<el-checkbox label="送完即止" :disabled="disabled2"></el-checkbox>
									<el-checkbox class="radio" style="margin-left: 40px;" label="无期限" :disabled="disabled3"></el-checkbox>
								</el-checkbox-group>
							</td>
						</tr>
						<tr>
							<td>结束日期：</td>
							<td>
								<Date-picker type="date" placeholder="请选择结束日期" v-model="Activity.endDate"></Date-picker>
							</td>
						</tr>
						<tr>
							<td>总金额：</td>
							<td><input type="text" placeholder="请输入总金额" class="mt" v-model="Activity.activityTotalMoney" maxlength="10" /></td>
						</tr>
						<tr>
							<td>优惠券有效期：</td>
							<td>
								<Date-picker type="date" placeholder="请选择优惠券有效期" v-model="Activity.validityDate" @on-change="mus(Activity.validityDate)"></Date-picker>
								<el-checkbox-group v-model="checkList2" class="radio2">
									<el-checkbox class="radio" label="无期限" :disabled="disabled4"></el-checkbox>
								</el-checkbox-group>

							</td>
						</tr>
					</table>
					<a class="refund" @click="activit">发布活动</a>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/addactivity.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import axios from 'axios';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import { hostActivityArea, hostActivityAdd, hostRangeRandom } from '../api.js';
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
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				currentPage3: 1,
				checked: true,
				radio2: '0',
				options: [],
				value: '',
				checkList: [],
				checkList2: [],
				Activity: {
					activityNum: '',
					cityId: '',
					activityTheme: '',
					activityContent: '',
					beginDate: '',
					endRule: '',
					endDate: '',
					activityTotalMoney: '',
					validityDate: '',
					wordFirstKey: ''
				},
				disabled: false,
				disabled2: false,
				disabled3: false,
				disabled4: false
			}
		},
		mounted() {
			this.datas();
		},
		filters: {

		},
		methods: {
			closeWarningModal() {
				this.warningModal = false;
			},
			datas() {
				axios.post(hostActivityArea).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						this.options = res.data.entity;
					}

				}).catch((err) => {
					console.log(err);
				})
			},
			actives(value) {
				this.Activity.wordFirstKey = this.options[this.options.findIndex(item => item.areaName == value)].wordFirstKey;
				this.Activity.cityId = this.options[this.options.findIndex(item => item.areaName == value)].areaId;
				console.log(this.Activity.wordFirstKey);
				axios.post(hostRangeRandom,
					qs.stringify({
						wordFirstKey: this.Activity.wordFirstKey
					})
				).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						this.Activity.activityNum = res.data.entity;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			activit() {
				let vm = this
				let arr = [];
				let param = new FormData();
				for(let i = 0; i < this.checkList.length; i++) {
					if(this.checkList[i] == '到期结束') {
						arr.push(0);
					} else if(this.checkList[i] == '送完即止') {
						arr.push(1);
					} else if(this.checkList[i] == '无期限') {
						arr.push(2);
					} else if(this.checkList[0] == '到期结束' && this.checkList[1] == '送完即止') {
						arr.push(0);
						arr.push(1);
					}
				}
				console.log(arr);
				let str = arr.join(',');
				this.Activity.endRule = str;
				this.Activity.beginDate = new Date(this.Activity.beginDate).Format('yyyy-MM-dd');

				this.Activity.endDate = new Date(this.Activity.endDate).Format('yyyy-MM-dd');
				if(this.Activity.validityDate) {
					this.Activity.validityDate = new Date(this.Activity.validityDate).Format('yyyy-MM-dd');
				} else if(this.checkList2[0] == '无期限') {
					this.Activity.validityDate = null;
				}
				console.log(this.Activity);
				param.append("activityNum", vm.Activity.activityNum);
				param.append("cityId", vm.Activity.cityId);
				param.append("activityTheme", vm.Activity.activityTheme);
				param.append("activityContent", vm.Activity.activityContent);
				param.append("beginDate", vm.Activity.beginDate);
				param.append("endRule", vm.Activity.endRule);
				param.append("endDate", vm.Activity.endDate);
				param.append("activityTotalMoney", vm.Activity.activityTotalMoney);
				if(vm.Activity.validityDate) {
					param.append("validityDate", vm.Activity.validityDate);
				}
				axios.post(hostActivityAdd, param).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.successMessage = '添加活动成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							vm.$router.push('/activity/activitys');
						}, 2000);
					} else {
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
					this.warningMessage = '添加活动失败,服务器异常';
					this.warningModal = true;
				})

			},
			mvs(list) {
				console.log(list);
				if(!list.length) {
					this.disabled = false;
					this.disabled2 = false;
					this.disabled3 = false;
					console.log(111111);
				} else {
					for(let i = 0; i < list.length; i++) {
						if(list[i] == '到期结束' || list[i] == '送完即止') {
							this.disabled3 = true;
						} else if(list[i] == '无期限') {
							this.disabled = true;
							this.disabled2 = true;
						}

					}
				}

			},
			mus(value) {
				console.log(value);
				if(!value) {
					this.disabled4 = true;
				} else {
					this.disabled4 = false;
				}
			}

		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	.location_community {
		.ivu-icon-location {
			font-size: 38px;
			color: red;
			position: relative;
			top: 10px;
			left: 5px;
		}
	}
	
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
</style>