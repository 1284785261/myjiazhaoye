<template>
	<div id="surrend">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">用户退租</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>用户退租</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="surrender">
		    		<div class="surrender1">
		    			<span class="bsc">类型：</span>
		    			<el-select v-model="value" placeholder="请选择" @change="select(value)">
						    <el-option
						      v-for="item in options"
						      :key="item.dataName"
						      :value="item.dataName">
						    </el-option>
						</el-select>
						<span class="bsc">状态：</span>
						<el-select v-model="value" placeholder="请选择" @change="select(value)">
						    <el-option
						      v-for="item in options"
						      :key="item.dataName"
						      :value="item.dataName">
						    </el-option>
						</el-select>
						<span class="bsc">申请时间：</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev"></Date-picker>
						<input type="text"  placeholder="搜索联系人/手机号" class="mv"/>
						<i class="el-icon-search"></i>
						<a>搜索</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>申请时间</td>
		    				<td>类型</td>
		    				<td>承租人/联系人</td>
		    				<td>联系电话</td>
		    				<td>租期</td>
		    				<td>剩余</td>
		    				<td>租金和支付情况</td>
		    				<td>状态</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><router-link to="/signed/affirmsurrend">确认退租</router-link><a @click="adddian">查看合同</a></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a @click="adddian">查看退租</a><a @click="adddian">查看合同</a></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a @click="adddian">查看退租</a><a @click="adddian">查看合同</a></td>
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
		<div class="scherm" v-show="ishide">
			
		</div>
		<div class="instas4" v-show="ishide2">
			<i class="el-icon-circle-close" @click="adddian"></i>
			<p>接待反馈</p>
			<table>
				<tr>
					<td><span>客户意向：</span></td>
					<td>
						<el-radio class="radio" v-model="radio" label="1">考虑中</el-radio>
  						<el-radio class="radio" v-model="radio" label="2">不考虑</el-radio>
					</td>
				</tr>
				<tr>
					<td><span class="lov">原因：</span></td>
					<td>
						<textarea></textarea>
					</td>
				</tr>
			</table>
			<a @click="adddian()" class="tjss">确定</a>
		</div>
		<div class="popup" v-show="ishide3">
			<i class="el-icon-circle-close" @click="adddian2"></i>
			<p>预约详情</p>
			<div>
				<span>2017年5月18日</span>
				<span>已签约</span>
			</div>
			<table>
				<tr>
					<td>联系人：</td>
					<td>欧阳小溪</td>
				</tr>
				<tr>
					<td>联系电话：</td>
					<td>1564651651 <Icon type="ios-telephone"></Icon></td>
				</tr>
				<tr>
					<td>已选户型：</td>
					<td>标准大标间</td>
				</tr>
				<tr>
					<td>用户留言：</td>
					<td>欧阳小溪</td>
				</tr>
				<tr>
					<td>预约看房时间：</td>
					<td>2017-08-15 </td>
				</tr>
			</table>
			<span class="xuxian"></span>
			<table>
				<tr>
					<td>接待管家：</td>
					<td>1111</td>
				</tr>
				<tr>
					<td>已签约：</td>
					<td>1111 201</td>
				</tr>
				<tr>
					<td>签约时间：</td>
					<td>1111</td>
				</tr>
			</table>
			<a class="cha">查看合同</a>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/surrender.css';
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
				ishide3:false
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