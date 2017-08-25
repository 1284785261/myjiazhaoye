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
		          <h3><i class="icon icon-iden"></i>住户列表</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="residentList">
		    		<div class="residentlist">
		    			<a>导出</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>序号</td>
		    				<td>姓名</td>
		    				<td>性别</td>
		    				<td>年龄</td>
		    				<td>电话</td>
		    				<td>当前租住</td>
		    				<td>租期</td>
		    			</thead>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    			</tr>
		    			<tr>
		    				<td>1</td>
		    				<td>熊反弹</td>
		    				<td>女</td>
		    				<td>110岁</td>
		    				<td>123456789</td>
		    				<td>1层-10</td>
		    				<td>2017366-1045121</td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size="10"
				      layout="prev, pager, next,total,jumper"
				      :total="100">
				    
				    </el-pagination>
				    
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/residentList.css';
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