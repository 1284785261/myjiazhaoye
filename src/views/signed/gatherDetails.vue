<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">发起收款记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>收款详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="gatherdetails">
		    		<table>
		    			<tr>
		    				<td>收款单号：</td>
		    				<td>{{Datas.gatheringNo}}<span>{{Datas.gatheringState | State}}</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>收款对象：</td>
		    				<td>{{Datas.userName}}</td>
		    			</tr>
		    			<tr>
		    				<td>用户注册手机号：</td>
		    				<td>{{Datas.userPhone}}</td>
		    			</tr>
		    			<tr>
		    				<td>收款金额：</td>
		    				<td>{{Datas.gatheringMoney | Money}}</td>
		    			</tr>
		    			<tr>
		    				<td>收款备注：</td>
		    				<td>{{Datas.gatheringInfo}}</td>
		    			</tr>
		    		</table>
		    		<p></p>
		    		<table class="list2">
		    			<tr>
		    				<td>发起时间：</td>
		    				<td>{{Datas.gatheringDate | gatheringDate}}</td>
		    			</tr>
		    			<tr>
		    				<td>支付成功时间：</td>
		    				<td>{{Datas.payDate | payDate}}</td>
		    			</tr>
		    			<tr>
		    				<td>支付方式：</td>
		    				<td>{{Datas.payType | payType}}</td>
		    			</tr>
		    			<tr>
		    				<td>支付交易号：</td>
		    				<td>{{Datas.payNo}}</td>
		    			</tr>
		    		</table>
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		
		
	</div>
</template>

<script>
	import '../../sass/style/getherDetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostDetails } from '../api.js';
    import qs from 'qs';
    
    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
		        gatheringId:null,
		    	Datas:null
    		}
    	},
    	mounted(){
    		this.gatheringId = this.$route.query.id;
    		this.datas();
    	},
    	filters:{
    		Money(val){
    			if(val != null){
    				return val.toFixed(2)+'元'
    			}
    		},
    		gatheringDate(val){
    			var date = new Date(val);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
				var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
				var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var ss = ((date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds()));
				return Y + M + D + H + mm + ss;
    		},
    		payDate(val){
    			var date = new Date(val);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
				var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
				var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var ss = ((date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds()));
				return Y + M + D + H + mm + ss;
    		},
    		payType(val){
    			if(val != null){
    				if(val == 1){
    					return '支付宝'
    				}
    				else if(val == 2){
    					return '微信'
    				}
    				else if(val == 3){
    					return '银联'
    				}
    				else if(val == 4){
    					return '其他方式'
    				}
    			}
    		},
    		State(val){
    			if(val == 1){
    				return '待支付'
    			}
    			else if( val == 2){
    				return '已支付'
    			}
    		}
    	},
    	methods:{
		    datas(){
		    	axios.post(hostDetails,
		    		qs.stringify({
		    			gatheringId:this.gatheringId
		    		})
		    	).then((response)=>{
		    		console.log(response);
		    		this.Datas = response.data.entity;
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		    }
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>