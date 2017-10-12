<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/workbench">活动管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>活动管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="addactivity">
		    		<table>
		    			<tr>
		    				<td>活动范围：</td>
		    				<td>
		    					<el-select v-model="value" placeholder="请选择范围" @change="actives(value)">
								    <el-option
								      v-for="item in options"
								      :key="item.areaName"
								      :value="item.areaName">
								    </el-option>
								</el-select>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>活动ID：</td>
		    				<td><input type="text" placeholder="根据针对范围直接生成" class="mt" v-model="Activity.activityNum"/></td>
		    			</tr>
		    			<tr>
		    				<td>活动主题：</td>
		    				<td><input type="text" placeholder="请输入活动主题" class="mt" v-model="Activity.activityTheme"/></td>
		    			</tr>
		    			<tr>
		    				<td>开始时间：</td>
		    				<td><Date-picker type="date" placeholder="请选择开始时间" v-model="Activity.beginDate"></Date-picker></td>
		    			</tr>
		    			<tr>
		    				<td style="vertical-align: top;">活动介绍：</td>
		    				<td><textarea placeholder="请输入活动内容" v-model="Activity.activityContent"></textarea></td>
		    			</tr>
		    			<tr>
		    				<td>活动规则：</td>
		    				<td>
		    					<el-checkbox-group v-model="checkList">
								    <el-checkbox label="到期结束"></el-checkbox>
								    <el-checkbox label="送完为止"></el-checkbox>
								    <el-checkbox class="radio" style="margin-left: 40px;">无期限</el-checkbox>
							    </el-checkbox-group>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>结束日期：</td>
		    				<td><Date-picker type="date" placeholder="请选择结束日期" v-model="Activity.endDate"></Date-picker></td>
		    			</tr>
		    			<tr>
		    				<td>总金额：</td>
		    				<td><input type="text" placeholder="请输入总金额" class="mt" v-model="Activity.activityTotalMoney"/></td>
		    			</tr>
		    			<tr>
		    				<td>优惠券有效期：</td>
		    				<td>
		    					<Date-picker type="date" placeholder="请选择优惠券有效期" v-model="Activity.validityDate"></Date-picker>
		    					<el-checkbox-group v-model="radio2" class="radio2">
		    						<el-checkbox class="radio" label="1" @click="deadline">无期限</el-checkbox>
		    					</el-checkbox-group>
		    					
		    				</td>
		    			</tr>
		    		</table>
		    		<a class="refund" @click="activit">发布活动</a>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	
	import '../../sass/style/addactivity.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import { hostActivityArea,hostActivityAdd,hostRangeRandom } from '../api.js';
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
    			successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				currentPage3: 1,
				checked: true,
				radio2: '0',
				options: [],
		        value: '',
		        checkList:[],
		        Activity:{
		        	activityNum:'',
		        	cityId:'',
		        	activityTheme:'',
		        	activityContent:'',
		        	beginDate:'',
		        	endRule:'',
		        	endDate:'',
		        	activityTotalMoney:'',
		        	validityDate:'',
		        	wordFirstKey:''
		        }
			}
    	},
    	mounted(){
			this.datas();
    	},
    	filters:{
   
    	},
    	methods:{
    		closeWarningModal() {
				this.warningModal = false;
			},
    		datas(){
    			axios.post(hostActivityArea).then((res)=>{
    				//console.log(res);
    				if(res.data.code == 10000 && res.status == 200){
    					this.options = res.data.entity;
    				}
    				
    			}).catch((err)=>{
    				console.log(err);
    			})
    		},
    		actives(value){
    			this.Activity.wordFirstKey = this.options[this.options.findIndex(item => item.areaName == value)].wordFirstKey;
    			console.log(this.Activity.wordFirstKey);
    			axios.post(hostRangeRandom,
    				qs.stringify({
    					wordFirstKey:this.Activity.wordFirstKey
    				})
    			).then((res)=>{
    				console.log(res);
    				if(res.data.code == 10000 && res.status == 200){
    					this.Activity.activityNum = res.data.entity;
    				}
    			}).catch((err)=>{
    				console.log(err);
    			})
    		},
    		deadline(){
    			var doms = document.getElementById('a1');
    			this.radio2 = this.radio2 == '0'?'1':'0';
    			console.log(this.radio2);
    			
    		},
    		activit(){
    			
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