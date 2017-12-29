<template>
	<div>
		<menu-box  :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/houseState">公寓状态</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>住户列表</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="residentList">
		    		<div class="residentlist">
		    			<!--@click="daochu"-->
		    			<a  :href="host3">导出</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>序号</td>
		    				<td>姓名</td>
		    				<td>性别</td>
		    				<td>年龄</td>
		    				<td>电话</td>
		    				<td>当前租住</td>
		    				<td>租期</td>
		    			</thead>
		    			<tr v-for="(item,index) in Datas">
		    				<td>{{index+1}}</td>
		    				<td>{{item.user.userName}}</td>
		    				<td>{{item.user.gender | gender(item.user.gender)}}</td>
		    				<td>{{item.user.userBirthday | Birthday(item.user.userBirthday)}}岁</td>
		    				<td>{{item.user.userPhone}}</td>
		    				<td v-if="item.cxkjCommunityFloor != null ">{{ item.cxkjCommunityFloor.floorName }}层-{{ item.cxkjCommunityRoom.roomNum }}</td>
		    				<td v-else> -- </td>
		    				<td>{{item.beginDate | begin(item.beginDate)}}--{{item.endDate | end(item.endDate)}}</td>
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


			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/residentList.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostHousehold,hostdaocu,host } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				activeTabName:"workbench",
    			isHide:false,
    			currentPage3: 1,
    			communityId:null,
    			Datas:[],
    			totolNum:null,
    			pageNum:1,
          		host3:'',
          		pageSize:10
		   	}
    	},
    	mounted(){
        
    		this.communityId = this.$route.query.id;
    		this.host3 = host+'/cxkj-room/apis/pc/communityMgrDownload/CxkjCommunityHouseholdDownload200070?communityId='+this.communityId;
    		// console.log(this.communityId);
    		this.datas();
    	},
    	filters:{
    		begin(val){
		    	var date =new Date(val);
    			var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
		    },
		    end(val){
		    	var date =new Date(val);
    			var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
		    },
		    gender(val){
		    	if(val==1){
		    		return '男'
		    	}
		    	else if(val == 2){
		    		return '女'
		    	}
		    },
		    Birthday(val){
		    	var date = new Date(val);
		    	var date2 = new Date();
		    	var dates = parseInt((date2.getTime() - date.getTime())/1000);
		    	var year = Math.floor(dates/ 86400 /365);
		    	return year;
		    }
    	},
    	methods:{
		    handleCurrentChange(val) {
		        // console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.datas();
		    },
		    datas(){
		    	let pageNum = this.pageNum || 1;
		    	axios.post(hostHousehold,
		    		qs.stringify({
		    			communityId:this.communityId,
		    			pageNum: pageNum,
		    			pageSize:this.pageSize
		    		}))
		    	.then((response)=>{
		    		// console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.entity.page;
			    		this.totolNum = response.data.entity.totalNum;
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

</style>
