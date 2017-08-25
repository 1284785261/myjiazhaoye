<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">生成水电账单</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>生成水电账单</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="pay-information-wrap">
          <div class="form-search-criteria">
            <div class="form-item">
              <b>社区：</b>
              <Select v-model="model1" style="width:200px">
                <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
              </Select>
            </div>
            <div class="form-item">
              当前公寓共合计 : <span style="font-weight: 700;color: black;">56户</span>
            </div>
            <div class="form-item right-btn-group">
              <Button style="width: 100px;height: 30px;">抄表</Button>
              <Button style="width: 180px;height: 30px;margin-left: 30px;">请保存正在编辑的账单</Button>
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
              <th class="th1">操作</th>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>
            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>

            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>

            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>

            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>

            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a @click="editBill()">修改账单</a></td>
            </tr>

            <tr class="tr1">
              <td class="td1">201</td>
              <td class="td1">
                <table class="table2">
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>370</span></td>
                      <td class="td2">用水量 :<span>37m³</span></td>
                      <td class="td2">水费 :<span>191.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text" value="370"/></td>
                      <td class="td2">用水量 :<input type="text" value="37"/>m³</td>
                      <td class="td2">水费 :<input type="text" value="191.40"/>元</td>
                    </template>
                  </tr>
                  <tr class="tr2">
                    <template v-if="true">
                      <td class="td2">读数 :<span>1020</span></td>
                      <td class="td2">用电量 :<span>227度</span></td>
                      <td class="td2">电费 :<span>304.40元</span></td>
                    </template>
                    <template v-else>
                      <td class="td2">读数 :<input type="text"value="1020"></td>
                      <td class="td2">用电量 :<input type="text" value="227"/>度</td>
                      <td class="td2">电费 :<input type="text" value="304.40"/>元</td>
                    </template>
                  </tr>
                </table>
              </td>
              <td class="td1">100.00</td>
              <td class="td1">591.80</td>
              <td class="td1">赵明宇</td>
              <td class="td1">13633448899</td>
              <td class="td1"><a id="test" name="aaaa" @click="editBill()">修改账单</a></td>
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
  import api from '../api.js';


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
        communitys: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      gotoPayInfo(){
        this.$router.push({path:"/bill/paymentInformation"});
      },
      editBill(){
        document.getElementById("test").text
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

    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
      .form-item{
        display: inline-block;
        margin-right: 20px;
      }
      .right-btn-group{
        position: absolute;
        right: 0;
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
          input{
            width: 70px;
            height: 30px;
            margin: 5px;
            padding: 0 5px;
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

