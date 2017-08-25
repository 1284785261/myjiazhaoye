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
		          <h3><i class="icon icon-iden"></i>调价管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="priceAdmin">
		    		<div class="priceadmin">
		    			<span>筛选：</span>
		    			<a>全部</a>
		    			<a>已生效</a>
		    			<a>审批中</a>
		    			<a>不通过</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>时间</td>
		    				<td>房间</td>
		    				<td>新价格(元/月)</td>
		    				<td>原价格(元/月)</td>
		    				<td>申请人</td>
		    				<td>调价原因</td>
		    				<td>状态</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr>
		    				<td>111111111111111</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    				<td><router-link to="/signed/priceCheck">审批</router-link></td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    				<td>审批</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    				<td>审批</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    				<td>审批</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    				<td>--</td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size="10"
				      layout="prev, pager, next,total,jumper"
				      :total="100">
				     <a>跳转</a> 
				    </el-pagination>
				    
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/priceAdmin.css';
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
    			 currentPage3: 5
		   	}
    	},
    	methods:{
    		handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
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