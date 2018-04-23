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
                    <h3><i class="icon icon-iden"></i>住户总账单</h3>

                </div>
                <div id="bill-management-wrap">
                    <el-tabs v-model="activeName2" type="card">
                        <el-tab-pane label="住户总账单" name="first">
                            <table class="office-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%" v-if="roomBillList.length" style="text-align: center">
                                <tr>
                                    <th>ID</th>
                                    <th>总钱 </th>
                                    <th>计算方式 </th>
                                    <th width="150px">开始日期</th>
                                    <th>结束日期</th>
                                    <th>房号</th>
                                    <th>社区</th>
                                    <th>收费日期</th>
                                </tr>
                                <tr v-for="item in roomBillList">
                                    <td>{{item.ID}}</td>
                                    <td>{{item.总钱}}</td>
                                    <td>{{item.计算方式}}</td>
                                    <td>{{item.开始日期 | timefilter("yyyy-MM-dd")}}</td>
                                    <td>{{item.结束日期 | timefilter("yyyy-MM-dd")}}</td>
                                    <td>{{item.房号}}</td>
                                    <td>{{communityName}}</td>
                                    <td>{{item.收费日期 | timefilter("yyyy-MM-dd")}}</td>

                                </tr>
                            </table>
                            <div class="blank-background-img" v-if="!roomBillList.length">
                                <img src="../../../static/images/blank/bill_space.png" >
                                <h2>暂无账单内容~</h2>
                            </div>
                            <!--<Page :total="officeTotalNum" :page-size="10" show-elevator show-total @on-change="officeSearch" v-if="officeTotalNum > 0"></Page>-->
                        </el-tab-pane>



                    </el-tabs>

                </div>

            </div>
            <footer-box></footer-box>
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
  import {allCommunity,roomBill,officeBill,waterEnergyBill,statisticsInfoOfUser,billPayment,AllBillMap500163} from '../api.js';
  import qs from 'qs'


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      warningModal,
      successModal
    },
    data(){
      return{
        activeName2: 'first',
        model1:"",
        communityName:'',
        contractSignId:'',//合同ID
        isOffice:'',
        roomBillList:[],
//        communityName:"",

        successModal:false,
        successMessage:"生成账单成功！",
        warningModal:false,
        warningMessage:"账单已生成！",
      }
    },
    mounted(){
      this.contractSignId = this.$route.query.contractSignId;
      this.isOffice = this.$route.query.isOffice;
      this.communityName = this.$route.query.communityName;
//      let tab = sessionStorage.getItem("billManagementTab");
//      if(tab){
//        this.activeName2 = tab;
//      }
//      else if(this.$route.query.tab){
//        this.activeName2 = this.$route.query.tab;
//      }
//      else if(this.$route.query.name){
//        this.activeName2 = this.$route.query.name;
//      }
      this.getCommunityData();


    },
    methods:{
      getCommunityData(){
        let vm = this
        this.$http.post(AllBillMap500163,qs.stringify({
          contractSignId:vm.contractSignId
        })).then(res => {
          if(res.data.code == 10000){
            vm.roomBillList = res.data.entity
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
//      closeWarningModal(){
//        this.warningModal = false;
//      },
//
//      getCommunityData(){
//       let vm = this
//        this.$http.post(AllBillMap500163)
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              that.RoomBillSelects = res.data.entity;
//              if(value){
//                that.communityId = value;
//              }else{
//                that.communityId = that.RoomBillSelects[0].communityId;
//              }
//              that.getRoomBill({pageNum:1,communityId:that.communityId});
//              that.getOfficeBill({pageNum:1,communityId:that.communityId});
//              //水电账单
//              that.getbillPayment({communityId:that.communityId,pageNum:1});
//            }
//          })
//      },
//      getRoomBill(data){
//        var that = this;
//        this.$http.get(RoomBillList500101,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              var pageBean = res.data.result;
//              that.roomBillList = pageBean.roomList;
//              that.roomTotalNum = pageBean.totalNum;
//            }
//            if(res.data.code == 10001 || res.data.code == 10008){
//              that.roomBillList = [];
//              that.roomTotalNum = 0;
//            }
//          })
//      },
//      roomSearch(page){
//        var data = {
//          communityId:this.communityId,
//          pageNum:page || 1
//        }
//
//        if(this.roomSearchKey){
//          data.keyWord = this.roomSearchKey;
//        }
//        if(this.roomStartDate){
//          data.beginDate = new Date(this.roomStartDate).Format("yyyy-MM-dd");
//        }
//        if(this.roomEndDate){
//          data.endDate = new Date(this.roomEndDate).Format("yyyy-MM-dd");
//        }
//        this.getRoomBill(data);
//      },

//      createRoomOfficeBill(){
//        var that = this;
//        this.$http.post(BillList5000103)
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              that.successMessage = "生成账单成功!";
//              that.successModal = true;
//              setTimeout(function(){
//                that.successModal = false;
//              },1000)
//              that.getRoomBill({pageNum:1,communityId:that.communityId});
//              that.getOfficeBill({pageNum:1,communityId:that.communityId});
//            }
//          })
//      },
//
//      getOfficeBill(data){
//        var that = this;
//        this.$http.get(OfficeBillList500102,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              var pageBean = res.data.result;
//              that.officeBillList = pageBean.officeList;
//              that.officeTotalNum = pageBean.totalNum;
//            }
//            if(res.data.code == 10001 || res.data.code == 10008){
//              that.officeBillList = [];
//              that.officeTotalNum = 0;
//            }
//          })
//      },

//      officeSearch(page){
//        var data = {
//          communityId:this.communityId,
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
//        this.getOfficeBill(data);
//      },
//
//      createBill(){
//        var that = this;
//        this.$http.post(WaterEnergyBillList500099)
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              that.successMessage = "生成账单成功!";
//              that.successModal = true;
//              setTimeout(function(){
//                that.successModal = false;
//              },1000)
//              that.getbillPayment({communityId:that.communityId,pageNum:1});
//            }
//          })
//      },
//      editBill(){
//        this.$router.push({path:"/bill/editGenerateBill",query:{communityId:this.communityId}});
//      },
//      historyBill(){
//        this.$router.push({path:"/bill/historyInformation",query:{communityId:this.communityId}});
//      },
//      officeHistory(){
//        this.$router.push({path:"/bill/officeHistoryBill",query:{communityId:this.communityId}});
//      },

//      getPayStatic(data){
//        var that = this;
//        this.$http.get(statisticsInfoOfUser,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              if(res.data.entity){
//                that.communityPayStatic = res.data.entity;
//              }else{
//                that.communityPayStatic = [];
//              }
//
//            }
//          })
//      },
//      getbillPayment(data){
//        var that = this;
//        this.$http.get(billList500098,{params:data})
//          .then(function(res){
//            if(res.status == 200 && res.data.code == 10000){
//              var pageBean = res.data.result;
//              that.billPaymentList = pageBean.waterList;
//              that.billTotalNum = pageBean.totalNum;
//            }
//            if(res.data.code == 10001 || res.data.code == 10008){
//              that.billPaymentList = [];
//              that.billTotalNum = 0;
//            }
//          })
//      },
//      search(page){
//        //接口待修改
//        var params = {
//          pageNum:page || 1,
//          communityId:this.communityId,
//        }
//        if(this.searchKey){
//          params.keyWord = this.searchKey
//        }
//        if(this.activeStatus != 0){
//          params.payStatus = this.activeStatus;
//        }
//        if(this.waterEnergyStartDate){
//          params.beginDate = new Date(this.waterEnergyStartDate).Format("yyyy-MM-dd");
//        }
//        if(this.waterEnergyEndDate){
//          params.endDate = new Date(this.waterEnergyEndDate).Format("yyyy-MM-dd");
//        }
//
//        this.getbillPayment(params);
//      },
//      filterBill(payStatus){
//        this.activeStatus = payStatus;
//        var params = {
//          pageNum:1,
//          keyWord : this.searchKey,
//          communityId:this.communityId,
//        }
//        if(this.waterEnergyStartDate){
//          params.beginDate = new Date(this.waterEnergyStartDate).Format("yyyy-MM-dd");
//        }
//        if(this.waterEnergyEndDate){
//          params.endDate = new Date(this.waterEnergyEndDate).Format("yyyy-MM-dd");
//        }
//        if(this.activeStatus != 0){
//          params.payStatus = this.activeStatus;
//        }
//        this.getbillPayment(params);
//      },
//      changeCommunityId(){
//        this.communityId = this.RoomBillSelects[this.RoomBillSelects.findIndex(item => item.communityId == this.communityId)].communityId;
//        sessionStorage.setItem("billManagement_communityId",this.communityId);
//        if(this.RoomBillSelects){
//          for(var i =0;i<this.RoomBillSelects.length;i++){
//            if(this.RoomBillSelects[i].communityId == this.communityId){
//              this.communityName = this.RoomBillSelects[i].communityName;
//              break;
//            }
//          }
//        }
//        this.getRoomBill({pageNum:1,communityId:this.communityId});
//        this.getOfficeBill({pageNum:1,communityId:this.communityId});
//        this.getbillPayment({communityId:this.communityId});
//
//      },

    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
    watch:{
//      communityId:function(newValue,oldValue){
//        var vm = this;
//        if(newValue){
//          sessionStorage.setItem("billManagement_communityId",newValue);
//        }
//        if(this.RoomBillSelects && newValue){
//            for(var i =0;i<this.RoomBillSelects.length;i++){
//                if(this.RoomBillSelects[i].communityId == newValue){
//                    this.communityName = this.RoomBillSelects[i].communityName;
//                    break;
//                }
//            }
//        }
//        setTimeout(function(){
//          vm.getRoomBill({pageNum:1,communityId:newValue});
//          vm.getOfficeBill({pageNum:1,communityId:newValue});
////          vm.getPayStatic({communityId:newValue});
//          vm.getbillPayment({communityId:newValue});
//        },10);
//      },

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';

    #bill-management-wrap{
        height: 100%;
        min-height: 1000px;
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
        .pay-information-wrap-head{
            height: 80px;
            background-color: #f7fbff;
            border-bottom: 1px solid #ccc;
            line-height: 80px;
            ul{
                margin-left: 20px;
                li{
                    display: inline-block;
                    margin-right: 50px;
                    span{
                        padding-left: 5px;
                    }
                }
            }
        }
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
            .pay-btn-group{
                button{
                    width: 80px;
                    margin-left: 10px;
                }
                .active-btn{
                    border: solid 1px #038be2;
                    color: #038be2;
                    background-color: #fff;
                }
            }
            .form-item{
                display: inline-block;
                margin-right: 20px;
                .form-search{
                    position: relative;
                    margin-left: 50px;
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
                        /*left: 5px;*/
                        top: 10px;
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
                        top: 1px;
                        cursor: pointer;
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
                text-align: center;
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

        .payment-infirmation-table{
            border-collapse:collapse;
            text-align: center;
            .th1{
                background-color: #f8f8f9;
            }
            .th1,.td1{
                border: 1px solid #ccc;
                padding: 10px 10px;
            }
            .tr1>.td1:first-child,.tr>.th1:first-child{
                border-left-width: 0;
            }
            .tr1>.td1:last-child,.tr1>.th1:last-child{
                border-right-width: 0;
            }
            .tr1>.td1:last-child{
                color: #FF6612;
            }
        }
        .table2{
            display: inline-block;
            .tr2{
                .td2{
                    text-align: left;
                    padding: 0 30px;
                    color: rgb(153,153,153);
                    span{
                        padding-left: 5px;
                        color: black;
                    }
                }
            }
        }

        .payment-infirmation-table{
            .tr1>.td1:nth-child(4){
                color: red;
                font-weight: 700;
            }
        }

    }



</style>

