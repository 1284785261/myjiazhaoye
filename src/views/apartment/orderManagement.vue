<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/orderManagement">订单管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>订单管理</h3>
          <!--<span>佳兆业航运WEWA空间</span>-->
        </div>
        <div id="order-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="工位订单" name="first">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="stationCommunity" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>订单日期：</span>
                  <Date-picker type="date" :options="option3" v-model="stationStartDate" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" :options="option1" v-model="stationEndDate" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="stationKeyWord" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" @click="searchStation()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="orderManagement-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="stationTotalNum > 0">
                <tr>
                  <th>订单时间</th>
                  <th>所属社区</th>
                  <th>预订数量</th>
                  <th>使用时间</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>使用优惠券</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="station in stationOrderList">
                  <td>{{station.createTime | timefilter}}</td>
                  <td>{{station.communityName}}</td>
                  <td>{{station.placeNum}}</td>
                  <td>2017.03.02</td>
                  <td>{{station.userName}}</td>
                  <td>{{station.userTelephone}}</td>
                  <td>{{station.totalMoney}}</td>
                  <td>--暂无--</td>
                  <td>
                    <span v-if="station.orderState == 1">待支付</span>
                    <span v-if="station.orderState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="station.orderState == 3" style="color: green;">已使用</span>
                    <span v-if="station.orderState == 4" >已取消</span>
                  </td>
                  <td><router-link :to="{name:'orderDetail',query:{id:station.officeOrderId,type:station.type}}">查看详情</router-link></td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="stationTotalNum == 0">
                <img src="../../../static/images/blank/order_space.png" >
                <h2>暂无订单内容~</h2>
              </div>
              <Page :total="stationTotalNum" :current="stationCurrent" :page-size="10" show-elevator show-total @on-change="searchStation" v-if="stationTotalNum > 0"></Page>
            </el-tab-pane>

            <el-tab-pane label="会议室订单" name="second">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="officeCommunity" style="width:200px">
                    <Option v-for="community in  communitySelectList" :value="community.communityId" :key="community.communityName">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>账单时间：</span>
                  <Date-picker type="date" :options="option4" v-model="officeStartDate" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" :options="option2" v-model="officeEndDate" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="keyWord" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" @click="search()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="meeting-order-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="officeTotalNum > 0">
                <tr>
                  <th>账单时间</th>
                  <th>所属社区</th>
                  <th>会议室</th>
                  <th>使用时间</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="office in officeOrderList">
                  <td>{{office.createTime | timefilter}}</td>
                  <td>{{office.communityName}}</td>
                  <td><span v-if="office.meetingPersonNum">{{office.meetingPersonNum}}人间 </span>{{office.meetingHouseNum}}</td>
                  <td>
                    <span>{{office.meetingDate | timefilter2}}</span>
                    <span>{{office.orderTimeList[0].beginHour}}:00</span>
                    <span v-if="office.orderTimeList[0].beginHour == office.orderTimeList[office.orderTimeList.length-1].endHour">- {{office.orderTimeList[0].beginHour+1}}:00</span>
                    <span v-if="office.orderTimeList[0].beginHour != office.orderTimeList[office.orderTimeList.length-1].endHour">- {{office.orderTimeList[office.orderTimeList.length-1].endHour+1}}:00</span>
                  </td>
                  <td>{{office.userName}}</td>
                  <td>{{office.userTelephone}}</td>
                  <td>{{office.totalMoney}}</td>
                  <td>
                    <span v-if="office.orderState == 1">待支付</span>
                    <span v-if="office.orderState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="office.orderState == 3" style="color: green;">已使用</span>
                    <span v-if="office.orderState == 4" >已取消</span>
                  </td>
                  <td><router-link :to="{name:'orderDetail',query:{id:office.officeOrderId,type:office.type}}">查看详情</router-link></td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="officeTotalNum == 0">
                <img src="../../../static/images/blank/order_space.png" >
                <h2>暂无订单内容~</h2>
              </div>
              <Page :total="officeTotalNum" :current="officeCurrent" :page-size="10" show-elevator show-total @on-change="search" v-if="officeTotalNum > 0"></Page>
            </el-tab-pane>
          </el-tabs>

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
  import {allCommunity,allOrder} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      let _this = this;
      return{
        activeName2: 'first',
        communitySelectList:[{
          communityId: -1,
          communityName: '全部'
        }],
        stationSelectList:[
          {
            communityId: -1,
            communityName: '全部'
          }
        ],
        //会议
        officeStartDate:"",
        officeEndDate:"",
        officeOrderList:[],
        officeTotalNum:0,
        keyWord:"",
        officeCurrent:1,
        officeCommunity:-1,
        //工位
        stationStartDate:"",
        stationEndDate:"",
        stationOrderList:[],
        stationTotalNum:0,
        stationKeyWord:"",
        stationCurrent:1,
        stationCommunity:-1,
        option1: {
            disabledDate (date) {
                return date && date.valueOf() < _this.stationStartDate;
            }
        },
        option2: {
            disabledDate (date) {
                return date && date.valueOf() < _this.officeStartDate;
            }
        },
        option3: {
            disabledDate(date){
						if(_this.stationEndDate){
							return date &&  _this.stationEndDate < date.valueOf();
						}
            }
        },
        option4: {
            disabledDate(date){
						if(_this.officeEndDate){
							return date &&  _this.officeEndDate < date.valueOf();
						}
            }
        },
      }
    },
    mounted(){
      this.getCommunityData();
      this.getStationOrder({pageNum:1,type:1});
      this.getOfficeOrder({pageNum:1,type:0});
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      //获取会议室订单数据，type=0
      getOfficeOrder(data){
        var that = this;
        this.$http.get(allOrder,{params:data})
          .then(function(res){
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
                var pageBean = res.data.pageBean;
                that.officeOrderList = pageBean.page;
                that.officeTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.officeOrderList = [];
              that.officeTotalNum = 0;
            }
        })
      },
      getStationOrder(data){
        var that = this;
        this.$http.get(allOrder,{params:data})
          .then(function(res){
            console.log(data);
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.stationOrderList = pageBean.page;
              that.stationTotalNum = pageBean.totalNum;
            }
            // console.log("station==>")
            // console.log(res)
            if(res.data.code == 10008){
              that.stationOrderList = [];
              that.stationTotalNum = 0;
            }
          })
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.communitySelectList = that.communitySelectList.concat(res.data.entity)
              that.stationSelectList = that.stationSelectList.concat(res.data.entity)
            }
          })
      },
      //会议搜索
      search(page){
        var data = {
          pageNum:page || 1,
          type:0
        };
        if(this.officeCommunity != -1){
          data.communityId = this.officeCommunity;
        }
        if(this.officeStartDate){
            data.beginDate = new Date(this.officeStartDate).Format("yyyy-MM-dd");
        }
        if(this.officeEndDate){
          data.endDate = new Date(this.officeEndDate).Format("yyyy-MM-dd");
        }
        if(this.keyWord){
          data.keyWord = this.keyWord;
        }
        this.getOfficeOrder(data);
      },
      //工位搜索
      searchStation(page){
        var data = {
          pageNum:page || 1,
          type:1
        };
        if(this.stationCommunity != -1){
          data.communityId = this.stationCommunity;
        }
        if(this.stationStartDate){
          data.beginDate = new Date(this.stationStartDate).Format("yyyy-MM-dd");
        }
        if(this.stationEndDate){
          data.endDate = new Date(this.stationEndDate).Format("yyyy-MM-dd");
        }
        if(this.stationKeyWord){
          data.keyWord = this.stationKeyWord;
        }
        this.getStationOrder(data);
      }
    },
    filters:{
        timefilter(value){
          if(value){
            return new Date(value).Format("yyyy-MM-dd hh:mm")
          }
        },
        timefilter2(value){
          if(value){
            return new Date(value).Format("yyyy-MM-dd")
          }
        }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import  '../../sass/page/orderManagement.scss';

  #order-management-wrap{
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
