<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">订单管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>订单管理</h3>
        </div>
        <div id="order-management-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="工位订单" name="first">
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
              <table class="orderManagement-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th width="120px">订单时间</th>
                  <th>所属社区</th>
                  <th>预订数量</th>
                  <th>使用时间</th>
                  <th width="150px">联系人</th>
                  <th>联系电话</th>
                  <th>订单金额/元</th>
                  <th>使用优惠券</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>新用户收单优惠券29193184012830</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>新用户收单优惠券29193184012830</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>已支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>2</td>
                  <td>2017.03.02</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>--</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
              </table>
              <Page :total="100" show-elevator show-total></Page>
            </el-tab-pane>

            <el-tab-pane label="会议室订单" name="second">
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
              <table class="meeting-order-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
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
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>已支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
                </tr>
                <tr>
                  <td>2017-02-05 14:25</td>
                  <td>佳兆航运WEVA空间</td>
                  <td>8人间 806</td>
                  <td>2017.03.02 14:00-18:00</td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td><a>查看详情</a></td>
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import  '../../sass/page/orderManagement.scss';
</style>
