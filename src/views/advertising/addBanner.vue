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
		          <h3><i class="icon icon-iden"></i>添加Banner</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="addbanner">
		    		<table>
		    			<tr>
		    				<td>上传banner图：</td>
		    				<td>
		    					<el-upload
								  class="avatar-uploader"
								  action="https://jsonplaceholder.typicode.com/posts/"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="imageUrl" :src="imageUrl" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span class="sb">上传图片</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>图片链接：</td>
		    				<td><input type="text" placeholder="请输入链接"></td>
		    			</tr>
		    			<tr>
		    				<td>图片说明：</td>
		    				<td>
		    					<textarea placeholder="请输入图片说明">
		    						
		    					</textarea>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>状态：</td>
		    				<td>
		    					<el-radio class="radio" v-model="radio" label="1">开放</el-radio>
  								<el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>排序：</td>
		    				<td><input type="text" placeholder="请输入排序号" class="px"></td>
		    			</tr>
		    		</table>
		    		<a class="tj">确定</a>
		    		<p class="tis"><i class="el-icon-warning"></i>请添加大小不超过500k、分辨率为750*450px、图片格式为JPG或PNG等</p>
		    	</div>
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/addBanner.css';
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
    			imageUrl: '',
    			radio: '1'
		   	}
    	},
    	methods:{
    		handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
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