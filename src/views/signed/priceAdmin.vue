<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
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
		    			<a v-for="(item,index) in tite" @click="classify(index)" :class="{'active':isAicat == index}">{{item}}</a>
		    		</div>
		    		<div v-if="mindata != null">
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
			    			<tr v-for="item in mindata">
			    				<td>{{item.createtime | time}}</td>
			    				<td>{{item.cxkjCommunityFloor.floorName}}层{{item.cxkjCommunityRoom.roomNum}}</td>
			    				<td>{{item.newPrice}}.00</td>
			    				<td>{{item.oldPrice}}.00</td>
			    				<td>{{item.user.userType | type(item.user.userType)}} {{item.user.userName}}</td>
			    				<td>{{item.reason}}</td>
			    				<td :class="[{'act':item.status == 0},{'acts':item.status == 1},{'act2':item.status == 2}]">{{item.status | statu(item.status)}}</td>
			    				<td v-if="item.status == 0" v-color ><router-link :to="{path:'/signed/priceCheck',query:{id:item.priceManagerId,ids:communityId}}">审批</router-link></td>
			    				<td v-else>--</td>
			    			</tr>
			    		</table>
			    		<el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage3"
					      :page-size="10"
					      layout="prev, pager, next,total,jumper"
					      :total=totolNum>
					    </el-pagination>
				    </div>
				    <div v-else class="kbt">
		    			<img src="../../../static/images/icon/tab_03.png" style="margin-top: 150px;">
		    		</div>
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
				activeTabName:"workbench",
    			isHide:false,
    			currentPage3: 0,
    			communityId:null,
    			tite:['全部','审批中','已生效','不通过'],
    			isAicat:'',
    			mindata:null,
    			totolNum:null,
    			pageNum:1,
    			status:null
		   	}
    	},

    	filters:{
    		time(val){
    			var date =new Date(val);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    			return Y + M + D;
    		},
    		type(val){
    			if(val == 1){
    				return '普通用户'
    			}
    			else if(val == 2){
    				return 'PC端用户'
    			}
    			else if(val == 3){
    				return '管家用户'
    			}
    		},
    		statu(val){
    			if(val == 0){
    				return '审批中'
    			}
    			else if(val == 1){
    				return '已生效'
    			}
    			else if(val == 2){
    				return '不通过'
    			}
    		}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		console.log(this.communityId);
    		this.datas();
    	},
    	methods:{
		      handleCurrentChange(val) {
//		        console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.datas();
		      },
		      datas(){
		      	axios.post(hostTable,
		      		qs.stringify({
		      			communityId:this.communityId,
		      			pageNum:this.pageNum,
		      			pageSize:8
		      		})
		      	)
		      	.then((response)=>{
    				//console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
	 					this.mindata = response.data.entity.page;
	 					this.totolNum = response.data.entity.totalNum;
	 				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
		      },
		      classify(index){
		      	this.mindata = null;
		      	this.status = 0;
		      	this.isAicat = index;
		      	let vm = this
		      	if(this.isAicat == 0){
		      		this.datas();
		      	}
		      	else if(this.isAicat == 1){
		      		this.status = 0;
		      	}
		      	else if(this.isAicat == 2){
		      		this.status = 1;
		      	}
		      	else if(this.isAicat == 3){
		      		this.status = 2;
		      	}
	      		axios.post(hostTable,
		      		qs.stringify({
		      			communityId:vm.communityId,
		      			pageNum:vm.pageNum,
		      			status:vm.status
		      		})
		      	)
		      	.then((response)=>{
    				//console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
	   					vm.mindata = response.data.entity.page;
	   					vm.totolNum = response.data.entity.totalNum;
	   				}
    			})
		      	.catch((error)=>{
		      		console.log(error);
		      	})
		      	
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