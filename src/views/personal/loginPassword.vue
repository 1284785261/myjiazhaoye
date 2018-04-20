<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 ></span>
		          <router-link  class="active" to="/apartment/communityManagement">个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>修改登录密码</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="logins">
		        		<table>
		        			<tr>
		        				<td>手机号码:</td>
		        				<td>{{phone}}</td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" name="" id="yzm" placeholder="请输入短信验证码" v-model="verify"/><a @click="gain" :disabled="disabled">{{title}}</a></td>
		        			</tr>
		        			<tr class="yzms">
		        				
		        			</tr>
		        			<tr>
		        				<td>新登录密码:</td>
		        				<td><input type="password" placeholder="请输入新登录密码" v-model="word1"></td>
		        			</tr>
		        			<tr>
		        				<td>确认新密码:</td>
		        				<td><input type="password" placeholder="请再次确认新密码" v-model="word2"></td>
		        			</tr>
		        		</table>
		        		<div class="yz" v-show="chens">
		        			<i class="el-icon-warning"></i><span>验证码已发送，{{ time }}s内输入有效</span>
		        		</div>
		        		<div class="yz yz2" v-show="inhide">
		        			<i class="el-icon-circle-close"></i><span>{{ title2 }}</span>
		        		</div>
		        		<button @click="amendwin()">提交</button>
		        		
		        	</div>
		        </div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    	<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/loginPassword.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
  	import warningModal from '../../components/warningModal.vue';
    import qs from 'qs';
	import axios from 'axios';
	import { hostPassword,hostAuthcode } from '../api.js';
    
    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
      		warningModal
    	},
    	data(){
    		return{
    			time:120,
    			chens:false,
    			disabled:false,
    			title:'获取验证码',
    			inhide:false,
    			word1:null,
    			word2:null,
    			phone:null,
    			verify:null,
    			title2:'你输入的密码不一致，请重新输入',
    			successModal: false,
		        warningModal: false,
		        successMessage: '添加成功',
		        warningMessage: '添加信息不完整，请检查添加社区信息'
    		}
    	},
    	mounted(){
    		this.phone = sessionStorage.getItem("phone");
    		// console.log(sessionStorage.getItem("phone"));
    	},
    	methods:{
    		amendwin(){
    			let vm = this
    			axios.post(hostPassword,
    				qs.stringify({
    					userPhone:vm.phone,
    					'oldPassword':vm.word1,
    					'password':vm.word2,
    					verifyCode:vm.verify
    				})
    			)
    			.then((response) => {
    				// console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					this.successMessage = '修改密码成功';
              			this.successModal = true;
              			setTimeout(() => {
              				this.successModal = false;
              				this.$router.push({path:"/amendWin",query:{names:'修改登录密码'}});
              			}, 2000);
    					
    				}
    				else{
    					vm.inhide= false;
						vm.title2 = '';
						this.warningMessage = '修改密码失败';
						this.warningModal = true;
    				}
    			})
    			.catch((error) => {
					vm.inhide= false;
					this.warningMessage = '修改密码失败';
					this.warningModal = true;
    			})
    		},
    		gain(){
    			let vm = this;
    			vm.time = 120;
    			axios.post(hostAuthcode,
    				qs.stringify({
    					'phone':vm.phone,
    					'messageType': 0
    				})
    			)
    			.then((response)=>{
					// console.log(response);
					if(response.data.code == 10000 && response.status == 200){
						vm.chens = true;
						vm.disabled = true;
						let times = setInterval(function(){
							vm.time--;
							if(vm.time <= 0){
								clearInterval(times);
								vm.chens = false;
								vm.disabled = false;
							}
						},1000);
					}
    				else if(response.data.code == 10004){
    					vm.inhide = true;
    					vm.chens = false;
    					vm.disabled = false;
    					vm.title2 = response.data.content +',请勿频繁发送验证码';
    				}
    			})
    			.catch((error)=>{
    				// console.log(error);
    			})
    			
    			
    		},
    		closeWarningModal() {
		        this.warningModal = false;
		    }
    	},
    	watch:{
    		word2:function(val){
				let vm = this;
				if(val){
					if(val != vm.word1){
						vm.inhide = true;
						
					}
					else if(val == vm.word1){
						vm.inhide = false;
					}
				}else{
					vm.inhide = false;
				}
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>