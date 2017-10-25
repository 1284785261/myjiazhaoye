
<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <div id="office-history-meter-wrap">
          <Tabs type="card">
            <Tab-pane label="联合办公历史账单">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>办公室：</b>
                  <span>{{historyOfficeHouseNum}} {{historyOfficeWorkNum}}人间</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">&#45;&#45;</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >账单日期</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人手机号</th>
                  <th>租金（元）</th>
                  <th>服务费（元）</th>
                  <th>状态</th>
                </tr>
                <tr v-for="room in roomContractList">
                  <td>{{room.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td>{{room.cyclePayMoney}}</td>
                  <td>{{room.serviceCost}}</td>
                  <td>
                    <span v-if="room.billState == 1">待支付</span>
                    <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="room.billState == 3" style="color: red;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </Tab-pane>
          </Tabs>
        </div>

      </div>
      <footer-box></footer-box>
    </div>

  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {allCommunity,OfficeBillHistoryList500105} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
        activeTabName:"billManagement",
        RoomContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],//下拉选
        roomCommunity:-1,//当前选中
        roomContractList:[],//公寓合同数据
        roomTotalNum:0,//公寓合同总条数
        roomContractCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字
        officeId:null,
        historyOfficeHouseNum:"",
        historyOfficeWorkNum:"",
        communityName:""
      }
    },
    mounted(){
      this.historyOfficeHouseNum = sessionStorage.getItem('historyOfficeHouseNum');
      this.historyOfficeWorkNum = sessionStorage.getItem('historyOfficeWorkNum');
      this.communityName = sessionStorage.getItem('officeHistoryCommunityName');
      this.officeId = this.$route.query.officeId;
      this.getCommunityData();
      this.getRoomContract({officeId:this.officeId,pageNum:1});
    },
    methods: {
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomContractSelects = that.RoomContractSelects.concat(res.data.entity);
            }
          })
      },
      getRoomContract(data){
        var that = this;
        this.$http.get(OfficeBillHistoryList500105,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.roomContractList = pageBean.officeList;
              that.roomTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.roomContractList = [];
              that.roomTotalNum = 0;
            }
          })
      },
      roomSearch(page){
        var data = {
          pageNum:page || 1,
          officeId:this.officeId
        };
        this.getRoomContract(data);
      },
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

  #office-history-meter-wrap{
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
  }


</style>
