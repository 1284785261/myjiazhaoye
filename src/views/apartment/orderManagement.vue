<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">订单管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>订单管理</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="order-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="工位订单" name="first">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="stationCommunity" style="width:200px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" v-model="stationStartDate" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" v-model="stationEndDate" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="stationKeyWord" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" @click="searchStation()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="orderManagement-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th width="120px">订单时间</th>
                  <th>所属社区</th>
                  <th>预订数量</th>
                  <th>使用时间</th>
                  <th width="150px">联系人</th>
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
                    <span v-if="station.orderState == 3" style="color: green;">未使用</span>
                    <span v-if="station.orderState == 4" >已使用</span>
                  </td>
                  <td><router-link to="/apartment/orderDetail">查看详情</router-link></td>
                </tr>
              </table>
              <Page :total="stationTotalNum" :current="stationCurrent" :page-size="10" show-elevator show-total @on-change="searchStation"></Page>
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
                  <span>开业日期：</span>
                  <Date-picker type="date" v-model="officeStartDate" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" v-model="officeEndDate" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="keyWord" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" @click="search()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="meeting-order-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>账单时间</th>
                  <th>所属社区</th>
                  <th>会议室</th>
                  <th>使用时间</th>
                  <th width="150px">联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="office in officeOrderList">
                  <td>{{office.createTime | timefilter}}</td>
                  <td>{{office.communityName}}</td>
                  <td>{{office.meetingHouseNum}},{{office.meetingPersonNum}}</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>{{office.userName}}</td>
                  <td>{{office.userTelephone}}</td>
                  <td>{{office.totalMoney}}</td>
                  <td>
                    <span v-if="office.orderState == 1">待支付</span>
                    <span v-if="office.orderState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="office.orderState == 3" style="color: green;">未使用</span>
                    <span v-if="office.orderState == 4" >已使用</span>
                  </td>
                  <td><router-link to="/apartment/orderDetail">查看详情</router-link></td>
                </tr>

              </table>
              <Page :total="officeTotalNum" :current="officeCurrent" :page-size="10" show-elevator show-total @on-change="search"></Page>
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
  import {allCommunity} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeName2: 'first',
        model1:"",
        value:"",
        communitys: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
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
      }
    },
    mounted(){
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };
      this.getCommunityData();
      this.getStationOrder({pageNum:1,type:1});
      this.getOfficeOrder({pageNum:1,type:0});
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取会议室订单数据，type=0
      getOfficeOrder(data){
        var that = this;
        this.$http.get(allOrder,{params:data})
          .then(function(res){
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
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.stationOrderList = pageBean.page;
              that.stationTotalNum = pageBean.totalNum;
            }
            console.log("station==>")
            console.log(res)
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
        if(this.stationCommunity != -1){
          data.communityId = this.stationCommunity;
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
        if(this.officeCommunity != -1){
          data.communityId = this.officeCommunity;
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
        }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import  '../../sass/page/orderManagement.scss';
</style>
