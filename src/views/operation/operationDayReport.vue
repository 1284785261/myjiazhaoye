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
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>社区：</span>
                  <Select v-model="roomCommunity" style="width:180px">
                    <Option v-for="community in  allroomCommunity" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
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
              <table class="dayreporttable" v-if="houseResource">
                <tr>
                  <th>日期</th>
                  <th>运营间数</th>
                  <th>已出租间数</th>
                  <th>待租间数</th>
                  <th>今日出租房间数</th>
                  <th>本周出租房间数</th>
                  <th>本月出租房间数</th>
                  <th>今日退房间数</th>
                  <th>本周退房间数</th>
                  <th>本月退房间数</th>
                  <th>出租率</th>
                </tr>
                <tr>
                  <td>{{houseResource.reportDay}}</td>
                  <td>{{houseResource.totalCount}}</td>
                  <td>{{houseResource.rentCount}}</td>
                  <td>{{houseResource.vacantCount}}</td>
                  <td>{{houseResource.newRentCount}}</td>
                  <td>{{houseResource.weeklyNewRentCount}}</td>
                  <td>{{houseResource.monthlyNewRentCount}}</td>
                  <td>{{houseResource.refundCount}}</td>
                  <td>{{houseResource.weeklyRefundCount}}</td>
                  <td>{{houseResource.monthlyRefundCount}}</td>
                  <td>{{houseResource.rentPercent}}%</td>
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
                  <Date-picker type="date" placeholder="选择日期" v-model="officeStartDate"></Date-picker>
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
              <table class="dayreporttable" v-if="officeResource">
                <tr>
                  <th>日期</th>
                  <th>总工位数</th>
                  <th>今日新签工位数</th>
                  <th>已出租工位数</th>
                  <th>工位出租率</th>
                  <th>总办公室数量</th>
                  <th>今日新签办公室数量</th>
                  <th>已出租办公室数</th>
                  <th>办公室出租率</th>
                  <th>退租工位数</th>
                  <th>服务费用收入</th>
                </tr>
                <tr>
                  <td>{{officeResource.reportDay}}</td>
                  <td>{{officeResource.placeTotalCount}}</td>
                  <td>{{officeResource.placeNewRentCount}}</td>
                  <td>{{officeResource.placeRentCount}}</td>
                  <td>{{officeResource.placeRentPercent}}%</td>
                  <td>{{officeResource.officeTotalCount}}</td>
                  <td>{{officeResource.officeNewRentCount}}</td>
                  <td>{{officeResource.officeRentCount}}</td>
                  <td>{{officeResource.officeRentPercent}}%</td>
                  <td>{{officeResource.placeRefundCount}}</td>
                  <td>{{officeResource.serviceCostIncome}}</td>
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
  import {DailyReport300151,RoomDailyReport300154,host,OfficeDailyReport300157,OfficeDailyReports300158,MllCommunity300145} from '../api.js';


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
        officeStartDate:"",
        houseResource:null,
        officeResource:null,
        businessData:[],
        billData:[],
        financeData:[],
        memberTotalNum:0,
        hosrt:'',
        officehosrt:'',
        allroomCommunity:[{
          communityName:'全部',
          communityId:0
        }],
        roomCommunity:0,
        officeCommunity:0
      }
    },
    mounted(){
      this.hosrt = RoomDailyReport300154;
      this.officehosrt = OfficeDailyReports300158;
      this.roomStartDate = new Date().Format('yyyy-MM-dd');
      this.officeStartDate = new Date().Format('yyyy-MM-dd');
      let date = {reportDay:this.roomStartDate,communityId:this.roomCommunity};
      let date2 = {reportDay:this.officeStartDate,communityId:this.officeCommunity};
      this.hosrt += '?reportDay='+this.roomStartDate;
      this.officehosrt += '?reportDay='+this.officeStartDate;
      this.datam();
      this.getHouseResource(date);
      this.getOfficeResource(date2);
    },
	  filters: {
		  timefilter(value, format) {
			  if(value) {
				  return new Date(value).Format(format)
			  }
		  }
	  },
    methods:{
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
		    let rooms = new Date(this.roomStartDate).Format('yyyy-MM-dd');
        let date = {reportDay:rooms};
        this.hosrt = RoomDailyReport300154;
        this.getHouseResource(date);
	    },
      getHouseResource(data){
        var that = this;
        data.communityId = this.roomCommunity;
        // console.log(data);
        this.hosrt += '?reportDay='+new Date(this.roomStartDate).Format('yyyy-MM-dd')+'&communityId='+data.communityId;
        this.$http.post(DailyReport300151,qs.stringify(data)).then(function(res){
            // console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              that.houseResource = res.data.entity;
              
            }else{
              that.houseResource = null;
            }
          })
      },
      dateChange2(){
        let offices = new Date(this.officeStartDate).Format('yyyy-MM-dd');
        let date = {reportDay:offices};
        this.officehosrt = OfficeDailyReports300158;
        this.getOfficeResource(date);
      },
      getOfficeResource(data){
        var that = this;
        data.communityId = this.officeCommunity;
        this.officehosrt += '?reportDay='+new Date(this.officeStartDate).Format('yyyy-MM-dd')+'&communityId='+data.communityId;
        this.$http.post(OfficeDailyReport300157,qs.stringify(data))
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
