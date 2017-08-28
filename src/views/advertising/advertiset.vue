<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">广告设置</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>广告设置</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="advertiset">
		    		<div class="advertiset1">
		    			<span>Banner管理</span><router-link to="/advertising/addBanner">+ 添加Banner</router-link>
		    		</div>
		    		<table>
		    			<thead>
		    				<td width="25%">缩略图</td>
		    				<td width="30%">图片说明</td>
		    				<td>排序</td>
		    				<td>状态</td>
		    				<td width="20%">操作</td>
		    			</thead>
		    			<tr>
		    				<td><img src="../../../static/images/temp/uploadImg.png"></td>
		    				<td>APP首页banner图</td>
		    				<td>1</td>
		    				<td>开放</td>
		    				<td><a>修改</a><a>删除</a></td>
		    			</tr>
		    			<tr>
		    				<td><img src="../../../static/images/temp/uploadImg.png"></td>
		    				<td>APP首页banner图</td>
		    				<td>1</td>
		    				<td>开放</td>
		    				<td><a>修改</a><a>删除</a></td>
		    			</tr>
		    			<tr>
		    				<td><img src="../../../static/images/temp/uploadImg.png"></td>
		    				<td>APP首页banner图</td>
		    				<td>1</td>
		    				<td>开放</td>
		    				<td><a>修改</a><a>删除</a></td>
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
	
	import '../../sass/style/advertiset.css';
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