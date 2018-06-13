<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/workbench">工作台</router-link><span>>用户报修</span>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>用户报修</h3>
		          <span>{{Name}}</span>
		        </div>
		    	<div id="repairs">
		    		<div class="repairs1">
		    			<span class="bsc">类型：</span>
		    			<el-select v-model="value" @change="tba(value)">
						    <el-option
						      v-for="item in options1"
						      :key="item.data"
						      :value="item.data">
						    </el-option>
					 	 </el-select>
		    			<span class="bsc">状态：</span>
		    			<el-select v-model="value2" @change="tba2(value2)">
						    <el-option
						      v-for="item in options2"
						      :key="item.data"
						      :value="item.data">
						    </el-option>
					 	 </el-select>
						<span class="bsc">报修时间：</span>
						<Date-picker type="date" :options="option3" placeholder="请选择日期" v-model="start" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="over" class="dev"></Date-picker>
						<div class="form-search">
							<i class="iconfont icon-sousuo"></i>
							<Input v-model="keyWord" placeholder="搜索报修对象/手机号"></Input>
							<input type="button" value="搜索" @click="handle()">
						</div>
		    		</div>
		    		<div v-if="Datas">
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
			    			<tr v-for="item in Datas">
			    				<td>{{item.repairNo}}</td>
			    				<td>{{item.createtime | time}}</td>
			    				<td>{{item.isOffice | office}}</td>
			    				<td v-if="item.cxkjCommunityRoom && item.isOffice == 0">{{item.cxkjCommunityRoom.roomNum}}</td>
								<td v-if="item.cxkjCommunityOffice && item.isOffice == 1">{{item.cxkjCommunityOffice.officeHouseNum}}</td>
			    				<td>{{item.systemData.dataName}}</td>
			    				<td>{{item.repairTime | time}}</td>
			    				<td :class="[{'kust':item.repairState == 0},{'kust1':item.repairState == 1}]">{{item.repairState | state}}</td>
			    				<td v-if="item.repairDesc">{{item.repairDesc}}</td>
			    				<td v-else>--</td>
			    				<td><router-link :to="{path:'/signed/repairsdetails',query:{id:item.repairId,type:'0'}}">查看详情</router-link>
			    					<router-link :to="{path:'/signed/repairsdetails',query:{id:item.repairId}}" style="margin-left: 10px;" v-if="item.repairState == 0">确认跟进</router-link>
			    					<router-link :to="{path:'/signed/repairsdetails',query:{id:item.repairId}}" style="margin-left: 10px;" v-else-if="item.repairState == 1">确认办结</router-link>
			    				</td>
			    			</tr>

			    		</table>
			    		<el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage3"
					      :page-size=pageSize
					      layout="prev, pager, next,total,jumper"
					      :total=totolNum>
					    </el-pagination>
		    		</div>
		    		<div v-else class="kbt">
		    			<img src="../../../static/images/icon/my_03.png" style="margin-top: 150px;">
		    		</div>
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
			let _this = this
    		return{
				activeTabName:"workbench",
				currentPage3: 1,
				radio: '1',
				ishide:false,
				ishide2:false,
				ishide3:false,
				options1: [{
		          data: '全部',
		          id:-1
		        }, {
		          data: '公寓',
		          id:0
		        }, {
		          data: '办公室',
		          id:1
		        }],
		        value: '全部',
		        options2: [{
		          data: '全部',
		          id:-1
		        }, {
		          data: '待处理',
		          id:0
		        }, {
		          data: '跟进中',
		          id:1
		        }, {
		          data: '已办结',
		          id:2
		        }],
		        value2: '全部',
		        pageNum:1,
		        pageSize:10,
		        communityId:'',
		        Name:'',
		        totolNum:0,
		        Datas:null,
		        repairState:null,
		        isOffice:null,
		        start:null,
		        over:null,
				keyWord:null,
				option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.start;
					}
				},
				option3: {
                    disabledDate(date){
						if(_this.over){
							return date &&  _this.over < date.valueOf();
						}
                    }
                },
				communitytype:null //社区类型
			}
    	},
    	mounted(){
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.communitytype = this.$route.query.type;
			if(this.communitytype == '0'){
				this.value = '公寓'
			}
			else if(this.communitytype == '1'){
				this.value = '办公室'
			}
			this.datas();

    	},
    	filters:{
   			time(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm');
			},
			office(val){
				if(val == 0){
					return '公寓报修'
				}
				else if(val == 1){
					return '办公室报修'
				}
			},
			state(val){
				if(val == 0){
					return '待处理'
				}
				else if(val == 1){
					return '跟进中'
				}
				else if(val == 2){
					return '已办结'
				}
			}
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
		    	let param = new FormData();
		    	param.append('communityId',this.communityId);
		    	param.append('pageNum',pageNum);
				param.append('pageSize',this.pageSize);
				if(this.communitytype != null){
					param.append('isOffice',this.communitytype);
				}
		    	axios.post(hostRepairTabe, param).then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.entity.page;
			    		this.totolNum = response.data.entity.totalNum;
			    	}
		    	})
		    	.catch((error)=>{
		    		// console.log(error);
		    	})
		  },
		  	tba(value){
		  		this.isOffice = this.options1[this.options1.findIndex(item => item.data == value)].id;
		  	},
		  	tba2(value2){
		  		this.repairState = this.options2[this.options2.findIndex(item => item.data == value2)].id;
		  	},
		  	handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.handle();
			},
			handle(){
				let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('communityId',this.communityId);
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);

		    	if(this.isOffice && this.isOffice != -1){
		    		param.append('isOffice',this.isOffice);
		    	}
		    	if(this.repairState && this.repairState != -1){
		    		param.append('repairState',this.repairState);
		    	}
		    	if(this.over){
		    		this.over = new Date(this.over).Format('yyyy-MM-dd');
		    		param.append('endtime',this.over);
		    	}
		    	if(this.start){
		    		let start = new Date(this.start).Format('yyyy-MM-dd');
		    		param.append('starttime',start);
		    	}
		    	if(this.keyWord){
		    		param.append('userNamePhone',this.keyWord);
		    	}
		    	axios.post(hostRepairTabe, param).then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.entity.page;
			    		this.totolNum = response.data.entity.totalNum;
			    	}
		    		else{
		    			this.Datas = null;
		    			this.totolNum = 0;
		    		}
		    	})
		    	.catch((error)=>{
		    		// console.log(error);
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
  #repairs .kbt{
	margin: 0 auto;
	text-align: center;
	}
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
				top: 1px;
			}
		}
  }
</style>
