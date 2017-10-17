<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">看房预约</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>看房预约</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="housesubscribe">
		    		<div class="housesubscribe1">
		    			<span class="bsc">预约时间：</span>
		    			<Date-picker type="date" placeholder="请选择日期" v-model="beginDate" class="mvs"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="endDate" class="mvs"></Date-picker>
						<span class="bsc">看房时间：</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev" v-model="visitBeginDate"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev" v-model="visitEndDate"></Date-picker>
            <div class="form-search">
              <i class="iconfont icon-sousuo"></i>
              <Input v-model="keyWord" placeholder="搜索联系人或联系电话"></Input>
              <input type="button" value="搜索" @click="handleCurrentChange()">
            </div>
		    		</div>
		    		<table class="yuyue-table">
		    			<thead>
		    				<td>预约时间</td>
		    				<td>联系人姓名</td>
		    				<td>手机号码</td>
		    				<td>看房时间</td>
		    				<td>已选户型</td>
		    				<td>接待管家</td>
		    				<td>状态</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr v-for="(item,index) in appointmentListData">
		    				<td>{{item.createTime | timefilter("yyyy-MM-dd")}}</td>
		    				<td>{{item.userName}}</td>
		    				<td>{{item.userPhone}}</td>
		    				<td>{{item.appointmentDate | timefilter("yyyy-MM-dd hh:mm")}}</td>
		    				<td>{{item.buildingType}}</td>
		    				<td>{{item.managerUserName}}</td>
		    				<td>
                  <span v-if="item.appointmentStatus ==0">未分配</span>
                  <span v-if="item.appointmentStatus ==1" style="color: #3dc4b2;">已分配</span>
                  <span v-if="item.appointmentStatus ==2" style="color: red;">未签约</span>
                  <span v-if="item.appointmentStatus ==3" style="color: #ccc;">已签约</span>
                  <span v-if="item.appointmentStatus ==4">已取消</span>
                </td>
		    				<td>
                  <a v-if="item.appointmentStatus ==0" @click="receive(item.appointmentId)">我要接待</a>
                  <a @click="reception(item.appointmentId)" v-if="item.appointmentStatus ==1">确认接待</a>
                  <a v-if="item.appointmentStatus ==1">立即签约</a>
                  <a v-if="item.appointmentStatus ==3">查看合同</a>
                  <a v-if="item.appointmentStatus ==2 ||　item.appointmentStatus ==3">查看详情</a>
                </td>
		    			</tr>
		    		</table>
            <div class="blank-background-img" v-if="appointmentTotalNum == 0">
              <img src="../../../static/images/blank/order_space.png" >
              <h2>暂无看房预约~</h2>
            </div>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size="10"
				      layout="prev, pager, next,total,jumper"
				      :total="appointmentTotalNum" v-if="appointmentTotalNum > 0">
				    </el-pagination>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="scherm" v-show="ishide">

		</div>
		<div class="instas4" v-show="ishide2">
			<i class="el-icon-circle-close" @click="closeReception"></i>
			<p>接待反馈</p>
			<table>
				<tr>
					<td><span>客户意向：</span></td>
					<td>
						<el-radio class="radio" v-model="userIntention" label="0">考虑中</el-radio>
            <el-radio class="radio" v-model="userIntention" label="1">不考虑</el-radio>
					</td>
				</tr>
				<tr>
					<td><span class="lov">原因：</span></td>
					<td>
						<textarea v-model="reason"></textarea>
					</td>
				</tr>
			</table>
			<a @click="sureReception()" class="tjss">确定</a>
		</div>
		<div class="popup" v-show="ishide3">
			<i class="el-icon-circle-close" @click="adddian2"></i>
			<p>预约详情</p>
			<div>
				<span>2017年5月18日</span>
				<span>已签约</span>
			</div>
			<table>
				<tr>
					<td>联系人：</td>
					<td>欧阳小溪</td>
				</tr>
				<tr>
					<td>联系电话：</td>
					<td>1564651651 <Icon type="ios-telephone"></Icon></td>
				</tr>
				<tr>
					<td>已选户型：</td>
					<td>标准大标间</td>
				</tr>
				<tr>
					<td>用户留言：</td>
					<td>欧阳小溪</td>
				</tr>
				<tr>
					<td>预约看房时间：</td>
					<td>2017-08-15 </td>
				</tr>
			</table>
			<span class="xuxian"></span>
			<table>
				<tr>
					<td>接待管家：</td>
					<td>1111</td>
				</tr>
				<tr>
					<td>已签约：</td>
					<td>1111 201</td>
				</tr>
				<tr>
					<td>签约时间：</td>
					<td>1111</td>
				</tr>
			</table>
			<a class="cha">查看合同</a>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/housesubscribe.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import  successModal from '../../components/successModal.vue';
    import axios from 'axios';
    import { hostHousehold,appointmentList,feedBack,receive } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
        successModal
    	},
    	data(){
    		return{
          activeTabName:"workbench",
          currentPage3: 1,
          userIntention: '0',
          reason:"",
          ishide:false,
          ishide2:false,
          ishide3:false,
          appointmentListData:[],
          appointmentTotalNum:0,
          beginDate:"",
          endDate:"",
          visitBeginDate:"",
          visitEndDate:"",
          keyWord:"",
          appointmentId:"",
          successMessage:"接待成功!",
          successModal:false,
          activePage:1,
		   	}
    	},
    	mounted(){
        this.getAppointmentList({pageNum:1});
    	},
    	methods:{
        getAppointmentList(data){
          var that = this;
          this.$http.get(appointmentList,{params:data})
            .then(function(res){debugger
              if(res.status == 200 && res.data.code == 10000){
                var pageBean = res.data.pageBean;
                that.appointmentListData = pageBean.page;
                that.appointmentTotalNum = pageBean.totalNum;
              }
              if(res.data.code == 10008){
                that.appointmentListData = [];
                that.appointmentTotalNum = 0;
              }
            })
        },
        reception(appointmentId){
          this.appointmentId = appointmentId
          this.ishide = ! this.ishide;
          this.ishide2 = ! this.ishide2;
        },
        sureReception(){
          var that = this;
          this.$http.post(feedBack,qs.stringify({appointmentId:this.appointmentId,reason:this.reason,userIntention:this.userIntention}))
            .then(function(res){debugger
              if(res.status == 200 && res.data.code == 10000){
                that.ishide = ! that.ishide;
                that.ishide2 = ! that.ishide2;
                that.successMessage = "接待反馈成功！";
                that.successModal = true;
                setTimeout(function(){
                  that.successModal = false;
                },1000);
                that.handleCurrentChange({pageNum:that.activePage});
              }

            })
        },
        closeReception(){
          this.ishide = ! this.ishide;
          this.ishide2 = ! this.ishide2;
        },
        receive(appointmentId){
          var that = this;
          this.$http.post(receive,qs.stringify({appointmentId:appointmentId}))
            .then(function(res){
              if(res.status == 200 && res.data.code == 10000){
                that.successMessage = "接待成功！";
                that.successModal = true;
                setTimeout(function(){
                  that.successModal = false;
                },1000);
                that.handleCurrentChange({pageNum:that.activePage});
              }
            })
        },

        adddian2(){
          this.ishide = ! this.ishide;
          this.ishide3 = ! this.ishide3;
        },
        handleCurrentChange(page){
          var data = {
            pageNum:page || 1
          }
          if(page){
              this.activePage = page;
          }
          if(this.beginDate){
            data.beginDate = new Date(this.beginDate).Format("yyyy-MM-dd");
          }
          if(this.endDate){
            data.endDate = new Date(this.endDate).Format("yyyy-MM-dd");
          }
          if(this.visitBeginDate){
            data.visitBeginDate = new Date(this.visitBeginDate).Format("yyyy-MM-dd");
          }
          if(this.visitEndDate){
            data.visitEndDate = new Date(this.visitEndDate).Format("yyyy-MM-dd");
          }
          if(this.keyWord){
              data.keyWord = this.keyWord;
          }
          this.getAppointmentList(data);
        }
    	},
      filters:{
        timefilter(value,format){
          if(value){
            return new Date(value).Format(format)
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
  #housesubscribe{
    .ivu-icon-ios-calendar-outline{
      color:#038be2;
      font-family: "iconfont" !important;
      font-size: 18px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before{
        content: "\e60c";
      }
    }
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
    .form-search{
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 50px;
      display: inline-block;
      .ivu-input-wrapper{
        width: auto;
      }
      input[type="text"]{
        width: 208px;
        height: 36px;
        border-radius: 0;
        padding-left: 30px;
      }
      i{
        position: absolute;
        left: 5px;
        top: 7px;
        z-index: 99;
        font-size: 18px;
        color: #999;
      }
      input[type=button]{
        width: 70px;
        text-align: center;
        height: 36px;
        line-height: 36px;
        background-color: #038be2;
        color:#fff;
        border:none;
        position: relative;
        left: -5px;
        top: 2px;
      }
    }
  }
</style>
