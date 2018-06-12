<template>
  <div>
    <!-- <menu-box :active-tab-name="activeTabName"></menu-box> -->
    <div>
      <!-- <right-header></right-header> -->
      <div class="wordbench-box">
        <div id="contractExecution">
          <el-tabs v-model="monthly" type="card">
            <el-tab-pane label="公寓" name="1">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>社区：</span>
                  <Select v-model="roomCommunity" style="width:180px">
                    <Option v-for="community in  allroomCommunity" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>收款日期：</span>
                  <Date-picker type="month" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  --
                  <Date-picker type="month" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>房间号：</span>
                  <Input v-model="roomNumber"  placeholder="请填写房间号"  style="width:120px;"></Input>
                </div>
                <!-- 
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
              <table class="dayreporttablem" v-if="houseResource">
                <tr>
                  <th>客户名称</th>
                  <th>房号</th>
                  <th>户型</th>
                  <th>面积</th>
                  <th>合同编号</th>
                  <th>合同起始日期</th>
                  <th>合同终止日期</th>
                  <th>合同期限</th>
                  <th>押金</th>
                  <th>每月租金</th>
                  <th>服务费</th>
                  <th>其他费用</th>
                  <th>结算周期</th>
                  <th v-for="titel in houseResource[0].allStageCostList">{{titel.name}}</th>
                </tr>
                <tr v-for="house in houseResource">
                  <td>{{house.userName}}</td>
                  <td>{{house.roomNum}}</td>
                  <td>{{house.housetypeName}}</td>
                  <td>{{house.housetypeArea}}m²</td>
                  <td>{{house.contractNumber}}</td>
                  <td>{{house.beginDate | date}}</td>
                  <td>{{house.endDate | date}}</td>
                  <td>{{house.stage}}个月</td>
                  <td>{{house.deposit}}元</td>
                  <td>{{house.cyclePayMoney}}元</td>
                  <td>{{house.serviceCost}}元</td>
                  <td>{{house.cyclePayOtherCost}}元</td>
                  <td>{{house.cyclePayType}}个月</td>
                  <td v-for="titel in house.allStageCostList">{{titel.money}}</td>
                </tr>
              </table>
              <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
					    </el-pagination>
            </el-tab-pane>
              <el-tab-pane label="联合办公" name="2">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>报表日期：</span>
                  <Date-picker type="month" placeholder="选择日期" v-model="officestartDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>社区：</span>
                  <Select v-model="officeCommunity" style="width:180px">
                    <Option v-for="community in  allroomCommunity" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
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
              <table class="dayreporttablem" v-if="officeResource">
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
              </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- <footer-box></footer-box> -->
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import axios from 'axios';
  import {RoomContractReport300163,DownloadRoomContract300165,OfficeMonthlyReport300161,OfficeMonthlyReports300162,MllCommunity300145} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        monthly:'1',
        activeTabName:"operationReport",
        roomStartDate:"",
        roomEndDate:"",
        houseResource:null,
        businessData:[],
        billData:[],
        financeData:[],
        memberTotalNum:0,
        hosrt:'',
        officestartDate:"",
        officehosrt:"",
        officeResource:null,
        allroomCommunity:[{
          communityName:'全部',
          communityId:0
        }],
        roomCommunity:0,
        officeCommunity:0,
        roomNumber:'',
        totalNum:0,
        pageNum:1,
        currentPage:1,
        pageSize:10
      }
    },
    mounted(){
      this.hosrt = DownloadRoomContract300165;
      this.officehosrt = OfficeMonthlyReports300162;
      let date = {beginDate:this.roomStartDate,endDate:this.roomEndDate,communityId:this.roomCommunity};
      let date2 = {beginDate:this.officestartDate,endDate:this.roomEndDate,communityId:this.officeCommunity};
      this.hosrt += '?pageSize='+this.pageSize+'&pageNum='+this.pageNum;
      console.log(this.hosrt);
      this.officehosrt += '?reportDay='+this.officestartDate;
      this.datam();
      this.getHouseResource(date);
      this.officestartDatem(date2);
    },
	  filters: {
      date(value){
        return new Date(value).Format('yyyy-MM-dd')
      }
	  },
    methods:{
      handleCurrentChange(val) {
				this.pageNum = val;
				this.dateChange();
			},
      datam(){
        this.$http.post(MllCommunity300145).then((response) => { //获取社区分类数据
          // console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
              for(let i = 0;i<response.data.pageBean.length;i++){
                this.allroomCommunity.push({communityName:response.data.pageBean[i].communityName,communityId:response.data.pageBean[i].communityId});
              }

						}
					})

      },
	    dateChange(){
        let roomStart = new Date(this.roomStartDate).Format('yyyy-MM');
        let roomEnd = new Date(this.roomEndDate).Format('yyyy-MM');
        let date = {};
        if(this.roomStartDate){
          date.beginDate = roomStart;
        }else{
          date.beginDate = '';
        }
        if(this.roomEndDate){
          date.endDate = roomEnd;
        }else{
          date.endDate = '';
        }
        this.hosrt = DownloadRoomContract300165;
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
        let param = new FormData();
        param.append('beginDate',data.beginDate);
        param.append('endDate',data.endDate);
        if(data.beginDate){
          this.hosrt += '?beginDate='+new Date(data.beginDate).Format('yyyy-MM');
        }
        if(data.endDate){
          this.hosrt += '&endDate='+new Date(data.endDate).Format('yyyy-MM');
        }
        if(this.roomCommunity != 0){
          param.append('communityId',this.roomCommunity);
          this.hosrt += '&communityId='+this.roomCommunity;
        }
        if(this.roomNumber){
          param.append('roomNum',this.roomNumber);
          this.hosrt += '&roomNum='+this.roomNumber;
        }
        param.append('pageNum',this.pageNum);
        param.append('pageSize',this.pageSize);
        this.hosrt += '&pageNum='+this.pageNum;
        this.hosrt += '&pageSize='+this.pageSize;
        axios.post(RoomContractReport300163, param)
          .then(function(res){
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              that.houseResource = res.data.pageBean.page;
              // console.log(that.houseResource);
              that.totalNum = res.data.pageBean.totalNum;
            }else{
              that.houseResource = null;
            }
          })
      },
      officestartDatem(data){
        var that = this;
        data.communityId = this.officeCommunity;
        this.officehosrt += '?reportDay='+new Date(this.officestartDate).Format('yyyy-MM')+'&communityId='+data.communityId;
        // axios.post(OfficeMonthlyReport300161,qs.stringify(data))
        //   .then(function(res){
        //     // console.log(res);
        //     if(res.status == 200 && res.data.code == 10000){
        //       that.officeResource = res.data.entity;

        //     }else{
        //       that.officeResource = null;
        //     }
        //   })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';


  #contractExecution{
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    .el-tabs__content{
      overflow-x: scroll;
    }
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
  .dayreporttablem{
    min-width: 5000px;
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
  #contractExecution .ivu-tabs-nav-container{
    background: #fff;
  }

  #contractExecution .el-pagination{
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  #contractExecution .el-pagination .el-pager .number{
    margin: 0 5px;
    border: 1px solid #DCDCDC;
  }
  #contractExecution .el-pagination button{
    border: 1px solid #DCDCDC;
  }
</style>
