<template>
	<div id="addirmsurrends">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/signed/housesubscribe">用户退租</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>确认退租</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="addirmsurrend" v-if="ThrowLease.isOffice == 0">
					<div class="addirmsurrend1">
						<Icon type="android-home"></Icon>
						<p>{{ThrowLease.isOffice | isOffie}}{{ThrowLease.roomInfo}}</p>
						<ul>
							<li style="margin-left: 66px;"><span>承租人：{{ThrowLease.userName}}</span></li>
							<li><span>联系电话：{{ThrowLease.userPhone}}</span></li>
							<li><span>租期：{{ThrowLease.beginDate | time}} - {{ThrowLease.endDate | time}}</span></li>
							<li><span style="color: red;">剩余{{ThrowLease.surplusDay}}天</span></li>
							<li><span>合租人数：{{ThrowLease.enterCount}}人</span></li>
						</ul>

						<router-link :to="{name:'contractDetail',query:{contractSignId:ThrowLease.contractSignId,isOffice:ThrowLease.isOffice}}">查看合同</router-link>
					</div>
					<div class="addirmsurrend2">
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>租金和押金结算</h3>
							<ul>
								<li>押金：<span  style="color: red;font-weight: bold;">{{ThrowLease.deposit | des}}元</span></li>
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.payStage}}/{{ThrowLease.stage}}</span></li>
								<li><span>共计：{{ThrowLease.sumPrice | des}}元</span></li>
							</ul>
							<p v-show="alters1 =='编辑'">应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableRent | des}}元</span></p>
							<p v-show="alters1 =='保存'">应退租金：<input type="text" v-model="ThrowLease.refundableRent">元</p>
							<a @click="alter1" v-show="alters1 =='编辑'">编辑</a>
							<a @click="alter2" v-show="alters1 =='保存'">保存</a>
						</div>
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>退租前水电费结算</h3>
							<table v-show="alters2 =='编辑'">
								<tr>
									<td>水表读数：<span>{{ThrowLease.waterNum}}</span></td>
									<td>用水量：<span>{{ThrowLease.waterCount}}m³</span></td>
									<td>水费：<span>{{ThrowLease.waterSumPrice | des}}元</span></td>
								</tr>
								<tr>
									<td>电表读数：<span>{{ThrowLease.energyNum}}</span></td>
									<td>用电量：<span>{{ThrowLease.energyCount}}度</span></td>
									<td>电费：<span>{{ThrowLease.energySumPrice | des}}元</span></td>
								</tr>
							</table>
							<table v-show="alters2 =='保存'">
								<tr>
									<td>水表读数：<input type="text" v-model="ThrowLease.waterNum"></td>
									<td>用水量：<input type="text" v-model="ThrowLease.waterCount" @blur="water(ThrowLease.waterCount)">m³</td>
									<td>水费：<input type="text" v-model="ThrowLease.waterSumPrice">元</td>
								</tr>
								<tr>
									<td>电表读数：<input type="text" v-model="ThrowLease.energyNum"></td>
									<td>用电量：<input type="text" v-model="ThrowLease.energyCount" @blur="energ(ThrowLease.energyCount)">度</td>
									<td>电费：<input type="text" v-model="ThrowLease.energySumPrice">元</td>
								</tr>
							</table>
							<p>应扣水电费:<span style="color: red;margin-left: 10px;">{{refundableWaterEnergyMoney}}元</span></p>
							<a class="chb">抄表</a>
							<a style="bottom: 50px;" v-show="alters2 =='编辑'" @click="alter3">编辑</a>
							<a style="bottom: 50px;" v-show="alters2 =='保存'" @click="alter4">保存</a>
						</div>
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>物资清点</h3>
							<table class="wuzi" v-show="alters3 =='编辑'">
								<tr v-for="item in refund">
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
									<td>应扣：<span>{{item.price | des}}元</span></td>
								</tr>
							</table>
							<table class="wuzi" v-show="alters3 =='保存'">
								<tr v-for="item in refund">
									<td><input type="text" v-model="item.materialName"></td>
									<td><input type="text" v-model="item.count"></td>
									<td>应扣：<input type="text" v-model="item.price">元</td>
								</tr>
							</table>
							<p>应扣物品折扣:<span style="color: red;margin-left: 10px;">{{refundableMaterialsMoney}}元</span></p>
							<a style="bottom: 50px;" v-show="alters3 =='编辑'" @click="alter5">编辑</a>
							<a style="bottom: 50px;" v-show="alters3 =='保存'" @click="alter6">保存</a>
						</div>
						<div class="qts">
							<img src="../../../static/images/icon/info.png" />
							<h3>其他费用</h3>
							<ul style="min-height: 30px;" v-show="alters4 =='编辑'">
								<li v-for="item in OtherInfo"><span style="width: 90px;display: inline-block;">{{item.costName}}</span>应扣：<span>{{item.costAmount | des}}元</span></li>
							</ul>
							<ul style="min-height: 30px;" v-show="alters4 =='保存'">
								<li v-for="item in OtherInfo"><input type="text" v-model="item.costName"> 应扣：<input type="text" v-model="item.costAmount">元</li>
							</ul>
							<p>应扣其他费用:<span style="color: red;margin-left: 10px;">{{refundableOtherMoney}}元</span></p>
							<a class="chb" v-show="alters4 =='保存'" @click="adds">添加费用项</a>
							<a style="bottom: 50px;" v-show="alters4 =='编辑'" @click="alter7">编辑</a>
							<a style="bottom: 50px;" v-show="alters4 =='保存'" @click="alter8">保存</a>
						</div>
						<div>
							<p>应退金额总计:<span style="color: red;margin-left: 10px;">{{sumPrice}}元</span></p>
							<p class="titus">应退金额总计 = 押金 + 应退租金 - 应扣水电费 - 应扣物品折扣 - 其他费用</p>
							<a class="loses" @click="promise">确认退租</a><span class="tsm"><i class="el-icon-information" style="margin-right: 10px;font-size: 16px;"></i>点击确认退租后，由用户填写退款账号并确认</span>
						</div>
					</div>
				</div>
				<div id="addirmsurrend" v-else-if="ThrowLease.isOffice == 1">
					<div class="addirmsurrend1">
						<Icon type="android-print"></Icon>
						<p>{{ThrowLease.isOffice | isOffie}}{{ThrowLease.roomInfo}}</p>
						<ul>
							<li style="margin-left: 66px;"><span>联系人：{{ThrowLease.userName}}</span></li>
							<li><span>联系电话：{{ThrowLease.userPhone}}</span></li>
							<li><span>租期：{{ThrowLease.beginDate | time}} - {{ThrowLease.endDate | time}}</span></li>
							<li><span style="color: red;">剩余{{ThrowLease.surplusDay}}天</span></li>
							<li><span>公司名称：{{ThrowLease.companyInfo}}</span></li>
							<li><span>法人姓名：{{ThrowLease.companyLegalPerson}}</span></li>
						</ul>

						<router-link :to="{name:'contractDetail',query:{contractSignId:ThrowLease.contractSignId,isOffice:ThrowLease.isOffice}}">查看合同</router-link>
					</div>
					<div class="addirmsurrend2">
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>租金和押金结算</h3>
							<ul>
								<li>押金：<span  style="color: red;font-weight: bold;">{{ThrowLease.deposit | des}}元</span></li>
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.payStage}}/{{ThrowLease.stage}}</span></li>
								<li><span>共计：{{ThrowLease.sumPrice | des}}元</span></li>
							</ul>
							<p v-show="alters1 =='编辑'">应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableRent | des}}元</span></p>
							<p v-show="alters1 =='保存'">应退租金：<input type="text" v-model="ThrowLease.refundableRent">元</p>
							<a @click="alter1" v-show="alters1 =='编辑'">编辑</a>
							<a @click="alter2" v-show="alters1 =='保存'">保存</a>
						</div>
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>物资清点</h3>
							<table class="wuzi" v-show="alters3 =='编辑'">
								<tr v-for="item in refund">
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
									<td>应扣：<span>{{item.price | des}}元</span></td>
								</tr>
							</table>
							<table class="wuzi" v-show="alters3 =='保存'">
								<tr v-for="item in refund">
									<td><input type="text" v-model="item.materialName"></td>
									<td><input type="text" v-model="item.count"></td>
									<td>应扣：<input type="text" v-model="item.price">元</td>
								</tr>
							</table>
							<p>应扣物品折扣:<span style="color: red;margin-left: 10px;">{{refundableMaterialsMoney}}元</span></p>
							<a style="bottom: 50px;" v-show="alters3 =='编辑'" @click="alter5">编辑</a>
							<a style="bottom: 50px;" v-show="alters3 =='保存'" @click="alter6">保存</a>
						</div>
						<div class="qts">
							<img src="../../../static/images/icon/info.png" />
							<h3>其他费用</h3>
							<ul style="min-height: 30px;" v-show="alters4 =='编辑'">
								<li v-for="item in OtherInfo"><span style="width: 90px;display: inline-block;">{{item.costName}}</span>应扣：<span>{{item.costAmount | des}}元</span></li>
							</ul>
							<ul style="min-height: 30px;" v-show="alters4 =='保存'">
								<li v-for="item in OtherInfo"><input type="text" v-model="item.costName"> 应扣：<input type="text" v-model="item.costAmount">元</li>
							</ul>
							<p>应扣其他费用:<span style="color: red;margin-left: 10px;">{{refundableOtherMoney}}元</span></p>
							<a class="chb" v-show="alters4 =='保存'" @click="adds">添加费用项</a>
							<a style="bottom: 50px;" v-show="alters4 =='编辑'" @click="alter7">编辑</a>
							<a style="bottom: 50px;" v-show="alters4 =='保存'" @click="alter8">保存</a>
						</div>
						<div>
							<p>应退金额总计:<span style="color: red;margin-left: 10px;">{{sumPrice}}元</span></p>
							<p class="titus">应退金额总计 = 押金 + 应退租金 - 应扣物品折扣 - 其他费用</p>
							<a class="loses" @click="promise2">确认退租</a><span class="tsm"><i class="el-icon-information" style="margin-right: 10px;font-size: 16px;"></i>点击确认退租后，由用户填写退款账号并确认</span>
						</div>
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="zhezhao" v-show="ishide">

		</div>
		<div class="addsection" v-show="ishide2">
			<i class="el-icon-circle-close" @click="inst"></i>
			<Icon type="android-bulb"></Icon>
			<p>该用户申请了 <span> 工商地址注册证明</span></p>
			<a class="tjss" @click="adds">确定</a>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/affirmsurrend.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostwLeaseContr, hostLeaseController } from '../api.js';
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
				radio: '1',
				ishide: false,
				ishide2: false,
				alters1: '编辑',
				alters2: '编辑',
				alters3: '编辑',
				alters4: '编辑',
				throwLeaseId: '',
				ThrowLease: null, //用户退租信息
				refund: null, //物资清点
				OtherInfo: null, //其他费用
				money: 0,
				money2: 0,
				money3: 0,
				zonmoney: 0,
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				refundableMaterialsInfo: [],
				refundableOtherInfo: []
			}
		},
		mounted() {
			this.throwLeaseId = this.$route.query.id;
			this.datas();
			if(this.ThrowLease.isOffice == 1 ){
				this.ishide = true;
				this.ishide2 = true;
				setTimeout(() => {
					this.ishide = false;
					this.ishide2 = false;
				}, 2000);
			}
		},
		computed: {
			refundableWaterEnergyMoney: function() { //计算水电总费用
				if(this.ThrowLease) {
					this.money = parseFloat(this.ThrowLease.waterPrice * this.ThrowLease.waterCount + this.ThrowLease.energyPrice * this.ThrowLease.energyCount).toFixed(2);
					return this.money;
				}

			},
			refundableMaterialsMoney: function() { //计算物资的费用
				let q = 0;
				for(let i = 0; i < this.refund.length; i++) {
					q += parseFloat(this.refund[i].price);
				}
				this.money2 = q;
				return parseFloat(q).toFixed(2);
			},
			refundableOtherMoney: function() { //计算其他费用
				let q = 0;
				for(let i = 0; i < this.OtherInfo.length; i++) {
					q += parseFloat(this.OtherInfo[i].costAmount);
				}
				this.money3 = q;
				return parseFloat(q).toFixed(2);
			},
			sumPrice: function() { //计算总退还的费用
				if(this.ThrowLease.isOffice == 0){
					this.zonmoney = parseFloat(parseFloat(this.ThrowLease.deposit) + parseFloat(this.ThrowLease.refundableRent) - this.money - this.money2 - this.money3).toFixed(2);
					return this.zonmoney;
				}
				else if(this.ThrowLease.isOffice == 1){
					this.zonmoney = parseFloat(parseFloat(this.ThrowLease.deposit) + parseFloat(this.ThrowLease.refundableRent) - this.money2 - this.money3).toFixed(2);
					return this.zonmoney;
				}
				
			}
		},
		filters: {
			time(val) {
				return new Date(val).Format('yyyy.MM.dd');
			},
			isOffie(val) {
				if(val == 0) {
					return '公寓'
				} else if(val == 1) {
					return '办公室'
				}
			},
			des(val) {
				if(val >= 0){
					return parseFloat(val).toFixed(2);
				}
				else{
					return 0;
				}
				
			}
		},
		methods: {
			adds() {
				this.OtherInfo.push({
					costName: '',
					costAmount: ''
				})
				console.log(this.OtherInfo);
			},
			alter1() {
				this.alters1 = '保存';
			},
			alter2() {
				this.alters1 = '编辑';
			},
			alter3() {
				this.alters2 = '保存';
			},
			alter4() {
				this.alters2 = '编辑';
			},
			alter5() {
				this.alters3 = '保存';
			},
			alter6() {
				this.alters3 = '编辑';
			},
			alter7() {
				this.alters4 = '保存';
			},
			alter8() {
				this.alters4 = '编辑';
			},
			datas() {
				axios.post(hostwLeaseContr,
					qs.stringify({
						throwLeaseId: this.throwLeaseId
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.ThrowLease = res.data.result;
						this.ThrowLease.energySumPrice = this.ThrowLease.energyCount * this.ThrowLease.energyPrice;
						this.ThrowLease.waterSumPrice = this.ThrowLease.waterCount * this.ThrowLease.waterPrice;
						this.refund = JSON.parse(this.ThrowLease.refundableMaterialsInfo);
						for(let i = 0; i < this.refund.length; i++) {
							this.$set(this.refund[i], "price", 0);
						}
						this.OtherInfo = JSON.parse(this.ThrowLease.refundableOtherInfo);
						console.log(this.OtherInfo);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			water(val) {
				if(this.ThrowLease.waterChargeModel == 1) {
					this.ThrowLease.waterSumPrice = val * this.ThrowLease.waterPrice;
				} else if(this.ThrowLease.waterChargeModel == 2) {
					this.ThrowLease.waterSumPrice = this.ThrowLease.enterCount * this.ThrowLease.waterPrice;
				}

			},
			energ(val) {
				if(this.ThrowLease.electricChargeModel == 1) {
					this.ThrowLease.energySumPrice = val * this.ThrowLease.energyPrice;
				} else if(this.ThrowLease.electricChargeModel == 2) {
					this.ThrowLease.energySumPrice = this.ThrowLease.enterCount * this.ThrowLease.energyPrice;
				}

			},
			promise() {         //公寓确认退租
				let vm = this
				let param = new FormData();
				param.append("throwLeaseId", this.throwLeaseId);
				param.append("deposit", this.ThrowLease.deposit);
				param.append("waterNum", this.ThrowLease.waterNum);
				param.append("energyNum", this.ThrowLease.energyNum);
				param.append("refundableRent", this.ThrowLease.refundableRent);
				param.append("refundableWaterEnergyMoney", this.money);
				if(this.refund.length) {
					for(let i = 0; i < this.refund.length; i++) {
						this.refundableMaterialsInfo.push({
							materialName: this.refund[i].materialName,
							count: this.refund[i].count,
							costAmount: this.refund[i].price
						});
					}
					param.append("refundableMaterialsInfo", JSON.stringify(this.refundableMaterialsInfo));
				}

				if(this.OtherInfo.length) {
					for(let i = 0; i < this.OtherInfo.length; i++) {
						this.refundableOtherInfo.push({
							costName: this.OtherInfo[i].costName,
							costAmount: this.OtherInfo[i].costAmount
						});
					}
					param.append("refundableOtherInfo", JSON.stringify(this.refundableOtherInfo));
				}

				param.append("refundMoney", this.zonmoney);
				console.log(this.throwLeaseId);
				console.log(this.ThrowLease.deposit);
				console.log(this.ThrowLease.waterNum);
				console.log(this.ThrowLease.energyNum);
				console.log(this.ThrowLease.refundableRent);
				console.log(this.money);
				console.log(JSON.stringify(this.refundableMaterialsInfo));
				console.log(JSON.stringify(this.refundableOtherInfo));
				console.log(this.zonmoney);
				axios.post(hostLeaseController, param).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						vm.successMessage = '用户退租成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							vm.$router.push('/signed/surrender');

						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
					this.warningMessage = '用户退租失败,服务器出现异常';
					this.warningModal = true;
				})
			},
			promise2(){   //办公室确认退租
				let vm = this
				let param = new FormData();
				param.append("throwLeaseId", this.throwLeaseId);
				param.append("deposit", this.ThrowLease.deposit);
				param.append("refundableRent", this.ThrowLease.refundableRent);
				if(this.refund.length) {
					for(let i = 0; i < this.refund.length; i++) {
						this.refundableMaterialsInfo.push({
							materialName: this.refund[i].materialName,
							count: this.refund[i].count,
							costAmount: this.refund[i].price
						});
					}
					param.append("refundableMaterialsInfo", JSON.stringify(this.refundableMaterialsInfo));
				}

				if(this.OtherInfo.length) {
					for(let i = 0; i < this.OtherInfo.length; i++) {
						this.refundableOtherInfo.push({
							costName: this.OtherInfo[i].costName,
							costAmount: this.OtherInfo[i].costAmount
						});
					}
					param.append("refundableOtherInfo", JSON.stringify(this.refundableOtherInfo));
				}

				param.append("refundMoney", this.zonmoney);
//				console.log(this.throwLeaseId);
//				console.log(this.ThrowLease.deposit);
//				console.log(this.ThrowLease.waterNum);
//				console.log(this.ThrowLease.energyNum);
//				console.log(this.ThrowLease.refundableRent);
//				console.log(this.money);
//				console.log(JSON.stringify(this.refundableMaterialsInfo));
//				console.log(JSON.stringify(this.refundableOtherInfo));
//				console.log(this.zonmoney);
				axios.post(hostLeaseController, param).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						vm.successMessage = '用户退租成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							vm.$router.push('/signed/surrender');

						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					console.log(err);
					this.warningMessage = '用户退租失败,服务器出现异常';
					this.warningModal = true;
				})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			inst(){
				this.ishide = false;
				this.ishide2 = false;
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