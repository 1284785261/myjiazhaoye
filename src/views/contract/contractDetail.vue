<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>合同详情</h3>
        </div>
        <div id="contract-detail-wrap">
          <div class="contract-detail-wrap-head">
            <div class="content-item content-item-img">
              <img :src="contractDetailData.communityWork" alt="公寓图片">
            </div>
            <div class="content-item content-item-info">
              <h3 style="margin: 0;padding: 0">{{contractDetailData.communityName}}</h3>
              <p v-if="isOffice==0" class="content-item-info-p1">
                <span>公寓</span>
                <span> {{contractDetailData.floorName}}层{{contractDetailData.roomNum}}</span>
              </p>
              <p v-if="isOffice==1" class="content-item-info-p1">
                <span>办公室</span>
                <span> {{contractDetailData.officeHouseNum}}</span>
              </p>
              <p class="content-item-info-p2">{{contractDetailData.rentPay}} 元/月</p>
            </div>
            <div class="content-item content-item-btn">
              <div class="order-detail-wrap-head-btn">
                联系租户
              </div>
              <div class="order-detail-wrap-head-btn">
                修改合同
              </div>
              <div class="order-detail-wrap-head-btn">
                查看电子合同
              </div>
              <div class="right-content-info">
                <h3 v-if="contractDetailData.contractState == 1">待确认</h3>
                <h3 v-else-if="contractDetailData.contractState == 2" style="color: rgb(255,102,18)">待付款</h3>
                <h3 v-else-if="contractDetailData.contractState == 3" style="color: rgb(255,102,18)">待付首款</h3>
                <h3 v-else-if="contractDetailData.contractState == 4" style="color: rgb(31,187,166)">履约中</h3>
                <h3 v-else-if="contractDetailData.contractState == 5" style="color: rgb(31,187,166)">退租中</h3>
                <h3 v-else-if="contractDetailData.contractState == 6" style="color: rgb(153,153,153)">退组办结</h3>
                <h3 v-else-if="contractDetailData.contractState == 7" style="color: rgb(255,29,16)">违约</h3>
                <h3 v-else-if="contractDetailData.contractState == 8" style="color: rgb(153,153,153)">违约办结</h3>
                <h3 v-else-if="contractDetailData.contractState == 9" style="color: rgb(153,153,153)">到期办结</h3>
              </div>
            </div>
          </div>
          <!--0:公寓 1:办公室-->
          <!--customerType  1:个人租客 2:公司租客-->
          <div class="contract-detail-table-wrap">
            <table class="contract-detail-table1" border="1" bordercolor="#ccc" cellspacing="0">
              <tr class="tr1" v-if="isOffice==0">
                <td class="td1" v-if="contractDetailData.customerType == 1">公寓合同:</td>
                <td class="td1" v-else>公寓公司合同:</td>
                <td class="td1 table1-first-td">
                  <span>公寓</span>&nbsp;&nbsp;&nbsp;
                  <span>{{contractDetailData.floorName}}层{{contractDetailData.roomNum}}</span>&nbsp;&nbsp;&nbsp;
                </td>
              </tr>
              <tr class="tr1" v-if="isOffice==1">
                <td class="td1">联合办公合同:</td>
                <td class="td1 table1-first-td">
                  <span>办公室</span>&nbsp;&nbsp;&nbsp;
                  <span>{{contractDetailData.officeHouseNum}}</span>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">租约信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">合同编码 :</td>
                      <td class="td2">{{contractDetailData.contractNumber}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">租期 :</td>
                      <td class="td2">{{contractDetailData.beginDate | timefilter("yyyy.MM.dd")}}-{{contractDetailData.endDate | timefilter("yyyy.MM.dd")}}(一年)</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1"><span v-if="contractDetailData.customerType == 2">经办人信息:</span><span v-else-if="contractDetailData.customerType == 1">联系人信息:</span></td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">姓名 :</td>
                      <td class="td2">{{contractDetailData.userName}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">证件类型 :</td>
                      <td class="td2">身份证</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">证件号码 :</td>
                      <td class="td2">{{contractDetailData.userCertificate}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">联系方式 :</td>
                      <td class="td2">{{contractDetailData.userPhone}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">公司信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">公司名称 :</td>
                      <td class="td2">{{contractDetailData.companyInfo}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">法人姓名 :</td>
                      <td class="td2">{{contractDetailData.companyLegalPerson}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">企业资料:</td>
                <td class="td1 left-text-td">
                  <a>承租人身份证</a><a>委托书</a>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">查看证明:</td>
                <td class="td1 left-text-td">
                  <a>承租人身份证</a><a>免责声明</a><a>服务守则</a>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">中介方:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">中介公司 :</td>
                      <td class="td2">{{contractDetailData.intermediaryCompany}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">中介人 :</td>
                      <td class="td2">{{contractDetailData.intermediaryName}}</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">中介费 :</td>
                      <td class="td2" style="color: red">{{contractDetailData.intermediaryMoney}}元</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">首款<br><span v-if="contractDetailData.cyclePayType==1">押二付一</span><span v-else-if="contractDetailData.cyclePayType==2">押一付一</span>，<span v-if="contractDetailData.firstMoneyPayType == 2">两次付清</span><span v-else-if="contractDetailData.firstMoneyPayType == 1">一次性付清</span>:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">押金 :</td>
                      <td class="td2">{{contractDetailData.cyclePayType==1?contractDetailData.rentPay*2:contractDetailData.rentPay}}元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">首月租金 :</td>
                      <td class="td2">{{contractDetailData.rentPay}}元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">服务费 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">优惠券代扣 :</td>
                      <td class="td2" style="color: red">暂无</td>
                    </tr>
                    <br>
                    <tr class="tr2">
                      <td class="td2">第一次支付 :</td>
                      <td class="td2">{{contractDetailData.firstMoney}}元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">第二次支付 :</td>
                      <td class="td2">{{contractDetailData.secondPayMoney}}元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">合计 :</td>
                      <td class="td2" style="font-size: 18px;color: red">{{contractDetailData.firstMoney+contractDetailData.secondPayMoney}}元</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">物资清单:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2" v-for="material in materials">
                      <td class="td2">{{material.materialName}} </td>
                      <td class="td2">{{material.count}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">已缴租金:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2"><b>{{contractDetailData.paidMonthCount}}/12月</b></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>

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
  import {contractDetai,imgPath} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    mounted(){
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };
      this.init();
    },
    data(){
      return{
        contractSignId:"",
        isOffice:0,//0:公寓 1:办公室
        contractDetailData:{}
      }
    },
    methods:{
      init(){
        this.contractSignId = this.$route.query.contractSignId;
        this.isOffice = this.$route.query.isOffice;
        this.getContractDetail({contractSignId:this.contractSignId,isOffice:this.isOffice});
      },
      getContractDetail(data){
        let that = this;
        this.$http.get(contractDetai,{params:data}).then(function(res){debugger
          if(res.status == 200 && res.data.code == 10000){
              that.contractDetailData = res.data.entity;
          }
        })
      }
    },
    computed:{
      materials:function(){
          if(this.contractDetailData.materials){
            return JSON.parse(this.contractDetailData.materials);
          }
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #contract-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .contract-detail-wrap-head{
      position: relative;
      height: 190px;
      width: 100%;
      background-color: rgb(247,251,255);
      border-bottom: 1px solid rgb(220,220,220);
      padding: 35px 30px;
      .content-item{
        float: left;
        display: inline-block;
        height: 120px;
      }
      .content-item-img{
        height: 120px;
        width: 160px;
      }
      .content-item-info{
        margin-left: 30px;
        .content-item-info-p1{
          margin: 10px 0 30px 0;
        }
        .content-item-info-p2{
          font-size: 18px;
          color: red;
        }
      }
      .content-item-btn{
        float: right;
        position: relative;
        .order-detail-wrap-head-btn{
          margin-top:80px;
          margin-left: 20px;
          display: inline-block;
          text-align: center;
          width: 140px;
          height: 40px;
          border-radius: 5px;
          border: solid 1px #ccc;
          background-color: rgb(248,248,248);
          line-height: 40px;
          font-size: 16px;
          cursor: pointer;
          &:hover{
            color: rgb(70,170,234);
            border: solid 1px rgb(70,170,234);
            background-color: #fff;
          }
        }
        .right-content-info{
          position: absolute;
          right: 0;
          top: 0;
          h3{
            color: rgb(254,120,50);
          }
        }
      }
    }

    .contract-detail-table-wrap{
      width: inherit;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      padding: 30px;
      .contract-detail-table1{
        width: 100%;
        max-width: 100%;
        border-collapse:collapse;
        text-align: center;
        .tr1>.td1:nth-child(1){
          width: 20%;
          font-weight: 700;
          color: black;
          background-color: rgb(248,248,248);
        }
        .tr1>.td1:nth-child(2){
          width: 80%;
        }
        .tr1{
          .td1{
            padding-top: 20px;
            padding-bottom: 20px;
            .contract-detail-table2{
              .tr2>.td2:nth-child(1){
                text-align: right;
                width: 110px;
              }
              .tr2>.td2:nth-child(2){
                text-align: left;
                padding-left: 10px;
              }
            }
          }
          .table1-first-td{
            text-align: left;
            padding-left: 30px;
            font-weight: 700;
            color: black;
          }
          .left-text-td{
            text-align: left;
            a{
              padding-left: 30px;
            }
          }
        }
      }
    }


  }
</style>
