<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">订单详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>订单详情</h3>
        </div>
        <div id="contract-detail-wrap">
          <div class="contract-detail-wrap-head">
            <div class="content-item content-item-img">
              <img src="" alt="公寓图片">
            </div>
            <div class="content-item content-item-info">
              <h3 style="margin: 0;padding: 0">佳兆业航运WEWA空间</h3>
              <p class="content-item-info-p1"><span>公寓3层301</span><span>标准大标间</span></p>
              <p class="content-item-info-p2">1800.00 元/月</p>
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
                <h3>待确认</h3>
              </div>
            </div>
          </div>
          <div class="contract-detail-table-wrap">
            <table class="contract-detail-table1" border="1" bordercolor="#ccc" cellspacing="0">
              <tr class="tr1">
                <td class="td1">公寓公司合同:</td>
                <td class="td1 table1-first-td">
                  <span>公寓</span>&nbsp;&nbsp;&nbsp;
                  <span>3层301</span>&nbsp;&nbsp;&nbsp;
                  <span>标准大标间</span>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">租约信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">合同编码 :</td>
                      <td class="td2">GY12345678900</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">租期 :</td>
                      <td class="td2">2017.6.30-2018.6.30(一年)</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">经办人信息:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">姓名 :</td>
                      <td class="td2">叶晓婷</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">证件类型 :</td>
                      <td class="td2">身份证</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">证件号码 :</td>
                      <td class="td2">4408811894507165489</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">联系方式 :</td>
                      <td class="td2">13570276266</td>
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
                      <td class="td2">深圳市向阳花传媒有限公司</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">法人姓名 :</td>
                      <td class="td2">冯潇霆</td>
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
                      <td class="td2">深圳市向阳花传媒有限公司</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">中介人 :</td>
                      <td class="td2">冯潇霆</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">中介费 :</td>
                      <td class="td2" style="color: red">200元</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">首款<br>押二付一，两次付清:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">押金 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">首月租金 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">服务费 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">优惠券代扣 :</td>
                      <td class="td2" style="color: red">-200.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">第一次支付 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">第二次支付 :</td>
                      <td class="td2">3600.00元</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">合计 :</td>
                      <td class="td2" style="font-size: 18px;color: red">7200.00元</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">物资清单:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2">合同编码 :</td>
                      <td class="td2">GY12345678900</td>
                    </tr>
                    <tr class="tr2">
                      <td class="td2">租期 :</td>
                      <td class="td2">2017.6.30-2018.6.30(一年)</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="tr1">
                <td class="td1">已缴租金:</td>
                <td class="td1">
                  <table class="contract-detail-table2">
                    <tr class="tr2">
                      <td class="td2"><b>0/12月</b></td>
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
  import api from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    mounted(){

    },
    data(){
      return{

      }
    },
    methods:{

    }
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
