<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：活动管理 > </span>
		          <router-link  class="active" to="/activity/activitys">新增活动</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>推送优惠券</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="discountcom">
		    		<table class="looks" v-if="Userlist">
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
		    				<td style="color: red;">{{Userlist.beginQuota | Money}} - {{Userlist.endQuota | Money}}</td>
		    			</tr>
						<tr>
		    				<td>总金额：</td>
		    				<td style="color: red;">{{Userlist.activityTotalMoney | Money}}</td>
		    			</tr>
						<tr>
		    				<td>剩余金额：</td>
		    				<td style="color: red;">{{Userlist.activitySurplusMoney | Money}}</td>
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
		    		</table>
		    		<p></p>
					<a @click="addtuis" class="addtuis">+添加推送</a>
		    		<h3>推送记录</h3>
		    		<table class="lqjv">
		    			<thead>
		    				<td>序号</td>
		    				<td>手机号</td>
		    				<td>优惠券金额/元</td>
		    				<td>优惠券编码</td>
		    				<td>推送时间</td>
							<td>状态</td>
		    			</thead>
		    			<tr v-for="(item,index) in couplist">
		    				<td>{{index+1}}</td>
		    				<td>{{item.userPhone}}</td>
		    				<td>{{item.amount | Money}}</td>
		    				<td>{{item.couponNum}}</td>
		    				<td>{{item.createTime | time2}}</td>
							<td>{{item.getStatus | Status}}</td>
		    			</tr>
		    		</table>
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
					</el-pagination>

		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="zhezhaoa" v-show="isHide">		
		</div>
		<div class="instas2" v-show="isHide">
			<i class="el-icon-circle-close" @click="instas()"></i>
			<p>推送优惠券</p>
			<table>
				<tr>
					<td>电话号码：</td>
					<td><input type="text" placeholder="请输入电话号码" v-model="titl1" maxlength="50"/></td>
				</tr>
				<tr>
					<td>优惠券金额：</td>
					<td><input type="text" placeholder="请输入金额" v-model="titl2" maxlength="50"/>元</td>
				</tr>
			</table>
			<a @click="addtui">确认</a>
		</div>
		
	</div>
</template>

<script>
	import '../../sass/style/discountcom.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import { hostActivityCo,hostActivityCon,hostActivityControl } from '../api.js';
    import qs from 'qs';
    
    export default{
    	components:{
    		rightHeader,
    		menuBox,
			footerBox,
			successModal,
			warningModal
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
				isHide:false,
				titl1:'',
				titl2:'',
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
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
			Status(val){
				if(val == '0'){
					return '未领取';
				}
				else if(val == '1'){
					return '已领取';
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
			Money(val){
				return '￥' + parseFloat(val).toFixed(2);
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
			closeWarningModal() {
				this.warningModal = false;
				this.isHide = true;
			},
		    datas(){
				axios.post(hostActivityCo,
					qs.stringify({
						activityId:this.activityId
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.Userlist = res.data.result.activity;
					}
				}).catch((err) => {
					// console.log(err);
				})
		    },
			datas2(){
				axios.post(hostActivityCon,
					qs.stringify({
						activityId : this.activityId,
						pageNum :this.pageNum,
						pageSize : this.pageSize
					})
				).then((res) => {
					// console.log(111111111111);
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
			instas(){
				this.isHide = false;
			},
			addtuis(){
				this.isHide = true;
			},
			addtui(){
				axios.post(hostActivityControl,
					qs.stringify({
						activityId:this.activityId,
						userPhone:this.titl1,
						amount: this.titl2
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.isHide = false;
						this.successMessage = '推送成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datas2();
						}, 1000);
					}else{
						this.isHide = false;
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err) => {
					// console.log(err);
					this.warningMessage = '推送失败，服务器异常';
					this.warningModal = true;
				})
				this.titl1 = '';
				this.titl2 = '';
			}
		}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>