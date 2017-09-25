<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/workbench">发起退款记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>发起退款记录</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="refundrecord">
		    		<div class="refundrecord1">
		    			<router-link to="/signed/openrefund" class="refund">发起退款</router-link>
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options8"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					 	 </el-select>
						<span class="bsc">看房时间：</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="start" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="dev"></Date-picker>
						<input type="text"  placeholder="搜索联系人/手机号" class="mv"/>
						<i class="el-icon-search"></i>
						<a class="sa">搜索</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>订单号</td>
		    				<td>发起时间</td>
		    				<td>退款对象</td>
		    				<td>退款对象注册手机号</td>
		    				<td>金额/元</td>
		    				<td>状态</td>
		    				<td>退款备注</td>
		    				<td>操作</td>
		    				
		    			</thead>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td style="color: red;">111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><router-link to="/signed/refunddetails">查看详情</router-link></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a>查看详情</a></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a>查看详情</a></td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size="5"
				      layout="prev, pager, next,total,jumper"
				      :total="20">
				    
				    </el-pagination>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/refundrecord.css';
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
				radio: '1',
				ishide:false,
				ishide2:false,
				ishide3:false,
				options8: [{
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
		        value: ''
			}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
			adddian(){
				this.ishide = ! this.ishide;
				this.ishide2 = ! this.ishide2;
			},
			adddian2(){
				this.ishide = ! this.ishide;
				this.ishide3 = ! this.ishide3;
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