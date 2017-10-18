<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="signed/complain">用户投诉</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>投诉详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="complaindetail">
		    		<div class="complaindetails">
		    			<p class="dan">工单号：idahkdadajdladadl</p><span style="font-size: 16px;color: #ff6612;font-weight: bold;">待确认</span>
		    			<p>发起投诉时间：</p>
		    		</div>
		    		<div>
			    		<div class="complaindetails2">
			    			<img src="../../../static/images/icon/info.png"/><h3>用户信息</h3>
			    			<table>
			    				<tr>
			    					<td>姓名：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>已注册手机号：</td>
			    					<td>32156163516</td>
			    				</tr>
			    				<tr>
			    					<td>问题描述：</td>
			    					<td>1646165416549849641611111111111111111111111111111111111111111111111111111s46</td>
			    				</tr>
			    			</table>
			    			
			    		</div>
			    		<a>确认接收</a>
		    		</div>
		    		<!--<div>
			    		<div class="complaindetails2">
			    			<img src="../../../static/images/icon/info.png"/><h3>用户信息</h3>
			    			<table>
			    				<tr>
			    					<td>姓名：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>已注册手机号：</td>
			    					<td>32156163516</td>
			    				</tr>
			    				<tr>
			    					<td>问题描述：</td>
			    					<td>1646165416549849641611111111111111111111111111111111111111111111111111111s46</td>
			    				</tr>
			    			</table>
			    			
			    		</div>
			    		<div class="complaindetails3">
			    			<img src="../../../static/images/icon/info.png"/><h3>处理记录</h3>
			    			<table>
			    				<tr>
			    					<td>店长确认接收：</td>
			    					<td>啥表</td>
			    				</tr>
			    			</table>
			    		</div>
			    		<span class="chus">处理结果：</span><textarea placeholder="请填写处理结果"></textarea>
			    		<a class="chuli">确认已处理</a>
		    		</div>
		    		<div>
			    		<div class="complaindetails2">
			    			<img src="../../../static/images/icon/info.png"/><h3>用户信息</h3>
			    			<table>
			    				<tr>
			    					<td>姓名：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>已注册手机号：</td>
			    					<td>32156163516</td>
			    				</tr>
			    				<tr>
			    					<td>问题描述：</td>
			    					<td>1646165416549849641611111111111111111111111111111111111111111111111111111s46</td>
			    				</tr>
			    			</table>
			    			
			    		</div>
			    		<div class="complaindetails4">
			    			<img src="../../../static/images/icon/info.png"/><h3>处理记录</h3>
			    			<table>
			    				<tr>
			    					<td>店长确认接收：</td>
			    					<td>啥表</td>
			    				</tr>
			    			</table>
			    			<p style="border-bottom: 1px dashed #DCDCDC;"></p>
			    			<table>
			    				<tr>
			    					<td>店长确认接收：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>店长完成处理：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>处理结果：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td style="vertical-align: top;">用户反馈：</td>
			    					<td>
			    						<p>不满意</p>
			    						<p>不满意</p>	
			    					</td>
			    				</tr>
			    			</table>
			    			<p style="border-bottom: 1px dashed #DCDCDC;"></p>
			    			<table>
			    				<tr>
			    					<td>客服介入处理：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td>处理结果：</td>
			    					<td>啥表</td>
			    				</tr>
			    				<tr>
			    					<td style="vertical-align: top;">用户反馈：</td>
			    					<td>
			    						<p>不满意</p>
			    						<p>不满意</p>
			    					</td>
			    				</tr>
			    			</table>
			    		</div>
		    		</div>-->
		    	</div>


			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/complaindetail.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostHousehold,hostdaocu,host } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false,
    			currentPage3: 1,
    			communityId:null,
    			Datas:[],
    			totolNum:null,
    			pageNum:1,
          		host3:'',
          		pageSize:10
		   	}
    	},
    	mounted(){
        
    		this.communityId = this.$route.query.id;
    	},
    	filters:{
    		
    	},
    	methods:{
		    datas(){
		    	
		  	}

    	},
    	created(){


    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

</style>
