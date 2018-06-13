<template>
  <div>
    <!-- <menu-box :active-tab-name="activeTabName"></menu-box> -->
    <div>
      <!-- <right-header></right-header> -->
      <div class="wordbench-box">
        <div id="operation-day-report-wrap">
          <el-tabs v-model="weeks" type="card">
            <el-tab-pane label="公寓" name="1">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>报表日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="startDate" :on-change="startDatem(startDate)"></Date-picker>
									--
									<Date-picker type="date" placeholder="选择日期" v-model="endDate" disabled></Date-picker>
                </div>
                <div class="form-item">
                  <span>社区：</span>
                  <Select v-model="roomCommunity" style="width:180px">
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
                  <th>本周出租房间数</th>
                  <th>本月累计出租房间数</th>
                  <th>本周退房间数</th>
                  <th>本月累计退房间数</th>
                  <th>出租率</th>
									<th>上周出租房间数</th>
									<th>收入</th>
                </tr>
                <tr>
                  <td>{{houseResource.beginDate | datem}}-{{houseResource.endDate | datem}}</td>
                  <td>{{houseResource.totalCount}}</td>
                  <td>{{houseResource.rentCount}}</td>
                  <td>{{houseResource.vacantCount}}</td>
                  <td>{{houseResource.weeklyNewRentCount}}</td>
                  <td>{{houseResource.monthlyNewRentCount}}</td>
                  <td>{{houseResource.weeklyRefundCount}}</td>
                  <td>{{houseResource.monthlyRefundCount}}</td>
                  <td>{{houseResource.rentPercent}}%</td>
                  <td>{{houseResource.preWeeklyNewRentCount}}</td>
                  <td>{{houseResource.totalIncome}}</td>
                </tr>
              </table>
              <!-- <div class="blank-background-img" v-if="memberTotalNum == 0">
                <img src="../../../static/images/blank/member_space.png" >
                <h2>暂无会员信息~</h2>
              </div> -->
            </el-tab-pane>
              <el-tab-pane label="联合办公" name="2">
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>报表日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officestartDate" :on-change="officestartDatem(officestartDate)"></Date-picker>
									--
									<Date-picker type="date" placeholder="选择日期" v-model="officeendDate" disabled></Date-picker>
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
                  <th>本周新签工位数</th>
                  <th>已出租工位数</th>
                  <th>工位出租率</th>
                  <th>总办公室数量</th>
                  <th>本周新签办公室数量</th>
                  <th>已出租办公室数</th>
                  <th>办公室出租率</th>
									<th>退租工位数</th>
									<th>本周服务费用收入</th>
                </tr>
                <tr>
                  <td>{{officeResource.beginDate | datem}}-{{officeResource.endDate | datem}}</td>
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
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {WeeklyReport300152,RoomWeeklyReport300155,OfficeWeeklyReport300159,OfficeWeeklyReports300160,MllCommunity300145} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
				activeTabName:"operationReport",
        weeks:'1',
      	date:'',
        startDate:"",
        endDate:"",
        officestartDate:"",
        officeendDate:"",
        houseResource:null,
        officeResource:null,
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
      // this.userId = this.$route.query.id;
	    // let newDate = new Date()
      // this.date = newDate.getFullYear() + '年' + parseInt(newDate.getMonth()+1)+'月'
      // this.startDate = newDate.getFullYear() + '-' + parseInt(newDate.getMonth()+1)
      // // 初始化报表
			// this.initEcharts()
      this.hosrt = RoomWeeklyReport300155+'?';
      this.officehosrt = OfficeWeeklyReports300160+'?';
      this.startDate = new Date().Format('yyyy-MM-dd');
      this.officestartDate = new Date().Format('yyyy-MM-dd');
      this.startDatem(this.startDate);
      this.officestartDatem(this.officestartDate);
      let date = {beginDate:new Date(this.startDate).Format('yyyy-MM-dd'),endDate:new Date(this.endDate).Format('yyyy-MM-dd'),communityId:this.roomCommunity};
      let date2 = {beginDate:new Date(this.officestartDate).Format('yyyy-MM-dd'),endDate:new Date(this.officeendDate).Format('yyyy-MM-dd'),communityId:this.officeCommunity};
      this.hosrt += '&beginDate='+date.beginDate+'&&endDate='+date.endDate;
      this.officehosrt += '&beginDate='+date2.beginDate+'&&endDate='+date2.endDate;
      this.datam();
      this.dateChange(date);
      this.dateChange2(date2);
		},
		filters:{
			datem(val){
				return new Date(val).Format('yyyy.MM.dd');
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
	    	startDatem(val){
          let DataSour = new Date(val);
					let data = new Date(val).Format("yyyy-MM-dd");
					let now = data.split('-');
					now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
					now.setDate(now.getDate() + 7);
					this.endDate = new Date(now).Format("yyyy-MM-dd");
				},
        officestartDatem(val){
          let DataSour = new Date(val);
					let data = new Date(val).Format("yyyy-MM-dd");
					let now = data.split('-');
					now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
					now.setDate(now.getDate() + 7);
					this.officeendDate = new Date(now).Format("yyyy-MM-dd");
        },

				getHouseResource(data){
          var that = this
          data.communityId = this.roomCommunity;
					this.hosrt += '&beginDate='+data.beginDate+'&&endDate='+data.endDate+'&communityId='+data.communityId;
					this.$http.post(WeeklyReport300152,qs.stringify(data))
						.then(function(res){
							// console.log(res);
							if(res.status == 200 && res.data.code == 10000){
								that.houseResource = res.data.entity;

							}else{
								that.houseResource = null;
							}
          })
        },
        getofficeResource(data){
          var that = this
          data.communityId = this.officeCommunity;
					this.officehosrt += '&beginDate='+data.beginDate+'&&endDate='+data.endDate+'&communityId='+data.communityId;
					this.$http.post(OfficeWeeklyReport300159,qs.stringify(data))
						.then(function(res){
							// console.log(res);
							if(res.status == 200 && res.data.code == 10000){
								that.officeResource = res.data.entity;

							}else{
								that.officeResource = null;
							}
          })
        },
				dateChange(){
					let date = {
						beginDate:new Date(this.startDate).Format('yyyy-MM-dd'),
						endDate:new Date(this.endDate).Format('yyyy-MM-dd')
						}
					this.hosrt = RoomWeeklyReport300155+'?';
					this.getHouseResource(date);
        },
        dateChange2(){
          let date = {
						beginDate:new Date(this.officestartDate).Format('yyyy-MM-dd'),
						endDate:new Date(this.officeendDate).Format('yyyy-MM-dd')
						}
					this.officehosrt = OfficeWeeklyReports300160+'?';
					this.getofficeResource(date);
        }
	    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';

  #operation-day-report-wrap {
		padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    // box-shadow: 0 3px 1px #ccc;
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
  #operation-day-report-wrap .ivu-tabs-nav-container{
    background: #fff;
  }
</style>
