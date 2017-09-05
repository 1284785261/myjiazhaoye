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
		    			<tr v-for="item in Datas">
		    				<td><img :src=imgPath+item.bannerPic></td>
		    				<td>{{item.imgExplain}}</td>
		    				<td>{{item.listNumber}}</td>
		    				<td>{{item.isClose | order(item.isClose)}}</td>
		    				<td><router-link :to="{path:'/advertising/addBanner',query:{id:item.adId}}">修改</router-link><a @click="deletes(item.adId)">删除</a></td>
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
    import qs from 'qs';
	import axios from 'axios';
	import { hostAdvert,imgPath,hostDelete } from '../api.js';
	
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
    			Datas:null
		   	}
    	},
    	mounted(){
    		this.datas();
    	},
    	methods:{
    		handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		    },
		    datas(){
		    	axios.post(hostAdvert)  //获取所有banner数据
		    	.then((response)=>{
		    		console.log(response);
		    		this.Datas = response.data.pageBean;
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		    },
		    deletes(id){
		    	axios.post(hostDelete,   //删除广告
		    	qs.stringify({
		    		adIds:id
		    	}))
		    	.then((response)=>{
		    		console.log(response);
		    		console.log('删除成功');
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		    	let index = this.Datas.findIndex(item => item.adId == id);
		    	this.Datas.splice(index,1);
		    	//this.datas();
		    }
    	
    	},
    	filters:{
    		order(number){
    			if(number == '0'){
    				return '开放'
    			}
    			else if(number == '1'){
    				return '关闭'
    			}
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