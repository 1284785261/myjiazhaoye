<template>
	<div class="hous">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box wprdbench">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">消息中心</router-link>
		        </div>
		        <el-tabs v-model="activeName2" type="card">
				    <el-tab-pane label="通知消息" name="first">
				    	<div id="messageInform1">
				    		<table>
				    			<thead>
				    				<td width="15%">类型</td>
				    				<td width="20%">时间</td>
				    				<td>消息内容</td>
				    			</thead>
				    			<tr v-for="item in title">
				    				<td>{{item.messageType}}</td>
				    				<td>{{item.createtime}}</td>
				    				<td>{{item.content}}</td>
				    			
				    			</tr>
				    			
				    		</table>
				    		<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page.sync="currentPage3"
						      :page-size="8"
						      layout="prev, pager, next,total,jumper"
						      :total=totalNum>
						     
						    </el-pagination>
						    
				    	</div> 
				    </el-tab-pane>
				    <el-tab-pane label="系统消息管理" name="second">
				    	<div id="messageInform1">
				    		<a class="issue" @click="instas()">发布系统消息</a>
				    		<table>
				    			<thead>
				    				<td width="15%">类型</td>
				    				<td width="20%">时间</td>
				    				<td>消息内容</td>
				    			</thead>
				    			<tr v-for="item in title2">
				    				<td>{{item.messageType}}</td>
				    				<td>{{item.createtime}}</td>
				    				<td>{{item.content}}</td>
				    			
				    			</tr>
				    		</table>
				    		<el-pagination
						      @current-change="handleCurrentChange2"
						      :current-page.sync="currentPage3"
						      :page-size="8"
						      layout="prev, pager, next,total,jumper"
						      :total=totalNum2>
						     
						    </el-pagination>
						    
				    	</div> 
				    </el-tab-pane>
				    
				</el-tabs>
		    	
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		<div class="zhezhaoa" v-show="isHide">
			
		</div>
		<div class="instas" v-show="isHide">
			<i class="el-icon-circle-close" @click="instas()"></i>
			<p>发布系统消息</p>
			<table>
				<tr>
					<td>发布范围：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或者选择">
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
					<td>消息内容：</td>
					<td>
						<textarea placeholder="请输入消息内容">
							
						</textarea>
					</td>
				</tr>
				<tr>
					<td>超链接：</td>
					<td><input type="text" placeholder="请输入链接" /></td>
				</tr>
			</table>
			<a>发布</a>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/messageInform.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import qs from 'qs';
    import { hostBean,hostBeans } from '../api.js';
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false,
    			currentPage3: 5,
    			activeName2: 'first',
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
		        value8: '',
		        pageNum:1,
		        title:'',  //通知消息数据
		        totalNum:null,
		        pageNum2:1,
		        title2:'',  //系统通知消息数据
		        totalNum2:null
		   	}
    	},
    	mounted(){
    		this.bean();
    		this.bean2();
    	},
    	methods:{
    		
		    handleCurrentChange(val) {
		        //console.log(`当前页: ${val}`);
		        this.pageNum =val;
		    },
		    handleCurrentChange2(val) {
		        //console.log(`当前页: ${val}`);
		        this.pageNum2 =val;
		    },
		    instas:function(){
    			this.isHide = !this.isHide;
    		},
    		bean(){
    			let vm =this
    			let pageNum = vm.pageNum || 1;
				let pageSize = vm.pageSize || 3;
    			axios.get(hostBean, //请求通知消息数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})
					).then((response) => {
						//console.log(response);
						vm.title = response.data.pageBean.page;
						vm.totalNum = response.data.pageBean.totalNum;
						//console.log(this.commint);
					})
					.catch((error) => {
						console.log(error);
					})
    		},
    		bean2(){
    			let vm =this
    			let pageNum = vm.pageNum2 || 1;
				let pageSize = vm.pageSize2 || 3;
    			axios.get(hostBeans, //请求系统通知数据列表
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})
					).then((response) => {
						console.log(response);
						vm.title2 = response.data.pageBean.page;
						vm.totalNum2 = response.data.pageBean.totalNum;
						//console.log(this.commint);
					})
					.catch((error) => {
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
  
</style>