<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="">日报</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>日报</h3>
        </div>
        <div id="operation-day-report-wrap">
          <div class="operation-day-report-content">
            <div>
              <Date-picker type="date" placeholder="选择日期" v-model="startDate" format="yyyy-MM-dd"
                           :editable="false" :clearable="false" @on-change="dateChange"></Date-picker>
            </div>
            <dev class="day-report-btn">
              <!--<Button type="primary" style="width:120px;height: 38px;">导出报表</Button>-->
            </dev>
          </div>
          <div class="day-report-center-wrap">
            <div class="day-report-center-title">
              <h2>{{startDate | timefilter("yyyy年MM月dd日")}}运营状态报表</h2>
            </div>
          </div>
          <ul class="day-report-table-ul">
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>房源状态</h3>
              <table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>房源</th>
                  <th>房间总数</th>
                  <th>新增房间</th>
                  <th>删除房间</th>
                  <th>空置房间</th>
                  <th>在租房间</th>
                  <th>入住率</th>
                </tr>
                <tr>
                  <td>公寓</td>
                  <td>{{houseResource.room.totalCount}}</td>
                  <td>{{houseResource.room.addCount}}</td>
                  <td>{{houseResource.room.delCount}}</td>
                  <td>{{houseResource.room.vacantCount}}</td>
                  <td>{{houseResource.room.rentCount}}</td>
                  <td>{{houseResource.room.rentPercent}}%</td>
                </tr>
                <tr>
                  <td>办公室</td>
                  <td>{{houseResource.office.totalCount}}</td>
                  <td>{{houseResource.office.addCount}}</td>
                  <td>{{houseResource.office.delCount}}</td>
                  <td>{{houseResource.office.vacantCount}}</td>
                  <td>{{houseResource.office.rentCount}}</td>
                  <td>{{houseResource.office.rentPercent}}%</td>
                </tr>
                <tr>
                  <td>会议室</td>
                  <td>{{houseResource.meeting.totalCount}}</td>
                  <td>{{houseResource.meeting.addCount}}</td>
                  <td>{{houseResource.meeting.delCount}}</td>
                  <td>{{houseResource.meeting.vacantCount}}</td>
                  <td>{{houseResource.meeting.rentCount}}</td>
                  <td>{{houseResource.meeting.rentPercent}}%</td>
                </tr>
                <tr>
                  <td>工位</td>
                  <td>{{houseResource.place.totalCount}}</td>
                  <td>{{houseResource.place.addCount}}</td>
                  <td>{{houseResource.place.delCount}}</td>
                  <td>{{houseResource.place.vacantCount}}</td>
                  <td>{{houseResource.place.rentCount}}</td>
                  <td>{{houseResource.place.rentPercent}}%</td>
                </tr>
              </table>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>业务情况</h3>
              <table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>新增客户</th>
                  <th>跟进中</th>
                  <th>签约数</th>
                  <th>业务处理率</th>
                </tr>
                <tr>
                  <td>{{businessData.addCount}}</td>
                  <td>{{businessData.followCount}}</td>
                  <td>{{businessData.rentCount}}</td>
                  <td>{{businessData.rentPercent}}%</td>
                </tr>
              </table>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>账单情况</h3>
              <table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>账单总数</th>
                  <th>应收账单数</th>
                  <th>应付账单数</th>
                  <th>待收款账单数</th>
                  <th>待付款账单数</th>
                </tr>
                <tr>
                  <td>{{billData.totalCount}}</td>
                  <td>{{billData.gatherCount}}</td>
                  <td>{{billData.refundCount}}</td>
                  <td>{{billData.waitGatherCount}}</td>
                  <td>{{billData.waitRefundCount}}</td>
                </tr>
              </table>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>财务情况</h3>
              <ul class="day-report-inner-ul">
                <li class="day-report-inner-li" style="height: 200px;">
                  <div class="inner-li-title">当日收支</div>
                  <di class="inner-li-content">
                    <div class="inner-li-content-item">
                      <p>应收已收/元</p>
                      <span>{{financeData.totalGatherMoney}}</span>
                    </div>
                    <div class="inner-li-content-item">
                      <p>应收未收/元</p>
                      <span style="color: red">{{financeData.waitGatherMoney}}</span>
                    </div>
                    <div class="inner-li-content-item">
                      <p>回收率</p>
                      <span style="color: #00a0e9;">{{financeData.gatherPercent}}%</span>
                    </div>
                  </di>
                </li>
                <!--<li class="day-report-inner-li">-->
                  <!--<div class="inner-li-title">明日租金预期</div>-->
                  <!--<di class="inner-li-content">-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>预计租金收支差/元</p>-->
                      <!--<span>29000000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>预计租金收入/元</p>-->
                      <!--<span style="color: #3dc4b2;">2900000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>预计租金支出/元</p>-->
                      <!--<span style="color: red;">2900000.00</span>-->
                    <!--</div>-->
                  <!--</di>-->
                <!--</li>-->
                <li class="day-report-inner-li">
                  <div class="inner-li-title">收入分析</div>
                  <!--<div class="inner-li-total-income">-->
                    <!--<span>现金总收入:</span><span style="color: #3dc4b2;">290000.00</span>-->
                  <!--</div>-->
                  <di class="inner-li-content">
                    <div class="inner-li-content-item">
                      <p>租金收入/元</p>
                      <span>{{financeData.rentGatherMoney}}</span>
                    </div>
                    <div class="inner-li-content-item">
                      <p>押金收入/元</p>
                      <span>{{financeData.depositGatherMoney}}</span>
                    </div>
                    <div class="inner-li-content-item">
                      <p>杂费收入/元</p>
                      <span>{{financeData.otherGatherMoney}}</span>
                    </div>
                  </di>
                </li>
                <li class="day-report-inner-li">
                  <div class="inner-li-title">支出分析</div>
                  <div class="inner-li-total-income">
                    <span>现金总支出:</span><span style="color: red;">{{financeData.refundMoney}}</span>
                  </div>
                  <!--<di class="inner-li-content">-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>租金支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>押金支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>杂费支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                  <!--</di>-->
                </li>
              </ul>
            </li>
          </ul>
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
  import qs from 'qs';
  import {report500110,BusinessReport500111,OrderReport500112,OrderReport500113} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"operationReport",
        startDate:"",
        houseResource:[],
        businessData:[],
        billData:[],
        financeData:[]
      }
    },
    mounted(){
    	this.startDate = new Date().Format('yyyy-MM-dd');
      let date = {startDate:this.startDate}
      this.getHouseResource(date);
      this.getBusinessData(date);
      this.getBillData(date);
      this.getFinanceData(date);
    },
	  filters: {
		  timefilter(value, format) {
			  if(value) {
				  return new Date(value).Format(format)
			  }
		  }
	  },
    methods:{
	    /**
	     * 选择日期
	     */
	    dateChange(val){
		    let that = this
		    let _date = new Date(val)
		    let newDate = new Date()

		    this.startDate = val
		    if(_date>newDate){
			    this.$message({
				    showClose: true,
				    message: '查询日期不能大于今天',
				    type: 'warning'
			    });

			    this.startDate = ''
			    setTimeout(function () {
				    that.startDate = new Date().Format('yyyy-MM-dd');
			    },1)
		    }
		    let date = {startDate:this.startDate}
		    this.getHouseResource(date);
		    this.getBusinessData(date);
		    this.getBillData(date);
		    this.getFinanceData(date);
	    },
        //房源
      getHouseResource(data){
        var that = this;
        this.$http.post(report500110,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.houseResource = res.data.result;
              // console.log(that.houseResource)
            }
          })
      },
      //业务
      getBusinessData(data){
        var that = this;
        this.$http.post(BusinessReport500111,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.businessData = res.data.result;
              // console.log(that.businessData)
            }
          })
      },
      //账单
      getBillData(data){
        var that = this;
        this.$http.post(OrderReport500112,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.billData = res.data.result;
              // console.log(that.billData)
            }
          })
      },
      //财务
      getFinanceData(data){
        var that = this;
        this.$http.post(OrderReport500113,qs.stringify(data))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.financeData = res.data.result;
              // console.log(that.financeData)
            }
          })
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #operation-day-report-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
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
    .operation-day-report-content{
      height: 80px;
      padding: 22px;
      border-bottom: 1px solid #ccc;
      position: relative;
      .day-report-btn{
        position: absolute;
        right: 30px;
        top: 22px;
      }
    }
    .day-report-center-wrap{
      width: 100%;
      height: 100%;
      .day-report-center-title{
        height: 100px;
        width: 100%;
        line-height: 100px;
        text-align: center;
      }
    }
    ul.day-report-table-ul{
      padding: 0 30px 80px 30px;
      li.day-report-table-li{
        margin-top: 30px;
        h3{
          display: inline-block;
          color: rgb(3,139,226);
          i{
            margin-right: 10px;
            background:url("/static/images/icon/iden.png") no-repeat;
            background-size: 80%;
            width: 6px;
            height: 24px;
          }
        }
        .report-table-item{
          border-collapse:collapse;
          text-align: center;
          margin-top: 10px;
          tr{
            th,td{
              padding: 16px;
            }
            th{
              background-color: rgb(238,243,246);
            }
          }
        }
        ul.day-report-inner-ul{
          width: 100%;
          li.day-report-inner-li{
            box-sizing: border-box;
            border: 1px solid #ccc;
            width: 49.2%;
            display: inline-block;
            padding: 0;
            margin-top: 20px;
            .inner-li-title{
              font-size: 20px;
              font-weight: 700;
              background-color: rgb(238,243,246);
              height: 50px;
              line-height: 50px;
              text-align: center;
              border-bottom: 1px solid #ccc;
            }
            .inner-li-total-income{
              height: 80px;
              line-height: 80px;
              text-align: center;
              //border-bottom: dashed 1px #ccc;
            }
            .inner-li-content{
              width: 100%;
              text-align: center;
              .inner-li-content-item{
                padding: 40px 0;
                box-sizing: border-box;
                width: 32%;
                display: inline-block;
              }
            }
            p{
              padding-bottom: 10px;
            }
            span{
              font-size: 22px;
            }
          }
          li:nth-of-type(even){
           margin-left: 1%;
          }
        }
      }
    }
  }

</style>
