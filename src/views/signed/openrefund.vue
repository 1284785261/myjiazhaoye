<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/refundrecord">发起退款记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>发起退款</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="openrefund">
		    		<table>
		    			<tr>
		    				<td>金额：</td>
		    				<td><input type="text" placeholder="请输入金额" style="width: 198px;" v-model="money"/><span>元</span></td>
		    			</tr>
		    			<tr>
		    				<td>用户注册手机号：</td>
		    				<td><input type="text" placeholder="请输入用户注册的手机号码" v-model="phone"/></td>
		    			</tr>
		    			<tr>
		    				<td>用户姓名：</td>
		    				<td><input type="text" placeholder="请输入用户姓名" v-model="name"/></td>
		    			</tr>
		    			<tr>
		    				<td>用户收款银行账号：</td>
		    				<td><input type="text" placeholder="请输入用户收款银行账号" v-model="account"/></td>
		    			</tr>
		    			<tr>
		    				<td>开户行：</td>
		    				<td><input type="text" placeholder="请输入开户行" v-model="kahx"/></td>
		    			</tr>
		    			<tr>
		    				<td>户名：</td>
		    				<td><input type="text" placeholder="请输入户名" v-model="namet"/></td>
		    			</tr>
		    			<tr>
		    				<td style="vertical-align: top;">退款备注：</td>
		    				<td><textarea placeholder="请输入退款备注" v-model="tesr"></textarea></td>
		    			</tr>
		    		</table>
		    		<a @click="datas">提交退款申请</a>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    	<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	
	import '../../sass/style/openrefund.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import { hostRefunds } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
			warningModal
    	},
    	data(){
    		return{
    			successModal:false,
				warningModal:false,
				successMessage:'发起退款成功',
				warningMessage:'',
				currentPage3: 1,
				radio: '1',
				communityId:'',
				money:'',
				phone:'',
				name:'',
				account:'',
				kahx:'',
				namet:'',
				tesr:''
		   	}
    	},
    	mounted(){
			this.communityId = this.$route.query.id;
    	},
    	watch:{
    		money:function(){
    			this.money = this.money.replace(/[^\d.]/,'');
    		},
    		phone:function(){
    			this.phone = this.phone.replace(/0?(13|14|15|18)[0-9]{10}/,'');
    		},
    		name:function(){
    			var str = /^[\u4E00-\u9FA5A-Za-z]+$/;
    			if(str.test(this.name) == false){
    				this.phone.replace(/^[\u4E00-\u9FA5A-Za-z]+$/,'');
    			}
    		}
    	},
    	filters:{
   
    	},
    	methods:{
			datas(){
				if(this.money == '' || this.phone == '' || this.name == '' || this.account == '' || this.kahx=='' || this.namet == '' || this.tesr == ''){
					this.warningMessage = '发起退款信息不完整,请填写完整';
						this.warningModal = true;
				}else{
					axios.post(hostRefunds,
					qs.stringify({
						communityId:this.communityId,
						refundMoney:this.money,
						userPhone:this.phone,
						userName:this.name,
						name:this.namet,
						account:this.account,
						bankName:this.kahx,
						refundInfo:this.tesr
					})
					).then((response)=>{
						console.log(response);
						if(response.data.code == 10000 && response.status == 200){
							this.successModal = true;
							setTimeout(()=>{
								this.successModal = false;
								this.$router.push('/signed/refundrecord');
							},3000);
						}
						else{
							this.warningMessage = response.data.content;
							this.warningModal = true;
						}
					}).catch((error)=>{
						console.log(error);
					})
				}
				
			},
			closeWarningModal(){
				this.warningModal = false;
			},
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>