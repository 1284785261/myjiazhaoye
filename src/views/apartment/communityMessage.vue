<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>社区信息</h3>
		        </div>
		        <div class="message-tis">
		        	<table class="cops">
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>{{ Name }}</td>
		        		</tr>
		        		<tr>
		        			<td>社区地址：</td>
		        			<td>{{ sites }}</td>
		        		</tr>
		        		<tr>
		        			<td>社区类型：</td>
		        			<td>{{ type }}</td>
		        		</tr>
		        		<tr>
		        			<td>开业日期：</td>
		        			<td>{{Datas.communityOpeningDate | Open(Datas.communityOpeningDate)}}</td>
		        		</tr>
		        		<tr>
		        			<td>社区服务电话：</td>
		        			<td>{{Datas.communityPhone}}</td>
		        		</tr>
		        		<tr>
		        			<td>物业合同编号：</td>
		        			<td>{{Datas.communityContractNum}}</td>
		        		</tr>
		        		<tr>
		        			<td>租期：</td>
		        			<td>{{ lease }}</td>
		        		</tr>
		        		<tr>
		        			<td>免租期：</td>
		        			<td>{{ freelease }}</td>
		        		</tr>
		        		<tr>
		        			<td>物业合同：{{contract}}</td>
		        			<td>
		        				<a v-for="item in contart"><img src="../../../static/images/temp/message.png" class="mess">{{ item }}</a>
		        			</td>
		        		</tr>
		        	</table>
		        	<div class="operation-box">
		        	  
		              	<Button type="primary" @click="Complie">编辑</Button>
		        	  
		              <Button>取消</Button>
		            </div>  
		        </div>
		        
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/communityMessage.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostTitle,imgPath } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			communityId:null,
    			Datas:null,
    			site:null,
    			contart:[],
    			Name:null
    		}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		this.datas();
    	},
    	methods:{
    		Complie:function(){
    			this.$router.push({path:"/apartment/communityComplie"});
    		},
    		datas(){
    			let vm = this
    			axios.post(hostTitle,
    			qs.stringify({
    				communityId:vm.communityId
    			}))
    			.then((response) => {
    				console.log(response);
    				vm.Datas = response.data.result.community;
    				vm.Name = response.data.result.community.communityName;
    				if(vm.Datas.province.areaName == vm.Datas.city.areaName){
    					vm.site = vm.Datas.province.areaName + vm.Datas.district.areaName +vm.Datas.communityAddress;
    				}
    				else{
    					vm.site = vm.Datas.province.areaName +vm.Datas.city.areaName+ vm.Datas.district.areaName +vm.Datas.communityAddress;
    				}
    				
    			})
    			.catch((error) => {
    				console.log(error);
    			})
    		}
    	},
    	filters:{
    		Open(data){
    			var date = new Date(data);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    		}
    	},
    	computed:{
    		sites:function(){
    				return this.site;
    		},
    		type:function(){
    			let ss = this.Datas.communityType.split(",");
    			for(let i=0;i<ss.length;i++){
    				if(ss[i] == 0 && ss.length <= 1){
    					return '公寓';
    				}
    				else if(ss[i] == 1 && ss.length <= 1){
    					return '办公空间'
    				}
    				else if(ss.length >= 2){
    					return '公寓、办公空间'
    				}
    			}
    		},
    		lease:function(){
    			var date =new Date(this.Datas.communityLeaseBegin);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				var date =new Date(this.Datas.communityLeaseEnd);
    			var U = date.getFullYear() + '-';
				var V = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var W = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D +' - '+ U + V + W;
    		},
    		freelease:function(){
    			var date =new Date(this.Datas.communityFreeLeaseBegin);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				var date =new Date(this.Datas.communityFreeLeaseEnd);
    			var U = date.getFullYear() + '-';
				var V = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var W = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D +' - '+ U + V + W;
    		},
    		contract:function(){
    			let mv = this.Datas.communityContract.split(',');
    			console.log(111111111);
    			console.log(mv);
				for(let i=0;i < mv.length; i++){
					this.contart.push(mv[i].substring(mv[i].lastIndexOf("/")+1,mv[i].length));
					
				}
    			console.log(this.contart);
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
</style>