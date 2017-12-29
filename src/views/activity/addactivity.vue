<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
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
							<td>活动类型：</td>
							<td>
								<el-select v-model="value" placeholder="请选择活动类型" @change="actives(value)">
									<el-option v-for="item in options" :key="item.dataName" :value="item.dataName">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td>活动主题：</td>
							<td><input type="text" placeholder="请输入活动主题" class="mt" v-model="Activity.activityTheme" maxlength="15" /></td>
						</tr>
						<tr>
							<td>活动时间：</td>
							<td>
								<Date-picker type="date" placeholder="请选择开始时间" v-model="Activity.beginDate"></Date-picker> -- <Date-picker type="date" placeholder="请选择结束时间" v-model="Activity.endDate"></Date-picker>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">活动介绍：</td>
							<td><textarea placeholder="请输入活动内容" v-model="Activity.activityContent" maxlength="100"></textarea></td>
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
							<td>额度范围：</td>
							<td>
								<input type="text" style="width:82px;margin-right: 10px;border: 1px solid #DCDCDC;" v-model="Activity.beginQuota" @blur="shuzi(Activity.beginQuota)" />至<input type="text" style="width:82px;margin-left: 10px;margin-right:10px;border: 1px solid #DCDCDC;" v-model="Activity.endQuota" @blur="shuzi2(Activity.endQuota)"/>元
							</td>
						</tr>
						<tr>
							<td>总金额：</td>
							<td><input type="text" placeholder="请输入总金额" class="mt" v-model="Activity.activityTotalMoney" maxlength="10" @blur="shuzi3(Activity.activityTotalMoney)"/>元</td>
						</tr>
						<tr>
							<td>优惠券有效期：</td>
							<td>
								<input type="text" placeholder="请输入有效天数" class="mt" v-model="Activity.validityDate" maxlength="10" @blur="shuzi4(Activity.validityDate)"/>天</td>
							</td>
						</tr>
						<tr>
							<td>参与对象：</td>
							<td>
								<el-radio class="radio" v-model="radio3" label="1" style="margin-left:0;">是</el-radio>
  								<el-radio class="radio" v-model="radio3" label="0">否</el-radio>
							</td>
						</tr>
					</table>
					<div class="sxb" v-if="radio3 == '1'">
						<span>注册时间：</span><Date-picker type="date" placeholder="请选择" v-model="Activity.beginRegisterTime" style="width:110px;margin-right:10px;"></Date-picker>--<Date-picker type="date" placeholder="请选择" v-model="Activity.endRegisterTime" style="width:110px;;margin-left:10px;"></Date-picker><br>
						<span style="line-height:60px;">是否有签约记录：</span>
						<el-radio class="radio" v-model="radio4" label="1">是</el-radio>
  						<el-radio class="radio" v-model="radio4" label="0">否</el-radio>
					</div>
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
				activeTabName:"activitys",
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				currentPage3: 1,
				checked: true,
				radio2: '0',
				radio3: '1',
				radio4: '1',
				options: [{
					dataName:'优惠券',
					id:0
				}],
				value: '',
				checkList: [],
				checkList2: [],
				Activity: {
					activityType: '',
					activityTheme: '',
					activityContent: '',
					beginDate: '',
					endRule: '',
					endDate: '',
					beginQuota:'',
					endQuota:'',
					activityTotalMoney: '',
					validityDate: '',
					joinStatus:'',
					beginRegisterTime:'',
					endRegisterTime:'',
					signStatus:''
				},
				disabled: false,
				disabled2: false,
				disabled3: false,
				disabled4: false
			}
		},
		mounted() {

		},
		filters: {

		},
		methods: {
			shuzi(value){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
					if(str.test(value) == true){
						this.Activity.beginQuota = value;
					}
					else{
						this.Activity.beginQuota = '';
					}
			},
			shuzi2(value){
				if(parseFloat(value) > parseFloat(this.Activity.beginQuota)){
					let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
					if(str.test(value) == true){
						this.Activity.endQuota = value;
					}
					else{
						this.Activity.endQuota = '';
					}
				}else{
					this.Activity.endQuota = '';
				}
					
			},
			shuzi3(value){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
					if(str.test(value) == true){
						this.Activity.activityTotalMoney = value;
					}
					else{
						this.Activity.activityTotalMoney = '';
					}
			},
			shuzi4(value){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
					if(str.test(value) == true){
						this.Activity.validityDate = value;
					}
					else{
						this.Activity.validityDate = '';
					}
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			actives(value) {
				this.Activity.activityType = this.options[this.options.findIndex(item => item.dataName == value)].id;
				// console.log(this.Activity);
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
				// console.log(arr);
				let str = arr.join(',');
				this.Activity.endRule = str;
				this.Activity.beginDate = new Date(this.Activity.beginDate).Format('yyyy-MM-dd');
				this.Activity.endDate = new Date(this.Activity.endDate).Format('yyyy-MM-dd');
				// console.log(this.Activity);
				param.append("activityType", vm.Activity.activityType);
				param.append("activityTheme", vm.Activity.activityTheme);
				param.append("activityContent", vm.Activity.activityContent);
				param.append("beginDate", vm.Activity.beginDate);
				param.append("endRule", vm.Activity.endRule);
				param.append("endDate", vm.Activity.endDate);
				if(parseFloat(vm.Activity.endQuota) > parseFloat(vm.Activity.beginQuota)){
					param.append("beginQuota", vm.Activity.beginQuota);
					param.append("endQuota", vm.Activity.endQuota);
				}
				param.append("activityTotalMoney", vm.Activity.activityTotalMoney);
				param.append("validityDate", vm.Activity.validityDate);
				param.append("joinStatus", vm.radio3);
				if(vm.radio3 == '1'){
					this.Activity.beginRegisterTime = new Date(this.Activity.beginRegisterTime).Format('yyyy-MM-dd');
					this.Activity.endRegisterTime = new Date(this.Activity.endRegisterTime).Format('yyyy-MM-dd');
					param.append("beginRegisterTime", vm.Activity.beginRegisterTime);
					param.append("endRegisterTime", vm.Activity.endRegisterTime);
					param.append("signStatus", vm.radio4);
				}
				axios.post(hostActivityAdd, param).then((res) => {
					// console.log(res);
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
					// console.log(err);
					this.warningMessage = '添加活动失败,服务器异常';
					this.warningModal = true;
				})

			},
			mvs(list) {
				// console.log(list);
				if(!list.length) {
					this.disabled = false;
					this.disabled2 = false;
					this.disabled3 = false;
					// console.log(111111);
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