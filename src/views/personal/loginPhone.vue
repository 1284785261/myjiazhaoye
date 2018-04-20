<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>修改手机号</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="logins">
		        		<table>
		        			<tr>
		        				<td>当前手机号码:</td>
		        				<td>{{phone}}</td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" name="" id="yzm" placeholder="请输入短信验证码" v-model="verify" @blur="yanz"/><a @click="mvs" :disabled="disabled">获取验证码</a></td>
		        			</tr>
		        			<tr class="yzms">
		        				
		        			</tr>
		        			<tr>
		        				<td>新手机号码:</td>
		        				<td><input type="text" placeholder="请输入新手机号" v-model="phones" @blur="yans(phones)"><i class="el-icon-circle-check zqs" v-show="ts"></i></td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" id="yzm" placeholder="请输入短信验证码" v-model="verify2"><a @click="mvs2" :disabled="disabled2">获取验证码</a></td>
		        			</tr>
		        		</table>
		        		<div class="yz3" v-show="ins">
		        			<i class="el-icon-warning"></i><span>验证码已发送，{{time}}s内输入有效</span>
		        		</div>
		        		<div class="yz3 yz4" v-show="ins2 == 0">
							<i class="el-icon-warning"></i><span>验证码已发送，{{time2}}s内输入有效</span>
		        		</div>
						<div class="yz3 yz4" v-show="ins2 == 1">
		        			<i class="el-icon-circle-close"></i><span>{{title2}}</span>
		        		</div>
		        		<button @click="amendwin()" class="tj">提交</button>
		        		
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
	import { hostPhone,hostAuthcode,hostOldphone } from '../api.js';
    
    
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
    			ins:false,
    			ins2:3,
				time:120,
				time2:120,
    			phone:null,
    			verify:null,
    			phones:null,
    			verify2:null,
				disabled:false,
				disabled2:false,
    			title2:'你输入的验证码错误，请重新获取',
    			ts:false,
    			successModal: false,
		        warningModal: false,
		        successMessage: '添加成功',
		        warningMessage: '添加信息不完整，请检查添加社区信息'
    		}
    	},
    	mounted(){
    		this.phone = sessionStorage.getItem("phone");
    	},
    	methods:{
    		mvs(){
    			let vm = this
    			
    			axios.post(hostAuthcode,   //请求验证码
    				qs.stringify({
    					'phone':vm.phone,
    					'messageType': 0
    				})
    			)
    			.then((response)=>{
    				// console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
						vm.ins = true;
						vm.disabled = true;
    					let times = setInterval(function(){
		    				vm.time--;
		    				if(vm.time <= 0){
		    					clearInterval(times);
		    					vm.ins = false;
		    					vm.disabled = false;
		    					
		    				}
		    			},1000);
    				}
    				else if(response.data.code == 10004){
    					vm.disabled = false;
    					vm.ins2 = 1;
    					vm.ins = false;
    					vm.title2 = response.data.content +',请勿频繁发送验证码';
    					setTimeout(function(){
    						vm.ins2 = 3;
    					},3000);
    				}
    			})
    			.catch((error)=>{
    				// console.log(error);
    			})
    		},
    		closeWarningModal() {
		        this.warningModal = false;
		    },
    		mvs2(){
				let vm = this
    			axios.post(hostAuthcode,   //请求新手机验证码
    				qs.stringify({
    					'phone':vm.phones,
    					'messageType': 0
    				})
    			)
    			.then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
						vm.ins2 = 0;
						vm.disabled2 = true;
    					let times = setInterval(function(){
		    				vm.time2--;
		    				if(vm.time2 <= 0){
		    					clearInterval(times);
		    					vm.ins2 = 3;
		    					vm.disabled2 = false;
		    					
		    				}
		    			},1000);
    				}
    				else if(response.data.code == 10004){
    					vm.disabled2 = false;
    					vm.ins2 = 1;
    					vm.title2 = response.data.content +',请勿频繁发送验证码';
    					setTimeout(function(){
    						vm.ins2 = 3;
    					},3000);
    				}
    			})
    			.catch((error)=>{
    				// console.log(error);
    			})
			},
			//验证旧手验证码是否正确
    		yanz(){
				let vm = this
				if(vm.verify){
					axios.post(hostPhone,
						qs.stringify({
							oldPhone :vm.phone,
							verifyCode:vm.verify
						})
					)
					.then((response)=>{
						// console.log(response);
						if(response.data.code == 10000 && response.status == 200){
							vm.ins = false;
							vm.disabled = false;
						}
						else{
							vm.ins2 = 1;
							vm.title2 ='原手机未验证成功';
						}
						
					})
					.catch((error)=>{
						vm.ins2 = 1;
						vm.title2 ='原手机未验证成功';
					})
				}else{
					vm.ins2 = 3;
					vm.disabled2 = false;
				}
    			
    		},
    		yans(phones){
    			if((/^1[34578]\d{9}$/.test(phones))){
    				this.ts = true;
    			}
    			else{
    				this.ts = false;
    			}
    		},
    		amendwin(){
    			let vm = this
    			if(this.ts){
    				axios.post(hostPhone,
    				qs.stringify({
    					newPhone:vm.phones,
    					verifyCode:vm.verify2
    				}))
    				.then((response) => {
    					if(response.data.code == 10000 && response.status == 200){
    						this.successMessage = '修改手机号成功';
              				this.successModal = true;
              				setTimeout(() => {
              					this.successModal = false;
              					this.$router.push({path:"/amendWin",query:{names:'修改手机号码'}});
              				}, 2000);
    					}
    					else{
    						vm.ins2 = 1;
    						vm.title2 ='你输入的验证码错误，请重新获取';
    					}
    				})
    				.catch((error) => {
    					vm.ins2 = 1;
    					vm.title2 ='你输入的验证码错误，请重新获取';
    				})
    			}
    			else{
    				vm.ins2 = 1;
    				vm.title2 ='请输入正确的新手机号码获取验证码';
    			}
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
  
.yz3{
	position: absolute;
	left: 200px;
	top: 98px;
	color: #ff6612;
}
.yz3 i{
	color: #ff6612;
	margin-right: 8px;
}
.yz3 span{
	font-size: 12px;
	font-weight: 700;
}
.yz4{
	margin-top:5px;
	color: #ee120e;
	top: 215px;
}
.yz4 i{
	color: #ee120e;
}
.logins .tj{
	margin-left: 200px;
}
.logins table tr td .zqs{
	color: #2abb7c;
	margin-left: 5px;
	font-size: 16px;
}
</style>