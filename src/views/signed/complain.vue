<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/workbench">用户投诉</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>用户投诉</h3>
		          <span>{{Name}}</span>
		        </div>
		    	<div id="complain">
		    		<div class="complain1">
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="全部" @change="sectte(value)">
						    <el-option
						      v-for="item in options8"
						      :key="item.dataname"
						      :value="item.dataname">
						    </el-option>
					 	 </el-select>
						<span class="bsc">投诉时间：</span>
						<Date-picker type="date" :options="option2" placeholder="请选择日期" v-model="start" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="over" class="dev"></Date-picker>
						<div class="form-search">
							<i class="iconfont icon-sousuo"></i>
							<Input v-model="keyWord" placeholder="搜索报修对象/手机号"></Input>
							<input type="button" value="搜索" @click="handle()">
						</div>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>工单号</td>
		    				<td>投诉时间</td>
		    				<td>投诉人</td>
		    				<td>已注册手机号</td>
		    				<td>问题描述</td>
		    				<td>状态</td>
		    				<td width="168px">操作</td>
		    				
		    			</thead>
		    			<tr v-for="item in Data">
		    				<td>{{item.complainNum}}</td>
		    				<td>{{item.createTime | time}}</td>
		    				<td>{{item.userName}}</td>
		    				<td>{{item.userPhone}}</td>
		    				<td>{{item.complainContent}}</td>
		    				<td :class="[{'kust':item.complainStatus == 0},{'kust1':item.complainStatus == 1}]">{{item.complainStatus | Status}}</td>
		    				<td>
		    					<router-link :to="{path:'/signed/complaindetail',query:{id:item.complainId,stats:'0'}}">查看详情</router-link>
		    					<router-link :to="{path:'/signed/complaindetail',query:{id:item.complainId}}" v-if="item.complainStatus == 0">确认接收</router-link>
		    					<router-link :to="{path:'/signed/complaindetail',query:{id:item.complainId}}" v-else-if="item.complainStatus == 1">确认已处理</router-link>
		    				</td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size=pageSize
				      layout="prev, pager, next,total,jumper"
				      :total="totalNum">
				    
				    </el-pagination>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/complain.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostlainTable } from '../api.js';
    import qs from 'qs';
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
			let _this = this
    		return{
				activeTabName:"workbench",
				currentPage3: 1,
				options8: [{
					dataname:'全部',
					id:-1
				},{
					dataname:'待确认',
					id:0
				},{
					dataname:'店长处理中',
					id:1
				},{
					dataname:'店长已处理',
					id:2
				},{
					dataname:'客服处理中',
					id:3
				},{
					dataname:'已完结',
					id:4
				}],
		        value: '全部',
		        communityId:'',
		        pageNum:1,
		        data:null,
		        totalNum:'1',
		        pageSize:10,
		        State:'',
		        Data:{},
		        start:'',
		        over:'',
		        keyWord:'',
				Name:'',
				option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.start;
					}
				},
				option2: {
                    disabledDate(date){
						if(_this.over){
							return date &&  _this.over < date.valueOf();
						}
                    }
                },
			}
    	},
    	mounted(){
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
    	},
    	filters:{
   			time(val){
   				return  new Date(val).Format('yyyy-MM-dd hh:mm');
   			},
   			Money(val){
   				return parseFloat(val).toFixed(2);
   			},
   			Status(val){
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
   			}
    	},
    	methods:{
    		handleCurrentChange(val) {
				this.pageNum = val;
				this.handle();
			},
    		datas(){
    			let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('communityId',this.communityId);
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);
    			axios.post(hostlainTable, param).then((response)=>{
    				// console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					this.Data = response.data.pageBean.page;
    					this.totalNum = response.data.pageBean.totalNum;
    				}
    			})
    			.catch((error)=>{
    				// console.log(error);
    			})
    		},
    		sectte(value){
    			this.State = this.options8[this.options8.findIndex(item => item.dataname == value)].id;
    		},
    		handle(){
    			let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('communityId',this.communityId);
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);
		    	
		    	if((this.State && this.State != -1) || this.State == 0){
		    		param.append('complainStatus',this.State);
		    	}
		    	if(this.over){
		    		this.over = new Date(this.over).Format('yyyy-MM-dd');
		    		param.append('endDate',this.over);
		    	}
		    	if(this.start){
		    		let start = new Date(this.start).Format('yyyy-MM-dd');
		    		param.append('beginDate',start);
		    	}
		    	if(this.keyWord){
		    		param.append('keyWord',this.keyWord);
		    	}
		    	axios.post(hostlainTable, param).then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Data = response.data.pageBean.page;
    					this.totalNum = response.data.pageBean.totalNum;
			    	}
		    		else{
		    			this.Data = {};
		    			this.totalNum = 0;
		    		}
		    	})
		    	.catch((error)=>{
		    		// console.log(error);
		    	})
    		}
    	},
    
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  #complain{
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
				left: -4px;
				top: 1px;
			}
		}
  }
</style>