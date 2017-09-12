<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：工作台 ></span>
          <router-link  class="active" to="/apartment/communityManagement">办公空间状态</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>办公空间状态</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="workstate">
        	<div class="workstate1">
        		<div class="stateId">
        			<p>工位</p>
        			<p>100元/个·天</p>
        		</div>
        		<ul class="riqi">
        			<li><i class="el-icon-caret-left"></i></li>
        			<li><a>7月6日</a></li>
        			<li><a>今天</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><i class="el-icon-caret-right"></i></li>
        		</ul>
        		<table>
        			<tr>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        			</tr>
        			<tr>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        			</tr>
        			<tr>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        			</tr>
        			<tr>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        			</tr>
        			<tr>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        				<td>喜洋洋</td>
        			</tr>
        		</table>
        	</div>
        	<div class="workstate2">
        		<div class="stateId">
        			<p>会议室</p>
        		</div>
        		<ul class="riqi">
        			<li><i class="el-icon-caret-left"></i></li>
        			<li><a>7月6日</a></li>
        			<li><a>今天</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><a>7月6日</a></li>
        			<li><i class="el-icon-caret-right"></i></li>
        		</ul>
        		<ul class="datas">
        			<li>09:00</li>
        			<li>10:00</li>
        			<li>11:00</li>
        			<li>12:00</li>
        			<li>13:00</li>
        			<li>14:00</li>
        			<li>15:00</li>
        			<li>16:00</li>
        			<li>17:00</li>
        			<li>18:00</li>
        			<li>19:00</li>
        		</ul>
        		<ul class="gw">
        			<li>
        				<span>301<i>4人间</i></span>
        				<p>200元/时</p>
        			</li>
        			<li>
        				<span>301<i>4人间</i></span>
        				<p>200元/时</p>
        			</li>
        			<li>
        				<span>301<i>4人间</i></span>
        				<p>200元/时</p>
        			</li>
        			<li>
        				<span>301<i>4人间</i></span>
        				<p>200元/时</p>
        			</li>
        		</ul>
        		<ul class="huiyi">
        			<li>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        			</li>
        			<li>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        			</li>
        			<li>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        			</li>
        			<li>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        				<p>叶晓婷</p>
        			</li>
        		</ul>
        	</div>
        	<div class="workstate3">
        		<div class="stateId">
        			<p>办公室</p>
        		</div>
        		<ul class="detals">
        			<li v-for="administ in administrationoffice">
        				<div>
	        				<span>{{administ.officeHouseNum}}</span>
	        				<span>{{administ.officeWorkNum | officeWorkNum}}</span>
	        				<span>{{administ.officeRent | officeRent}}</span>
	        				<p>欠房租三天</p>
	        				<p v-if="administ.cxkjContractSign != null">租期:{{administ.cxkjContractSign.beginDate | beginDate}}-{{administ.cxkjContractSign.endDate | endDate}}</p>
	        				<p v-else></p>
        				</div>
        				<p class="peiz" v-if="administ.cxkjContractSign != null && administ.officeStatus == 2">
        					{{administ.cxkjContractSign.user.userName}}    {{administ.cxkjContractSign.user.userPhone}}
        					<span>{{administ.cxkjContractSign.companyInfo}}</span>
        				</p>
        				<p class="peiz peiz1" v-else-if="administ.officeStatus == 0">配置中</p>
        				<p class="peiz peiz2" v-else-if="administ.officeStatus == 1">待出租</p>
        			</li>
        			
        		</ul>
        	</div>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
  </div>

</template>

<script>
  import '../../sass/style/workState.css';
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import axios from 'axios';
  import { hostStatus } from '../api.js';
  import qs from 'qs';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        numberLine:1,
        value:"",
        rootValue:"",
        options: [{
          value: '选项1',
          label: '1室'
        }, {
          value: '选项2',
          label: '2室'
        }, {
          value: '选项3',
          label: '3室'
        }, {
          value: '选项4',
          label: '4室'
        }, {
          value: '选项5',
          label: '5室'
        }],
        modal1: false,
        modal2: false,
        modal3: false,
        modal_loading: false,
        vertical: 'count',
        communityId:null,
        station:null, //工位数据
        conferenceroom:null,  //会议室数据
        administrationoffice:null   //办公室数据
      }
    },
    filters:{
    	officeWorkNum(val){
    		if(val != null){
    			return val+'人间'
    		}
    		else{
    			return false
    		}
    	},
    	officeRent(val){
    		if(val != null){
    			return '￥'+val.toFixed(2)+'/月'
    		}
    	},
    	beginDate(val){
    		var date = new Date(val);
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    	},
    	endDate(val){
    		var date = new Date(val);
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    	}
    },
    mounted(){
    	this.communityId = this.$route.query.id;
    	this.datas();
    	this.Open(val);
    },
    methods:{
      del () {
        this.modal1 = false;
      },
      del2 () {
        this.modal2 = false;
      },
      del3 () {
        this.modal3 = false;
      },
      datas(){
      	let vm = this
      	axios.post(hostStatus,
      		qs.stringify({
      			communityId:this.communityId
      		})
      	).then((response)=>{
      		console.log(response);
      		if(response.status == 200 && response.data.code == 10000){
      			vm.station = response.data.entity.cxkjCommunityListPlace;
      			vm.conferenceroom=response.data.entity.cxkjCommunityListMeeting;
      			vm.administrationoffice = response.data.entity.cxkjCommunityListOffice;
      			console.log(vm.station);
      			console.log(response.data.entity.cxkjCommunityListPlace);
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>
