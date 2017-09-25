<template>
	<div>
		<menu-box></menu-box>
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
		    		<table class="looks">
		    			<tr>
		    				<td>活动ID：</td>
		    				<td>iadadja</td>
		    			</tr>
		    			<tr>
		    				<td>活动主题：</td>
		    				<td>adhlkahda</td>
		    			</tr>
		    			<tr>
		    				<td>开始时间：</td>
		    				<td>dhhdalhd</td>
		    			</tr>
		    			<tr>
		    				<td>活动介绍：</td>
		    				<td>akjdhakdhakdalda</td>
		    			</tr>
		    			<tr>
		    				<td>活动规则：</td>
		    				<td>dhahdadhad</td>
		    			</tr>
		    			<tr>
		    				<td>结束时间：</td>
		    				<td>dhahdadhad</td>
		    			</tr>
		    			<tr>
		    				<td>总金额：</td>
		    				<td>dhahdadhad</td>
		    			</tr>
		    			<tr>
		    				<td>优惠券有效期：</td>
		    				<td>dhahdadhad</td>
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
		    			</thead>
		    			<tr>
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
    import { hostDetails } from '../api.js';
    import qs from 'qs';
    
    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
		        gatheringId:null,
		    	title:null
    		}
    	},
    	mounted(){
    	},
    	filters:{
    	
    	},
    	methods:{
		    
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>