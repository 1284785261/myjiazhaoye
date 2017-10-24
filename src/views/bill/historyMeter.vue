
<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <div id="history-meter-wrap">
          <Tabs type="card">
            <Tab-pane label="历史抄表">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>佳兆业社区</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>201 标准大单间</span>
                </div>
                <div class="form-item">
                  <span>操作时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >序号</th>
                  <th>水表读数</th>
                  <th>电表读数</th>
                  <th>抄表类型</th>
                  <th>记录时间</th>
                  <th>操作人</th>
                </tr>
                <tr>
                  <td >1</td>
                  <td>389</td>
                  <td>389</td>
                  <td>自动抄表</td>
                  <td>2017-10-07  10：30</td>
                  <td>系统</td>
                </tr>
                <tr>
                  <td >1</td>
                  <td>389</td>
                  <td>389</td>
                  <td>录入</td>
                  <td>2017-10-07  10：30</td>
                  <td>张三</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </Tab-pane>
            <Tab-pane label="历史水电账单">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>佳兆业社区</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>201 标准大单间</span>
                </div>
                <div class="form-item">
                  <span>操作时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >账单日期</th>
                  <th>水费情况</th>
                  <th>电费情况</th>
                  <th>合计应收（元）</th>
                  <th>租客/联系人</th>
                  <th>状态</th>
                </tr>
                <tr>
                  <td >2017-7-1</td>
                  <td>读数：370 用水量：37m³ 水费：296.00 元</td>
                  <td>读数：370 用电量：37m³ 电费：191.40 元</td>
                  <td>507.40</td>
                  <td>叶晓婷</td>
                  <td>待缴</td>
                </tr>
                <tr>
                  <td >2017-7-1</td>
                  <td>读数：370 用水量：37m³ 水费：296.00 元</td>
                  <td>读数：370 用电量：37m³ 电费：191.40 元</td>
                  <td>507.40</td>
                  <td>叶晓婷</td>
                  <td>待缴</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </Tab-pane>
            <Tab-pane label="历史租金账单">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>佳兆业社区</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>201 标准大单间</span>
                </div>
                <div class="form-item">
                  <span>操作时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table" v-if="roomTotalNum > 0">
                <tr>
                  <th >账单日期</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人手机号</th>
                  <th>租金（元）</th>
                  <th>服务费（元）</th>
                  <th>状态</th>
                </tr>
                <tr>
                  <td >2017/7/7 </td>
                  <td>2017/7/7-2017/8/7</td>
                  <td>叶晓婷</td>
                  <td>13644119411</td>
                  <td>1200</td>
                  <td>100</td>
                  <td>待支付</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomTotalNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无合同内容~</h2>
              </div>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomTotalNum > 0"></Page>
            </Tab-pane>
          </Tabs>
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
  import {allCommunity,roomContract,officeContract,propertyContract} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
        activeTabName:"billManagement",
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

      }
    },
    mounted(){
      this.getCommunityData();
      this.getRoomContract({pageNum:1});
      this.getOfficeContract({pageNum:1});
      this.getPropertyContract({pageNum:1});
    },
    methods: {
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomContractSelects = that.RoomContractSelects.concat(res.data.entity);
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

  #history-meter-wrap{
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
