<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/advertising/advertiset">广告设置</router-link>
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
		    				<td><img :src='imgPaths + item.bannerPic'></td>
		    				<td v-if="item.imgExplain != null">{{item.imgExplain}}</td>
		    				<td v-else>无</td>
		    				<td>{{item.listNumber}}</td>
		    				<td>{{item.isClose | order(item.isClose)}}</td>
		    				<td><router-link :to="{path:'/advertising/addBanner',query:{id:item.adId}}">修改</router-link><a @click="deletes(item.adId)">删除</a></td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size=pageSize
				      layout="prev, pager, next,total,jumper"
				      :total=totalNum>
				    
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
    			Datas:null,
    			totalNum:null,
    			pageNum:1,
    			imgPaths:null,
    			pageSize:3
		   	}
    	},
    	mounted(){
    		this.datas();
    		this.imgPaths = imgPath;
    	},
    	methods:{
		    handleCurrentChange(val) {
		        //console.log(`当前页: ${val}`);
		        this.pageNum = val;
		    },
		    datas(){
		    	let vm =this
    			let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
		    	axios.get(hostAdvert,
		    		qs.stringify({
		    			pageNum:pageNum,
		    			pageSize: pageSize
		    		})
		    	)  //获取所有banner数据
		    	.then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.pageBean.page;
			    		this.totalNum = response.data.pageBean.totalNum;
		    		}
		    		else{
		    			console.log('获取数据异常');
		    		}
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
		    		if(response.status == 200 && response.data.code == 10000){
		    			alert('删除成功');
		    			this.datas();
		    		}
		    		else{
		    			alert('删除失败');
		    		}
		    		
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		    	
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