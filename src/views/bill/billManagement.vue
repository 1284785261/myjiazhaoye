<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">账单管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>账单管理</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="bill-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="公寓租金账单" name="first">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="roomCommunity" style="width:200px">
                    <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="roomSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="roomSearch()">
                  </div>
                </div>
              </div>
              <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>账单日期</th>
                  <th>所属社区</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人电话</th>
                  <th>金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="room in roomBillList">
                  <td>{{room.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.communityName}}</td>
                  <td>{{room.roomId}}层 {{room.roomNum}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td>{{room.generalRent}}</td>
                  <td>
                    <span v-if="room.billState == 1">待支付</span>
                    <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="room.billState == 3" style="color: red;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:room.billId,type:0}}"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="roomTotalNum" :current="roomBillCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch"></Page>
            </el-tab-pane>











            <el-tab-pane label="办公室租金账单" name="second">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="officeCommunity" style="width:200px">
                    <Option v-for="community in  officeBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="officeSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="officeSearch()">
                  </div>
                </div>
              </div>
              <table class="office-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
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
                <tr v-for="item in officeBillList">
                  <td>{{item.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.communityName}}</td>
                  <td>{{item.meetingPersonNum}}人间 {{item.meetingHouseNum}}</td>
                  <td>{{item.beginDate|timefilter("yyyy.MM.dd")}}-{{item.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{item.userName}}</td>
                  <td>{{item.userPhone}}</td>
                  <td>{{item.generalRent}}</td>
                  <td>
                    <span v-if="item.billState == 1">待支付</span>
                    <span v-if="item.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="item.billState == 3" style="color: red;">违约</span>
                    <span v-if="item.billState == 4">违约办结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'billDetail',query:{billId:item.billId,type:1}}"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="officeTotalNum" :page-size="10" show-elevator show-total @on-change="officeSearch"></Page>
            </el-tab-pane>

            <el-tab-pane label="水电账单" name="third">
              <div class="form-search-criteria">
                <div class="form-item">
                  <Button style="width: 140px;height: 40px;font-size: 18px;" @click="createBill()">生成账单</Button>
                </div>
                <div class="form-item">
                  <a>筛选已出账单</a>
                </div>
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="waterEnergyCommunity" style="width:200px">
                    <Option v-for="community in  waterEnergyBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="waterEnergyStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="waterEnergyEndDate"></Date-picker>
                </div>
              </div>

              <table class="water-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>出账社区</th>
                  <th>所属社区</th>
                  <th>水费合计/元</th>
                  <th>电费合计/元</th>
                  <th>服务费合计/元</th>
                  <th>合计应收/元</th>
                  <th>租客数/户</th>
                  <th>已收(元/户)</th>
                  <th>待收(元/户)</th>
                  <th>操作</th>
                </tr>
                <tr v-for="item in waterEnergyBillList">
                  <td>{{item.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.communityName}}</td>
                  <td>{{item.waterTotalMoney}}</td>
                  <td>{{item.energyTotalMoney}}</td>
                  <td>{{item.totalServiceCost}}</td>
                  <td>{{item.totalMoney}}</td>
                  <td>{{item.userStaticsInfo.totalCount}}</td>
                  <td>{{item.alreadyPay}}元 {{item.userStaticsInfo.alreadyCount}}户</td>
                  <td>{{item.notyetPay}}元 {{item.userStaticsInfo.notyetCount}}户</td>
                  <td>
                    <router-link :to="{name:'paymentInformation',query:{communityId:item.communityId}}">缴费情况</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="waterEnergyTotalNum" :page-size="10" show-elevator show-total @on-change="waterEnergySearch"></Page>
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
  import {allCommunity,roomBill,officeBill,waterEnergyBill} from '../api.js';


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
        roomBillList:[],
        RoomBillSelects:[{
          communityId: -1,
          communityName: '全部'
        }],//下拉选
        roomCommunity:-1,//当前选中
        roomTotalNum:0,//公寓合同总条数
        roomBillCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字


        officeBillList:[],
        officeBillSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        officeCommunity:-1,
        officeTotalNum:0,
        officeBillCurrent:1,
        officeStartDate:"",
        officeEndDate:"",
        officeSearchKey:"",

        waterEnergyBillList:[],
        waterEnergyBillSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        waterEnergyCommunity:-1,
        waterEnergyStartDate:"",
        waterEnergyEndDate:"",
        waterEnergyTotalNum:0,



      }
    },
    mounted(){
      this.getRoomBill({pageNum:1});
      this.getOfficeBill({pageNum:1});
      this.getWaterEnergyBill({pageNum:1});
      this.getCommunityData();

    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomBillSelects = that.RoomBillSelects.concat(res.data.entity);
              that.officeBillSelects = that.officeBillSelects.concat(res.data.entity);
              that.waterEnergyBillSelects = that.waterEnergyBillSelects.concat(res.data.entity);
            }
          })
      },
      getRoomBill(data){
        var that = this;
        this.$http.get(roomBill,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.roomBillList = pageBean.page;
              that.roomTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001){
              that.roomBillList = [];
              that.roomTotalNum = 0;
            }
          })
      },
      roomSearch(page){
        var data = {
          pageNum:page || 1
        }
        if(this.roomCommunity != -1){
          data.communityId = this.roomCommunity;
        }
        if(this.roomSearchKey){
          data.keyWord = this.roomSearchKey;
        }
        if(this.roomStartDate){
          data.beginDate = new Date(this.roomStartDate).Format("yyyy-MM-dd");
        }
        if(this.roomEndDate){
          data.endDate = new Date(this.roomEndDate).Format("yyyy-MM-dd");
        }
        this.getRoomBill(data);
      },

      getOfficeBill(data){
        var that = this;
        this.$http.get(officeBill,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.officeBillList = pageBean.page;
              that.officeTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10001){
              that.officeBillList = [];
              that.officeTotalNum = 0;
            }
          })
      },

      officeSearch(page){
        var data = {
          pageNum:page || 1
        }
        if(this.officeCommunity != -1){
          data.communityId = this.officeCommunity;
        }
        if(this.officeSearchKey){
          data.keyWord = this.officeSearchKey;
        }
        if(this.officeStartDate){
          data.beginDate = new Date(this.officeStartDate).Format("yyyy-MM-dd");
        }
        if(this.officeEndDate){
          data.endDate = new Date(this.officeEndDate).Format("yyyy-MM-dd");
        }
        this.getOfficeBill(data);
      },

      getWaterEnergyBill(data){
        var that = this;
        this.$http.get(waterEnergyBill,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.waterEnergyBillList = pageBean.page;
              that.waterEnergyTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.waterEnergyBillList = [];
              that.waterEnergyTotalNum = 0;
            }
          })
      },
      waterEnergySearch(page){
        var data = {
          pageNum:page || 1
        }
        if(this.waterEnergyCommunity != -1){
          data.communityId = this.waterEnergyCommunity;
        }
        if(this.waterEnergyStartDate){
          data.beginDate = new Date(this.waterEnergyStartDate).Format("yyyy-MM-dd");
        }
        if(this.waterEnergyEndDate){
          data.endDate = new Date(this.waterEnergyEndDate).Format("yyyy-MM-dd");
        }
        this.getWaterEnergyBill(data);
      },
      createBill(){
        this.$router.push({path:"/bill/generateBill"});
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
    watch:{
      waterEnergyStartDate:function(newValue,oldValue){
        var vm = this;
        setTimeout(function(){
          vm.waterEnergySearch();
        },50);
      },
      waterEnergyEndDate:function(newValue,oldValue){
        var vm = this;
        setTimeout(function(){
          vm.waterEnergySearch();
        },50);
      },
      waterEnergyCommunity:function(newValue,oldValue){
        var vm = this;
        setTimeout(function(){
          vm.waterEnergySearch();
        },50);
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #bill-management-wrap{
    height: 985px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .el-tabs__header{
      border-bottom: 1px solid #038be2;
      .el-tabs__nav{
        margin-left:20px;
        .el-tabs__item{
          margin-top: 30px;
          height: 50px;
          line-height:50px;
          font-size: 20px;
          padding: 0 35px;
        }
        .is-active{
          border: 1px solid #038BE2;
          border-bottom-color: #fff;
          border-radius: 4px 4px 0 0;
        }
      }
    }

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .form-item{
        display: inline-block;
        margin-right: 20px;
        .form-search{
          position: relative;
          margin-left: 108px;
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
    }
    .ivu-page{
      margin: 50px 0 160px 0;
      text-align: center;
    }
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

    .house-bill-table,.water-bill-table,.office-bill-table{
      border-collapse:collapse;
      text-align: center;
      th{
        background-color: #f8f8f9;
      }
      th,td{
        border: 1px solid #ccc;
        padding: 10px 10px;
      }
      tr>td:first-child,tr>th:first-child{
        border-left-width: 0;
      }
      tr>td:last-child,tr>th:last-child{
        border-right-width: 0;
      }
    }

    .house-bill-table{
      tr>td:nth-child(7){
        color: red;
      }
      tr>td:nth-child(9){
        color: #FF6612;
      }
    }

    .water-bill-table{
      tr>td:nth-child(9){
        color: red;
      }
    }

    .office-bill-table{
      tr>td:nth-child(8){
        color: #FF6612;
      }
      tr>td:nth-child(7){
        color: red;
      }

    }
  }



</style>

