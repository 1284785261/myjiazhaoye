<template>
	<div id="addirmsurrends">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/surrender">用户退租</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>退租详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="surrendetal" v-if="ThrowLease.isOffice == 0 && ThrowLease != null">
		    		<div class="surrendetal1">
		    			<Icon type="android-home"></Icon><p>{{ThrowLease.isOffice | isOffce}}{{ThrowLease.roomInfo}}</p>
		    			<ul>
		    				<li style="margin-left: 66px;"><span>承租人：{{ThrowLease.userName}}</span></li>
							<li><span>联系电话：{{ThrowLease.userPhone}}</span></li>
							<li><span>租期：{{ThrowLease.beginDate | time}} - {{ThrowLease.endDate | time}}</span></li>
							<li><span style="color: red;">剩余{{ThrowLease.surplusDay}}天</span></li>
							<li><span>合租人数：{{ThrowLease.enterCount}}人</span></li>
		    			</ul>
		    			
		    			<router-link :to="{name:'contractDetail',query:{contractSignId:ThrowLease.contractSignId,isOffice:ThrowLease.isOffice}}">查看合同</router-link>
		    		</div>
		    		<div class="surrendetal2">
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>租金和押金结算</h3>
		    				<ul>
		    					<li>押金：<span style="color: red;font-weight: bold;">{{ThrowLease.deposit | des}}元</span></li>
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.payStage}}/{{ThrowLease.stage}}</span></li>
								<li><span>共计：{{ThrowLease.sumPrice | des}}元</span></li>
		    				</ul>
		    				<p>应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableRent | des}}元</span></p>
		    			</div>
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>退租前水电费结算</h3>
		    				<table>
		    					<tr>
		    						<td>水表读数：<span>{{refundableWaterInfo.waterReadingNum}}</span></td>
									<td>用水量：<span>{{refundableWaterInfo.waterConsumptionNum}}m³</span></td>
									<td>水费：<span>{{refundableWaterInfo.waterRentNum | des}}元</span></td>
		    					</tr>
		    					<tr>
		    						<td>电表读数：<span>{{refundableEnergyInfo.energyReadingNum}}</span></td>
									<td>用电量：<span>{{refundableEnergyInfo.energyConsumptionNum}}度</span></td>
									<td>电费：<span>{{refundableEnergyInfo.energyRentNum | des}}元</span></td>
		    					</tr>
		    				</table>
		    				
		    				<p>应扣水电费:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableWaterEnergyMoney | des}}元</span></p>
		    			</div>
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>物资清点</h3>
		    				<table class="wuzi">
		    					<tr v-for="item in refund">
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
									<td>应扣：<span>{{item.costAmount | des}}元</span></td>
								</tr>
		    				</table>
		    				<p>应扣物品折扣:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableMaterialsMoney | des}}元</span></p>
		    			</div>
		    			<div class="qts">
		    				<img src="../../../static/images/icon/info.png" /><h3>其他费用</h3>
		    				<ul style="min-height: 30px;">
		    					<li v-for="item in OtherInfo"><span style="width: 90px;display: inline-block;">{{item.costName}}</span>应扣：<span>{{item.costAmount | des}}元</span></li>
		    				</ul>
		    				<p>应扣其他费用:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableOtherMoney | des}}元</span></p>
		    			</div>
		    			<div>
		    				<p class="zong">应退金额总计:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundMoney | des}}元</span></p>
		    				<p class="titus">应退金额总计 = 押金 + 应退租金 - 应扣水电费 - 应扣物品折扣 - 其他费用</p>
		    			</div>
		    		</div>
		    	</div>
		    	<div id="surrendetal" v-else-if="ThrowLease.isOffice == 1 && ThrowLease != null">
		    		<div class="surrendetal1">
		    			<Icon type="android-home"></Icon><p>{{ThrowLease.isOffice | isOffce}}{{ThrowLease.roomInfo}}</p>
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
		    		<div class="surrendetal2">
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>租金和押金结算</h3>
		    				<ul>
		    					<li>押金：<span style="color: red;font-weight: bold;">{{ThrowLease.deposit | des}}元</span></li>
								<li><span>租金：{{ThrowLease.cyclePayMoney | des}}元/月   已缴{{ThrowLease.payStage}}/{{ThrowLease.stage}}</span></li>
								<li><span>共计：{{ThrowLease.sumPrice | des}}元</span></li>
		    				</ul>
		    				<p>应退租金：<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableRent | des}}元</span></p>
		    			</div>
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>物资清点</h3>
		    				<table class="wuzi">
		    					<tr v-for="item in refund">
									<td>{{item.materialName}}</td>
									<td>x<span>{{item.count}}</span></td>
									<td>应扣：<span>{{item.costAmount | des}}元</span></td>
								</tr>
		    				</table>
		    				<p>应扣物品折扣:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableMaterialsMoney | des}}元</span></p>
		    			</div>
		    			<div class="qts">
		    				<img src="../../../static/images/icon/info.png" /><h3>其他费用</h3>
		    				<ul style="min-height: 30px;">
		    					<li v-for="item in OtherInfo"><span style="width: 90px;display: inline-block;">{{item.costName}}</span>应扣：<span>{{item.costAmount | des}}元</span></li>
		    				</ul>
		    				<p>应扣其他费用:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundableOtherMoney | des}}元</span></p>
		    			</div>
		    			<div>
		    				<p class="zong">应退金额总计:<span style="color: red;margin-left: 10px;">{{ThrowLease.refundMoney | des}}元</span></p>
		    				<p class="titus">应退金额总计 = 押金 + 应退租金 - 应扣物品折扣 - 其他费用</p>
		    			</div>
		    		</div>
		    	</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>


<script>
	
	import '../../sass/style/surrendetal.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostthrowlease } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				currentPage3: 1,
				radio: '1',
				ishide:false,
				throwLeaseId:'',
				ThrowLease:null,
				refund: null, //物资清点
				OtherInfo: null, //其他费用
				refundableWaterInfo:null,
				refundableEnergyInfo:null
		   	}
    	},
    	mounted(){
			this.throwLeaseId = this.$route.query.id;
			this.datas();
    	},
    	filters:{
    		time(val) {
				return new Date(val).Format('yyyy.MM.dd');
			},
   			isOffce(val) {
				if(val == 0) {
					return '公寓'
				} else if(val == 1) {
					return '办公室'
				}
			},
			des(val) {
				return parseFloat(val).toFixed(2);
			}
    	},
    	methods:{
			datas() {
				axios.post(hostthrowlease,
					qs.stringify({
						throwLeaseId: this.throwLeaseId
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.ThrowLease = res.data.result;
						this.refund = JSON.parse(this.ThrowLease.refundableMaterialsInfo);
						this.OtherInfo = JSON.parse(this.ThrowLease.refundableOtherInfo);
						this.refundableWaterInfo = JSON.parse(this.ThrowLease.refundableWaterInfo);
						this.refundableEnergyInfo = JSON.parse(this.ThrowLease.refundableEnergyInfo);
						console.log(this.refundableEnergyInfo);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>