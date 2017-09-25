<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/refundrecord">发起退款记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>发起退款</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="openrefund">
		    		<table>
		    			<tr>
		    				<td>金额：</td>
		    				<td><input type="text" placeholder="请输入金额" style="width: 198px;"/><span>元</span></td>
		    			</tr>
		    			<tr>
		    				<td>用户注册手机号：</td>
		    				<td><input type="text" placeholder="请输入用户注册的手机号码"/></td>
		    			</tr>
		    			<tr>
		    				<td>用户姓名：</td>
		    				<td><input type="text" placeholder="请输入用户姓名"/></td>
		    			</tr>
		    			<tr>
		    				<td>用户收款银行账号：</td>
		    				<td><input type="text" placeholder="请输入用户收款银行账号"/></td>
		    			</tr>
		    			<tr>
		    				<td>开户行：</td>
		    				<td><input type="text" placeholder="请输入开户行"/></td>
		    			</tr>
		    			<tr>
		    				<td>户名：</td>
		    				<td><input type="text" placeholder="请输入户名"/></td>
		    			</tr>
		    			<tr>
		    				<td style="vertical-align: top;">退款备注：</td>
		    				<td><textarea placeholder="请输入退款备注"></textarea></td>
		    			</tr>
		    		</table>
		    		<a>提交退款申请</a>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		<div class="scherm" v-show="ishide">
			
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/openrefund.css';
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