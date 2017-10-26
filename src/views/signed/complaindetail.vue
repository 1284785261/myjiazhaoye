<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="signed/complain">用户投诉</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>投诉详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="complaindetail">
		    		<div class="complaindetails">
		    			<p class="dan">工单号：{{Datas.complainNum}}</p><span :class="[{'kust':Datas.complainStatus == 0},{'kust1':Datas.complainStatus == 1}]">{{Datas.complainStatus | Status}}</span>
		    			<p>发起投诉时间：{{Datas.createTime | time}}</p>
		    		</div>
		    		<div v-if="Datas.complainStatus == 0">
			    		<div class="complaindetails2">
			    			<img src="../../../static/images/icon/info.png"/><h3>用户信息</h3>
			    			<table>
			    				<tr>
			    					<td>姓名：</td>
			    					<td>{{Datas.userName}}</td>
			    				</tr>
			    				<tr>
			    					<td>已注册手机号：</td>
			    					<td>{{Datas.userPhone}}</td>
			    				</tr>
			    				<tr>
			    					<td>问题描述：</td>
			    					<td>{{Datas.complainContent}}</td>
			    				</tr>
			    			</table>
			    			
			    		</div>
			    		<a @click="receive" v-show="statas == '1'">确认接收</a>
		    		</div>
		    		<div v-if="Datas.complainStatus == 1">
		    			<div class="complaindetails2">
			    			<img src="../../../static/images/icon/custom_chulizhong.png"/><h3>用户信息</h3>
			    			<table>
			    				<tr>
			    					<td>姓名：</td>
			    					<td>{{Datas.userName}}</td>
			    				</tr>
			    				<tr>
			    					<td>已注册手机号：</td>
			    					<td>{{Datas.userPhone}}</td>
			    				</tr>
			    				<tr>
			    					<td>问题描述：</td>
			    					<td>{{Datas.complainContent}}</td>
			    				</tr>
			    			</table>
			    			
			    		</div>
			    		<div class="complaindetails3">
			    			<img src="../../../static/images/icon/info.png"/><h3>处理记录</h3>
			    			<table>
			    				<tr>
			    					<td>店长确认接收：</td>
			    					<td>{{dianz[0].confirmTime | time}}</td>
			    				</tr>
			    			</table>
			    		</div>
			    		<span class="chus" v-if="statas != 0">处理结果：</span><textarea placeholder="请填写处理结果" v-model="test" v-if="statas != 0" maxlength="140"></textarea>
			    		<a class="chuli" @click="receive2" v-if="statas != 0">确认已处理</a>
		    		</div>
		    		<div v-if="Datas.complainStatus == 2 || Datas.complainStatus == 3">
			    		<div class="complaindetails4">
			    			<img src="../../../static/images/icon/xx_03.png"/><h3>处理记录</h3>
			    			<table>
			    				<tr v-for="item in dianz">
			    					<td>店长确认接收：</td>
			    					<td>{{item.confirmTime}}</td>
			    				</tr>
			    			</table>
			    			<p style="border-bottom: 1px dashed #DCDCDC;"></p>
			    			<table v-for="item in dianz">
			    				<tr>
			    					<td>店长完成处理：</td>
			    					<td>{{item.completeTime | time}}</td>
			    				</tr>
			    				<tr>
			    					<td>处理结果：</td>
			    					<td>{{item.complainResult}}</td>
			    				</tr>
			    				<tr>
			    					<td style="vertical-align: top;">用户反馈：</td>
			    					<td>
			    						<p :class="[{'kum':Datas.complainStatus == 0},{'kum1':Datas.complainStatus == 1}]">{{item.userDegree | Degree}}</p>
			    						<p>{{item.userFeedback}}</p>	
			    					</td>
			    				</tr>
			    			</table>
			    			<p style="border-bottom: 1px dashed #DCDCDC;"></p>
			    			<table v-for="item in guanjia">
			    				<tr>
			    					<td>客服介入处理：</td>
			    					<td>{{item.completeTime | time}}</td>
			    				</tr>
			    				<tr>
			    					<td>处理结果：</td>
			    					<td>{{item.complainResult}}</td>
			    				</tr>
			    				<tr>
			    					<td style="vertical-align: top;">用户反馈：</td>
			    					<td>
			    						<p>{{item.userDegree | Degree}}</p>
			    						<p>{{item.userFeedback}}</p>
			    					</td>
			    				</tr>
			    			</table>
			    		</div>
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

	import '../../sass/style/complaindetail.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import { hostaintDetails,hostEditDetails } from '../api.js';
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
    			Datas:{},
          		complainId:'',
          		successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				recordList:[],
				dianz:[],
				guanjia:[],
				test:'',
				statas:'1'
				
		   	}
    	},
    	mounted(){
    		this.complainId = this.$route.query.id;
    		this.datas();
    		if(this.$route.query.stats){
    			this.statas = this.$route.query.stats;
    		}
    		else{
    			this.statas = '1';
    		}
    		console.log(this.statas);
    		
    	},
    	filters:{
    		time(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm');
			},
			Status(val){
//				if(val == 0) {
//					return '待处理'
//				} else if(val == 1) {
//					return '店长处理中'
//				} else if(val == 2) {
//					return '已完结'
//				}
				if(val == 0){
   					return '待确认';
   				}
   				else if(val == 1){
   					return '店长处理中';
   				}
   				else if(val == 2){
   					return '店长已处理';
   				}
   				else if(val == 3){
   					return '客服处理中';
   				}
   				else if(val == 4){
   					return '已完结';
   				}
			},
			Degree(val){
				if(val == 0){
					return '满意'
				}
				else if(val == 1){
					return '不满意'
				}
			}
    	},
    	methods:{
    		closeWarningModal() {
				this.warningModal = false;
			},
		    datas(){
    			axios.post(hostaintDetails,
    				qs.stringify({
    					complainId:this.complainId
    				})
    			).then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					this.Datas = response.data.entity;
    					if(this.Datas.recordList != []){
    						this.recordList = this.Datas.recordList;
    						for(let i = 0;i<this.recordList.length;i++){
    							if(this.recordList[i].isCustomService == 0){
    								this.dianz.push(this.recordList[i]);
    							}
    							else if(this.recordList[i].isCustomService == 1){
    								this.guanjia.push(this.recordList[i]);
    							}
    						}
    					}
    				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
		  	},
		  	receive(){
		  		let vm = this
		  		axios.post(hostEditDetails,
    				qs.stringify({
    					complainId:this.complainId,
    					complainStatus:1
    				})
    			).then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					vm.successMessage = '确认接收成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.$router.go(-1);

						}, 2000);
    				}
    				else{
						this.warningMessage = response.data.content;
						this.warningModal = true;
					}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
		  	},
		  	receive2(){
		  		let vm = this
		  		console.log(this.test);
		  		console.log(this.dianz[0].complainRecordId);
		  		axios.post(hostEditDetails,
    				qs.stringify({
    					complainId:this.complainId,
    					complainStatus:2,
    					complainResult:this.test,
    					complainRecordId:this.dianz[0].complainRecordId
    				})
    			).then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					vm.successMessage = '确认处理成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.$router.go(-1);

						}, 2000);
    				}
    				else{
						this.warningMessage = response.data.content;
						this.warningModal = true;
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
