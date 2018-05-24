<template>
	<div>
		<menu-box  :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<!-- <div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/houseState">公寓状态</router-link>
		        </div> -->
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>住户列表</h3>
		          <!-- <span>佳兆业航运WEWA空间</span> -->
		        </div>
		    	<div id="shortresident">
		    		<div class="shortresident">
		    			<a  :href="host3">导出</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>序号</td>
		    				<td>姓名</td>
		    				<td>性别</td>
							<td>年龄</td>
		    				<td>电话</td>
		    				<td>入住时间</td>
		    				<td>离店时间</td>
							<td>房号</td>
		    			</thead>
		    			<tr v-for="(item,index) in Datas">
		    				<td>{{index+1}}</td>
		    				<td>{{item.name}}</td>
		    				<td>{{item.gender | gender}}</td>
							<td>{{item.age}}</td>
		    				<td>{{item.phone}}</td>
		    				<td>{{item.inTime | begin}}</td>
		    				<td>{{item.leaveTime | begin}}</td>
							<td>{{item.roomNum}}</td>
		    			</tr>
		    		</table>
		    		<el-pagination @current-change="handleCurrentChange" :current-page="currentPage3" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total="totalNum">
				    </el-pagination>

		    	</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/shortresident.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { RoomieList300231,host } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				activeTabName: "shortRent",
    			isHide:false,
    			currentPage3: 1,
    			communityId:null,
    			Datas:[],
    			totalNum:0,
    			pageNum:1,
          		host3:'',
          		pageSize:10
		   	}
    	},
    	mounted(){
        
			this.communityId = this.$route.query.id;
			this.host3 = host+'/cxkj-pms/apis/pc/pmsorderroomie/CxkjDownloadRoomieList300232?communityId='+this.communityId;
    		this.datas();
    	},
    	filters:{
    		begin(val){
		    	var date =new Date(val);
    			var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
		    },
		    gender(val){
		    	if(val==1){
		    		return '男'
		    	}
		    	else if(val == 0){
		    		return '女'
		    	}
		    },
    	},
    	methods:{
		    handleCurrentChange(val) {
				this.host3 = host+'/cxkj-pms/apis/pc/pmsorderroomie/CxkjDownloadRoomieList300232?communityId='+this.communityId;
				this.pageNum = val;
				this.host3 += '&pageNum='+ this.pageNum;
				this.datas();
		    },
		    datas(){
		    	let pageNum = this.pageNum || 1;
		    	axios.post(RoomieList300231,
		    		qs.stringify({
		    			communityId:this.communityId,
		    			pageNum: pageNum,
		    			pageSize:this.pageSize
		    		}))
		    	.then((response)=>{
		    		console.log(response);
		    		if(response.status == 200 && response.data.code == 10000){
			    		this.Datas = response.data.pageBean.page;
			    		this.totalNum = response.data.pageBean.totalNum;
			    	}
		    	})
		    	.catch((error)=>{
		    		// console.log(error);
		    	})
		  	}

    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

</style>
