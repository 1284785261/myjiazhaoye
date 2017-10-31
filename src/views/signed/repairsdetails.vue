<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/apartment/workbench">用户报修</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>报修详情</h3>
				</div>
				<div id="repairsdetails">
					<div class="repairsdetails1">
						<Icon type="home"></Icon><span class="mv">{{cxkjCommunityRepair.isOffice | isOffie}}{{cxkjCommunityRoom.roomNum}}</span><span class="ms" :class="[{'kust':cxkjCommunityRepair.repairState == 0},{'kust1':cxkjCommunityRepair.repairState == 1}]">{{cxkjCommunityRepair.repairState | state}}</span>
						<ul>
							<li>用户：<span>{{User.userName}}</span></li>
							<li style="margin-right: 297px;">用户联系电话：<span>{{User.userTelephone}}</span></li>
							<li style="margin-left: 30px;">提交时间：<span>{{cxkjCommunityRepair.createtime | time}}</span></li>
						</ul>
					</div>
					<table>
						<tr>
							<td>
								<Icon type="settings"></Icon><span>维修项目</span></td>
							<td><span>{{dataName}}</span></td>
							<td><span>预约上门时间：{{cxkjCommunityRepair.repairTime | time}}</span></td>
						</tr>
						<tr>
							<td>
								<Icon type="android-contact"></Icon><span>维修师傅</span></td>
							<td><span style="margin-right: 50px;">{{repairUser.userName}}</span><span>联系电话：{{repairUser.userPhone}}</span>
								<Icon type="ios-telephone"></Icon>
							</td>
							<td></td>
						</tr>
						<tr>
							<td>
								<Icon type="settings"></Icon><span>问题描述</span></td>
							<td>
								<span v-if="cxkjCommunityRepair.repairDesc">{{cxkjCommunityRepair.repairDesc}}</span>
								<span v-else>--</span>
							</td>
							<td></td>
						</tr>
						<tr v-if="cxkjCommunityRepair.repairState == 2">
							<td>
								<Icon type="settings"></Icon><span>用户评价</span></td>
							<td>
								<span v-if="cxkjCommunityRepair.repairComment">{{cxkjCommunityRepair.repairComment}}</span>
								<span v-else>--</span>
							</td>
							<td></td>
						</tr>
					</table>
					<div v-if="mts == '0' && type != '0'">
						<a class="refund" @click="follow">确认跟踪</a>
					</div>
					<div v-else-if="mts == '1' && type != '0'" class="mts">
						<span>备注：</span>
						<textarea placeholder="请输入备注内容" v-model="test1"></textarea>
						<a class="refund" @click="conclude">确认办结</a>
					</div>
					<div v-else-if="mts == '2' && type != '0'" class="mts">
						<span>备注：</span>
						<textarea placeholder="请输入备注内容" v-model="test2"></textarea>
						<a class="refund" @click="details">保存</a>
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/repairsdetails.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostRepairInfo, hostRepairRemark } from '../api.js';
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
				currentPage3: 1,
				mts: '2',
				radio: '1',
				repairId: '',
				User: {},
				cxkjCommunityRepair: {},
				cxkjCommunityRoom: {},
				repairUser: {},
				dataName: '',
				type: '',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				test1: '',
				test2: ''
			}
		},
		mounted() {
			this.repairId = this.$route.query.id;
			if(this.$route.query.type) {
				this.type = this.$route.query.type;
			}
			this.datas();
		},
		filters: {
			isOffie(val) {
				if(val == 0) {
					return '公寓'
				} else if(val == 1) {
					return '办公室'
				}
			},
			state(val) {
				if(val == 0) {
					return '待处理'
				} else if(val == 1) {
					return '跟进中'
				} else if(val == 2) {
					return '已办结'
				}
			},
			time(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm');
			}
		},
		methods: {
			closeWarningModal() {
				this.warningModal = false;
			},
			datas() {
				axios.post(hostRepairInfo,
					qs.stringify({
						repairId: this.repairId
					})
				).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						if(res.data.entity.user) {
							this.User = res.data.entity.user;
						}
						if(res.data.entity.cxkjCommunityRepair) {
							this.cxkjCommunityRepair = res.data.entity.cxkjCommunityRepair;
							this.mts = res.data.entity.cxkjCommunityRepair.repairState;
						}
						if(res.data.entity.cxkjCommunityRoom) {
							this.cxkjCommunityRoom = res.data.entity.cxkjCommunityRoom;
						}
						if(res.data.entity.repairUser) {
							this.repairUser = res.data.entity.repairUser;
						}

						this.dataName = this.cxkjCommunityRepair.systemData.dataName;

						console.log(this.mts);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			follow() {
				let vm = this
				axios.post(hostRepairRemark,
					qs.stringify({
						repairId: this.repairId,
						repairState: 1
					})
				).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						vm.successMessage = '确认跟进成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.$router.go(-1);
						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			conclude() {
				let vm = this
				axios.post(hostRepairRemark,
					qs.stringify({
						repairId: this.repairId,
						repairState: 2,
						repairRemark: this.test1
					})
				).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						vm.successMessage = '确认办结成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.$router.go(-1);

						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			details() {
				let vm = this
				axios.post(hostRepairRemark,
					qs.stringify({
						repairId: this.repairId,
						repairRemark: this.test2
					})
				).then((res) => {
					console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						vm.successMessage = '办结处理成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.$router.go(-1);

						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>