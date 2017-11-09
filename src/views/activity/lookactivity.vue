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
		    				<td>活动ID：</td>
		    				<td>{{Userlist.activityNum}}</td>
		    			</tr>
		    			<tr>
		    				<td>活动主题：</td>
		    				<td>{{Userlist.activityTheme}}</td>
		    			</tr>
		    			<tr>
		    				<td>开始时间：</td>
		    				<td>{{Userlist.beginDate | time}}</td>
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
		    				<td>{{Userlist.endDate | time}}</td>
		    			</tr>
						<tr>
		    				<td>总金额：</td>
		    				<td style="color: red;">{{Userlist.activityTotalMoney | Money}}</td>
		    			</tr>
						<tr>
		    				<td>剩余金额：</td>
		    				<td>{{Userlist.endDate | time}}</td>
		    			</tr>
		    			<tr>
		    				<td>结束时间：</td>
		    				<td>{{Userlist.endDate | time}}</td>
		    			</tr>
		    			
		    			<tr>
		    				<td>优惠券有效期：</td>
		    				<td v-if="Userlist.validityDate != null">{{Userlist.validityDate | time}}</td>
		    				<td v-else>无期限</td>
		    			</tr>
						<tr>
		    				<td>参与对象：</td>
		    				<td><span>注册时间：</span>{{Userlist.endDate | time}}<span>是否有签约记录：</span></td>
		    			</tr>
		    		</table>
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
		    			<tr>
		    				<td>1</td>
		    				<td>1</td>
		    				<td>1</td>
		    				<td>1</td>
		    				<td>1</td>
							<td>1</td>
		    			</tr>
		    		</table>
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
    import { hostActivityInfo } from '../api.js';
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
		    	Userlist:null
    		}
    	},
    	mounted(){
    		this.activityId = this.$route.query.id;
    		this.datas();
    	},
    	filters:{
    		time(val) {
				if(val) {
					return new Date(val).Format('yyyy-MM-dd');
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
				else if(val == '0,1'){
					return '到期结束+送完即止'
				}
				else if(val == '0,2'){
					return '到期结束+长期有效'
				}
				else if(val == '1,2'){
					return '送完即止+长期有效'
				}
				else if(val == '0,1,2'){
					return '到期结束+送完即止+长期有效'
				}
			},
			Money(val){
				return val.toFixed(2)+'元'
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
		    }
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>