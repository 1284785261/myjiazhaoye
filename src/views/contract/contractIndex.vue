
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
          <Tabs type="card">
            <Tab-pane label="公寓合同">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="roomCommunity" style="width:200px">
                    <Option v-for="community in  RoomContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table">
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
                  </td>
                  <td>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:room.contractSignId,isOffice:'0'}}">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="roomTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch"></Page>

            </Tab-pane>

            <Tab-pane label="联合办公合同">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="officeCommunity" style="width:200px">
                    <Option v-for="community in  officeContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeStartDate"></Date-picker>
                  <span class="inline-block spanBar">-</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="officeEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="officeSearchKey" placeholder="搜索联系人或联系电话"></Input>
                    <input type="button" value="搜索" @click="officeSearch()">
                  </div>
                </div>
              </div>
              <table class="table ivu-table">
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
                  </td>
                  <td>
                    <router-link :to="{name:'contractDetail',query:{contractSignId:office.contractSignId,isOffice:'1'}}">查看详情</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="officeTotalNum" :current="officeContractCurrent" :page-size="10" show-elevator show-total @on-change="officeSearch"></Page>
            </Tab-pane>

            <Tab-pane label="物业合同">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <Select v-model="propertyCommunity" style="width:200px">
                    <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </div>
                <div class="form-item">
                  <span>签约时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="propertyStartDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="propertyEndDate"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search" style="margin-left: 0;">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="propertySearchKey" placeholder="搜索用户"></Input>
                    <input type="button" value="搜索" @click="propertySearch()">
                  </div>
                </div>
              </div>
              <table class="table ivu-table">
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
                  <td>{{property.propertySignDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>
                    <p>{{property.communityName}}</p>
                    <p>租期：{{property.communityLeaseBegin | timefilter("yyyy.MM.dd")}}-{{property.communityLeaseEnd | timefilter("yyyy.MM.dd")}}</p>
                  </td>
                  <td>{{property.communityFreeLeaseBegin | timefilter("yyyy.MM.dd")}}-{{property.communityFreeLeaseEnd | timefilter("yyyy.MM.dd")}}</td>
                  <td>{{property.propertyContactName}}</td>
                  <td>{{property.propertyContactPhone}}</td>
                  <td>{{property.propertyRent}}</td>
                  <td>
                    <span v-if="property.propertySignStatus == 0" style="color: #3dc4b2;">履约中</span>
                    <span v-else-if="property.contractState == 1" style="color: #96a5af;">已完结</span>
                  </td>
                  <td>
                    <router-link :to="{name:'communityMessage',query:{id:property.communityId}}">社区信息</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="propertyTotalNum" :current="propertyContractCurrent" :page-size="10" show-elevator show-total @on-change="propertySearch"></Page>
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
            that.officeContractSelects = that.officeContractSelects.concat(res.data.entity);
            that.propertyContractSelects = that.propertyContractSelects.concat(res.data.entity);
          }
        })
    },
    getRoomContract(data){
      var that = this;
      this.$http.get(roomContract,{params:data})
        .then(function(res){debugger
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
        .then(function(res){debugger
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
      this.getOfficeContract(data);debugger
    },

    getPropertyContract(data){
      var that = this;
      this.$http.get(propertyContract,{params:data})
        .then(function(res){debugger
          if(res.status == 200 && res.data.code == 10000){
            var pageBean = res.data.pageBean;
            that.propertyContractList = pageBean.page;
            that.propertyTotalNum = pageBean.totalNum;
          }
          console.log(pageBean.page)
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
      this.getPropertyContract(data);debugger
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
