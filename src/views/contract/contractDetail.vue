<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3 v-if="!PreViewContract"><i class="icon icon-iden"></i>合同详情</h3>

          <h3 v-else><i class="icon icon-iden"></i>预览合同</h3>
        </div>
        <div id="contract-detail-wrap">
          <div class="contract-detail-wrap-head" v-if="!PreViewContract">
            <div class="content-item content-item-img">
              <img :src="imgPath+contractDetailData.communityWork" alt="公寓图片" style="height: 120px;width: 160px;">
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
              <div class="order-detail-wrap-head-btn" @click="openBankModal()" v-if="contractDetailData.contractState == 7">
                查看银行账户信息
              </div>
               <a class="order-detail-wrap-head-btn" @click='Preview'>预览/打印</a>
              <!--<div class="order-detail-wrap-head-btn" @click="PreViewContract = true">-->
                <!--预览合同-->
              <!--</div>-->
              <!--<div class="order-detail-wrap-head-btn" v-if="contractDetailData.contractState == 4">-->
                <!--打印合同-->
              <!--</div>-->
              <!-- <div class="order-detail-wrap-head-btn" v-if="contractDetailData.contractState == 1">
                修改合同
              </div> -->
              <router-link :to="{path:'/signed/surredendetal',query:{id:contractDetailData.throwLeaseId,Name:contractDetailData.communityName}}" class="order-detail-wrap-head-btn" v-if="contractDetailData.contractState == 9 || contractDetailData.contractState == 6">查看退租详情</router-link>
              <router-link :to="{path:'/signed/affirmsurrend',query:{id:contractDetailData.throwLeaseId,Name:contractDetailData.communityName}}" class="order-detail-wrap-head-btn" v-if="contractDetailData.contractState == 5">查看退租申请</router-link>
              <div class="right-content-info">
                <h3 v-if="contractDetailData.contractState == 1">待确认</h3><!--修改合同,预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 2" style="color: rgb(255,102,18)">待付款</h3>
                <h3 v-else-if="contractDetailData.contractState == 3" style="color: rgb(255,102,18)">待付首款</h3><!--预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 4" style="color: rgb(31,187,166)">履约中</h3><!--预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 5" style="color: rgb(31,187,166)">退租中</h3><!--查看退租申请，预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 6" style="color: rgb(153,153,153)">退组办结</h3><!--查看退租详情,预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 7" style="color: rgb(255,29,16)">违约</h3><!--查看银行账户信息,预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 8" style="color: rgb(153,153,153)">违约办结</h3><!--预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 9" style="color: rgb(153,153,153)">到期办结</h3><!--查看退租详情,预览合同-->
                <h3 v-else-if="contractDetailData.contractState == 10" style="color: rgb(31,187,166)">申请退租</h3><!--申请退租，预览合同-->
              </div>
            </div>
          </div>
          <!--0:公寓 1:办公室-->
          <!--customerType  1:个人租客 2:公司租客-->
          <div class="contract-detail-table-wrap">
            <table class="contract-detail-table1" border="1" bordercolor="#ccc" cellspacing="0">
              <tr class="tr1" v-if="isOffice==0">
                <td class="td1" v-if="contractDetailData.customerType == 1">公寓合同:</td>
                <td class="td1" v-else-if="contractDetailData.customerType == 2">公寓公司合同:</td>
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
                      <td class="td2">合同编码 :<span>{{contractDetailData.contractNumber}}</span></td>
                      <td class="td2">租期 :<span>{{contractDetailData.beginDate | timefilter("yyyy.MM.dd")}}-{{contractDetailData.endDate | timefilter("yyyy.MM.dd")}}</span></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1"><span v-if="contractDetailData.customerType == 2">经办人信息:</span><span v-else-if="contractDetailData.customerType == 1">承租人信息:</span></td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">姓名 :<span>{{contractDetailData.userName}}</span></td>
                      <td class="td2">证件类型 :身份证</td>
                      <td class="td2">证件号码 :<span>{{contractDetailData.userCertificate}}</span></td>
                      <td class="td2">联系方式 :<span>{{contractDetailData.userPhone}}</span></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.customerType && contractDetailData.customerType==2">
                <td class="td1">公司信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">公司名称 :<span>{{contractDetailData.companyInfo}}</span></td>
                      <td class="td2">法人姓名 :<span>{{contractDetailData.companyLegalPerson}}</span></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1"><span v-if="contractDetailData.customerType == 2">企业资料:</span><span v-else-if="contractDetailData.customerType == 1">查看证明:</span></td>
                <td class="td1 left-text-td">
                  <ul>
                    <li v-for="(item,index) in contractDetailData.credentialsImages" @click="preViewPc(index)" v-if="item.filePath">
                      <img :src="imgPath+item.filePath" alt="证明图片">
                      <div class="picture-modal"><Icon type="ios-search"></Icon></div>
                      <p>{{item.fileTitle}}</p>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">中介方:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">中介公司 :<span v-if="contractDetailData.intermediaryCompany">{{contractDetailData.intermediaryCompany}}</span>
                      <span  v-else>无</span>
                      </td>
                      <td class="td2">中介人 :<span v-if="contractDetailData.intermediaryName">{{contractDetailData.intermediaryName}}</span>
                      <span v-else>无</span>
                      </td>
                      <td class="td2">中介费 :<span style="color: red;" v-if="contractDetailData.intermediaryMoney">{{contractDetailData.intermediaryMoney}}元</span>
                      <span style="color: red;" v-else>0元</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">首款<br>
                <span v-if="contractDetailData.cyclePayType==1">押二付一</span><span v-else-if="contractDetailData.cyclePayType==2">押一付一</span><span v-else-if="contractDetailData.cyclePayType==3">季付</span><span v-else-if="contractDetailData.cyclePayType==4">年付</span>，
                <span v-if="contractDetailData.firstMoneyPayType == 2">两次付清</span><span v-else-if="contractDetailData.firstMoneyPayType == 1">一次性付清</span>:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2 span-padding">
                      <td class="td2">押金 :<span>{{contractDetailData.deposit}}元</span></td>
                      <td class="td2">首月租金 :<span>{{contractDetailData.rentPay}}元</span></td>
                      <td class="td2">服务费 :<span>{{contractDetailData.serviceCost}}元</span></td>
                      <td class="td2">优惠券代扣 :<span>暂无</span></td>
                    </tr>
                    <tr class="tr2 span-padding" v-if="contractDetailData.otherCostJson && contractDetailData.otherCostJson.length">
                      <td class="td2" v-for="item in contractDetailData.otherCostJson">{{item.costName}}：{{item.costAmount}}元</td>
                      <td class="td2" >其他费用总额 :<span>{{contractDetailData.cyclePayOtherCost}}元</span></td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2" v-if="contractDetailData.firstMoneyPayType == 2">第一次支付 :<span>{{contractDetailData.firstMoney}}元</span></td>
                      <td class="td2" v-if="contractDetailData.firstMoneyPayType == 2">第二次支付 :<span>{{contractDetailData.secondPayMoney}}元</span></td>
                      <td class="td2">合计 :<span style="color: red;">{{contractDetailData.firstPayMoney}}元</span></td>
                      <td class="td2"><a @click="tm">计算方式</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.contractState == 5 || contractDetailData.contractState == 6 || contractDetailData.contractState == 10">
                <td class="td1">退租时间:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">{{contractDetailData.refundTime | time}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.contractState == 5 || contractDetailData.contractState == 6 || contractDetailData.contractState == 10">
                <td class="td1">退租原因:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">{{contractDetailData.refundInfo}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.contractState == 8">
                <td class="td1">办结日期:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">2017-09-21</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.contractState == 8">
                <td class="td1">违约信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">已支付 :<span>2000元</span></td>
                      <td class="td2">违约金 :<span>2000元</span></td>
                      <td class="td2">退款 :<span>2000元</span></td>
                      <td class="td2">退款日期 :<span>2017-09-21</span></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1" v-if="contractDetailData.materials">
                <td class="td1">物资清单:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2" >
                      <td class="td2" v-for="material in contractDetailData.materials">{{material.materialName}}x{{material.count}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">已缴租金:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2"><b>{{contractDetailData.paidMonthCount}}/{{contractDetailData.stage}}月</b></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div class="print-contract-btn" v-if="PreViewContract">
              <Button type="primary" style="width: 180px;height: 36px;" @click="test()">打印合同</Button>
            </div>
          </div>
        </div>

      </div>
      <footer-box></footer-box>
    </div>

    <div class="community-house-modal" v-if="preView" @click="closePreViewModal()"></div>
    <div class="contract-modal-content preview-modal-content" v-if="preView">
      <div class="pre-view">
        <img :src="imgPath+preViewSrc" alt="">
      </div>
      <div class="next-btn" @click="preToView()">
        <Icon type="ios-arrow-left"></Icon>
      </div>
      <div class="pre-btn" @click="nextToView()">
        <Icon type="ios-arrow-right"></Icon>
      </div>
      <div class="modal-close-btn" @click="closePreViewModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div class="contract-index-modal" v-if="bankModal" @click="closeBankModal()"></div>
    <div class="contract-modal-content" v-if="bankModal">
      <div class="community-house-modal-content-title">
        <span>查看银行账户信息</span>
      </div>
      <div class="contract-detail-table">
        <table>
          <tr>
            <td>账户名 :</td>
            <td>李米月</td>
          </tr>
          <tr>
            <td>账  户 :</td>
            <td>65532188212540548</td>
          </tr>
          <tr>
            <td>开户行 :</td>
            <td>中国建设银行深圳国贸支行</td>
          </tr>
        </table>
      </div>
      <div class="modal-close-btn" @click="closeBankModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>
    <div class="community-house-modal" v-if="formula" @click="formulas()"></div>
    <div class="contract-modal-content formulas" v-if="formula">
        <h3>计算方式</h3>
        <div>
          <p>押金：{{contractDetailData.deposit}}元</p>
          <p>房费：{{roommonry}}元 = {{roommonryg}}</p>
          <p>服务费：{{fwmonry}}元 = {{fwmonryg}}</p>
          <p>其他费用：{{contractDetailData.cyclePayOtherCost}}元</p>
          <p v-for="item in contractDetailData.otherCostJson">{{item.costName}}：{{item.costAmount}}元</p>
          <p>合计：{{contractDetailData.firstPayMoney}}元</p>
        </div>
        <a @click="qud">确定</a>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {contractDetai,imgPath,PdfDocmentUpload200173} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    mounted(){
      this.init();
      this.imgPath = imgPath;
      this.PdfDocmentUpload200173=PdfDocmentUpload200173+'?contractSignId='+parseInt(this.$route.query.contractSignId)
    },
    data(){
        //customerType	1:个人租客 2:公司租客
      //isOffice	string	0:公寓 1:办公室
      return{
        activeTabName:"contractIndex",
        contractSignId:"",
        isOffice:0,//0:公寓 1:办公室
        contractDetailData:{},
        bankModal:false,
        preView:false,
        formula:false,
        preViewSrc:"",
        PreViewContract:false,//预览合同
        PdfDocmentUpload200173:'',
        roommonry:'',
        fwmonry:'',
        roommonryg:'',
        fwmonryg:''
      }
    },
    methods:{
      init(){
        this.contractSignId = this.$route.query.contractSignId;
        this.isOffice = this.$route.query.isOffice;
        this.getContractDetail({contractSignId:this.contractSignId,isOffice:this.isOffice});
      },
      Preview(){
        window.open(this.PdfDocmentUpload200173,"","width=900,height=900");
      },
      getContractDetail(data){
        let that = this;
        this.$http.get(contractDetai,{params:data}).then(function(res){
          console.log(res);
          if(res.status == 200 && res.data.code == 10000){
              that.contractDetailData = res.data.entity;
              var arr = [];
              //默认显示第一张公寓图片
              that.contractDetailData.communityWork = that.contractDetailData.communityWork.split(",")[0];
              // console.log(that.contractDetailData.communityWork)
              if(that.contractDetailData.credentialsImages){
                that.contractDetailData.credentialsImages = JSON.parse(that.contractDetailData.credentialsImages);
              }
              if(that.contractDetailData.materials){
                that.contractDetailData.materials =   JSON.parse(that.contractDetailData.materials);
              }
              if(that.contractDetailData.otherCostJson){
                that.contractDetailData.otherCostJson =   JSON.parse(that.contractDetailData.otherCostJson);
              }
          }
        })
      },
      openBankModal(){
        this.bankModal=true;
      },
      closeBankModal(){
        this.bankModal=false;
      },
      preViewPc(index){
        this.activeViewIndex = index;
        this.preViewSrc = this.contractDetailData.credentialsImages[index].filePath;
        this.preView = true;
      },
      closePreViewModal(){
        this.preView = false;
      },
      nextToView(){
        if(this.activeViewIndex < this.contractDetailData.credentialsImages.length -1 ){
          this.activeViewIndex++;
          this.preViewSrc = this.contractDetailData.credentialsImages[this.activeViewIndex].filePath;
        }else{
          this.preViewSrc = this.contractDetailData.credentialsImages[this.contractDetailData.credentialsImages.length -1].filePath;
        }
      },
      preToView(){
        if(this.activeViewIndex>0){
          this.activeViewIndex--;
          this.preViewSrc = this.contractDetailData.credentialsImages[this.activeViewIndex].filePath;
        }else{
          this.preViewSrc = this.contractDetailData.credentialsImages[0].filePath;
        }
      },
      tm(){
        var date = new Date();
				//获取年份
				var year = date.getFullYear();
				//获取当前月份
				var mouth = date.getMonth() + 1;
				var daym = date.getDate() - 1;
				//定义当月的天数；
				var days;
				//当月份为二月时，根据闰年还是非闰年判断天数
				if (mouth == 2) {
					days = year % 4 == 0 ? 29 : 28;
				}
				else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
					//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
					days = 31;
				}
				else {
					//其他月份，天数为：30.
					days = 30;
        }
        console.log(this.contractDetailData);
        this.roommonry = parseFloat(((this.contractDetailData.rentPay / days) * (days-daym)) * (this.contractDetailData.cyclePayDiscount / 100)).toFixed(2);
        this.roommonryg = this.contractDetailData.rentPay+'/'+days +'*'+'('+days +'-' + daym +')天'+ '*'+this.contractDetailData.cyclePayDiscount+'%折扣';
        this.fwmonry = parseFloat(((this.contractDetailData.serviceCost / days) * (days-daym))).toFixed(2);
        this.fwmonryg = this.contractDetailData.serviceCost+'/'+days +'*('+days+'-'+daym+')天';
        this.formula = true;
      },
      qud(){
        this.formula = false;
      },
      formulas(){
        this.formula = false;
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      },
      time(value){
        return new Date(value).Format('yyyy-MM-dd');
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
    height: 100%;
    min-height: 1000px;
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
              .tr2{
                text-align: left;
                td{
                  padding-left: 30px;
                  span{
                    padding-left: 5px;
                  }
                }
              }
              .span-padding{
                td{
                  padding-bottom: 10px;
                }
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
            ul{
              li{
                display: inline-block;
                float: left;
                height: 160px;
                width: 160px;
                margin-left: 30px;
                position: relative;
                img{
                  height: 120px;
                  width: 160px;
                  cursor: pointer;
                }
                .picture-modal{
                  position: absolute;
                  background-color: rgba(0,0,0,0.4);
                  height: 120px;
                  width: 160px;
                  cursor: pointer;
                  font-size: 36px;
                  color: #fff;
                  top: 0;
                  text-align: center;
                  line-height: 120px;
                  display: none;
                }
                p{
                  margin-top: 15px;
                }
              }
              li:hover div.picture-modal{
                display: block;
              }
            }
          }
        }
      }
    }
    .print-contract-btn{
      text-align: center;
      margin-top: 50px;
    }

  }

  .contract-index-modal,.community-house-modal{
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

  .contract-modal-content{
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

    .community-house-modal-content-title{
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
    .contract-detail-table{
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
            width: 60px;
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
  .preview-modal-content{
    width:720px;
    height:540px;
   
    .pre-view{
      width: 100%;
      height: 100%;
      text-align: center;
       position: relative;
      // overflow: hidden;
      img{
        // width: 100%;
        // height: 100%;
        max-width: 720px;
        max-height:540px;
        // background-size:initial;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%)


      }
    }
    .next-btn,.pre-btn{
      width: 70px;
      height: 70px;
      position: absolute;
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .next-btn{
      left: -80px;
      top: 250px;
      cursor: pointer;
    }
    .pre-btn{
      right: -80px;
      top: 250px;
      cursor: pointer;
    }
  }
  .formulas{
    h3{
      text-align: center;
      line-height: 50px;
    }
    p{
      margin-left: 20%;
      line-height: 28px;
    }
    a{
      display: inline-block;
      width: 128px;
      height: 36px;
      border: 1px solid rgb(53,154,240);
      text-align: center;
      line-height: 34px;
      border-radius: 5px;
      position: absolute;
      left:50%;
      bottom: 5%;
      transform: translate(-50%,0);
    }
  }

</style>
