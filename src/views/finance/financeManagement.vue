
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
                  <Date-picker type="date" placeholder="选择日期" v-model="financeStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option1" placeholder="选择日期" v-model="financeEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>交易对象:</span>
                  <div style="display: inline-block">
                    <Input  size="large" placeholder="请输入交易对象" v-model="financeSearchKey"></Input>
                  </div>
                </div>
                <div class="form-item">
                  <span>交易方式:</span>
                  <div style="display: inline-block">
                    <Select v-model="payType" style="width:200px">
                      <Option v-for="item in  payTypeSelect" :value="item.value" :key="item.value">{{ item.lable }}</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div class="form-search-criteria" style="padding-top: 0">
                <div class="form-item">
                  <span>资金流向:</span>
                  <Select v-model="financeType" style="width:200px">
                    <Option v-for="item in  financeTypeSelect" :value="item.value" :key="item.value">{{ item.lable }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <Button style="width:120px;height: 36px;" @click="financeSearch()">查询</Button>
                  <Button style="width:120px;height: 36px;margin-left: 20px;">导出</Button>
                </div>
              </div>
              <div class="big-content-wrap" v-if="financeTotalNum > 0">
                <ul>
                  <li>
                    <p>收入金额</p>
                    <h1>￥{{pageBean.inMoney || 0}}</h1>
                  </li>
                  <li>
                    <p>支出金额</p>
                    <h1 style="color: red;">￥{{pageBean.outMoney ||　0}}</h1>
                  </li>
                  <li>
                    <p>利润</p>
                    <h1 style="color: #1fbba6">￥{{pageBean.inMoney-pageBean.outMoney || 0}}</h1>
                  </li>
                </ul>
              </div>
              <table class="table ivu-table" v-if="financeTotalNum > 0">
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
                <tr v-for="item in financeList">
                  <td>{{item.payDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.payNo}}</td>
                  <td>{{item.communityName}}</td>
                  <td>{{item.financeInfo}}</td>
                  <td>
                    <span v-if="item.costType == 0">退款</span>
                    <span v-if="item.costType == 1">公寓租金</span>
                    <span v-if="item.costType == 2">办公租金</span>
                    <span v-if="item.costType == 3">会议室定金</span>
                    <span v-if="item.costType == 4">工位定金</span>
                    <span v-if="item.costType == 5">水电账单</span>
                    <span v-if="item.costType == 6">其它</span>
                  </td>
                  <td>{{item.userName}}</td>
                  <td>
                    <span v-if="item.payType == 1">支付宝</span>
                    <span v-if="item.payType == 2">微信</span>
                    <span v-if="item.payType == 3">银联</span>
                    <span v-if="item.payType == 4">其他方式</span>
                  </td>
                  <td>
                    <span v-if="item.financeType == 0">支出</span>
                    <span v-if="item.financeType == 1">收入</span>
                  </td>
                  <td>{{item.financeMoney}}</td>
                  <td>
                    <span v-if="item.currency == 0">人民币</span>
                    <span v-if="item.currency == 2">港币</span>
                    <span v-if="item.currency == 3">美元</span>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="financeTotalNum == 0">
                <img src="../../../static/images/blank/order_space.png" >
                <h2>暂无内容~</h2>
              </div>
              <Page :total="financeTotalNum"  :page-size="10" show-elevator show-total @on-change="financeSearch" v-if="financeTotalNum > 0"></Page>
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
                  <Date-picker type="date" placeholder="选择日期" v-model="billInvoiceStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" :options="option2" placeholder="选择日期" v-model="billInvoiceEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <span>收件人:</span>
                  <div style="display: inline-block">
                    <Input v-model="billInvoiSearchKey" size="large" placeholder="请输入收件人"></Input>
                  </div>
                </div>
                <div class="form-item">
                  <Button style="width:120px;height: 36px;" @click="billInvoiceSearch()">查询</Button>
                  <Button style="width:120px;height: 36px;margin-left: 20px;">导出</Button>
                </div>
              </div>
              <table class="table ivu-table" v-if="billInvoiceTotalNum > 0">
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
                <tr v-for="item in billInvoiceList">
                  <td>{{item.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.communityName}}</td>
                  <td>
                    <span v-if="item.orderType == 0">公寓租金账单</span>
                    <span v-if="item.orderType == 1">办公租金账单</span>
                    <span v-if="item.orderType == 2">水电账单</span>
                    <span v-if="item.orderType == 3">工位订单</span>
                    <span v-if="item.orderType == 4">会议室订单</span>
                  </td>
                  <td>{{item.roomInfo}}</td>
                  <td>{{item.consignee}}</td>
                  <td>{{item.invoiceHeader}}</td>
                  <td>
                    <span v-if="item.invoiceType == 0">增值发票</span>
                    <span v-if="item.invoiceType == 1">普通发票</span>
                  </td>
                  <td>{{item.invoiceMoney}}</td>
                  <td>
                    <span v-if="item.invoiceState == 0">待开票</span>
                    <span v-if="item.invoiceState == 1">已开票</span>
                    <span v-if="item.invoiceState == 2">已寄出</span>
                    <span v-if="item.invoiceState == 3">已收件</span>
                  </td>
                  <td>
                    <a  @click="openBill(item.invoiceId)" v-if="item.invoiceState == 0 && jurisdiction('FINANCE_UPDATE')">开发票</a>
                    <a v-if="item.invoiceState == 1 && jurisdiction('FINANCE_UPDATE')" @click="sendBill(item.invoiceId)">寄出</a>
                    <router-link :to="{name:'invoiceDetail',query:{invoiceId:item.invoiceId}}" v-if="item.invoiceState == 2 || item.invoiceState == 3">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="billInvoiceTotalNum == 0">
                <img src="../../../static/images/blank/order_space.png" >
                <h2>暂无发票内容~</h2>
              </div>
              <Page :total="billInvoiceTotalNum" :current="billInvoiceCurrent" :page-size="10" show-elevator show-total @on-change="billInvoiceSearch" v-if="billInvoiceTotalNum > 0"></Page>
            </Tab-pane>

            <Tab-pane label="退款处理">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="refundHandCommunity" style="width:200px">
                    <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item select-status">
                  <b>状态：</b>
                  <Select v-model="refundStatus" style="width:200px">
                    <Option v-for="item in  refundStatusList" :value="item.status" :key="item.status">{{ item.statusName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <div class="form-search" style="margin-left: 0;">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="refundHandSearchKey" placeholder="搜索退款对象姓名或手机"></Input>
                    <input type="button" value="搜索" @click="refundHandSearch2()">
                  </div>
                </div>
                <div class="form-item" style="display: block;margin-top: 20px;">
                  <span>发起时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="refundHandStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option3" placeholder="选择日期" v-model="refundHandEndDate"></Date-picker>
                </div>
              </div>
              <table class="table ivu-table" v-if="refundHandTotalNum > 0">
                <tr>
                  <th width="50px;">退款单号</th>
                  <th>所属社区</th>
                  <th>退款对象</th>
                  <th>手机号</th>
                  <th>退款金额/元</th>
                  <th>发起时间</th>
                  <th>负责管家</th>
                  <th>状态</th>
                  <th style="width: 160px;">操作</th>
                </tr>
                <tr v-for="(item,index) in refundHandleList">
                  <td>{{item.refundSn}}</td>
                  <td>{{item.communityName}}</td>
                  <td>{{item.userName}}</td>
                  <td>{{item.userPhone}}</td>
                  <td>{{item.refundMoney}}</td>
                  <td>{{item.createTime | timefilter("yyyy-MM-dd") }}</td>
                  <td>{{item.managerName}}</td>
                  <td>
                    <span v-if="item.refundStatus == 0" style="color: rgb(255,102,18)">待审核</span>
                    <span v-if="item.refundStatus == 1" style="color: black;">待退款</span>
                    <span v-if="item.refundStatus == 2">已退款</span>
                    <span v-if="item.refundStatus == 3">审核不通过</span>
                  </td>
                  <td>
                    <router-link :to="{name:'refundDetail',query:{refundId:item.refundId}}">查看详情</router-link>
                    <router-link :to="{name:'refundDetail',query:{refundId:item.refundId}}" v-if="item.refundStatus == 0 && jurisdiction('FINANCE_UPDATE')">审核</router-link>
                    <a v-if="item.refundStatus == 1 && jurisdiction('FINANCE_UPDATE')" @click="sureRefund(index,item.refundId)">退款</a>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="refundHandTotalNum == 0">
                <img src="../../../static/images/blank/order_space.png" >
                <h2>暂无退款内容~</h2>
              </div>
              <Page :total="refundHandTotalNum" :current="refundHandCurrent" :page-size="10" show-elevator show-total @on-change="refundHandSearch" v-if="refundHandTotalNum > 0"></Page>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <div class="finance-index-modal" v-if="sendBillModal" @click="closeSendBillModal()"></div>
    <div class="finance-bill-modal-content" v-if="sendBillModal">
      <div class="finance-bill-modal-content-title">
        <span>寄出发票</span>
      </div>
      <div class="finance-bill-detail-table">
        <table>
          <tr>
            <td>快递公司 :</td>
            <td>
              <Select v-model="expressCompany" style="width:200px">
                <Option v-for="item in  ExpressSelect" :value="item.dataName" :key="item.dataName">{{ item.dataName }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>付款方式 :</td>
            <td>
              <Select v-model="expressPayType" style="width:200px">
                <Option v-for="item in  expressPayTypes" :value="item.dataId" :key="item.dataId">{{ item.dataName }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>运单号 :</td>
            <td><Input  placeholder="请输入交易方式" v-model="expressNo"></Input></td>
          </tr>
        </table>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="sendBillToUser()">确认寄出</Button>
      </div>
      <div class="modal-close-btn" @click="closeSendBillModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div v-if="openBillMoal" class="finance-index-modal"  @click="closeBillModal()"></div>
    <div v-if="openBillMoal" class="finance-bill-modal-content" id="open-bill-modal">
      <div class="finance-bill-modal-content-title">
        <span>开发票</span>
      </div>
      <div class="finance-bill-detail-table">
        <table>
          <tr>
            <td>发票金额 :</td>
            <td style="color: red;">{{invoiceDetailData.invoiceMoney}}元</td>
          </tr>
          <tr>
            <td>发票抬头 :</td>
            <td>{{invoiceDetailData.invoiceHeader}}</td>
          </tr>
          <tr v-if="invoiceDetailData.invoiceCode">
            <td>纳税人识别码 :</td>
            <td>{{invoiceDetailData.invoiceCode}}</td>
          </tr>
          <tr >
            <td style="padding-bottom: 15px;">发票内容 :</td>
            <td style="padding-bottom: 15px;">{{invoiceDetailData.invoiceContent | invoiceContent}}</td>
          </tr>
          <tr style="position: relative">
            <div style="width: 460px;border-bottom: 1px dashed #ccc;position: absolute;left: 20px;"></div>
          </tr>
          <tr>
            <td style="padding-top: 15px;">收件人 :</td>
            <td style="padding-top: 15px;">{{invoiceDetailData.consignee}}</td>
          </tr>
          <tr>
            <td>联系电话 :</td>
            <td>{{invoiceDetailData.phone}}</td>
          </tr>
          <tr>
            <td >收件地址 :</td>
            <td >{{invoiceDetailData.address}}</td>
          </tr>
        </table>
        <div class="modal-btn">
          <Button type="primary" @click="sureOpenBill()">确认开票</Button>
        </div>
      </div>
      <div class="modal-close-btn" @click="closeBillModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div class="refund-detail-modal" v-if="refundModal" @click="closeRefundModal()"></div>
    <div class="refund-detail-modal-content" v-if="refundModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/refund01_03.png">
      </div>
      <p>确定将<span>{{refundMoney}}元</span>退还给用户吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="refundMoneyToUser()">确定</Button>
        <Button  @click="closeRefundModal()">取消</Button>
      </div>
    </div>

  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {allCommunity,billInvoice,refundHandle,invoiceDetail,sendbillInvoice,invoiceDetailSend,refundMoneyToUser,financeList,SytemData} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      let _this = this;
      return {
        financeType:-1,
        financeTypeSelect:[{
          value:-1,
          lable:"全部"
        },{
          value:0,
          lable:"支出"
        },{
          value:1,
          lable:"收入"
        }],
        financeStartDate:"",
        financeEndDate:"",
        financeSearchKey:"",
        payTypeSelect:[{
          value:-1,
          lable:"全部"
        },{
          value:1,
          lable:"支付宝"
        },{
          value:2,
          lable:"微信"
        },{
          value:3,
          lable:"银联"
        },{
          value:4,
          lable:"其它方式"
        }],
        payType:-1,
        financeList:[],
        financeTotalNum:0,
        pageBean:{},



        billInvoiceList:[],
        billInvoiceStartDate:"",
        billInvoiceEndDate:"",
        billInvoiSearchKey:"",
        billInvoiceCurrent:1,
        billInvoiceTotalNum:0,
        openBillMoal:false,
        sendBillModal:false,
        invoiceDetailData:{},
        sendBillDetail:{},
        ativeInvoiceId:"",
        expressNo:"",



        propertyContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],
        refundStatusList:[{
          status:-1,
          statusName:"全部"
        },{
          status:0,
          statusName:"待审核"
        },{
          status:1,
          statusName:"待退款"
        },{
          status:2,
          statusName:"已退款"
        },{
          status:3,
          statusName:"审核不通过"
        }],
        refundHandleList:[],
        refundHandCommunity:-1,
        refundHandTotalNum:0,
        refundHandCurrent:1,
        refundHandStartDate:"",
        refundHandEndDate:"",
        refundHandSearchKey:"",
        refundStatus:-1,
        activeBillPage:1,
        refundModal:false,
        refundMoney:"",
        refundId:"",
        refundActivePage:1,
        ExpressSelect:[],
        expressCompany:"",
        expressPayTypes:[{
          dataName:"到付",
          dataId:0
        },{
          dataName:"寄付",
          dataId:1
        }],
        expressPayType:0,
        option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.financeStartDate;
					}
				},
				option2: {
					disabledDate (date) {
						return date && date.valueOf() < _this.billInvoiceStartDate;
					}
				},
				option3: {
					disabledDate (date) {
						return date && date.valueOf() < _this.refundHandStartDate;
					}
				},
      }
    },
    mounted(){
      this.getCommunityData();
      this.getBillInvoice({pageNum:1});
      this.getrefundHandle({pageNum:1});
      this.getFinanceList({pageNum:1});
      this.getExpress();
    },
    methods: {
      closeBillModal(){
        this.openBillMoal = false;
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.propertyContractSelects = that.propertyContractSelects.concat(res.data.entity);
            }
          })
      },
      getFinanceList(data){
        var that = this;
        this.$http.get(financeList,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.pageBean = res.data.result;
              that.financeList = that.pageBean.financeList;
              that.financeTotalNum = that.pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.financeList = [];
              that.financeTotalNum = 0;
            }
          })
      },
      financeSearch(page){
        var data = {
          pageNum:page || 1,
        };
        if(this.financeType != -1){
          data.financeType = this.financeType;
        }
        if(this.payType != -1){
          data.payType = this.payType;
        }
        if(this.financeSearchKey){
          data.keyWord = this.financeSearchKey;
        }
        if(this.financeStartDate){
          data.startDate =  new Date(this.financeStartDate).Format("yyyy-MM-dd");
        }
        if(this.financeEndDate){
          data.endDate =  new Date(this.financeEndDate).Format("yyyy-MM-dd");
        }
        this.getFinanceList(data);
      },




      getBillInvoice(data){
        var that = this;
        this.$http.get(billInvoice,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.billInvoiceList = pageBean.invoiceList;
              that.billInvoiceTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.billInvoiceList = [];
              that.billInvoiceTotalNum = 0;
            }
          })
      },
      billInvoiceSearch(page){
        var data = {
          pageNum:page || 1
        }
        if(page){
            this.activeBillPage = page;
        }
        if(this.billInvoiSearchKey){
          data.keyWord = this.billInvoiSearchKey;
        }
        if(this.billInvoiceStartDate){
          data.startDate = new Date(this.billInvoiceStartDate).Format("yyyy-MM-dd");
        }
        if(this.billInvoiceEndDate){
          data.endDate = new Date(this.billInvoiceEndDate).Format("yyyy-MM-dd");
        }
        this.getBillInvoice(data);
      },
      openBill(invoiceId){
        this.openBillMoal =true;
        this.ativeInvoiceId = invoiceId;
        this.getInvoiceDetail({invoiceId:invoiceId});
      },
      getInvoiceDetail(data){
        var that = this;
        this.$http.post(invoiceDetail,qs.stringify(data)).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.invoiceDetailData = res.data.result.invoice;
              // console.log(that.invoiceDetailData );
            }
          })
      },
      //确定开发票
      sureOpenBill(){
        var that = this;
        this.$http.post(sendbillInvoice,qs.stringify({invoiceId:this.ativeInvoiceId})).then(function(res){
          if(res.data.code == 10000){
            that.getBillInvoice({pagaNum:that.activeBillPage});
            that.openBillMoal =false;
          }
        })
      },
      //获取供应商数据
      getExpress(){
        var that = this;
        this.$http.post(
          SytemData,qs.stringify({parentId:63})
        ).then(function(res){
          that.ExpressSelect = res.data.entity;
          that.expressCompany = that.ExpressSelect[0].dataName;
        }).catch(function(err){
          // console.log(err);
        })
      },
      //打开寄发票窗口
      sendBill(invoiceId){
        var that = this;
        this.sendBillModal = true;
        this.ativeInvoiceId = invoiceId;
//        this.$http.post(invoiceDetail,qs.stringify({invoiceId:invoiceId})).then(function(res){
//          if(res.status == 200 && res.data.code == 10000){
//            that.sendBillDetail = res.data.result.invoice;
//          }
//        })
      },
      sureRefund(index,refundId){
        this.refundId = refundId;
        this.refundMoney = this.refundHandleList[index].refundMoney;
        this.refundModal = true;
      },
      closeSendBillModal(){
        this.sendBillModal = false;
      },
      refundMoneyToUser(){
        var that = this;
        this.$http.post(refundMoneyToUser,qs.stringify({refundId:this.refundId}))
          .then(function(res){
            that.refundModal = false;
            if(res.status == 200 && res.data.code == 10000){
              that.refundHandSearch2(that.refundActivePage)
            }
          })
      },
      //确定寄出发票
      sendBillToUser(){
        var that = this;
        var data = {
          invoiceId:this.ativeInvoiceId,
          expressCompany:this.expressCompany,
          expressNo:this.expressNo,
          expressPayType:this.expressPayType
        }
        this.$http.post(invoiceDetailSend,qs.stringify(data)).then(function(res){
          if(res.data.code == 10000){
            that.getBillInvoice({pagaNum:that.activeBillPage});
            that.sendBillModal = false;
          }
        })
      },
      closeRefundModal(){
        this.refundModal = false;
      },

//      getOfficeContract(data){
//        var that = this;
//        this.$http.get(officeContract,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              var pageBean = res.data.pageBean;
//              that.officeContractList = pageBean.page;
//              that.officeTotalNum = pageBean.totalNum;
//            }
//            if(res.data.code == 10008){
//              that.officeContractList = [];
//              that.officeTotalNum = 0;
//            }
//          })
//      },

//      officeSearch(page){
//        var data = {
//          pageNum:page || 1
//        }
//        if(this.officeCommunity != -1){
//          data.communityId = this.officeCommunity;
//        }
//        if(this.officeSearchKey){
//          data.keyWord = this.officeSearchKey;
//        }
//        if(this.officeStartDate){
//          data.beginDate = new Date(this.officeStartDate).Format("yyyy-MM-dd");
//        }
//        if(this.officeEndDate){
//          data.endDate = new Date(this.officeEndDate).Format("yyyy-MM-dd");
//        }
//        this.getOfficeContract(data);
//      },

      getrefundHandle(data){
        var that = this;
        this.$http.get(refundHandle,{params:data})
          .then(function(res){
            // console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.refundHandleList = pageBean.refundList;
              that.refundHandTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.refundHandleList = [];
              that.refundHandTotalNum = 0;
            }
          })
      },

      refundHandSearch2(page){
        var data = {
          pageNum:page || 1
        }
        if(page){
          this.refundActivePage = page;
        }
        if(this.refundHandCommunity != -1){
          data.communityId = this.refundHandCommunity;
        }
        if(this.refundHandSearchKey){
          data.keyWord = this.refundHandSearchKey;
        }
        if(this.refundHandStartDate){
          data.startDate = new Date(this.refundHandStartDate).Format("yyyy-MM-dd");
        }
        if(this.refundHandEndDate){
          data.endDate = new Date(this.refundHandEndDate).Format("yyyy-MM-dd");
        }
        if(this.refundStatus != -1){
            data.refundStatus = this.refundStatus;
        }
        // console.log(data);
        this.getrefundHandle(data);
      },

    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      },
      invoiceContent(value){
        if(value == true){
          return '是服务费发票';
        }
        else{
          return '不是服务费发票';
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
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
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
      padding: 5px 0 21px 20px;
      .form-item{
        margin-right: 60px;
        margin-top: 15px;
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
      height: 120px;
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

  .refund-detail-modal{
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
  .refund-detail-modal-content{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        width: 36px;
        height: 34px;
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
      span{
        color: red;
        font-weight: 700;
        padding: 0 10px;
      }
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }

</style>
