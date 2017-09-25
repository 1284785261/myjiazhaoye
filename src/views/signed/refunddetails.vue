<template>
	<div id="refunddetailsm">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/refundrecord">发起退款记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>退款详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="refunddetails">
		    		<div>
		    			<table>
		    				<tr>
		    					<td>退款单号：</td>
		    					<td>1111111111111：<span>已退款</span></td>
		    				</tr>
		    				<tr>
		    					<td>退款对象：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>用户注册手机号：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>退款金额：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>退款备注：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    			</table>
		    		</div>
		    		<div>
		    			<table>
		    				<tr class="yh">
		    					<td>退款至银行账户：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>户名：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>开户行：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>账户：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    			</table>
		    		</div>
		    		<div style="border: none;">
		    			<table>
		    				<tr>
		    					<td>发起时间：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>审核通过时间：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    				<tr>
		    					<td>退款时间：</td>
		    					<td>1111111111111：</td>
		    				</tr>
		    			</table>
		    		</div>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/refunddetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostHousehold } from '../api.js';
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
				ishide2:false,
				ishide3:false
		   	}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
			
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>