<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/activity/activitys">活动管理</router-link><span>>活动详情</span>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>活动详情</h3>
		        </div>
		    	<div id="lookactivity" v-if="Userlist">
		    		<table class="looks">
						<tr>
		    				<td>活动类型：</td>
		    				<td>{{Userlist.activityType | activityType}}</td>
		    			</tr>
						<tr>
		    				<td>活动主题：</td>
		    				<td>{{Userlist.activityTheme}}</td>
		    			</tr>
		    			<tr>
		    				<td>活动ID：</td>
		    				<td>{{Userlist.activityNum}}</td>
		    			</tr>
		    			<tr>
		    				<td>活动时间：</td>
		    				<td>{{Userlist.beginDate | time}} 至 {{Userlist.endDate | time}}</td>
		    			</tr>
		    			<tr>
		    				<td>活动介绍：</td>
		    				<td>{{Userlist.activityContent}}</td>
		    			</tr>
		    			<tr>
		    				<td>活动规则：</td>
		    				<td>{{Userlist.endRule | endRule}}</td>
		    			</tr>
						<tr>
		    				<td>金额范围：</td>
		    				<td style="color: red;" v-if="Userlist.beginQuota">{{Userlist.beginQuota | Money}} - {{Userlist.endQuota | Money}}</td>
							<td style="color: red;" v-else>无</td>
		    			</tr>
						<tr>
		    				<td>总金额：</td>
		    				<td style="color: red;">{{Userlist.activityTotalMoney | Money}}</td>
		    			</tr>
						<tr>
		    				<td>剩余金额：</td>
		    				<td style="color: red;">{{Userlist.activitySurplusMoney | Moneys}}</td>
		    			</tr>
		    			<tr>
		    				<td>优惠券有效期：</td>
		    				<td>{{Userlist.validityDate}}天</td>
		    			</tr>
						<tr>
		    				<td>参与对象：</td>
		    				<td v-if="Userlist.joinStatus == '1'"><span>注册时间：</span>{{Userlist.beginRegisterTime | time}} 至 {{Userlist.endRegisterTime | time}}</td>
							<td v-else>无</td>
		    			</tr>
						<tr>
							<td>是否有签约记录：</td>
							<td v-if="Userlist.signStatus">{{Userlist.signStatus | Status2}}</td>
							<td v-else>无</td>
						</tr>
						<tr class="scope">
							<td>适用范围：</td>
							<td><span>{{quantity}}</span><a @click="scope">选择适用范围</a></td>
						</tr>
						<tr>
							<td>活动触发位置：</td>
							<td>{{Userlist.position | position}}</td>
						</tr>
		    		</table>
					<h3 class="zhts" v-if="Userlist && Userlist.activityStatus">活动状态:<span>{{Userlist.activityStatus | Status3}}</span></h3>
		    		<p></p>
		    		<h3 v-if="couplist != null ">领取记录</h3>
		    		<table class="lqjv" v-if="couplist != null ">
		    			<thead>
		    				<td>序号</td>
		    				<td>手机号</td>
		    				<td>优惠券金额/元</td>
		    				<td>优惠券编码</td>
		    				<td>领取时间</td>
							<td>使用时间</td>
		    			</thead>
		    			<tr v-for="(item,index) in couplist">
		    				<td>{{index+1}}</td>
		    				<td>{{item.userPhone}}</td>
		    				<td>{{item.amount | Money}}</td>
		    				<td>{{item.couponNum}}</td>
		    				<td v-if="item.getTime">{{item.getTime | time2}}</td>
							<td v-else>--</td>
							<td v-if="item.useTime">{{item.useTime | time2}}</td>
							<td v-else>--</td>
		    			</tr>
		    		</table>
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum v-if="couplist != null ">
					</el-pagination>
					<router-link :to="{path:'/activity/discountcom',query:{id:this.activityId}}" class="tuisong" v-if="Userlist.activityStatus == '0' || Userlist.activityStatus == '1' && jurisdiction('ACTIVITY_UPDATE')">推送优惠券</router-link>
		    	</div>


			</div>
			<footer-box></footer-box>
		</div>
		<div class="community-house-modalum" v-if="formula" @click="formulas()"></div>
		<div v-if="formula" class="community-formulam">
			<div>
				<p>选择适用范围</p>
			</div>
			<div style="width: 720px;height: 480px;overflow:auto; overflow-x:auto;">
				<Checkbox v-model="singdng" @on-change="checkAll(singdng)" disabled="disabled"><span class="quanbu">全部：</span></Checkbox>
				<table>
					<tr v-for= "(item,index) in formulaList">
						<td style="width: 140px;vertical-align: text-top;">
							<Checkbox v-model="item.singdng" @click.prevent.native="handleCheckAll(item,index)" disabled="disabled"><span class="quanbu">{{item.cityName}}：</span></Checkbox>
						</td>
						<td>
							<Checkbox v-for="ite in item.communityList" v-model="ite.sing" @on-change="checkAllGroupChange(item,inde)" disabled="disabled"><span>{{ite.communityName}}</span></Checkbox>
						</td>
					</tr>
				</table>
			</div>
		</div>

	</div>
</template>

<script>
	import '../../sass/style/lookactivity.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostActivityInfo,hostActivityContro,hostActivityformula } from '../api.js';
    import qs from 'qs';

    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				activeTabName:"activitys",
		        activityId:'',
				Userlist:null,
				couplist:null,
				pageNum:'1',
				pageSize:5,
				currentPage3: 1,
				totalNum:0,
				formula:false,
				quantity:0,
				formulaList:[],
				sings:true,
				single:false,
				singdng:false
    		}
    	},
    	mounted(){
    		this.activityId = this.$route.query.id;
			this.datas();
			this.datas2();

    	},
    	filters:{
    		time(val) {
				if(val) {
					return new Date(val).Format('yyyy-MM-dd');
				}
			},
			time2(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
			},
			position(val){
				if(val == 1){
					return '注册后';
				}
				else{
					return '无'
				}
			},
			Status(val){
				if(val == '1'){
					return '有效';
				}
				else if(val == '2'){
					return '结束';
				}
				else if(val == '3'){
					return '作废';
				}
			},
			endRule(val){
				if(val == '0'){
					return '到期结束'
				}
				else if(val == '1'){
					return '送完即止'
				}
				else if(val == '2'){
					return '长期有效'
				}
				else if(val == '0,1' || val == '1,0'){
					return '到期结束+送完即止'
				}
				else if(val == '0,2' || val == '2,0'){
					return '到期结束+长期有效'
				}
				else if(val == '1,2' || val == '2,1'){
					return '送完即止+长期有效'
				}
				else if(val == '0,1,2' || val == '1,0,2' || val == '2,1,0'){
					return '到期结束+送完即止+长期有效'
				}
			},
			Status3(val){
				if(val == '0'){
					return '未开始'
				}else if(val == '1'){
					return '进行中'
				}else if(val == '2'){
					return '已结束'
				}else if(val == '3'){
					return '已作废'
				}
			},
			Money(val){
				return '￥' + parseFloat(val).toFixed(2);
			},
			Moneys(val){
				if(val){
					return '￥' + parseFloat(val).toFixed(2);
				}
				else{
					return '￥' + parseFloat(0).toFixed(2);
				}
			},
			activityType(val){
				if(val == '0'){
					return '优惠券'
				}
			},
			Status2(val){
				if(val == '0'){
					return '否'
				}else if(val == '1'){
					return '是'
				}
			}
    	},
		methods:{
		    datas(){
				let vm = this
				axios.get(hostActivityformula).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.formulaList = res.data.pageBean;
						for(let i= 0;i<vm.formulaList.length;i++){
							this.$set(vm.formulaList[i],'singdng',false);
							for(let m = 0; m < vm.formulaList[i].communityList.length; m++){
								this.$set(vm.formulaList[i].communityList[m], "sing", false);
							}

						}

						axios.post(hostActivityInfo,
							qs.stringify({
								activityId:this.activityId
							})
						).then((res) => {
							//console.log(res);
							if(res.status == 200 && res.data.code == 10000) {
								this.quantity = res.data.result.communityAmount;
								let communityAmount = res.data.result.communityIds;
								console.log(communityAmount);
								for(let i= 0;i < vm.formulaList.length;i++){
									for(let m = 0; m < vm.formulaList[i].communityList.length; m++){
										for(let s = 0; s < communityAmount.length ; s++){
											if(communityAmount[s] == vm.formulaList[i].communityList[m].communityId){
												this.$set(this.formulaList[i].communityList[m], "sing", true);
											}
										}
									}

								}
								console.log(vm.formulaList);
							}
						}).catch((err) => {
							// console.log(err);
						})
								// console.log(this.formulaList);
							}
				}).catch((err) => {
					// console.log(err);
				})


				axios.post(hostActivityInfo,
					qs.stringify({
						activityId:this.activityId
					})
				).then((res) => {
					//console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.Userlist = res.data.result.activity;
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			handleCheckAll(item,index) { //权限全选
				item.singd = ! item.singd;
				if(this.loderList[index].singd == true) {
					for(let i = 0; i < this.loderList[index].powerItemChildList.length; i++) {
						this.$set(this.loderList[index].powerItemChildList[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.loderList[index].powerItemChildList.length; i++) {
						this.$set(this.loderList[index].powerItemChildList[i], "sing", false);
					}
				}
			},
			checkAllGroupChange(item, index) { //权限单选
				// console.log(item);
				// console.log(index);
				var flag = true;
				for(let i = 0; i < item.powerItemChildList.length; i++) {
					if(item.powerItemChildList[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(item.powerItemChildList.length) {
					item.singd = flag;
				} else {
					item.singd = false;
				}
			},
			datas2(){
				axios.post(hostActivityContro,
					qs.stringify({
						activityId : this.activityId,
						pageNum :this.pageNum,
						pageSize : this.pageSize
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.couplist = res.data.result.couponList;
						this.totalNum = res.data.result.totalNum;
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas2();
			},
			scope(){
				this.formula = true;
			},
			formulas(){
				this.formula = false;
			},
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  #lookactivity{
	  .scope{
		  a{
			  width: 200px;
				height: 30px;
				border: 1px solid #dcdcdc;
				text-align: center;
				line-height: 28px;
				display: inline-block;
				border-radius: 10px;
				margin-left: 30px;
		  }
	  }
  }
  	.community-house-modalum{
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
	}
	.community-formulam{
		width: 720px;
		height: 540px;
		background-color: #fff;
		border-radius: 5px;
		margin: auto;
		position: fixed;
		z-index: 9999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		p{
			width: 100%;
			height: 60px;
			text-align: center;
			line-height: 60px;
			border-bottom:1px solid #dcdcdc;
			background-color: #038be2;
			font-size: 20px;
			color: #fff;
		}
		.ivu-checkbox-wrapper{
			font-size: 14px;
			margin-left: 20px;
			line-height: 60px;
			.quanbu{
				margin-left: 16px;
				font-size: 14px;
			}
		}
	}

</style>
