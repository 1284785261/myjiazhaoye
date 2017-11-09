<template>
	<div id="refunddetailsm">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <a  class="active" @click="mts">发起退款记录</a>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>退款详情</h3>
		          <span>{{Name}}</span>
		        </div>
		    	<div id="refunddetails">
		    		<div>
		    			<table>
		    				<tr>
		    					<td>退款单号：</td>
		    					<td>{{data.refundSn}}<span>{{data.refundStatus | Status}}</span></td>
		    				</tr>
		    				<tr>
		    					<td>退款对象：</td>
		    					<td>{{data.userName}}</td>
		    				</tr>
		    				<tr>
		    					<td>用户注册手机号：</td>
		    					<td>{{data.userPhone}}</td>
		    				</tr>
		    				<tr>
		    					<td>退款金额：</td>
		    					<td style="color: red;">{{data.refundMoney | Money}}</td>
		    				</tr>
		    				<tr>
		    					<td>退款备注：</td>
		    					<td>{{data.refundInfo}}</td>
		    				</tr>
		    			</table>
		    		</div>
		    		<div>
		    			<table>
		    				<tr class="yh">
		    					<td>退款至银行账户：</td>
		    					<td>{{data.account}}</td>
		    				</tr>
		    				<tr>
		    					<td>户名：</td>
		    					<td>{{data.name}}</td>
		    				</tr>
		    				<tr>
		    					<td>开户行：</td>
		    					<td>{{data.bankName}}</td>
		    				</tr>
		    				<tr>
		    					<td>账户：</td>
		    					<td>{{data.account}}</td>
		    				</tr>
		    			</table>
		    		</div>
		    		<div style="border: none;">
		    			<table>
		    				<tr>
		    					<td>发起时间：</td>
		    					<td>{{data.createTime | time}}</td>
		    				</tr>
		    				<tr>
		    					<td>审核通过时间：</td>
		    					<td v-if="data.passTime">{{data.passTime | time}}</td>
		    					<td v-else>--</td>
		    				</tr>
		    				<tr>
		    					<td>退款时间：</td>
		    					<td v-if="data.createTime">{{data.createTime | time}}</td>
		    					<td v-else>--</td>
		    				</tr>
		    			</table>
		    		</div>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/refunddetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostRefunddetal } from '../api.js';
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
				currentPage3: 1,
				radio: '1',
				id:'',
				data:null,
				Name:''
		   	}
    	},
    	mounted(){
			this.id = this.$route.query.id;
			this.Name = this.$route.query.name;
			this.datas();
    	},
    	filters:{
   			Status(val){
   				if(val == 0){
   					return '待审核';
   				}
   				else if(val == 1){
   					return '待退款';
   				}
   				else if(val == 2){
   					return '已退款';
   				}
   			},
   			Money(val){
   				return val.toFixed(2)+'元'
   			},
   			time(val){
   				return  new Date(val).Format('yyyy-MM-dd hh:mm:ss');
   			}
    	},
    	methods:{
			datas(){
				axios.post(hostRefunddetal,
					qs.stringify({
						refundId:this.id
					})
				).then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.data = response.data.result;
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			mts(){
				history.go(-1);
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