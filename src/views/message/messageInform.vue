<template>
	<div class="hous">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box wprdbench">
				<!-- <div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">消息中心</router-link>
		        </div> -->
		        <el-tabs v-model="activeName2" type="card">
				    <el-tab-pane label="通知消息" name="first">
				    	<div id="messageInform1">
				    		<table>
				    			<thead>
				    				<td width="15%">类型</td>
									<td>发起端</td>
									<td>接收端</td>
				    				<td width="20%">时间</td>
				    				<td>消息内容</td>
				    			</thead>
				    			<tr v-for="item in title">
				    				<td>{{item.messageType | types(item.messageType)}}</td>
									<td>{{item.sender | sender}}</td>
									<td>{{item.recipient | recipient}}</td>
				    				<td>{{item.createtime | time(item.createtime)}}</td>
				    				<td>{{item.content}}</td>
				    			
				    			</tr>
				    			
				    		</table>   
				    	</div>
						<el-pagination
							@current-change="handleCurrentChange"
							:current-page.sync="currentPage3"
							:page-size=pageSize1
							layout="prev, pager, next,total,jumper"
							:total=totalNum>
							
						</el-pagination>
				    </el-tab-pane>
				    <el-tab-pane label="系统消息管理" name="second">
				    	<div id="messageInform1">
				    		<a class="issue" @click="instas()" v-if="jurisdiction('MESSAGE_INCREASE')">发布系统消息</a>
				    		<table>
				    			<thead>
				    				<td width="15%">时间</td>
				    				<td width="20%">发布范围</td>
				    				<td>消息内容</td>
				    			</thead>
				    			<tr v-for="item in title2">
				    				<td>{{item.createTime | time(item.createtime)}}</td>
				    				<td>{{item.cityName}}</td>
				    				<td>{{item.content}}</td>
				    			
				    			</tr>
				    		</table>  
				    	</div>
						<el-pagination
							@current-change="handleCurrentChange2"
							:current-page.sync="currentPage"
							:page-size=pageSize2
							layout="prev, pager, next,total,jumper"
							:total=totalNum2>
							
						</el-pagination> 
				    </el-tab-pane>
				    
				</el-tabs>
		    	
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="zhezhaoa" v-show="isHide">		
		</div>
		<div class="instas" v-show="isHide">
			<i class="el-icon-circle-close" @click="instas()"></i>
			<p>发布系统消息</p>
			<table>
				<tr>
					<td>发布范围：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或者选择" @change="mvvs(value8)">
						    <el-option
						      v-for="item in options"
						      :key="item.communityName"
						      :value="item.communityName">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td style="vertical-align: top;">消息内容：</td>
					<td>
						<textarea placeholder="请输入消息内容" v-model="titl1" maxlength="140">
							
						</textarea>
					</td>
				</tr>
				<tr>
					<td>超链接：</td>
					<td><input type="text" placeholder="请输入链接" v-model="titl2" maxlength="50"/></td>
				</tr>
			</table>
			<a @click="issue">发布</a>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/messageInform.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import qs from 'qs';
    import { hostBean,hostBeans,hostRange2,allCommunity } from '../api.js';
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
    			successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
    			isHide:false,
    			currentPage3: 1,
    			currentPage:1,
    			activeName2: 'first',
    			options: null,
		        value8: '',
		        pageNum:1,
		        title:'',  //通知消息数据
		        totalNum:null,
		        pageNum2:1,
		        title2:'',  //系统通知消息数据
		        totalNum2:null,
		        areaId:null,
		       	titl1:null,
		       	titl2:null,
		       	pageSize1:10,
		       	pageSize2:10
		   	}
    	},
    	mounted(){
    		this.bean();
    		this.bean2();
    		this.range();
    	
    	},
    	methods:{
    		
		    handleCurrentChange(val) {
		        this.pageNum = val;
		        this.bean();
		    },
		    handleCurrentChange2(val) {
		        this.pageNum2 = val;
		        this.bean2();
		    },
		    instas:function(){
    			this.isHide = !this.isHide;
    		},
    		bean(){
    			let vm =this
    			let pageNum = vm.pageNum;
				let pageSize = vm.pageSize1;
    			axios.post(hostBean, //请求通知消息数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})
					).then((response) => {
						if(response.status == 200 && response.data.code == 10000){
							vm.title = response.data.pageBean.page;
							vm.totalNum = response.data.pageBean.totalNum;
						}
					})
    		},
    		closeWarningModal() {
				this.warningModal = false;
				this.isHide = !this.isHide;
			},
    		bean2(){
    			let vm = this
    			let pageNum = vm.pageNum2;
				let pageSize = vm.pageSize2;
    			axios.post(hostBeans, //请求系统通知数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})
					).then((response) => {
						if(response.status == 200 && response.data.code == 10000){
							vm.title2 = response.data.pageBean.page;
							vm.totalNum2 = response.data.pageBean.totalNum;
						}
					})
    		},
    		range(){
    			let vm = this
    			axios.post(allCommunity)
    			.then((response)=>{  //请求通知范围
					if(response.status == 200 && response.data.code == 10000){
    					vm.options = response.data.entity;
    					
    				}
    			})
    		},
    		mvvs(val){
    			this.areaId = this.options[this.options.findIndex(item => item.communityName == val)].communityId;
    		},
    		issue(){
    			let vm = this
    			if(vm.areaId == null || vm.titl1 == null || vm.titl2 == null){
    				this.warningMessage = '发布信息不完整';
					this.warningModal = true;
					this.isHide = !this.isHide;
    			}
    			else{
    				axios.post(hostRange2,
    				qs.stringify({
    					cityId:vm.areaId,
    					content:vm.titl1,
    					messageUrl:vm.titl2
    				}))
	    			.then((response)=>{
	    				if(response.status == 200 && response.data.code == 10000){
	    					this.successMessage = '发布成功';
							this.successModal = true;
							this.isHide = !this.isHide;
							setTimeout(() => {
								this.successModal = false;
								vm.value8 = '';
								vm.titl1 = '';
								vm.titl2 = '';
								this.bean();
								this.bean2();
							}, 2000);	    					
	    				}
	    				else{
	    					this.warningMessage = res.data.content;
							this.warningModal = true;
	    				}
	    				
	    			})
	    			.catch((error)=>{
	    				this.warningMessage = '发布失败,服务器出现异常';
						this.warningModal = true;
	    			})
    			}
    			
    		}
    	
    	
    	},
    	filters:{
    		types(val){
    			if(val == 1){
    				return '系统消息'
    			}
    			else if(val == 2){
    				return '租金账单消息'
    			}
    			else if(val == 3){
    				return '办公订单消息'
    			}
    			else if(val == 4){
    				return '合同消息'
    			}
    			else if(val == 5){
    				return '预约消息'
    			}
    			else if(val == 6){
    				return '水电账单消息'
    			}
    			else if(val == 7){
    				return '管家收款消息'
				}
				else if(val == 8){
    				return '管家退款消息'
				}
				else if(val == 9){
    				return '优惠券消息'
				}
				else if(val == 10){
    				return '现金券消息'
				}
				else if(val == 11){
    				return '红包消息'
				}
				else if(val == 12){
    				return '报修消息'
				}
				else if(val == 13){
    				return '投诉消息'
				}
				else if(val == 14){
    				return '呼叫管家消息'
				}
				else if(val == 15){
    				return '申请发票消息'
    			}
    		},
    		time(val){
    			var date = new Date(val);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
				var H = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) +':';
				var mm = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes());
				return Y + M + D + H + mm;
			},
			sender(val){
				if(val){
					if(val == '0'){
						return 'app用户端'
					}else if(val == '1'){
						return 'app管家端'
					}else if(val == '2'){
						return 'pc端'
					}else if(val == '3'){
						return '系统消息'
					}else if(val == '0,1'){
						return 'app用户端,app管家端'
					}else if(val == '0,2'){
						return 'app用户端,pc端'
					}else if(val == '0,3'){
						return 'app用户端,系统消息'
					}else if(val == '1,2'){
						return 'app管家端,pc端'
					}else if(val == '1,3'){
						return 'app管家端,系统消息'
					}else if(val == '2,3'){
						return 'pc端,系统消息'
					}else if(val == '0,1,2'){
						return 'app用户端,app管家端,pc端'
					}else if(val == '0,1,3'){
						return 'app用户端,app管家端,系统消息'
					}else if(val == '1,2,3'){
						return 'app管家端,pc端,系统消息'
					}else if(val == '0,1,2,3'){
						return 'app用户端,app管家端,pc端,系统消息'
					}
					
				}else{
					return '--'
				}
			},
			recipient(val){
				if(val){
					if(val == '0'){
						return 'app用户端'
					}else if(val == '1'){
						return 'app管家端'
					}else if(val == '2'){
						return 'pc端'
					}else if(val == '0,1'){
						return 'app用户端,app管家端'
					}else if(val == '0,2'){
						return 'app用户端,pc端'
					}else if(val == '1,2'){
						return 'app管家端,pc端'
					}else if(val == '0,1,2'){
						return 'app用户端,app管家端,pc端'
					}
				}else{
					return '--'
				}
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