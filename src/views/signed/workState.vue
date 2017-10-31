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
          <span>{{Name}}</span>
        </div>
        <div id="workstate">
        	<div class="workstate1">
        		<div class="stateId">
        			<p>工位</p>
        			<p>100元/个·天</p>
        		</div>
        		<i class="el-icon-caret-left" @mousedown="lefts($event)"></i>
        		<div id="mmmm">
        			
	        		<ul id="riqi">
	        			
	        			<li v-for="(item,index) in 15"><a :class="{'tbe':isAicat == index}" @click="violence($event,index)">{{date(item-2)}}</a></li>
	        		</ul>
	        		
        		</div>
        		<i class="el-icon-caret-right" @mousedown="rights($event)"></i>
        		<ul class="gongwei">
        			<li>
        				<span v-for="item in gongweis" :class="{'tms':item.value != ''}">{{item.value}}</span>
        			</li>
        		</ul>
        	</div>
        	<div class="workstate2">
        		<div class="stateId">
        			<p>会议室</p>
        		</div>
        		<i class="el-icon-caret-left" @mousedown="lefts2($event)"></i>
        		<div id="vvvv">
	        		<ul id="riqi2">
	        			<li v-for="(item,index) in 15"><a :class="{'tbe':isAicat2 == index}" @click="bomb($event,index)">{{date(item-2)}}</a></li>
	        		</ul>
        		</div>
        		<i class="el-icon-caret-right" @mousedown="rights2($event)"></i>
        		<ul class="datas">
        			<li v-for="item in dilemma">{{item}}</li>
        		</ul>
        		
        		<ul class="gw">
        			<li v-for="item in conferenceroom">
        				<span>{{item.meetingHouseNum}}<i>{{item.meetingPersonNum}}人间</i></span>
        				<p>{{item.meetingRent}}元/时</p>
        			</li>
        			
        		</ul>
        		<ul class="huiyi">
        			<li v-for="item in conferenceroom">
        				<p v-if="item.cxkjOfficeOrderList.length != 0" v-for="ite in item.cxkjOfficeOrderList" :style="{left:(ite.cxkjOfficeOrderDetails.beginHour-9)*100 +'px',width:(ite.cxkjOfficeOrderDetails.endHour-ite.cxkjOfficeOrderDetails.beginHour)*100+'px'}">{{ite.userName}}</p>
        				<p v-else></p>
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
	        				<p v-if="administ.cxkjContractSign != null">{{administ.cxkjContractSign.rentArrears | rentArrears}}</p>
	        				<p v-else></p>
	        				<p v-if="administ.cxkjContractSign != null">租期: {{administ.cxkjContractSign.beginDate | beginDate}} - {{administ.cxkjContractSign.endDate | endDate}}</p>
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
  import { hostStatusPl,hostStatusMe,hostStatusof } from '../api.js';
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
        communityId:null,
        station:null, //工位数据
        conferenceroom:null,  //会议室数据
        administrationoffice:null,   //办公室数据
        isAicat:'1',
        isAicat2:'1',
        gongweis:[],  //所有工位的数据
       	dilemma:[],  //日期时刻
       	days:'',   //工位当前日期
       	days2:'',   //会议室当前日期
       	Name:''
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
    	},
    	rentArrears(val){
    		return '已欠租'+ val +'天';
    	}
    },
    mounted(){
    	this.communityId = this.$route.query.id;
    	this.Name = this.$route.query.Name;
    	this.datas();
    	this.datam();
    },
    methods:{
    	datam(){    //生成日期时间刻
    		for(var i=9;i<=19;i++){
    			this.dilemma.push( i + ':00');
    		}
    		//console.log(this.dilemma);
    	},
      datas(){   //进入页面获取今天的所有数据
      	let vm = this
      	axios.post(hostStatusPl,
      		qs.stringify({
      			communityId:this.communityId          //工位数据
      		})
      	).then((response)=>{
      		console.log(response);
      		if(response.status == 200 && response.data.code == 10000){
    				vm.station = response.data.entity;
//    			vm.conferenceroom=response.data.entity.cxkjCommunityListMeeting;
//    			vm.administrationoffice = response.data.entity.cxkjCommunityListOffice;
//    			//console.log(vm.conferenceroom);
      			for(let i=0;i<vm.station.placeNum;i++){
      				this.gongweis.push({value:''});
      			}
      			for(let i=0;i<vm.station.cxkjOfficeOrderList.length;i++){
      				this.gongweis[i].value = this.station.cxkjOfficeOrderList[i].userName;
      			}
//    			console.log(this.gongweis);
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
      	
      	
      	axios.post(hostStatusMe,          //会议室数据
      		qs.stringify({          
      			communityId:this.communityId
      		})
      	).then((response)=>{
      		//console.log(response);
      		if(response.status == 200 && response.data.code == 10000){
      			vm.conferenceroom=response.data.entity;
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
      	axios.post(hostStatusof,          //办公室数据
      		qs.stringify({
      			communityId:this.communityId
      		})
      	).then((response)=>{
      		//console.log(response);
      		if(response.status == 200 && response.data.code == 10000){
      			vm.administrationoffice = response.data.entity;
      		}
      	})
      	.catch((error)=>{          
      		console.log(error);
      	})
      },
      violence(event,index){
      	let e = event.target          //选择日期刷新工位数据
      	let vm = this
      	this.station=null;
				
      	this.gongweis = [];
      	this.isAicat = index;
      	let dd = new Date()
      	let year = dd.getFullYear();
      	let m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
      	if(index == 1){
      		e.innerHTML = '今天'
      	}
      	if(e.innerHTML == '今天' && index == 1){
      		this.days = year +'-'+m +'-'+d
      	}else{
	      	let tims = year+'年'+e.innerHTML;
	      	tims = tims.replace(/年|月|日/g,'-');
	      	tims = tims.substring(0,tims.length - 1);
	      	this.days = tims;
      	}
      	//console.log(this.days);
      	if(index == 1){
      		e.innerHTML = '今天'
      	}
      	axios.post(hostStatusPl,
      		qs.stringify({
      			communityId:this.communityId,
      			scheduledPlaceDate:this.days
      		})
      	)
      	.then((response)=>{
      		//console.log(response);  
      		if(response.status == 200 && response.data.code == 10000){
      			vm.station = response.data.entity;
      			for(let i=0;i<vm.station.placeNum;i++){
      				this.gongweis.push({value:''});
      			}
      			for(let i=0;i<vm.station.cxkjOfficeOrderList.length;i++){
      				this.gongweis[i].value = this.station.cxkjOfficeOrderList[i].userName;
      			}
      			//console.log(vm.station);
//    			console.log(this.gongweis);
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
      },
      bomb(event,index){
      	this.isAicat2 = index;       //选择办公室会议数据展示
      	let e = event.target          
      	let vm = this
      	vm.conferenceroom =null 
      	let dd = new Date()
      	let year = dd.getFullYear();
      	let m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
      	if(index == 1){
      		e.innerHTML = '今天'
      	}
      	if(e.innerHTML == '今天' && index == 1){
      		this.days2 = year +'-'+m +'-'+d
      	}else{
      	let tims = year+'年'+e.innerHTML;
      	this.conferenceroom = null;
				tims = tims.replace(/年|月|日/g,'-');
      	tims = tims.substring(0,tims.length - 1);
      	this.days2 = tims;
      	}
				//console.log(this.days2)
      	axios.post(hostStatusMe,
      		qs.stringify({
      			communityId:this.communityId,
      			ScheduledMeetingDate:this.days2
      		})
      	)
      	.then((response)=>{
      	//console.log(response);  
      		if(response.status == 200 && response.data.code == 10000){
      			vm.conferenceroom = response.data.entity;
      			//console.log(vm.conferenceroom);
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
      },
      date(AddDayCount){//设置时间显示
        let dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        let y = dd.getFullYear();
        let m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
        if(AddDayCount == 0){
          this.day = m+"-"+d
          this.days =y+ '-' +this.day
          this.days2 = y+ '-' +this.day
          return '今天'
        }
        return  m+"月"+d+'日';
      },
      rights(e){      //工位向右滑动按钮
	      	var listu = document.getElementById('riqi');
	      	var list = listu.getElementsByTagName('li');
      		var dis  = listu.offsetLeft + 150;
      		listu.style.left  = dis + 'px';
      		if(parseInt(listu.style.left)>-20){
      			dis = listu.offsetLeft;
      			listu.style.left =  0 +'px';
      		}
      },
      lefts(e){       //工位向左滑动按钮
      		var listu = document.getElementById('riqi');
	      	var list = listu.getElementsByTagName('li');
      		var dis  = listu.offsetLeft - 150;
      		listu.style.left  = dis + 'px';
      		if(parseInt(listu.style.left)<=-1160){
      			dis = listu.offsetLeft;
      			listu.style.left =  -1160 +'px';
      		}
      },
      rights2(e){      //会议室向右滑动按钮
	      	var listu = document.getElementById('riqi2');
	      	var list = listu.getElementsByTagName('li');
      		var dis  = listu.offsetLeft + 150;
      		listu.style.left  = dis + 'px';
      		if(parseInt(listu.style.left)>-20){
      			dis = listu.offsetLeft;
      			listu.style.left =  0 +'px';
      		}
      },
      lefts2(e){       //会议室向左滑动按钮
      		var listu = document.getElementById('riqi2');
	      	var list = listu.getElementsByTagName('li');
      		var dis  = listu.offsetLeft - 150;
      		listu.style.left  = dis + 'px';
      		if(parseInt(listu.style.left)<=-830){
      			dis = listu.offsetLeft;
      			listu.style.left =  -830 +'px';
      		}
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>
