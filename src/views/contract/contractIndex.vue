
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <div id="contract-index-wrap">
          <Tabs type="card" @on-click="changeTab" v-model="activeName">
            <Tab-pane label="公寓合同" name="room">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="roomCommunity" style="width:200px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" :options="option4" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option1" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="roomSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >合同编号</th>
                  <th>签约日期</th>
                  <th>所属社区</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="room in roomContractList">
                  <td>{{room.contractNumber}}</td>
                  <td>{{room.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.communityName}}</td>
                  <td>{{room.floorName}}层 {{room.roomNum}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td style="color: red;">{{room.rentPay}}</td>
                  <td>
                    <span v-if="room.contractState == 1">待确认</span>
                    <span v-else-if="room.contractState == 2" style="color: rgb(255,102,18)">待付款</span>
                    <span v-else-if="room.contractState == 3" style="color: rgb(255,102,18)">待付首款</span>
                    <span v-else-if="room.contractState == 4" style="color: rgb(31,187,166)">履约中</span>
                    <span v-else-if="room.contractState == 5" style="color: rgb(31,187,166)">退租中</span>
                    <span v-else-if="room.contractState == 6" style="color: rgb(153,153,153)">退组办结</span>
                    <span v-else-if="room.contractState == 7" style="color: rgb(255,29,16)">违约</span>
                    <span v-else-if="room.contractState == 8" style="color: rgb(153,153,153)">违约办结</span>
                    <span v-else-if="room.contractState == 9" style="color: rgb(153,153,153)">到期办结</span>
                    <span v-else-if="room.contractState == 10" style="color: rgb(31,187,166)">申请退租</span>
                  </td>
                  <td>
                    <a v-if="room.contractState == 2 ||room.contractState == 3" @click="collectionModelShow(room.billId,'room')">收款</a>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:room.contractSignId,isOffice:'0'}}">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>

            </Tab-pane>

            <Tab-pane label="联合办公合同" name="office">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="officeCommunity" style="width:200px">
                    <Option v-for="community in  officeContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" :options="option5" placeholder="选择日期" v-model="officeStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" :options="option2" placeholder="选择日期" v-model="officeEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="officeSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="officeSearch()">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="officeTotalNum > 0">
                <tr>
                  <th>合同编号</th>
                  <th>签约日期</th>
                  <th>社区        租期</th>
                  <th>办公室</th>
                  <th>公司</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr v-for="office in officeContractList">
                  <td>{{office.contractNumber}}</td>
                  <td>{{office.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>
                    <p>{{office.communityName}}</p>
                    <p>租期：{{office.beginDate | timefilter("yyyy.MM.dd")}}-{{office.endDate | timefilter("yyyy.MM.dd")}}</p>
                  </td>
                  <td>{{office.officeHouseNum}}</td>
                  <td>{{office.companyInfo}}</td>
                  <td>{{office.userName}}</td>
                  <td>{{office.userPhone}}</td>
                  <td>{{office.rentPay}}</td>
                  <td>
                    <span v-if="office.contractState == 1">待确认</span>
                    <span v-else-if="office.contractState == 2" style="color: rgb(255,102,18)">待付款</span>
                    <span v-else-if="office.contractState == 3" style="color: rgb(255,102,18)">待付首款</span>
                    <span v-else-if="office.contractState == 4" style="color: rgb(31,187,166)">履约中</span>
                    <span v-else-if="office.contractState == 5" style="color: rgb(31,187,166)">退租中</span>
                    <span v-else-if="office.contractState == 6" style="color: rgb(153,153,153)">退组办结</span>
                    <span v-else-if="office.contractState == 7" style="color: rgb(255,29,16)">违约</span>
                    <span v-else-if="office.contractState == 8" style="color: rgb(153,153,153)">违约办结</span>
                    <span v-else-if="office.contractState == 9" style="color: rgb(153,153,153)">到期办结</span>
                    <span v-else-if="office.contractState == 10" style="color: rgb(31,187,166)">申请退租</span>
                  </td>
                  <td>
                      <a v-if="office.contractState == 2 ||office.contractState == 3" @click="collectionModelShow(office.contractSignId,'office')">收款</a>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:office.contractSignId,isOffice:'1'}}">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="officeTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="officeTotalNum" :current="officeContractCurrent" :page-size="10" show-elevator show-total @on-change="officeSearch" v-if="officeTotalNum > 0"></Page>
            </Tab-pane>

            <Tab-pane label="物业合同" name="property">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="propertyCommunity" style="width:200px">
                    <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约时间：</span>
                  <Date-picker type="date" :options="option6" placeholder="选择日期" v-model="propertyStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option3" placeholder="选择日期" v-model="propertyEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search" style="margin-left: 0;">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="propertySearchKey" placeholder="搜索用户"></Input>
                    <input type="button" value="搜索" @click="propertySearch()">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="propertyTotalNum > 0">
                <tr>
                  <th width="50px;">合同编号</th>
                  <th>签约日期</th>
                  <th>社区        租期</th>
                  <th>免租期</th>
                  <th>业主</th>
                  <th>联系电话</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th >操作</th>
                </tr>
                <tr v-for="property in propertyContractList">
                  <td>{{property.communityContractNum}}</td>
                  <td v-if="property.propertySignDate">{{property.propertySignDate | timefilter("yyyy-MM-dd")}}</td>
                  <td v-else>--</td>
                  <td>
                    <p>{{property.communityName}}</p>
                    <p>租期：{{property.communityLeaseBegin | timefilter("yyyy.MM.dd")}}-{{property.communityLeaseEnd | timefilter("yyyy.MM.dd")}}</p>
                  </td>
                  <td>{{property.communityFreeLeaseBegin | timefilter("yyyy.MM.dd")}}-{{property.communityFreeLeaseEnd | timefilter("yyyy.MM.dd")}}</td>
                  <td v-if="property.propertyContactName">{{property.propertyContactName}}</td><td v-else>--</td>
                  <td v-if="property.propertyContactPhone">{{property.propertyContactPhone}}</td><td v-else>--</td>
                  <td v-if="property.propertyRent">{{property.propertyRent}}</td><td v-else>--</td>
                  <td>
                    <span v-if="property.propertySignStatus == 0" style="color: #3dc4b2;">履约中</span>
                    <span v-else-if="property.propertySignStatus == 1" style="color: #96a5af;">已完结</span>
                    <span v-else>--</span>
                  </td>
                  <td>
                    <router-link :to="{name:'communityMessage',query:{id:property.communityId}}">社区信息</router-link>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="propertyTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="propertyTotalNum" :current="propertyContractCurrent" :page-size="10" show-elevator show-total @on-change="propertySearch" v-if="propertyTotalNum > 0"></Page>
            </Tab-pane>

          </Tabs>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
      <div class="black-member-modal" v-if="collectionShow" @click="closeWhileModal()"></div>
      <div class="blackModelCenter" v-if="collectionShow" style="height: 310px;">
          <p>收款登记</p>
          <div class="inputBox">
              <span>银行流水号：</span><Input v-model="collection.bankWater" placeholder="银行流水号"></Input>
          </div>
          <div class="inputBox">
              <span>凭证号：</span><Input v-model="collection.certificate" placeholder="凭证号"></Input>
          </div>
          <div class="inputBox">
              <span>收款金额：</span><Input v-model="collection.paymentAmount" placeholder="收款金额" @on-change="moneyChange(collection.paymentAmount)"></Input>
          </div>
          <h5 style="text-align: center;color: red;">{{messageError}}</h5>
          <div class="modal-btn">
              <Button type="primary" @click="allIncome()">收款完成</Button>
              <Button type="primary" @click="partIncome()">部分收款</Button>
              <Button  @click="setWhileMember()">取消</Button>
          </div>
          <div class="modal-close-btn" @click="closeWhileModal()">
              <Icon type="ios-close-empty"></Icon>
          </div>
      </div>
      <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
      <success-modal :success-message="successMessage" v-if="successModal"></success-modal>

  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import {allCommunity,roomContract,officeContract,propertyContract,CxkjBillGatheringDetailPart500156,CxkjBillGatheringDetail500155,CxkjBillGatheringDetailWhole500157} from '../api.js';
  import qs from 'qs';

export default {
  components:{
    rightHeader,
    menuBox,
    footerBox,
    successModal,
    warningModal
  },
  data () {
    let _this = this;
    return {
        activeName:"room",
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
       collectionShow:false,//收款显示弹框
       collection:{
         id:"",
         contractSignId:'',//收款合同ID
         bankWater:'',//收款银行流水
         certificate:'',//收款凭证
         paymentAmount:''//收款金额
       },
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
        option1: {
            disabledDate (date) {
                return date && date.valueOf() < _this.roomStartDate;
            }
        },
        option2: {
            disabledDate (date) {
                return date && date.valueOf() < _this.officeStartDate;
            }
        },
        option3: {
            disabledDate (date) {
                return date && date.valueOf() < _this.propertyStartDate;
            }
        },
        option4: {
            disabledDate(date){
              if(_this.roomEndDate){
                return date &&  _this.roomEndDate < date.valueOf();
              }
            }
        },
        option5: {
            disabledDate(date){
              if(_this.officeEndDate){
                return date &&  _this.officeEndDate < date.valueOf();
              }
            }
        },
        option6: {
            disabledDate(date){
              if(_this.propertyEndDate){
                return date &&  _this.propertyEndDate < date.valueOf();
              }
            }
        },

      successModal:false,
      successMessage:"部分收款成功！",
      warningModal:false,
      warningMessage:"部分收款异常！",
      isMoney:true,//判断输入是否合法
      messageError:"",
      paymentType:"room"//收款类型
      }
   },
  mounted(){
    let tab = sessionStorage.getItem("contractIndexTab");
    if(tab){
        this.activeName = tab;
    }
    this.getCommunityData();
    this.getRoomContract({pageNum:1});
    this.getOfficeContract({pageNum:1});
    this.getPropertyContract({pageNum:1});
  },
  methods: {
    changeTab(tab){
      sessionStorage.setItem("contractIndexTab",tab);
    },
    /**
     * 关闭错误提示
     **/
    closeWarningModal(){
      this.warningModal = false;
    },
    /**
     * 收款弹框显示
     **/
    collectionModelShow(billId,paymentType){
      let that = this;
      this.paymentType = paymentType;
      this.collectionShow = true;
      this.collection.billId = billId;
      this.$http.post(CxkjBillGatheringDetail500155,qs.stringify({billId:billId})).then(function(res){
        if(res.data.code == 10000){
         let resutl = res.data.entity;
          that.collection ={
              id:resutl.id,
              billId:resutl.billId,
              bankWater:resutl.payNumbers,//收款银行流水
              certificate:resutl.voucherNumbers,//收款凭证
              paymentAmount:resutl.gatheringMoney//收款金额
          }
        }else{

        }
      })
    },
    /**
     * 收款弹框隐藏
     **/
    closeWhileModal(){
      this.collectionShow = false
    },
    /**
     * 部分收款
     */
    partIncome(){
      let that = this;
      let params = this.process();
      this.$http.post(CxkjBillGatheringDetailPart500156,qs.stringify(params)).then(function(res){
        if(res.data.code == 10000){
          that.collectionShow = false;
          that.successMessage = "部分收款成功!";
          that.successModal = true;
          setTimeout(function(){
            that.successModal = false;
          },1000)
        }else{
          that.collectionShow = false;
          that.warningMessage = "部分收款异常！";
          that.warningModal = false;
        }
        //清空
        that.clearData();
      })
    },
    /**
     * 组织收款参数
     */
    process(){
      if(this.collection.bankWater == "" || this.collection.certificate=="" || this.collection.paymentAmount==""){
        return;
      }
      if(!this.isMoney){
        this.messageError = "请输入合法的金额！";
        return;
      }else{
        this.messageError = "";
      }
      let params = {
        id:this.collection.id,
        billId:this.collection.billId,
        payNumbers:this.collection.bankWater,
        voucherNumbers:this.collection.certificate,
        gatheringMoney:this.collection.paymentAmount
      };
      return params;
    },
    /**
     * 清空数据
    **/
    clearData(){
      this.collection ={
        id:"",
        billId:"",
        bankWater:"",//收款银行流水
        certificate:"",//收款凭证
        paymentAmount:""//收款金额
      }
    },
    /**
     * 全部收款
     * @param value
     */
    allIncome(){
      let that = this;
      let params = this.process();
      this.$http.post(CxkjBillGatheringDetailWhole500157,qs.stringify(params)).then(function(res){
        if(res.data.code == 10000){
          that.collectionShow = false;
          that.successMessage = "收款成功!";
          that.successModal = true;
          setTimeout(function(){
            that.successModal = false;
          },1000);
          if(that.paymentType == 'office'){
              that.officeSearch();
          }else{
              that.roomSearch();
          }

        }else{
          that.collectionShow = false;
          that.warningMessage = "收款异常！";
          that.warningModal = false;
        }
        //清空
        that.clearData();
      })
    },

    /**
     * 金额正则
     * @param value
     */
    moneyChange(value){
      if(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/.test(value)){
        this.isMoney = true;
      }else{
        this.isMoney = false;
      }
      this.messageError = "";
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
        .then(function(res){
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
        .then(function(res){
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
      this.getOfficeContract(data);
    },

    getPropertyContract(data){
      var that = this;
      this.$http.get(propertyContract,{params:data})
        .then(function(res){
          if(res.status == 200 && res.data.code == 10000){
            var pageBean = res.data.pageBean;
            that.propertyContractList = pageBean.page;
            console.log(that.propertyContractList);
            that.propertyTotalNum = pageBean.totalNum;
          }
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
      this.getPropertyContract(data);
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

  #contract-index-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
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
    .ivu-tabs-tabpane{
      box-shadow:none;
    }
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

</style>
