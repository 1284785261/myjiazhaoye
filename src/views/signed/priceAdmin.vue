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
		    			<a v-for="(item,index) in tite" @click="classify(index)" :class="{'active':isAicat === index}">{{item}}</a>
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
		    		</table>
		    		<el-pagination
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
    import axios from 'axios';
    import { hostTable } from '../api.js';
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
    			currentPage3: 5,
    			communityId:null,
    			tite:['全部','已生效','审批中','不通过'],
    			isAicat:''
		   	}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		this.datas();
    	},
    	methods:{
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
		      datas(){
		      	axios.post(hostTable,
		      		qs.stringify({
		      			communityId:this.communityId,
		      			status:0
		      		})
		      	)
		      	.then((response)=>{
    				console.log(response);
 					//this.bigdata= response.data.entity;
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
		      },
		      classify(index){
		      	this.isAicat = index;
		      	
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