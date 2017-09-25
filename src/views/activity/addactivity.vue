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
		    					<el-select v-model="value" placeholder="请选择范围">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>活动ID：</td>
		    				<td><input type="text" placeholder="根据针对范围直接生成" class="mt"/></td>
		    			</tr>
		    			<tr>
		    				<td>活动主题：</td>
		    				<td><input type="text" placeholder="请输入活动主题" class="mt"/></td>
		    			</tr>
		    			<tr>
		    				<td>开始时间：</td>
		    				<td><Date-picker type="date" placeholder="请选择开始时间" v-model="communityLeaseBegin"></Date-picker></td>
		    			</tr>
		    			<tr>
		    				<td style="vertical-align: top;">活动介绍：</td>
		    				<td><textarea placeholder="请输入活动内容"></textarea></td>
		    			</tr>
		    			<tr>
		    				<td>活动规则：</td>
		    				<td>
		    					<el-checkbox-group v-model="checkList">
								    <el-checkbox label="到期结束"></el-checkbox>
								    <el-checkbox label="送完为止"></el-checkbox>
								    <el-radio class="radio" v-model="radio1" label="1" style="margin-left: 40px;">无期限</el-radio>
							    </el-checkbox-group>
							    
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>结束日期：</td>
		    				<td><Date-picker type="date" placeholder="请选择结束日期" v-model="communityLeaseBegin"></Date-picker></td>
		    			</tr>
		    			<tr>
		    				<td>总金额：</td>
		    				<td><input type="text" placeholder="请输入总金额" class="mt"/></td>
		    			</tr>
		    			<tr>
		    				<td>优惠券有效期：</td>
		    				<td>
		    					<Date-picker type="date" placeholder="请选择优惠券有效期" v-model="communityLeaseBegin"></Date-picker>
		    					<el-radio class="radio" v-model="radio2" label="1">无期限</el-radio>
		    				</td>
		    			</tr>
		    		</table>
		    		<a class="refund">发布活动</a>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/addactivity.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostHousehold } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				currentPage3: 1,
				radio1: '1',
				radio2: '1',
				options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value: '',
		        checkList:[]
			}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>