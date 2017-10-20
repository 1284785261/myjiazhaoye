<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/workbench">用户报修</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>用户报修</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="repairs">
		    		<div class="repairs1">
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="全部">
						    <el-option
						      v-for="item in options8"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					 	 </el-select>
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="全部">
						    <el-option
						      v-for="item in options8"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					 	 </el-select>
						<span class="bsc">报修时间：</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="start" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="dev"></Date-picker>
						<div class="form-search">
							<i class="iconfont icon-sousuo"></i>
							<Input v-model="keyWord" placeholder="搜索收款对象/手机号"></Input>
							<input type="button" value="搜索" @click="handleCurrentChange()">
						</div>
						<!--<input type="text"  placeholder="搜索收款对象/手机号" class="mv"/>
						<i class="el-icon-search"></i>
						<a class="sa">搜索</a>-->
		    		</div>
		    		<table>
		    			<thead>
		    				<td>工单号</td>
		    				<td>报修时间</td>
		    				<td>类型</td>
		    				<td>房间</td>
		    				<td>维修项目</td>
		    				<td>预约上门时间</td>
		    				<td>状态</td>
		    				<td>问题描述</td>
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
		    				<td>未分配</td>
		    				<td><router-link to="/signed/repairsdetails">查看详情</router-link><a style="margin-left: 10px;">确认跟进</a></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
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
		    				<td>未分配</td>
		    				<td><a>查看详情</a></td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size=pageSize
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
	
	import '../../sass/style/repairs.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostRepairTabe } from '../api.js';
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
		        value: '',
		        pageNum:1,
		        pageSize:10,
		        communityId:''
			}
    	},
    	mounted(){
			this.communityId = this.$route.query.communityId;
			this.datas();
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
			},
			datas(){
		    	let pageNum = this.pageNum || 1;
		    	axios.post(hostRepairTabe,
		    		qs.stringify({
		    			communityId:this.communityId,
		    			pageNum: pageNum,
		    			pageSize:this.pageSize
		    		}))
		    	.then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.entity.page;
//			    		this.totolNum = response.data.entity.totalNum;
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
  #repairs{
  	.ivu-icon-ios-calendar-outline {
			color: #038be2;
			font-family: "iconfont" !important;
			font-size: 18px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			&:before {
				content: "\e60c";
			}
	}
  	.form-search {
			position: relative;
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 50px;
			display: inline-block;
			.ivu-input-wrapper {
				width: auto;
			}
			input[type="text"] {
				width: 208px;
				height: 36px;
				border-radius: 0;
				padding-left: 30px;
			}
			i {
				position: absolute;
				left: 5px;
				top: 7px;
				z-index: 99;
				font-size: 18px;
				color: #999;
			}
			input[type=button] {
				width: 70px;
				text-align: center;
				height: 36px;
				line-height: 36px;
				background-color: #038be2;
				color: #fff;
				border: none;
				position: relative;
				left: -5px;
				top: 2px;
			}
		}
  }
</style>