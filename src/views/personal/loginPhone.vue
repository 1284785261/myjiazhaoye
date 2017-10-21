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
		        				<td><input type="text" id="yzm" placeholder="请输入短信验证码" v-model="verify2"><a @click="mvs2">获取验证码</a></td>
		        			</tr>
		        		</table>
		        		<div class="yz3" v-show="ins">
		        			<i class="el-icon-warning"></i><span>验证码已发送，{{time}}s内输入有效</span>
		        		</div>
		        		<div class="yz3 yz4" v-show="ins2">
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
    			ins2:false,
    			time:120,
    			phone:null,
    			verify:null,
    			phones:null,
    			verify2:null,
    			disabled:false,
    			title2:'你输入的验证码错误，请重新获取',
    			ts:false,
    			oldphone:false,
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
    		amendwin(){
    			this.$router.push({path:"/amendWin"});
    		},
    		mvs(){
    			let vm = this
    			
    			axios.post(hostAuthcode,   //请求验证码
    				qs.stringify({
    					'phone':vm.phone,
    					'messageType': 0
    				})
    			)
    			.then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					vm.ins = true;
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
    					vm.ins2 = true;
    					vm.ins = false;
    					vm.title2 = response.data.content +',请勿频繁发送验证码';
    					setTimeout(function(){
    						vm.ins2 = false;
    					},3000);
    				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		closeWarningModal() {
		        this.warningModal = false;
		    },
    		mvs2(){
    			let vm = this
    			axios.post(hostAuthcode,   //请求新手机验证码
    				qs.stringify({
    					'phone':vm.phone,
    					'messageType': 0
    				})
    			)
    			.then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					vm.ins = true;
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
    					vm.ins2 = true;
    					vm.ins = false;
    					vm.title2 = response.data.content +',请勿频繁发送验证码';
    					setTimeout(function(){
    						vm.ins2 = false;
    					},3000);
    				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		yanz(){
    			let vm = this
    			axios.post(hostPhone,
    				qs.stringify({
    					oldPhone :vm.phone,
    					verifyCode:vm.verify
    				})
    			)
    			.then((response)=>{
    				console.log(response);
    				let code = parseInt(response.data.code)
    				if(code == 10000){
    					clearInterval(times);
    					vm.ins = false;
    					vm.ins2 = true;
    					vm.disabled = false;
    					vm.title2 = '原手机'+ response.data.content;
    					vm.oldphone = true;
    				}
    				else{
    					vm.ins2 = true;
    					vm.title2 ='原手机还未进行验证';
    				}
    				
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		yans(phones){
    			if((/^1[34578]\d{9}$/.test(phones))){
    				this.ts = true;
    			}
    			else{
    				this.ts = false;
    			}
    		},
    		tj(){
    			let vm = this
    			if(this.ts == true){
    				axios.post(hostPhone,
    				qs.stringify({
    					newPhone:vm.phones,
    					verifyCode:vm.verify2
    				}))
    				.then((response) => {
    					let code = parseInt(response.data.code);
    					if(code  == 10000){
    						this.successMessage = '修改手机号成功';
              				this.successModal = true;
              				setTimeout(() => {
              					this.successModal = false;
              					this.$router.push({path:"/amendWin",query:{names:'修改手机号码'}});
              				}, 2000);
    						
    					}
    					else{
    						vm.ins2 = true;
    						vm.title2 ='新手机'+ response.data.content;
    					}
    				})
    				.catch((error) => {
    					console.log(error);
    				})
    			}
    			else{
    				vm.ins2 = true;
    				vm.title2 ='原手机验证不通过';
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
	left: 208px;
	top: 104px;
	color: #ff6612;
}
.yz3 i{
	color: #ff6612;
	font-size: 16px;
	margin-right: 8px;
}
.yz3 span{
	font-size: 12px;
	font-weight: 700;
}
.yz4{
	margin-top:5px;
	color: #ee120e;
	top: 230px;
}
.yz4 i{
	color: #ee120e;
}
.logins .tj{
	margin-left: 204px;
}
.logins table tr td .zqs{
	color: #2abb7c;
	margin-left: 5px;
	font-size: 16px;
}
</style>