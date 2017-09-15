
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site" style="z-index: 2;">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">财务管理</router-link>
        </div>
        <div id="finance-index-wrap">
          <Tabs type="card">
            <Tab-pane label="财务管理">
              <div class="finance-header-kong">
                <div class="img-content-wrap">
                  <img src="../../../static/images/icon/finance_money.png" alt="">
                  <span>收支流水</span>
                  <div class="triangle"></div>
                  <div class="triangle-fugai"></div>
                </div>
              </div>
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>交易日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>交易对象:</span>
                  <div style="display: inline-block">
                    <Input v-model="value1" size="large" placeholder="请输入交易对象"></Input>
                  </div>
                </div>
                <div class="form-item">
                  <span>交易方式:</span>
                  <div style="display: inline-block">
                    <Input v-model="value1" size="large" placeholder="请输入交易方式"></Input>
                  </div>
                </div>
              </div>
              <div class="form-search-criteria" style="padding-top: 0">
                <div class="form-item">
                  <span>资金流向:</span>
                  <Select v-model="roomCommunity" style="width:200px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <Button style="width:120px;height: 36px;">查询</Button>
                  <Button style="width:120px;height: 36px;margin-left: 20px;">导出</Button>
                </div>
              </div>
              <div class="big-content-wrap">
                <ul>
                  <li>
                    <p>收入金额</p>
                    <h1>￥6545654.50</h1>
                  </li>
                  <li>
                    <p>支出金额</p>
                    <h1 style="color: red;">￥6545654.50</h1>
                  </li>
                  <li>
                    <p>利润</p>
                    <h1 style="color: #1fbba6">￥6545654.50</h1>
                  </li>
                </ul>
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >交易日期</th>
                  <th>流水号</th>
                  <th>社区</th>
                  <th>订单信息</th>
                  <th>费用类型</th>
                  <th>用户</th>
                  <th>交易方式</th>
                  <th>资金流向</th>
                  <th>费用金额/元</th>
                  <th>币种</th>
                </tr>
                <tr v-for="">
                  <td>2017-06-12</td>
                  <td>12332132</td>
                  <td>佳兆业社区</td>
                  <td>订单内容</td>
                  <td>租金</td>
                  <td>张敏华</td>
                  <td>支付宝</td>
                  <td>收入</td>
                  <td>3000.00</td>
                  <td>￥</td>
                </tr>
              </table>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch"></Page>
            </Tab-pane>

            <Tab-pane label="发票管理">
              <div class="finance-header-kong">
                <div class="img-content-wrap" style="position: relative">
                  <img src="../../../static/images/icon/finance_bill_03.png" alt="">
                  <span>发票申请</span>
                  <div class="triangle"></div>
                  <div class="triangle-fugai"></div>
                </div>
              </div>
              <div class="form-search-criteria">
                <div class="form-item">
                  <span>申请时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>收件人:</span>
                  <div style="display: inline-block">
                    <Input v-model="value1" size="large" placeholder="请输入交易对象"></Input>
                  </div>
                </div>
                <div class="form-item">
                  <Button style="width:120px;height: 36px;">查询</Button>
                  <Button style="width:120px;height: 36px;margin-left: 20px;">导出</Button>
                </div>
              </div>
              <table class="table ivu-table">
                <tr>
                  <th>申请时间</th>
                  <th>所属社区</th>
                  <th>订单类型</th>
                  <th>房间信息</th>
                  <th>收件人</th>
                  <th>发票抬头</th>
                  <th>发票类型</th>
                  <th>金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="">
                  <td>2017-06-27</td>
                  <td>佳兆业社区</td>
                  <td>租金账单</td>
                  <td>19号小区</td>
                  <td>张明华</td>
                  <td>张明华</td>
                  <td>增值发票</td>
                  <td>3000.00</td>
                  <td>代开发牌哦</td>
                  <td>
                    <router-link :to="{name:'invoiceDetail'}">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="officeTotalNum" :current="officeContractCurrent" :page-size="10" show-elevator show-total @on-change="officeSearch"></Page>
            </Tab-pane>

            <Tab-pane label="退款处理">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="propertyCommunity" style="width:200px">
                    <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item select-status">
                  <b>状态：</b>
                  <Select v-model="propertyCommunity" style="width:200px">
                    <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <div class="form-search" style="margin-left: 0;">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="propertySearchKey" placeholder="搜索退款对象姓名或手机"></Input>
                    <input type="button" value="搜索" @click="propertySearch()">
                  </div>
                </div>
                <div class="form-item" style="display: block;margin-top: 20px;">
                  <span>签约时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="propertyStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="propertyEndDate"></Date-picker>
                </div>
              </div>
              <table class="table ivu-table">
                <tr>
                  <th width="50px;">退款单号</th>
                  <th>所属社区</th>
                  <th>退款对象</th>
                  <th>手机号</th>
                  <th>退款金额/元</th>
                  <th>发起时间</th>
                  <th>负责管家</th>
                  <th>状态</th>
                  <th >操作</th>
                </tr>
                <tr v-for="">
                  <td>33213215665465</td>
                  <td>佳兆业受委屈</td>
                  <td>张黎明</td>
                  <td>13570276266</td>
                  <td>3000.00</td>
                  <td>2017-06-27 10:05</td>
                  <td>张黎明</td>
                  <td>待审核</td>
                  <td>
                    <router-link :to="{name:'refundDetail'}">退款详情</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="propertyTotalNum" :current="propertyContractCurrent" :page-size="10" show-elevator show-total @on-change="propertySearch"></Page>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <div class="finance-index-modal" v-if="false" @click="closeBillModal()"></div>
    <div class="finance-bill-modal-content" v-if="false">
      <div class="finance-bill-modal-content-title">
        <span>寄出发票</span>
      </div>
      <div class="finance-bill-detail-table">
        <table>
          <tr>
            <td>快递公司 :</td>
            <td>顺丰物流</td>
          </tr>
          <tr>
            <td>付款方式 :</td>
            <td>支付宝</td>
          </tr>
          <tr>
            <td>运单号 :</td>
            <td><Input  placeholder="请输入交易方式"></Input></td>
          </tr>
        </table>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="setWhileMember()">确认寄出</Button>
      </div>
      <div class="modal-close-btn" @click="closeBillModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div v-if="false" class="finance-index-modal"  @click="closeBillModal()"></div>
    <div v-if="false" class="finance-bill-modal-content" id="open-bill-modal">
      <div class="finance-bill-modal-content-title">
        <span>开发票</span>
      </div>
      <div class="finance-bill-detail-table">
        <table>
          <tr>
            <td>发票金额 :</td>
            <td style="color: red;">630.50元</td>
          </tr>
          <tr>
            <td>发票抬头 :</td>
            <td>个人</td>
          </tr>
          <tr>
            <td>纳税人识别码 :</td>
            <td>6546574968FSDGSD98798</td>
          </tr>
          <tr >
            <td style="padding-bottom: 15px;">发票内容 :</td>
            <td style="padding-bottom: 15px;">房租</td>
          </tr>
          <tr style="position: relative">
            <div style="width: 460px;border-bottom: 1px dashed #ccc;position: absolute;left: 20px;"></div>
          </tr>
          <tr>
            <td style="padding-top: 15px;">收件人 :</td>
            <td style="padding-top: 15px;">周鹏</td>
          </tr>
          <tr>
            <td>联系电话 :</td>
            <td>13570276266</td>
          </tr>
          <tr>
            <td >收件地址 :</td>
            <td >深圳市南山区科技园科学院B栋501</td>
          </tr>
        </table>
        <div class="modal-btn">
          <Button type="primary" @click="setWhileMember()">确认寄出</Button>
        </div>
      </div>
      <div class="modal-close-btn" @click="closeBillModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {allCommunity,roomContract,officeContract,propertyContract} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
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


        officeContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        officeContractList:[],
        officeCommunity:-1,//联合办公当前选中社区
        officeTotalNum:0,//联合办公合同总条数
        officeContractCurrent:1,//联合办公合同当前页
        officeStartDate:"",//联合办公签约开始时间
        officeEndDate:"",//联合办公签约结束时间
        officeSearchKey:"",//联合办公搜索关键字


        propertyContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        propertyContractList:[],
        propertyCommunity:-1,//物业当前选中社区
        propertyTotalNum:0,//物业合同总条数
        propertyContractCurrent:1,//物业合同当前页
        propertyStartDate:"",//物业签约开始时间
        propertyEndDate:"",//物业签约结束时间
        propertySearchKey:"",//物业搜索关键字
      }
    },
    mounted(){
      this.getCommunityData();
      this.getRoomContract({pageNum:1});
      this.getOfficeContract({pageNum:1});
      //this.getPropertyContract({pageNum:1});
    },
    methods: {
      closeBillModal(){

      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomContractSelects = that.RoomContractSelects.concat(res.data.entity);
              that.officeContractSelects = that.officeContractSelects.concat(res.data.entity);
              that.propertyContractSelects = that.propertyContractSelects.concat(res.data.entity);
            }
          })
      },
      getRoomContract(data){
        var that = this;
        this.$http.get(roomContract,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.roomContractList = pageBean.page;
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
        this.getRoomContract(data);
      },

      getOfficeContract(data){
        var that = this;
        this.$http.get(officeContract,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.officeContractList = pageBean.page;
              that.officeTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.officeContractList = [];
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
        this.getOfficeContract(data);debugger
      },

      getPropertyContract(data){
        var that = this;
        this.$http.get(propertyContract,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.propertyContractList = pageBean.page;
              that.propertyTotalNum = pageBean.totalNum;
            }
            console.log(pageBean.page)
            if(res.data.code == 10008){
              that.propertyContractList = [];
              that.propertyTotalNum = 0;
            }
          })
      },

      propertySearch(page){
        var data = {
          pageNum:page || 1
        }
        if(this.propertyCommunity != -1){
          data.communityId = this.propertyCommunity;
        }
        if(this.propertySearchKey){
          data.keyWord = this.propertySearchKey;
        }
        if(this.propertyStartDate){
          data.beginDate = new Date(this.propertyStartDate).Format("yyyy-MM-dd");
        }
        if(this.propertyEndDate){
          data.endDate = new Date(this.propertyEndDate).Format("yyyy-MM-dd");
        }
        this.getPropertyContract(data);debugger
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

  #finance-index-wrap{
    height: 100%;
    min-height: 1100px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
    }
    .finance-header-kong{
      height: 60px;
      width: 100%;
      border-bottom: solid 1px #ccc;
      .img-content-wrap{
        width: 160px;
        height: 60px;
        border-bottom: solid 1px rgb(3,139,226);
        text-align: center;
        padding-top: 25px;
        span{
          font-weight: 700;
          color: rgb(3,139,226);
        }
        .triangle{
          position: absolute;
          top: 59px;
          left: 70px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid rgb(3,139,226);
          z-index: 1;
        }
        .triangle-fugai{
          position: absolute;
          top: 58px;
          left: 70px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #fff;
          z-index: 2;
        }

      }
    }
    .form-search-criteria{
      .form-item{
        margin-right: 60px;
      }
      .select-status{
        .ivu-select{
          width: 135px!important;
        }
      }
    }
    .big-content-wrap{
      min-width: 880px;
      height: 120px;
      background-color: rgb(249,253,255);
      border: 1px solid #ccc;
      margin: 20px;
      ul{
        width: 100%;
        li{
          margin: 20px 0;
          display: inline-block;
          width: 33%;
          height: 80px;
          border-left: 1px solid #ccc;
          text-align: center;
          p{
            padding-top: 10px;
          }

        }
        li:nth-child(1){
          border-left:none;
        }
      }
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

  .finance-index-modal{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.4);
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  //开发票modal独有样式
  #open-bill-modal{
    height:440px;
    width: 500px;
    table{
      tr{
        td:nth-child(1){
          width:95px;
        }
      }
    }
    .modal-btn{
      margin-top: 20px;
    }
  }

  .finance-bill-modal-content{
    width:440px;
    height:300px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .finance-bill-modal-content-title{
      height: 60px;
      width: 100%;
      font-size: 20px;
      color: #fff;
      background-color:rgb(53,154,240);
      text-align: center;
      line-height: 60px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    .finance-bill-detail-table{
      height: 100px;
      width: 100%;
      padding-top: 30px;
      table{
        margin: 0 auto;
        tr{
          td{
            padding: 5px 0;
          }
          td:nth-child(1){
            width: 70px;
            text-align: right;
            font-weight: 700;
            color: black;
          }
          td:nth-child(2){
            text-align: left;
            padding-left: 5px;
          }
        }
      }
    }
    .modal-btn{
      text-align: center;
      margin-top: 40px;
      button{
        width: 120px;
        height: 30px;
        margin-top: 20px;
      }
    }
    .modal-close-btn{
      position: absolute;
      top: -36px;
      right: -36px;
      width: 36px;
      height: 36px;
      color: #fff;
      background-color:rgba(0,0,0,0.7) ;
      border-radius: 100%;
      text-align: center;
      font-size: 36px;
      cursor: pointer;
      i{
        position: relative;
        top: -8px;
      }
    }
  }

</style>
