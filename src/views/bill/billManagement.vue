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
          <h3><i class="icon icon-iden"></i>账单管理</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="bill-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="公寓租金账单" name="first">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="model1" style="width:200px">
                    <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="value" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索">
                  </div>
                </div>
              </div>
              <table class="house-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>账单日期</th>
                  <th>所属社区</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th width="150px">承租人</th>
                  <th>承租人电话</th>
                  <th>金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>已支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/bill/billDetail"> 账单详情</router-link>
                    <router-link to="/bill/billDetail"> 查看合同</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="100" show-elevator show-total></Page>
            </el-tab-pane>

            <el-tab-pane label="办公室租金账单" name="second">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="model1" style="width:200px">
                    <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="value" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索">
                  </div>
                </div>
              </div>
              <table class="office-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>账单时间</th>
                  <th>所属社区</th>
                  <th>会议室</th>
                  <th>使用时间</th>
                  <th width="150px">联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>已支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8层 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><router-link to="/bill/billDetail"> 账单详情</router-link></td>
                </tr>
              </table>
              <Page :total="100" show-elevator show-total></Page>
            </el-tab-pane>

            <el-tab-pane label="水电账单" name="third">
              <div class="form-search-criteria">
                <div class="form-item">
                  <Button style="width: 140px;height: 40px;font-size: 18px;" @click="createBill()">生成账单</Button>
                </div>
                <div class="form-item">
                  <a>筛选已出账单</a>
                </div>
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="model1" style="width:200px">
                    <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>开业日期：</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期"></Date-picker>
                </div>
              </div>

              <table class="water-bill-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>出账社区</th>
                  <th>所属社区</th>
                  <th>水费合计/元</th>
                  <th>电费合计/元</th>
                  <th>服务费合计/元</th>
                  <th>合计应收/元</th>
                  <th>租客数/户</th>
                  <th>已收(元/户)</th>
                  <th>待收(元/户)</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
                <tr>
                  <td>2017-02-05  </td>
                  <td>佳兆航运WEVA空间</td>
                  <td>9870.00</td>
                  <td>12210.00</td>
                  <td>1680.00</td>
                  <td>23760.00</td>
                  <td>56</td>
                  <td>14260.00元 36户</td>
                  <td>9500.00元 20户</td>
                  <td>
                    <router-link to="/bill/billDetail">缴费情况</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="100" show-elevator show-total></Page>
            </el-tab-pane>
          </el-tabs>

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
      createBill(){
        this.$router.push({path:"/bill/generateBill"});
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #bill-management-wrap{
    height: 985px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
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

    .house-bill-table,.water-bill-table,.office-bill-table{
      border-collapse:collapse;
      text-align: center;
      th{
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
  }



</style>

