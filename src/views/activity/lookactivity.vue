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
		          <h3><i class="icon icon-iden"></i>活动详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="lookactivity">
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
		    		</table>
					<h3 class="zhts">活动状态:<span>{{Userlist.activityStatus | Status3}}</span></h3>
		    		<p></p>
		    		<h3>领取记录</h3>
		    		<table class="lqjv">
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
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
					</el-pagination>
					<router-link :to="{path:'/activity/discountcom',query:{id:this.activityId}}" class="tuisong" v-if="Userlist.activityStatus =='0' || Userlist.activityStatus =='1' && jurisdiction('ACTIVITY_UPDATE')">推送优惠券</router-link>
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		
		
	</div>
</template>

<script>
	import '../../sass/style/lookactivity.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostActivityInfo,hostActivityContro } from '../api.js';
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
				totalNum:0
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
					return '￥' + 0;
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
				axios.post(hostActivityInfo,
					qs.stringify({
						activityId:this.activityId
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.Userlist = res.data.entity;
					}
				}).catch((err) => {
					console.log(err);
				})
		    },
			datas2(){
				axios.post(hostActivityContro,
					qs.stringify({
						activityId : this.activityId,
						pageNum :this.pageNum,
						pageSize : this.pageSize
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.couplist = res.data.result.couponList;
						this.totalNum = res.data.result.totalNum;
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas2();
			},
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>