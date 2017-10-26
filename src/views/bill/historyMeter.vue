
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
        <div id="history-meter-wrap">
          <Tabs type="card" v-model="activeName">
            <Tab-pane label="历史抄表" name="1">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomHistoryRoomNum}} {{roomHistoryHousetypeName}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">&#45;&#45;</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-sousuo"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>&ndash;&gt;-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >序号</th>
                  <th>水表读数</th>
                  <th>电表读数</th>
                  <th>抄表类型</th>
                  <th>记录时间</th>
                  <th>操作人</th>
                </tr>
                <tr v-if="false">
                  <td >1</td>
                  <td>389</td>
                  <td>389</td>
                  <td>自动抄表</td>
                  <td>2017-10-07  10：30</td>
                  <td>系统</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomHistoryBillTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无抄表内容~</h2>
              </div>
              <Page :total="roomHistoryBillTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomHistoryBillTotalNum > 0"></Page>
            </Tab-pane>
            <Tab-pane label="历史水电账单" name="2">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomHistoryRoomNum}} {{roomHistoryHousetypeName}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">&#45;&#45;</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-sousuo"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>&ndash;&gt;-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >账单日期</th>
                  <th>水费情况</th>
                  <th>电费情况</th>
                  <th>合计应收（元）</th>
                  <th>租客/联系人</th>
                  <th>状态</th>
                </tr>
                <tr v-for="item in waterHistoryBillList">
                  <td>{{item.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>
                    <span>读数：{{item.waterData}} </span>
                    <span>用水量：{{item.waterSize}}m³ </span>
                    <span>水费：{{item.waterCost}} 元</span>  </td>
                  <td>
                    <span>读数：{{item.energyData}} </span>
                    <span>用电量：{{item.energySize}}度 </span>
                    <span>电费：{{item.energyCost}} 元</span>
                  </td>
                  <td>{{item.realMoney}}</td>
                  <td>{{item.userName}}</td>
                  <td>
                    <span v-if="item.payStatus == 1">待缴</span>
                    <span v-if="item.payStatus == 2">已缴</span>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="waterHistoryBillList == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="waterHistoryBillTotalNum"  :page-size="10" show-elevator show-total @on-change="waterSearch" v-if="waterHistoryBillList > 0"></Page>
            </Tab-pane>
            <Tab-pane label="历史租金账单" name="3">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomHistoryRoomNum}} {{roomHistoryHousetypeName}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">&#45;&#45;</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-sousuo"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>&ndash;&gt;-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >账单日期</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人手机号</th>
                  <th>租金（元）</th>
                  <th>服务费（元）</th>
                  <th>状态</th>
                </tr>
                <tr v-for="room in roomHistoryBillList">
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
              <div class="blank-background-img" v-if="roomHistoryBillTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="roomHistoryBillTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomHistoryBillTotalNum > 0"></Page>
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
  import {allCommunity,roomContract,officeContract,propertyContract,RoomBillHistoryList500104,WaterEnergyBillHistoryList500106} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
        activeTabName:"billManagement",
        activeName:"1",
        RoomContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],//下拉选
        roomCommunity:-1,//当前选中
        roomHistoryBillList:[],//公寓合同数据
        roomHistoryBillTotalNum:0,//公寓合同总条数
        roomContractCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字
        roomId:null,
        roomHistoryRoomNum:"",
        roomHistoryHousetypeName:"",
        waterHistoryBillList:[],
        waterHistoryBillTotalNum:0,
        communityName:""
      }
    },
    mounted(){
      this.roomId = this.$route.query.roomId;
      var tab = this.$route.query.tab;
      if(tab){
        this.activeName = tab;
      }
      this.roomHistoryRoomNum = sessionStorage.getItem('roomHistoryRoomNum');
      this.roomHistoryHousetypeName = sessionStorage.getItem('roomHistoryHousetypeName');
      this.communityName = sessionStorage.getItem('roomHistoryCommunityName');
      this.getCommunityData();
      this.getRoomHistoryBill({roomId:this.roomId,pageNum:1});
      this.getWaterBillList({roomId:this.roomId,pageNum:1});
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
      getRoomHistoryBill(data){
        var that = this;
        this.$http.get(RoomBillHistoryList500104,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.roomHistoryBillList = pageBean.roomList;
              that.roomHistoryBillTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.roomHistoryBillList = [];
              that.roomHistoryBillTotalNum = 0;
            }
          })
      },
      roomSearch(page){
        var data = {
          pageNum:page || 1,
          roomId:this.roomId
        }
        this.getRoomHistoryBill(data);
      },
      getWaterBillList(data){
        var that = this;
        this.$http.get(WaterEnergyBillHistoryList500106,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.waterHistoryBillList = pageBean.waterList;
              that.waterHistoryBillTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.waterHistoryBillList = [];
              that.waterHistoryBillTotalNum = 0;
            }
          })
      },
      waterSearch(page){
        var data = {
          pageNum:page || 1,
          roomId:this.roomId
        }
        this.getWaterBillList(data);
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

  #history-meter-wrap{
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
