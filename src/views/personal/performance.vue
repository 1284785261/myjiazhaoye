<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">我的业绩</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>我的业绩</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="perform">
		    		<div class="perform1">
		    			<span class="bsc">日期：</span>
		    			<Date-picker type="date" placeholder="请选择日期" v-model="start" class="mvs"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="mvs"></Date-picker>
						<span class="bsc">筛选：</span>
						<a v-for="(item,index) in tite" @click="classify(index)" :class="{'active':isAicat == index}">{{item}}</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>日期</td>
		    				<td>类型</td>
		    				<td>房间</td>
		    				<td>是否由中介介绍</td>
		    				<td>中介公司</td>
		    				<td>中介人</td>
		    				<td>中介费</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr v-for="item in SignList">
		    				<td>{{item.createTime | time}}</td>
		    				<td>{{item.isOffice | isOffice}}</td>
		    				<td v-if="item.roomInfo">{{item.roomInfo}}</td>
		    				<td v-else>--</td>
		    				<td :style="{color:Colre}" v-if="item.isDesc == 1">{{item.isDesc | isDesc}}</td>
		    				<td v-else>{{item.isDesc | isDesc}}</td>
		    				<td v-if="item.isDesc == 1">{{item.intermediaryCompany}}</td>
		    				<td v-else>--</td>
		    				<td v-if="item.isDesc == 1">{{item.intermediaryName}}</td>
		    				<td v-else>--</td>
		    				<td v-if="item.isDesc == 1" style="color: red;">{{item.intermediaryMoney | Money}}元</td>
		    				<td v-else>--</td>
		    				<td><router-link :to="{name:'contractDetail',query:{contractSignId:item.contractSignId,isOffice:item.isOffice}}">查看合同</router-link></td>
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
	
	import '../../sass/style/performance.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostSignContr } from '../api.js';
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
				tite:['全部','公寓合同','联合办公合同'],
				isAicat:'',
				start:null,
				over:null,
				pageNum:1,
				communityId:'',
				pageSize:10,
				SignList:[],
				Colre:'#1fbba6',
				signType:'',
				totalNum:0
		   	}
    	},
    	mounted(){
				this.communityId = sessionStorage.getItem('communityId');
				this.datas();
    	},
    	filters:{
   			time(val){
   				return  new Date(val).Format('yyyy-MM-dd');
   			},
   			isOffice(val){
   				if(val == 0){
   					return '公寓合同';
   				}
   				else if(val == 1){
   					return '联合办公合同';
   				}
   			},
   			Money(val){
   				return parseFloat(val).toFixed(2);
   			},
   			isDesc(val){
   				if(val == 0){
   					return '否';
   				}
   				else if(val == 1){
   					return '是';
   				}
   			}
    	},
    	methods:{
			classify(index){
				this.SignList =[];
				this.totalNum= 0;
				this.isAicat = index;
				console.log(index);
				let param = new FormData();
				if(index == 0){
					let param = new FormData();
					param.append('communityId',this.communityId);
					param.append('pageNum',this.pageNum);
					param.append('pageSize',10);
					if(this.start){
						this.start = new Date(this.start).Format('yyyy-MM-dd');
						param.append('startTime',this.start);
						console.log(this.start);
					}
					if(this.over){
						this.over = new Date(this.over).Format('yyyy-MM-dd');
						param.append('endTime',this.over);
						console.log(this.over);
					}
					axios.post(hostSignContr, param).then((res)=>{
						console.log(res);
						if(res.status == 200 && res.data.code == 10000){
							this.SignList = res.data.result.signList;
							this.totalNum = res.data.result.totalNum;
						}
					}).catch((err)=>{
						console.log(err);
					})
				}else if(index == 1){
					this.signType = 0;
					this.datas();
					
				}else if(index == 2){
					this.signType = 1;
					this.datas();
				}
				
			},
			datas(){
				let param = new FormData();
				param.append('communityId',this.communityId);
				param.append('pageNum',this.pageNum);
				param.append('pageSize',10);
				if(this.start){
					this.start = new Date(this.start).Format('yyyy-MM-dd');
					param.append('startTime',this.start);
					console.log(this.start);
				}
					param.append('signType',this.signType);
					console.log(this.signType);
				if(this.over){
					this.over = new Date(this.over).Format('yyyy-MM-dd');
					param.append('endTime',this.over);
					console.log(this.over);
				}
				axios.post(hostSignContr, param).then((res)=>{
					console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.SignList = res.data.result.signList;
						this.totalNum = res.data.result.totalNum;
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			handleCurrentChange(val){
				this.pageNum = val;
				this.datas();
			}
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  .location_community{
    .ivu-icon-location{
      font-size: 38px;
      color: red;
      position: relative;
      top: 10px;
      left: 5px;
    }
  }
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
</style>