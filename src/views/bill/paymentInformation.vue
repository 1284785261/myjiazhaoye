<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">水电账单缴费情况</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>水电账单缴费情况</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="pay-information-wrap">
          <div class="pay-information-wrap-head">
            <ul>
              <li>所属社区 :<span style="color: #038be2;font-weight: 700;">佳兆业航运WEWA空间</span></li>
              <li>出账日期 :<span>2017-07-01</span></li>
              <li>全部租客 :<span>{{communityPayStatic.totalCount}}户</span></li>
              <li>待缴 :<span style="color:red;font-weight: 700;">{{communityPayStatic.notyetCount}}户</span></li>
              <li>已缴 :<span style="color:black;font-weight: 700;">{{communityPayStatic.alreadyCount}}户</span></li>
            </ul>
          </div>
          <div class="form-search-criteria">
            <div class="form-item pay-btn-group">
              <span>筛选: </span>
              <Button class="active-btn">全部</Button>
              <Button>待缴</Button>
              <Button>已缴</Button>
            </div>
            <div class="form-item">
              <div class="form-search">
                <i class="iconfont icon-sousuo"></i>
                <Input v-model="value" placeholder="搜索账单联系人或联系电话"></Input>
                <input type="button" value="搜索">
              </div>
            </div>
            <div class="form-item">
              <Button style="width: 180px;height: 30px;">向未缴租客发送缴费提醒</Button>
            </div>
          </div>
          <table class="payment-infirmation-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr class="tr1">
              <th class="th1">房间</th>
              <th class="th1">水电费情况</th>
              <th class="th1">服务费/元</th>
              <th class="th1">合计应收/元</th>
              <th class="th1">租客/联系人</th>
              <th class="th1">联系电话</th>
              <th class="th1">状态</th>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <td class="td2">读数 :<span>370</span></td>
                    <td class="td2">用水量 :<span>37m³</span></td>
                    <td class="td2">水费 :<span>191.40元</span></td>
                  </tr>
                  <tr class="tr2">
                    <td class="td2">读数 :<span>1020</span></td>
                    <td class="td2">用电量 :<span>227度</span></td>
                    <td class="td2">电费 :<span>304.40元</span></td>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1">待缴</td>
            </tr>
          </table>
          <Page :total="100" show-elevator show-total></Page>
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
  import {statisticsInfoOfUser} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeName2: 'first',
        model1:"",
        value:"",
        communityPayStatic:[],
      }
    },
    mounted(){
      var id = this.$route.query.communityId;
      this.getPayStatic({communityId:id})
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getPayStatic(data){
        var that = this;
        this.$http.get(statisticsInfoOfUser,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.communityPayStatic = res.data.entity;
            }
          })
      },
      gotoPayInfo(){
        this.$router.push({path:"/bill/paymentInformation"});
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #pay-information-wrap{
    min-height: 1000px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
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

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .pay-btn-group{
        button{
          width: 80px;
          height: 30px;
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
          margin-left: 108px;
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
            left: 5px;
            top: 7px;
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
            top: 2px;
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

    .bill-title-p{
      padding-left: 20px;
      font-weight: 700;
      padding-bottom: 10px;
    }
  }



</style>

