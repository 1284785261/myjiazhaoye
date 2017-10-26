<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置: </span>
		          <router-link  class="active" to="/Patanjali/invitationlist">佳里人</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>佳里人帖子管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="invitationlist">
		    		<div class="invitationlist1">
		    			<span>发布人：</span><el-input v-model="inputs" placeholder="请输入发布人" class="fbr"></el-input>
		    			<span style="margin-left: 224px;">状态：</span>
		    			<el-select v-model="value" placeholder="请选择" @change="types(value)">
						    <el-option
						      v-for="item in options"
						      :key="item.name"
						      :value="item.name">
						    </el-option>
						</el-select>
		    			<a @click="demand">查询</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td width="60px">选择</td>
		    				<td style="text-align: left;padding-left: 20px;">帖子内容</td>
		    				<td>发布人</td>
		    				<td>发布日期</td>
		    				<td>状态</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr v-for="item in Datas">
		    				<td><Checkbox v-model="item.sing"  @on-change="checkAllGroupChange2(item.sing)"></Checkbox></td>
		    				<td style="text-align: left;padding-left: 20px;">{{item.content}}</td>
		    				<td>{{item.userAliase}}</td>
		    				<td>{{item.createTime | time}}</td>
		    				<td style="color: #ff6612;">{{item.isClose | isClose}}</td>
		    				<td>
		    					<a v-if="item.isClose == 0" @click="close(item)">关闭</a>
		    					<a v-else-if="item.isClose == 1">开放</a>
		    				</td>
		    			</tr>
		    		</table>
		    		<Checkbox v-model="single2" @click.prevent.native="handleCheckAll2" class="qux"></Checkbox>
		    		<a class="dest" :disabled="disabled" @click="destidl">批量删除</a>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size=pageSize
				      layout="prev, pager, next,total,jumper"
				      :total=totolNum>

				    </el-pagination>

		    	</div>


			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/invitation.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostPostList,hostOpenAllPost } from '../api.js';
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
    			communityId:null,
    			Datas:[],
    			single2:false,
    			sings: true,
    			totolNum:null,
    			pageNum:1,
          		inputs:null,
          		options: [{
          			name:'全部',
          			id:-1
          		},{
          			name:'开放',
          			id:0
          		},{
          			name:'关闭',
          			id:1
          		}],
		        value: '全部',
		        pageSize:10,
		        State:null,
		        disabled:true,
		        postIdArray:[]
			}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		this.datas();
    	},
    	filters:{
    		time(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
			},
			isClose(val){
				if(val == 0){
					return '开放'
				}else if(val == 1){
					return '关闭'
				}
			}
    	},
    	methods:{
		    handleCurrentChange(val) {
//		        console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.demand();
		    },
		    datas(){
		    	let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);
		    	axios.post(hostPostList, param).then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.pageBean.page;
			    		this.totolNum = response.data.pageBean.totalNum;
			    		for(let i = 0; i < this.Datas.length; i++) {
							this.$set(this.Datas[i], "sing", false);
						}
			    		console.log(this.Datas);
			    	}
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		  	},
		  	types(value){
		  		this.State = this.options[this.options.findIndex(item => item.name == value)].id;
		  	},
		  	demand(){
		  		let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);
		    	if(this.inputs){
		    		param.append('userName',this.inputs);
		    	}
		    	if(this.State){
		    		param.append('isClose',this.State);
		    	}
		    	console.log(this.State);
		    	axios.post(hostPostList, param).then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.pageBean.page;
			    		this.totolNum = response.data.pageBean.totalNum;
			    		for(let i = 0; i < this.Datas.length; i++) {
							this.$set(this.Datas[i], "sing", false);
						}
			    	}
		    		else{
		    			this.Datas = [];
		    			this.totolNum = 0
		    		}
		    	})
		    	.catch((error)=>{
		    		console.log(error);
		    	})
		  	},
		  	checkAllGroupChange2(value){
		  		var flag = true;
		  		
		  		for(let i = 0;i<this.Datas.length;i++){
		  			if(this.Datas[i].sing != this.sings) {
						flag = false;
						break;
					}
		  		}
		  		if(this.Datas.length){
		  			this.single2 = flag;
		  			this.disabled = !this.disabled;
		  		}else {
		  			this.single2 = false;
		  		}
		  	},
		  	handleCheckAll2() { //全选
				this.single2 = !this.single2;
				this.disabled = !this.disabled;
				if(this.single2 == true) {
					for(let i = 0; i < this.Datas.length; i++) {
						this.$set(this.Datas[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.Datas.length; i++) {
						this.$set(this.Datas[i], "sing", false);
					}
				}

			},
			destidl(){
				console.log(1111111111);
			},
			close(item){
				console.log(item);
				if(item.isClose == 0){
					this.postIdArray.push(item.postId);
					console.log(this.postIdArray);
					axios.get(hostOpenAllPost,
						{
							postIdArray:this.postIdArray,
							isclose:1
						}
					).then((res)=>{
						console.log(res);
						if(res.status == 200 && res.data.code == 10000) {
							
						}
					}).catch((err)=>{
						console.log(err);
					})
				}
				else if(item.isClose == 1){
					this.postIdArray.push(item.postId);
					axios.get(hostOpenAllPost,
						{
							postIdArray:this.postIdArray,
							isclose:0
						}
					).then((res)=>{
						console.log(res);
						if(res.status == 200 && res.data.code == 10000) {
							
						}
					}).catch((err)=>{
						console.log(err);
					})
				}
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
