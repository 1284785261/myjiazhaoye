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
		          <span>{{Name}}</span>
		        </div>
		    	<div id="refundrecord">
		    		<div class="refundrecord1">
		    			<router-link :to="{path:'/signed/openrefund',query:{id:communityId}}" class="refund">发起退款</router-link>
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="请选择" @change="sectte(value)">
						    <el-option
						      v-for="item in options8"
						      :key="item.dataname"
						      :value="item.dataname">
						    </el-option>
					 	 </el-select>
						<span class="bsc">退款时间：</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="start" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="dev"></Date-picker>
						<div class="form-search">
							<i class="iconfont icon-sousuo"></i>
							<Input v-model="keyWord" placeholder="搜索退款对象/手机号"></Input>
							<input type="button" value="搜索" @click="handle">
						</div>
						<!--<input type="text"  placeholder="搜索联系人/手机号" class="mv"/>
						<i class="el-icon-search"></i>
						<a class="sa">搜索</a>-->
		    		</div>
		    		<div v-if="data != null">
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
			    			<tr v-for="item in data">
			    				<td>{{item.refundSn}}</td>
			    				<td>{{item.createTime | time}}</td>
			    				<td>{{item.userName}}</td>
			    				<td>{{item.userPhone}}</td>
			    				<td style="color: red;">{{item.refundMoney | Money}}</td>
			    				<td>{{item.refundStatus | Status}}</td>
			    				<td>{{item.refundInfo}}</td>
			    				<td><router-link :to="{path:'/signed/refunddetails',query:{id:item.refundId,name:Name}}">查看详情</router-link></td>
			    			</tr>
			    		</table>
			    		<el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage3"
					      :page-size=pageSize
					      layout="prev, pager, next,total,jumper"
					      :total=totalNum>
					    
					    </el-pagination>
				    </div>
				    <div v-else class="kbt">
		    			<img src="../../../static/images/icon/kbts_03.png" style="margin-top: 150px;">
		    		</div>
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
    import { hostRefund,refundHandle } from '../api.js';
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
				options8: [{
					dataname:'全部',
					id:-1
				},{
					dataname:'待审核',
					id:0
				},{
					dataname:'待退款',
					id:1
				},{
					dataname:'已退款',
					id:2
				},{
					dataname:'审核不通过',
					id:3
				}],
		        value: '',
		        communityId:'',
		        pageNum:1,
		        data:null,
		        totalNum:'1',
		        pageSize:10,
		        State:'',
		        keyWord:'',
		        start:'',
		        over:'',
		        Name:''
			}
    	},
    	mounted(){
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
    	},
    	filters:{
   			time(val){
   				return  new Date(val).Format('yyyy-MM-dd');
   			},
   			Money(val){
   				return parseFloat(val).toFixed(2);
   			},
   			Status(val){
   				if(val == 0){
   					return '待审核';
   				}
   				else if(val == 1){
   					return '待退款';
   				}
   				else if(val == 2){
   					return '已退款';
   				}
   			}
    	},
    	methods:{
    		handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.handle();
			},
    		datas(){
    			let param = new FormData();
    			let pageNum = this.pageNum;
    			if(this.State != '' && this.State != -1){
    				param.append('refundStatus',this.State);
    			}
    			if(this.start != ''){
    				this.start = new Date(this.start).Format('yyyy-MM-dd');
    				param.append('startDate',this.start);
    			}
    			if(this.over != ''){
    				this.over = new Date(this.over).Format('yyyy-MM-dd');
    				param.append('endDate',this.over);
    			}
    			if(this.keyWord != ''){
    				param.append('keyWord',this.keyWord);
    			}
    			param.append('communityId',this.communityId);
    			param.append('pageNum',pageNum);
    			param.append('pageSize',this.pageSize);
    			
    			axios.post(refundHandle,param).then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					this.data = response.data.result.refundList;
    					this.totalNum = response.data.result.totalNum;
    				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		handle(){
    			let param = new FormData();
    			let pageNum = this.pageNum;
    			if(this.State != '' && this.State != -1){
    				param.append('refundStatus',this.State);
    			}
    			if(this.start != ''){
    				this.start = new Date(this.start).Format('yyyy-MM-dd');
    				param.append('startDate',this.start);
    			}
    			if(this.over != ''){
    				this.over = new Date(this.over).Format('yyyy-MM-dd');
    				param.append('endDate',this.over);
    			}
    			if(this.keyWord != ''){
    				param.append('keyWord',this.keyWord);
    			}
    			param.append('communityId',this.communityId);
    			param.append('pageNum',pageNum);
    			param.append('pageSize',this.pageSize);
    			
    			axios.post(refundHandle,param).then((response)=>{
    				console.log(response);
    				if(response.data.code == 10000 && response.status == 200){
    					this.data = response.data.result.refundList;
    					this.totalNum = response.data.result.totalNum;
    				}
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		},
    		sectte(value){
    			this.State = this.options8[this.options8.findIndex(item => item.dataname == value)].id;
    		}
    	},
    
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  #refundrecord{
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