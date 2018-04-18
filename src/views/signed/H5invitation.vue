
<template>
  <div>
    <!--<menu-box :active-tab-name="room"></menu-box>-->
    <!--<div class="right-content" id="right-content">-->
      <!--<right-header></right-header>-->
      <!--<div class="wordbench-box">-->
        <!--<div class="ivu-site">-->
          <!--<span>您现在的位置：</span>-->
          <!--<router-link  class="active" to="/apartment/communityManagement">H5邀请</router-link>-->
        <!--</div>-->
        <div id="invite-index-wrap">
          <!--<Tabs type="card">-->
            <!--<Tab-pane label="H5邀请">-->
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" :options="option4" placeholder="选择日期" v-model="startDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option1" placeholder="选择日期" v-model="endDate"></Date-picker>
                  <a class="soum" @click="getInviteRecord">搜索</a>
                </div>
                
                <!-- <div class="form-item">
                  <Button style="width: 120px;height: 35px;" @click="daochu()">导出</Button>
                </div> -->
              </div>
              <table class="table ivu-table" v-if="inviteRecordList">
                <tr>
                    <th>序号</th>
                    <th>预约社区</th>
                    <th>预约用户名</th>
                    <th>预约手机号码</th>
                    <th>首次预约时间</th>
                    <th>最后预约时间</th>
                </tr>
                <tr v-for="(item,index) in inviteRecordList">
                    <td>{{index+1}}</td>
                    <td>{{item.type?item.type:'成都邀请函'}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.userPhone}}</td>
                    <td>{{item.createtime|timefilter("yyyy-MM-dd hh:mm")}}</td>
                    <td>{{item.newtime|timefilter("yyyy-MM-dd hh:mm")}}</td>
                </tr>
              </table>
              
              <!-- <Page :total="inviteRecordNum" :current="inviteRecordCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="inviteRecordNum > 0"></Page> -->
              <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
					    </el-pagination>
            <!--</Tab-pane>-->
            <div class="blank-background-img" v-if="!inviteRecordList.length">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无邀请记录~</h2>
            </div>
          <!--</Tabs>-->
        </div>

      </div>
      <!--<footer-box></footer-box>-->
    <!--</div>-->

  <!--</div>-->

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import axios from 'axios';
  import {propertyContract,CxkjInviteFriendList300139,H5User200205} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      let _this = this;
      return {
        activeTabName:"room",
        currentPage:1,
        inviteRecordList:[],//公寓合同数据
        inviteRecordNum:0,//公寓合同总条数
        inviteRecordCurrent:1,//公寓合同当前页
        startDate:"",//公寓签约开始时间
        endDate:"",//公寓签约结束时间
        invitePhoneKey:"",//公寓搜索关键字
        pageSize:10,
        totalNum:0,
        pageNum:1,
        option1: {
          disabledDate (date) {
            return date && date.valueOf() < _this.startDate;
          }
        },
        option4: {
          disabledDate(date){
            if(_this.endDate){
              return date &&  _this.endDate < date.valueOf();
            }
          }
        },
      }
    },
    mounted(){
      this.getInviteRecord();
    },
    methods: {
      getInviteRecord(){
        var that = this;
        let param = new FormData();
        if(this.pageNum != 0){
          param.append('pageNum',this.pageNum);
        }
        param.append('pageSize',this.pageSize);
        if(this.startDate){
          let startDate = new Date(this.startDate).Format("yyyy-MM-dd");
          param.append('startDate',startDate);
        }
        if(this.endDate){
          let endDate = new Date(this.endDate).Format("yyyy-MM-dd");
          param.append('endDate',endDate);
        }
        axios.post(H5User200205, param).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.inviteRecordList = res.data.entity.page;
              that.totalNum = res.data.entity.totalNum;
              // console.log(that.inviteRecordList);
            }
            else{
              that.inviteRecordList = [];
              that.totalNum = 0;
            }
          })
      },
      handleCurrentChange(val){
          this.pageNum = val;
          this.getInviteRecord();
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
  @import '../../sass/page/_communityManagement.scss';

  #invite-index-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
    }
    .form-item .add{
      display: inline-block;
      width: 140px;
      height: 34px;
      border-radius: 5px;
      border: 1px solid #038be2;
      text-align: center;line-height: 34px;
      font-size: 12px;
      font-weight: bold;
      span{
        font-size:16px;
      }
    }
    table{
      tr{
        td,th{
          text-align: center;
        }
      }
    }
    .ivu-tabs-bar{
      background-color: rgb(240,240,240);
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
    .soum{
      display: inline-block;
      cursor: pointer;
      width: 98px;
      height: 36px;
      border: 1px solid #329cf6;
      color: #329cf6;
      font-size: 16px;
      text-align: center;
      line-height: 34px;
      border-radius: 5px;
      margin-left: 20px;
    }
    .el-pagination {
      width: 100%;
      text-align: center;
      margin-top: 100px;
    }

    .el-pagination .el-pager .number {
      margin: 0 5px;
      border: 1px solid #DCDCDC;
    }
    .el-pagination button {
      border: 1px solid #DCDCDC;
    }
  }

  .zhezhao{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #666;
    opacity: 0.5;
    z-index: 999;
  }

</style>
