<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：工作台 > </span>
          <router-link  class="active" to="/apartment/communityManagement">公寓状态</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>联合办公历史账单</h3>
          <!--<span>佳兆业航运WEWA空间</span>-->
          <Select v-model="communityId" style="width:200px;margin-left: 20px" @on-change="communityChange(communityId)">
            <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
          </Select>
        </div>
        <div id="historyInfo">
          <div class="workstate3">
            <div class="stateId">
              <p>办公室</p>
            </div>
            <ul class="detals">
              <li v-for="administ in administrationoffice">
                <div>
                  <span>{{administ.officeHouseNum}}</span>
                  <span>{{administ.officeWorkNum | officeWorkNum}}</span>
                  <span>{{administ.officeRent | officeRent}}</span>
                  <p v-if="administ.cxkjContractSign != null">{{administ.cxkjContractSign.rentArrears | rentArrears}}</p>
                  <p v-else></p>
                  <p v-if="administ.cxkjContractSign != null">租期: {{administ.cxkjContractSign.beginDate | beginDate}} - {{administ.cxkjContractSign.endDate | endDate}}</p>
                  <p v-else></p>
                </div>
                <p class="peiz" v-if="administ.cxkjContractSign != null && administ.officeStatus == 2">
                  {{administ.cxkjContractSign.user.userName}}    {{administ.cxkjContractSign.user.userPhone}}
                  <span>{{administ.cxkjContractSign.companyInfo}}</span>
                </p>
                <p class="peiz peiz1" v-else-if="administ.officeStatus == 0">配置中</p>
                <p class="peiz peiz2" v-else-if="administ.officeStatus == 1">待出租</p>
                <Button style="position: absolute;bottom: 0;" @click="toHistoryBill(administ.officeId,administ.officeHouseNum,administ.officeWorkNum)">历史账单</Button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>

  import '../../sass/style/historyInformation.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import axios from 'axios';
  import { hostState,imgPath,historyList,hostTitle,allCommunity,hostStatusof } from '../api.js';
  import qs from 'qs';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"billManagement",
        communityId:null,
        RoomBillSelects:[],
        communityName:"",
        administrationoffice:null,   //办公室数据
      }
    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.getCommunityData();
      this.getCommunityInfo();
      this.datas();
    },
    methods:{
      //获取社区信息
      getCommunityInfo(){
        var that = this;
        this.$http.post(hostTitle,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){
            that.communityName = res.data.result.community.communityName;
            that.communityId = res.data.result.community.communityId;
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      communityChange(communityId){
        this.datas();
        this.getCommunityInfo();
      },
      //获取所有社区
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomBillSelects = res.data.entity;
              that.communityId = that.$route.query.communityId;
            };
          })
      },

      datas(){//办公室数据
        let vm = this
        axios.post(hostStatusof,qs.stringify({communityId:this.communityId})).then((response)=>{
          if(response.status == 200 && response.data.code == 10000){
            vm.administrationoffice = response.data.entity;
          }else{
            vm.administrationoffice = [];
          }
        }).catch((error)=>{
            // console.log(error);
          })
      },
      toHistoryBill(officeId,officeHouseNum,officeWorkNum){
        sessionStorage.setItem('historyOfficeHouseNum', officeHouseNum);
        sessionStorage.setItem('historyOfficeWorkNum', officeWorkNum);
        sessionStorage.setItem('officeHistoryCommunityName', this.communityName);
        this.$router.push({name:"officeHistoryMeter",query:{officeId:officeId}})
      }
    },
    watch:{
//      communityId:function(newValue,oldValue){
//        var vm = this;
//        if(this.RoomBillSelects){
//          for(var i =0;i<this.RoomBillSelects.length;i++){
//            if(this.RoomBillSelects[i].communityId == newValue){
//              this.communityName = this.RoomBillSelects[i].communityName;
//              break;
//            }
//          }
//        }
//        setTimeout(function(){
//          vm.datas();
//          vm.getCommunityInfo();
//        },10)
//      }
    },
    filters:{
      officeWorkNum(val){
        if(val != null){
          return val+'人间'
        }
        else{
          return false
        }
      },
      officeRent(val){
        if(val != null){
          return '￥'+val.toFixed(2)+'/月'
        }
      },
      beginDate(val){
        var date = new Date(val);
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
      },
      endDate(val){
        var date = new Date(val);
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
      },
      rentArrears(val){
        if(val > 0){
          return '已欠租'+ val +'天';
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

  #historyInfo{
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }

    #workstate .workstate3{
      width: 100%;
      min-height: 460px;
      background: #fff;
      box-shadow: 0 3px 1px #ccc;
      position: relative;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .workstate3 .stateId{
      float: left;
      width: 124px;
      height: 60px;
      text-align: center;
      background: url(../../../static/images/temp/logo2_03.png) no-repeat left 0;
      background-size:contain;
      position: absolute;
      top: 10px;
      color: white;
    }
    .workstate3 .stateId p{
      font-size: 18px;
      line-height: 55px;
      background: #1fbba6;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
    .workstate3 .detals{
      width: 1150px;
      margin-left: 50px;
      margin-top: 100px;
      min-height: 360px;
    }
    .workstate3 .detals li{
      width: 246px;
      height: 200px;
      border: 1px solid #DCDCDC;
      border-radius: 5px;
      float: left;
      margin: 20px;
      font-size: 12px;
      position: relative;
    }
    .workstate3 .detals li div span:nth-child(1){
      font-weight: bold;
      display: inline-block;
      margin: 15px 10px 0 10px;
    }
    .workstate3 .detals li div span:nth-child(2){

      display: inline-block;
      margin: 15px 10px 0 10px;
      color: #c2c2c2;
    }
    .workstate3 .detals li div p:nth-child(4){
      display:block;
      margin: 10px 46px 10px 10px;
      color: #ff3c31;
    }
    .workstate3 .detals li div p:nth-child(5){
      display:block;
      margin-left: 10px;
      color: #666666;
    }
    .workstate3 .peiz{
      width: 100%;
      height: 100px;
      background: #f8f8f8;
      position: absolute;
      bottom: 0;
      padding: 10px;
      color: #333333;
      border-top: 1px solid #DCDCDC;
    }
    .workstate3 .peiz span{
      display: block;
      margin: 10px 0;
    }
    .workstate3 .peiz1{
      line-height: 40px;
      text-align: center;
      color: #1fbba6;
    }
    .workstate3 .peiz2{
      line-height: 40px;
      text-align: center;
      color: #038BE2;
    }
  }
</style>
