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
		    			<router-link :to="{path:'/signed/openrefund',query:{id:communityId}}" class="refund">发起退款</router-link>
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value" placeholder="请选择" @change="sectte(value)">
						    <el-option
						      v-for="item in options8"
						      :key="item.dataname"
						      :value="item.dataname">
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
		    			<tr v-for="item in data">
		    				<td>{{item.refundId}}</td>
		    				<td>{{item.createTime | time}}</td>
		    				<td>{{item.userName}}</td>
		    				<td>{{item.userPhone}}</td>
		    				<td style="color: red;">{{item.refundMoney | Money}}</td>
		    				<td>{{item.refundStatus | Status}}</td>
		    				<td>未分配</td>
		    				<td><router-link :to="{path:'/signed/refunddetails',query:{id:item.refundId}}">查看详情</router-link></td>
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
    import { hostRefund } from '../api.js';
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
		        State:''
			}
    	},
    	mounted(){
			this.communityId = this.$route.query.communityId;
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
				this.datas();
			},
    		datas(){
    			let pageNum = this.pageNum;
    			axios.post(hostRefund,
    				qs.stringify({
    					communityId:this.communityId,
    					pageNum:pageNum,
    					pageSize:this.pageSize
    				})
    			)
    			.then((response)=>{
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
    			this.State = this.options8[this.options8.findIndex(item => item.dataname == val)].id;
    		}
    	},
    
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>