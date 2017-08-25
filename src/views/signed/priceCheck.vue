<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">公寓状态</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>调价审核</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="priceCheck">
		    		<table class="titles">
		    			<tr>
		    				<td>申请时间：</td>
		    				<td>2017-07-01   22:00</td>
		    			</tr>
		    			<tr>
		    				<td>状态：</td>
		    				<td class="mv">审批中</td>
		    			</tr>
		    			<tr>
		    				<td>房间：</td>
		    				<td>2层 011</td>
		    			</tr>
		    			<tr>
		    				<td>原价格：</td>
		    				<td>1880.00元/月</td>
		    			</tr>
		    			<tr>
		    				<td>新价格：</td>
		    				<td class="mvs">1580.00元/月</td>
		    			</tr>
		    			<tr>
		    				<td>调价原因：</td>
		    				<td>促销</td>
		    			</tr>
		    		</table>
					<ul>
						<li>
							<span>审批：</span>
							 <el-radio class="radio" v-model="radio" label="1">同意</el-radio>
  							 <el-radio class="radio" v-model="radio" label="2">不同意</el-radio>
						</li>
						<li>
							<span>备注：</span>
							<textarea placeholder="请输入备注内容">
								
							</textarea>
						</li>
						<a>确定</a>
					</ul>
					<h4>审批记录</h4>
					<table class="titles2">
						<thead>
							<td>时间</td>
							<td>操作人</td>
							<td>审批结果</td>
							<td>备注</td>
						</thead>
						<tr>
							<td>
								206513161
							</td>
							<td>找嗷嗷</td>
							<td>--</td>
							<td>同意</td>
						</tr>
					</table>
		    	</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/priceCheck.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false,
    			radio: '1'
		   	}
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