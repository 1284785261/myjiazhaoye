<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div id="dayreport">
          <Tabs type="card">
            <Tab-pane label="公寓">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>报表日期：</span>
                  <Date-picker type="month" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                </div>
                <!-- <div class="form-item">
                  <b>公司：</b>
                  <Select v-model="roomCommunity" style="width:150px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                 <div class="form-item">
                  <b>项目：</b>
                  <Select v-model="roomCommunity" style="width:150px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div> -->
                <div class="form-item">
                  <div class="form-search">
                    <a class="daochu" @click="dateChange">查询</a>
                    <a class="daochu" :href="hosrt">导出</a>
                  </div>
                </div>
              </div>
              <table class="dayreporttable" v-if="houseResource">
                <tr>
                  <th>月份</th>
                  <th>城市</th>
                  <th>门店</th>
                  <th>店长</th>
                  <th>系统号</th>
                  <th>运营间数</th>
                  <th>本月出租间数</th>
                  <th>累计出租间数</th>
                  <th>剩余未出租间数</th>
                  <th>出租率</th>
                  <th>上月出租间数</th>
                  <th>上月出租率</th>
                  <th>环比</th>
                  <th>总收入</th>
                  <th>租金收入</th>
                  <th>服务费收入</th>
                  <th>押金收入</th>
                  <th>其他经营收入</th>
                </tr>
                <tr>
                  <td>{{houseResource.month}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{houseResource.totalCount}}</td>
                  <td>{{houseResource.monthlyNewRentCount}}</td>
                  <td>{{houseResource.rentCount}}</td>
                  <td>{{houseResource.vacantCount}}</td>
                  <td>{{houseResource.rentPercent}}%</td>
                  <td>{{houseResource.preMonthlyNewRentCount}}</td>
                  <td>{{houseResource.preMonthlyRentPercent}}%</td>
                  <td>{{houseResource.growthRate}}</td>
                  <td>{{houseResource.totalIncome}}</td>
                  <td>{{houseResource.rentIncome}}</td>
                  <td>{{houseResource.serviceIncome}}</td>
                  <td>{{houseResource.depositIncome}}</td>
                  <td>{{houseResource.otherIncome}}</td>
                </tr>
              </table>
              <!-- <div class="blank-background-img" v-if="memberTotalNum == 0">
                <img src="../../../static/images/blank/member_space.png" >
                <h2>暂无会员信息~</h2>
              </div> -->
            </Tab-pane>
            <Tab-pane label="联合办公">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>报表日期：</span>
                  <Date-picker type="month" placeholder="选择日期" v-model="officestartDate"></Date-picker>
                </div>
                <!-- <div class="form-item">
                  <b>公司：</b>
                  <Select v-model="roomCommunity" style="width:150px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                 <div class="form-item">
                  <b>项目：</b>
                  <Select v-model="roomCommunity" style="width:150px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div> -->
                <div class="form-item">
                  <div class="form-search">
                    <a class="daochu" @click="dateChange2">查询</a>
                    <a class="daochu" :href="officehosrt">导出</a>
                  </div>
                </div>
              </div>
              <table class="dayreporttable" v-if="officeResource">
                <tr>
                  <th>月份</th>
                  <th>城市</th>
                  <th>社区</th>
                  <th>社区负责人</th>
                  <th>总工位数</th>
                  <th>可出租工位数</th>
                  <th>上月新签工位数量</th>
                  <th>本月新签工位数量</th>
                  <th>总办公室数量</th>
                  <th>可出租办公室数</th>
                  <th>上月新签办公室数量</th>
                  <th>本月新签办公室数量</th>
                  <th>本月新签客户数量</th>
                  <th>总收入</th>
                  <th>租金收入</th>
                  <th>服务费收入</th>
                  <th>押金收入</th>
                  <th>其他经营收入</th>
                  <th>上月合同到期客户数量</th>
                  <th>本月合同到期客户数量</th>
                  <th>下月合同到期客户数量</th>
                  <th>客户投诉总数量</th>
                </tr>
                <tr>
                  <td>{{officeResource.month | datem}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{officeResource.placeTotalCount}}</td>
                  <td>{{officeResource.placeVacantCount}}</td>
                  <td>{{officeResource.preMonthlyPlaceNewRentCount}}</td>
                  <td>{{officeResource.monthlyPlaceNewRentCount}}</td>
                  <td>{{officeResource.monthlyOfficeTotalCount}}</td>
                  <td>{{officeResource.officeVacantCount}}</td>
                  <td>{{officeResource.preMonthlyOfficeNewRentCount}}</td>
                  <td>{{officeResource.monthlyOfficeNewRentCount}}</td>
                  <td>{{officeResource.newSignCustomers}}</td>
                  <td>{{officeResource.totalIncome}}</td>
                  <td>{{officeResource.rentIncome}}</td>
                  <td>{{officeResource.serviceIncome}}</td>
                  <td>{{officeResource.depositIncome}}</td>
                  <td>{{officeResource.otherIncome}}</td>
                  <td>{{officeResource.preMonthlySignExpireCustomers}}</td>
                  <td>{{officeResource.MonthlySignExpireCustomers}}</td>
                  <td>{{officeResource.nextMonthlySignExpireCustomers}}</td>
                  <td>{{officeResource.complainCount}}</td>
                </tr>
              </table>
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
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {RoomMonthlyReport300153,RoomMonthlyReports300156,OfficeMonthlyReport300161,OfficeMonthlyReports300162} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"operationReport",
        roomStartDate:"",
        houseResource:null,
        businessData:[],
        billData:[],
        financeData:[],
        memberTotalNum:0,
        hosrt:'',
        officestartDate:"",
        officehosrt:"",
        officeResource:null
      }
    },
    mounted(){
      this.hosrt = RoomMonthlyReports300156;
      this.officehosrt = OfficeMonthlyReports300162;
      this.roomStartDate = new Date().Format('yyyy-MM');
      this.officestartDate = new Date().Format('yyyy-MM');
      let date = {reportDay:this.roomStartDate}
      this.hosrt += '?reportDay='+this.roomStartDate;
      this.officehosrt += '?reportDay='+this.officestartDate;
      this.getHouseResource(date);
      this.officestartDatem(date);
    },
	  filters: {
		  timefilter(value, format) {
			  if(value) {
				  return new Date(value).Format(format)
			  }
		  }
	  },
    methods:{
	    dateChange(){
		    let rooms = new Date(this.roomStartDate).Format('yyyy-MM');
        let date = {reportDay:rooms};
        this.hosrt = RoomMonthlyReports300156;
        this.getHouseResource(date);
      },
      dateChange2(){
        let works = new Date(this.officestartDate).Format('yyyy-MM');
        let date = {reportDay:works};
        this.officehosrt = OfficeMonthlyReports300162;
        this.officestartDatem(date);
      },
      getHouseResource(data){
        var that = this;
        this.hosrt += '?reportDay='+new Date(this.roomStartDate).Format('yyyy-MM');
        this.$http.post(RoomMonthlyReport300153,qs.stringify(data))
          .then(function(res){
            // console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              that.houseResource = res.data.entity;
              
            }else{
              that.houseResource = null;
            }
          })
      },
      officestartDatem(data){
        var that = this;
        this.officehosrt += '?reportDay='+new Date(this.officestartDate).Format('yyyy-MM');
        this.$http.post(OfficeMonthlyReport300161,qs.stringify(data))
          .then(function(res){
            // console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              that.officeResource = res.data.entity;
              
            }else{
              that.officeResource = null;
            }
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';


  #dayreport{
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      min-height: 500px;
      box-shadow:none;
    }
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .ivu-tabs-content{
      background-color: #fff;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container{
      height: 54px;
    }
    .ivu-tabs-nav-container{
      background-color: rgb(244,244,244);
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
      width: 160px;
      height: 53px;
      text-align: center;
      line-height: 52px;
      padding: 0;
      border-radius: 10px 10px 0 0;
      margin-right: 10px;
      @include fontSzie(18px,#666);
      &.ivu-tabs-tab-active{
        background-color: #038be2;
        color:#fff;
      }
    }
  }
  .dayreporttable{
    width: 100%;
    margin-top: 30px;
    border-spacing: 0;
    tr{
      th{
        text-align: center;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        padding: 10px 10px;
      }
      td{
        height: 30px;
        text-align: center;
        border: 1px solid #ccc;
      }
    }
  }
  .daochu{
    display: inline-block;
    width: 80px;
    height: 32px;
    margin-left: 20px;
    background: #038be2;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 32px;
  }
</style>
