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
		    				<td>{{Datas[0].createtime | time }}</td>
		    			</tr>
		    			<tr>
		    				<td>状态：</td>
		    				<td class="mv">{{Datas[0].status | statu}}</td>
		    			</tr>
		    			<tr>
		    				<td>房间：</td>
		    				<td>{{Datas[0].cxkjCommunityFloor.floorName}}层 {{Datas[0].cxkjCommunityRoom.roomNum}}</td>
		    			</tr>
		    			<tr>
		    				<td>原价格：</td>
		    				<td>{{Datas[0].oldPrice}}.00元/月</td>
		    			</tr>
		    			<tr>
		    				<td>新价格：</td>
		    				<td class="mvs">{{Datas[0].newPrice}}.00元/月</td>
		    			</tr>
		    			<tr>
		    				<td>调价原因：</td>
		    				<td>{{Datas[0].reason}}</td>
		    			</tr>
		    		</table>
					<ul>
						<li>
							<span>审批：</span>
							 <el-radio class="radio" v-model="radioq" label="0">不同意</el-radio>
  							 <el-radio class="radio" v-model="radioq" label="1">同意</el-radio>
						</li>
						<li>
							<span>备注：</span>
							<textarea placeholder="请输入备注内容" v-model="texts">
								
							</textarea>
						</li>
						<a @click="refer">确定</a>
					</ul>
					<h4>审批记录</h4>
					<table class="titles2">
						<thead>
							<td width="25%">时间</td>
							<td width="25%">操作人</td>
							<td width="25%">审批结果</td>
							<td width="25%">备注</td>
						</thead>
						<tr v-for="item in cxkjRoomListPriceVerify">
							<td>{{item.newtime | newtime}}</td>
							<td>{{item.user.userName}}</td>
							<td>{{item.verifyResult | verifyResult}}</td>
							<td>{{item.remark}}</td>
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
    import axios from 'axios';
    import { hostTable,hostPriceInfo } from '../api.js';
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
    			radioq: '0',
    			priceManagerId:null,
    			communityId:null,
    			Datas:null,
    			texts:'',
    			cxkjRoomListPriceVerify:null
		   	}
    	},
    	filters:{
    		time(val){
    			var date =new Date(val);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
				var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes());
				return Y + M + D +'   '+ H + mm;
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
    		},
    		newtime(val){
    			var date =new Date(val);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())+' ';
				var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
				var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes())+':';
				var s = (date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds());
				
				return Y + M + D +'   '+ H + mm + s;
    		},
    		verifyResult(val){
    			if(val == 0){
    				return '不同意'
    			}
    			else if(val == 1){
    				return '同意'
    			}
    		}
    	},
    	mounted(){
    		this.priceManagerId = this.$route.query.id;
    		this.communityId = this.$route.query.ids;
    		this.datas();
    	},
    	methods:{
    		datas(){
    			axios.post(hostTable,
    				qs.stringify({
    					priceManagerId:this.priceManagerId,
    					communityId:this.communityId
    				})
    			)
    			.then((response)=>{
    				console.log(response);
    				this.Datas = response.data.entity.page;
    				this.cxkjRoomListPriceVerify = this.Datas[0].cxkjRoomListPriceVerify;
    				console.log(this.cxkjRoomListPriceVerify);
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		refer(){
    			let vm = this
    			console.log(vm.radioq);
//  			console.log(vm.Datas[0].priceManagerId);
    			axios.post(hostPriceInfo,
    				qs.stringify({
    					managerId:vm.Datas[0].priceManagerId,
    					verifyResult:vm.radioq,
    					remark:vm.texts
    				})
    			)
    			.then((response) =>{
    				console.log(response);
    				alert('审核成功');
    				this.datas();
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