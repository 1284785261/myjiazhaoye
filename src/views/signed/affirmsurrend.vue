<template>
	<div id="addirmsurrends">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/signed/housesubscribe">用户退租</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>确认退租</h3>
					<span v-if="Name">{{Name}}</span>
				</div>
				<!-- 公寓 -->
				<div id="addirmsurrend" v-if="ThrowLease.isOffice == 0">
					<div class="addirmsurrend1">
						<Icon type="android-home"></Icon>
						<p v-if="ThrowLease.isOffice">{{ThrowLease.isOffice | isOffie}}{{ThrowLease.roomInfo.roomNum}}</p>
						<ul>
							<li><span>承租人：{{ThrowLease.userInfo.userName}}</span></li>
							<li><span>联系电话：{{ThrowLease.userInfo.userPhone}}</span></li>
							<li><span>租期：{{ThrowLease.beginDate | time}} - {{ThrowLease.endDate | time}}</span></li>
							<li><span style="color: red;" v-if="ThrowLease.differentDays > 0">剩余{{ThrowLease.differentDays}}天</span>
								<span style="color: red;" v-else>剩余0天</span>
							</li>
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
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.billCount}}/{{ThrowLease.stage}}</span></li>
								<li><span>已缴租金共计：{{ThrowLease.billTotalMoney | des}}元</span></li>
								<li><span>应退押金：{{ThrowLease.deposit | des}}元</span></li>
								<li><span>应退服务费：{{ThrowLease.rentServiceCost | des}}元</span></li>
							</ul>
							<p v-show="alters1 =='编辑'">应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.rentCyclePayMoney | des}}元</span></p>
							<p v-show="alters1 =='保存'">应退租金：<input type="text" v-model="ThrowLease.rentCyclePayMoney">元</p>
							<a @click="alter1" v-show="alters1 =='编辑'">编辑</a>
							<a @click="alter2" v-show="alters1 =='保存'">保存</a>
						</div>
						<div>
							<img src="../../../static/images/icon/info.png" />
							<h3>退租前水电费结算</h3>
							<table v-show="alters2 =='编辑'">
								<tr v-if="ThrowLease.roomInfo.waterType == 1">
									<td>水表读数：<span>{{ThrowLease.roomInfo.thisWaterRead}} m³</span></td>
									<td>用水量：<span>{{ThrowLease.roomInfo.waterDosage}} m³</span></td>
									<td>水费：<span>{{ThrowLease.roomInfo.waterTotalMoney | des}} 元</span></td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.waterType == 2">
									<td>用水人数：<span>{{ThrowLease.roomInfo.enterCount}} m³</span></td>
									<td>用水天数：<span>{{ThrowLease.roomInfo.days}} m³</span></td>
									<td>水费：<span>{{ThrowLease.roomInfo.waterTotalMoney | des}} 元</span></td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.electricType == 1">
									<td>电表读数：<span>{{ThrowLease.roomInfo.thisElectricRead}} 度</span></td>
									<td>用电量：<span>{{ThrowLease.roomInfo.electricDosage}} 度</span></td>
									<td>电费：<span>{{ThrowLease.roomInfo.electricTotalMoney | des}} 元</span></td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.electricType == 2">
									<td>用电人数：<span>{{ThrowLease.roomInfo.enterCount}} 度</span></td>
									<td>用电天数：<span>{{ThrowLease.roomInfo.days}} 度</span></td>
									<td>电费：<span>{{ThrowLease.roomInfo.electricTotalMoney | des}} 元</span></td>
								</tr>
							</table>
							<table v-show="alters2 =='保存'">
								<tr v-if="ThrowLease.roomInfo.waterType == 1">
									<td>水表读数：<input type="text" v-model="ThrowLease.roomInfo.thisWaterRead" @blur="waterNum(ThrowLease.roomInfo.thisWaterRead)">m³</td>
									<td>用水量：<input type="text" v-model="ThrowLease.roomInfo.waterDosage" :disabled='disabled1'>m³</td>
									<td>水费：<input type="text" v-model="ThrowLease.roomInfo.waterTotalMoney" :disabled='disabled1'>元</td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.waterType == 2">
									<td>用水人数：<span>{{ThrowLease.roomInfo.enterCount}} m³</span></td>
									<td>用水天数：<input type="text" v-model="ThrowLease.roomInfo.days" @blur="waterdays(ThrowLease.roomInfo.days)">m³</td>
									<td>水费：<input type="text" v-model="ThrowLease.roomInfo.waterTotalMoney" :disabled='disabled1'>元</td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.electricType == 1">
									<td>电表读数：<input type="text" v-model="ThrowLease.roomInfo.thisElectricRead" @blur="energyNum(ThrowLease.roomInfo.thisElectricRead)">度</td>
									<td>用电量：<input type="text" v-model="ThrowLease.roomInfo.electricDosage" :disabled='disabled2'>度</td>
									<td>电费：<input type="text" v-model="ThrowLease.roomInfo.electricTotalMoney" :disabled='disabled2'>元</td>
								</tr>
								<tr v-if="ThrowLease.roomInfo.electricType == 2">
									<td>用电人数：<span>{{ThrowLease.roomInfo.enterCount}} 度</span></td>
									<td>用电天数：<input type="text" v-model="ThrowLease.roomInfo.days" @blur="energydays(ThrowLease.roomInfo.days)">度</td>
									<td>电费：<input type="text" v-model="ThrowLease.roomInfo.electricTotalMoney" :disabled='disabled2'>元</td>
								</tr>
							</table>
							<p>应扣水电费:<span style="color: red;margin-left: 10px;">{{ThrowLease.roomInfo.waterAndElectricTotalMoney | des}}元</span></p>
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
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
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
							<a class="chb" v-show="alters4 =='保存'" @click="addsm">添加费用项</a>
							<a style="bottom: 50px;" v-show="alters4 =='编辑'" @click="alter7">编辑</a>
							<a style="bottom: 50px;" v-show="alters4 =='保存'" @click="alter8">保存</a>
						</div>
						<div style="border:none;">
							<p>应退金额总计:<span style="color: red;margin-left: 10px;">{{sumPrice}}元</span></p>
							<p class="titus" @click="ViewBy">查看退款计算方式</p>
							<a class="loses" @click="promise">确认退租</a><span class="tsm"><i class="el-icon-information" style="margin-right: 10px;font-size: 16px;"></i>点击确认退租后，由用户填写退款账号并确认</span>
						</div>
					</div>
				</div>
				<!-- 办公室 -->
				<div id="addirmsurrend" v-else-if="ThrowLease.isOffice == 1">
					<div class="addirmsurrend1">
						<Icon type="android-print"></Icon>
						<p v-if="ThrowLease.isOffice">{{ThrowLease.isOffice | isOffie}}{{ThrowLease.officeInfo.officeHouseNum}}</p>
						<ul>
							<li><span>联系人：{{ThrowLease.userInfo.userName}}</span></li>
							<li><span>联系电话：{{ThrowLease.userInfo.userPhone}}</span></li>
							<li><span>租期：{{ThrowLease.beginDate | time}} - {{ThrowLease.endDate | time}}</span></li>
							<li><span>合租人数：{{ThrowLease.enterCount}}人</span></li>
							<li><span style="color: red;" v-if="ThrowLease.differentDays > 0">剩余{{ThrowLease.differentDays}}天</span></li>
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
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.billCount}}/{{ThrowLease.stage}}</span></li>
								<li><span>已缴租金共计：{{ThrowLease.billTotalMoney | des}}元</span></li>
								<li><span>应退押金：{{ThrowLease.deposit | des}}元</span></li>
								<li><span>应退服务费：{{ThrowLease.rentServiceCost | des}}元</span></li>
							</ul>
							<p v-show="alters1 =='编辑'">应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.rentCyclePayMoney | des}}元</span></p>
							<p v-show="alters1 =='保存'">应退租金：<input type="text" v-model="ThrowLease.rentCyclePayMoney">元</p>
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
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
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
							<a class="chb" v-show="alters4 =='保存'" @click="addsm">添加费用项</a>
							<a style="bottom: 50px;" v-show="alters4 =='编辑'" @click="alter7">编辑</a>
							<a style="bottom: 50px;" v-show="alters4 =='保存'" @click="alter8">保存</a>
						</div>
						<div style="border:none;">
							<p>应退金额总计:<span style="color: red;margin-left: 10px;">{{sumPrice}}元</span></p>
							<p class="titus" @click="ViewBy">查看退款计算方式</p>
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
			<a class="tjss" @click="inst">确定</a>
		</div>
		<div class="addsection addsection2" v-show="ishide3">
			<ul>
				<li>押金：{{ThrowLease.deposit}}元</li>
				<li>应退租金=已交租金 -（租金x租期折扣x付款方式折扣x已交的剩余天数）</li>
				<li v-if="ThrowLease.roomInfo && ThrowLease.roomInfo.waterAndElectricTotalMoney">应扣水电费：{{ThrowLease.roomInfo.waterAndElectricTotalMoney}}元</li>
				<li>应扣物品折旧：{{refundableMaterialsMoney}}元</li>
				<li>其他费用：{{refundableOtherMoney}}元</li>
				<li>应退金额合计：{{sumPrice}}元</li>
			</ul>
			<a class="tjss" @click="Veiyinst">确定</a>
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
				activeTabName:"workbench",
				currentPage3: 1,
				radio: '1',
				ishide: false,
				ishide2: false,
				ishide3:false,
				alters1: '编辑',
				alters2: '编辑',
				alters3: '编辑',
				alters4: '编辑',
				throwLeaseId: '',
				ThrowLease: null, //用户退租信息
				refund: null, //物资清点
				OtherInfo: [], //其他费用
				money: 0,
				money2: 0,
				money3: 0,
				zonmoney: 0,
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				refundableMaterialsInfo: [],
				refundableOtherInfo: [],
				Name:'',
				disabled1:true,
				disabled2:true
			}
		},
		mounted() {
			this.throwLeaseId = this.$route.query.id;
			this.Name = this.$route.query.Name;
			this.datas();
		},
		computed: {
			refundableMaterialsMoney: function() { //计算物资的费用
				let q = 0;
				for(let i = 0; i < this.refund.length; i++) {
					q += parseFloat(this.refund[i].price);
				}
				this.money2 = q;
				return parseFloat(q).toFixed(2);
			},
			refundableOtherMoney: function() { //计算其他费用
				if(this.OtherInfo != []){
					let q = 0;
					for(let i = 0; i < this.OtherInfo.length; i++) {
						q += parseFloat(this.OtherInfo[i].costAmount);
					}
					this.money3 = q;
					return parseFloat(q).toFixed(2);
					
				}else{
					return 0.00
				}
				
			},
			sumPrice: function() { //计算总退还的费用
				if(this.ThrowLease.isOffice == 0){
					this.zonmoney = parseFloat(parseFloat(this.ThrowLease.deposit) + parseFloat(this.ThrowLease.rentCyclePayMoney) + parseFloat(this.ThrowLease.rentServiceCost) - parseFloat(this.ThrowLease.roomInfo.waterAndElectricTotalMoney) - parseFloat(this.money2) - parseFloat(this.money3)).toFixed(2);
					return this.zonmoney;
				}
				else if(this.ThrowLease.isOffice == 1){
					this.zonmoney = parseFloat(parseFloat(this.ThrowLease.deposit) + parseFloat(this.ThrowLease.rentCyclePayMoney) + parseFloat(this.ThrowLease.rentServiceCost) - parseFloat(this.money2) - parseFloat(this.money3)).toFixed(2);
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
			addsm() {
				this.OtherInfo.push({
					costName: '',
					costAmount: '0'
				})
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
						this.refund = JSON.parse(this.ThrowLease.materials);
						for(let i = 0; i < this.refund.length; i++) {
							this.$set(this.refund[i], "price", 0);
						}
						if(this.ThrowLease.otherCostJson != '[]'){
							this.OtherInfo = JSON.parse(this.ThrowLease.otherCostJson);
						}
						if(this.ThrowLease.isOffice == 1){
							this.ishide = true;
							this.ishide2 = true;
							setTimeout(() => {
								this.ishide = false;
								this.ishide2 = false;
							}, 2000);
						}
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			//按量计算水费
			waterNum(val){
				if(parseFloat(val) <= parseFloat(this.ThrowLease.roomInfo.roomWater)){
					this.warningMessage = '水表读数需大于初始值'+ this.ThrowLease.roomInfo.roomWater;
					this.warningModal = true;
				}
				else{
					if(this.ThrowLease.roomInfo.waterType == 1) {
						this.ThrowLease.roomInfo.waterAndElectricTotalMoney = 0;
						this.ThrowLease.roomInfo.waterDosage = parseFloat(val) - parseFloat(this.ThrowLease.roomInfo.roomWater);
						this.ThrowLease.roomInfo.waterTotalMoney = parseFloat(this.ThrowLease.roomInfo.waterDosage * this.ThrowLease.roomInfo.waterPrice).toFixed(2);
						this.ThrowLease.roomInfo.waterAndElectricTotalMoney = parseFloat(this.ThrowLease.roomInfo.waterTotalMoney) + parseFloat(this.ThrowLease.roomInfo.electricTotalMoney);
					}
				}
			},
			//按量计算电费
			energyNum(val){
				if(parseFloat(val) <= parseFloat(this.ThrowLease.roomInfo.roomElectric)){
					this.warningMessage = '电表读数需大于初始值'+ this.ThrowLease.roomInfo.roomElectric;
					this.warningModal = true;
				}
				else{
					if(this.ThrowLease.roomInfo.electricType == 1) {
						this.ThrowLease.roomInfo.waterAndElectricTotalMoney = 0;
						this.ThrowLease.roomInfo.electricDosage = parseFloat(val) - parseFloat(this.ThrowLease.roomInfo.roomElectric);
						this.ThrowLease.roomInfo.electricTotalMoney = parseFloat(this.ThrowLease.roomInfo.electricDosage * this.ThrowLease.roomInfo.energyPrice).toFixed(2);
						this.ThrowLease.roomInfo.waterAndElectricTotalMoney = parseFloat(this.ThrowLease.roomInfo.waterTotalMoney) + parseFloat(this.ThrowLease.roomInfo.electricTotalMoney);
					}
				}
			},
			//按人数计算水费
			waterdays(val){
				if(this.ThrowLease.roomInfo.waterType == 2) {
					this.ThrowLease.roomInfo.waterAndElectricTotalMoney = 0;
					this.ThrowLease.roomInfo.waterTotalMoney = parseFloat(this.ThrowLease.roomInfo.enterCount * val * this.ThrowLease.roomInfo.waterPrice).toFixed(2);
					this.ThrowLease.roomInfo.waterAndElectricTotalMoney = parseFloat(this.ThrowLease.roomInfo.waterTotalMoney) + parseFloat(this.ThrowLease.roomInfo.electricTotalMoney);
				}
			},
			//按人数计算水费
			energydays(val){
				if(this.ThrowLease.roomInfo.electricType == 2) {
					this.ThrowLease.roomInfo.waterAndElectricTotalMoney = 0;
					this.ThrowLease.roomInfo.electricTotalMoney = parseFloat(this.ThrowLease.roomInfo.enterCount * val * this.ThrowLease.roomInfo.energyPrice).toFixed(2);
					this.ThrowLease.roomInfo.waterAndElectricTotalMoney = parseFloat(this.ThrowLease.roomInfo.waterTotalMoney) + parseFloat(this.ThrowLease.roomInfo.electricTotalMoney);
				}
			},
			promise() {         //公寓确认退租
				let vm = this
				let param = new FormData();
				param.append("throwLeaseId", this.throwLeaseId);
				param.append("deposit", this.ThrowLease.deposit);
				
				param.append("days",this.ThrowLease.roomInfo.days);
				param.append("enterCount",this.ThrowLease.roomInfo.enterCount);
				param.append("refundableRent", this.ThrowLease.rentCyclePayMoney);
				param.append("refundService",this.ThrowLease.rentServiceCost);
				if(this.ThrowLease.isOffice == 0){
					param.append("thisWaterRead", this.ThrowLease.roomInfo.thisWaterRead);
					param.append("thisElectricRead", this.ThrowLease.roomInfo.thisElectricRead);
					param.append("refundableWaterEnergyMoney", this.ThrowLease.roomInfo.waterAndElectricTotalMoney);
				}
				
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
				// console.log(this.throwLeaseId);
				// console.log(this.ThrowLease.deposit);
				// console.log(this.ThrowLease.waterNum);
				// console.log(this.ThrowLease.energyNum);
				// console.log(this.ThrowLease.refundableRent);
				// console.log(this.money);
				// console.log(JSON.stringify(this.refundableMaterialsInfo));
				// console.log(JSON.stringify(this.refundableOtherInfo));
				// console.log(this.zonmoney);
				axios.post(hostLeaseController, param).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						vm.successMessage = '用户退租成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							vm.$router.go(-1);

						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					// console.log(err);
					this.warningMessage = '用户退租失败,服务器出现异常';
					this.warningModal = true;
				})
			},
			promise2(){   //办公室确认退租
				let vm = this
				let param = new FormData();
				param.append("throwLeaseId", this.throwLeaseId);
				param.append("deposit", this.ThrowLease.deposit);
				param.append("refundableRent", this.ThrowLease.rentCyclePayMoney);
				param.append("refundService",this.ThrowLease.rentServiceCost);
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
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						vm.successMessage = '用户退租成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							vm.$router.go(-1);

						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					// console.log(err);
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
			},
			ViewBy(){
				this.ishide = true;
				this.ishide3 = true;
			},
			Veiyinst(){
				this.ishide = false;
				this.ishide3 = false;
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