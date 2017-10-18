<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置: </span>
		          <router-link  class="active" to="/signed/houseState">佳里人</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>佳里人帖子管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="invitationlist">
		    		<div class="invitationlist1">
		    			<span>发布人：</span><el-input v-model="inputs" placeholder="请输入内容" class="fbr"></el-input>
		    			<span style="margin-left: 224px;">状态：</span>
		    			<el-select v-model="value" placeholder="全部">
						    <el-option
						      v-for="item in options"
						      :key="item.name"
						      :value="item.name">
						    </el-option>
						</el-select>
		    			<a>查询</a>
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
		    			<tr>
		    				<td><Checkbox @on-change="checkAllGroupChange2(item.sing,index)"></Checkbox></td>
		    				<td style="text-align: left;padding-left: 20px;">111</td>
		    				<td>111</td>
		    				<td>11</td>
		    				<td>11</td>
		    				<td>11</td>
		    			</tr>
		    		</table>
		    		<Checkbox v-model="single2" @click.prevent.native="handleCheckAll2" class="qux"></Checkbox><a class="dest">批量删除</a>
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
    import { hostPostList } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false,
    			currentPage3: 1,
    			communityId:null,
    			Datas:[],
    			single2:true,
    			totolNum:null,
    			pageNum:1,
          		host3:'',
          		inputs:'',
          		options: [{
          			name:'开放',
          			id:0
          		},{
          			name:'关闭',
          			id:1
          		}],
		        value: '',
		        pageSize:10
			}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		this.datas();
    	},
    	filters:{
    		
    	},
    	methods:{
		    handleCurrentChange(val) {
//		        console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.datas();
		    },
		    datas(){
		    	let pageNum = this.pageNum || 1;
		    	let param = new FormData();
		    	param.append('pageNum',pageNum);
		    	param.append('pageSize',this.pageSize);
		    	param.append('pageNum',pageNum);
		    	if(this.inputs != ''){
		    		param.append('userName',this.inputs);
		    	}
		    	axios.post(hostPostList, param).then((response)=>{
		    		console.log(response);
//		    		if(response.status == 200 && response.data.code == 10000){
//			    		this.Datas = response.data.entity.page;
//			    		this.totolNum = response.data.entity.totalNum;
//			    	}
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

</style>
