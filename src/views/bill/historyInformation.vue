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
          <h3><i class="icon icon-iden"></i>历史信息</h3>
          <!--<span>佳兆业航运WEWA空间</span>-->
          <Select v-model="communityId" style="width:200px;margin-left: 20px" @on-change="communityChange">
            <Option v-for="community in  RoomBillSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
          </Select>
        </div>
        <div id="historyInfo">
          <div class="historyInfo1">
            <span><b>社区:</b>{{communityName}}</span>
            <span><b>当前公寓租客共计:</b>{{roomCount}}户</span>
          </div>
          <div class="historyInfo2" v-for="(item,index) in bigdata">
            <div class="state1">
              <span>{{item.floorName}}</span><span>层</span><span>{{item.roomCount}}间</span>
              <i :class="[item.hais ? clas:clas2]" @click="shrink(index,item.hais)"></i>
            </div>
            <transition name="el-zoom-in-top" appear="true">
              <ul class="state2 transition-box" v-show='item.hais'>
                <li v-for="its in item.roomList" >
                  <div>
                    <p>{{its.roomNum}}</p>
                    <p>{{its.housetypeName}}</p>
                    <p><Button style="width: 80px;margin-left: 10px;" @click="goToMeter(its.roomId,its.roomNum,its.housetypeName)">抄表历史</Button></p>
                    <p>
                      <Button style="width: 80px;" @click="goToMeter(its.roomId,its.roomNum,its.housetypeName,'2')">历史水电</Button>
                      <Button style="width: 80px;" @click="goToMeter(its.roomId,its.roomNum,its.housetypeName,'3')">历史租金</Button>
                    </p>
                  </div>
                </li>
              </ul>
            </transition>
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
  import { hostState,imgPath,historyList,hostTitle,allCommunity } from '../api.js';
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
        hides:true,
        bigdata:[],
        hide:false,
        clas:'el-icon-arrow-up',
        clas2:'el-icon-arrow-down',
        RoomBillSelects:[],
        roomCount:0,
        communityName:"",
      }
    },
    filters:{

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
        let that = this;
        this.$http.post(hostTitle,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){
            that.communityName = res.data.result.community.communityName;
            that.communityId = res.data.result.community.communityId;
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      //获取所有社区
      getCommunityData(){
        let that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomBillSelects = res.data.entity;
            };
          })
      },
      shrink(index,els){
        let vm =this
        this.$set(vm.bigdata[index],"hais",!vm.bigdata[index].hais);
      },
      datas(){
        let vm = this
        axios.post(historyList,
          qs.stringify({
            communityId:this.communityId
          })
        ) .then((response)=>{
            // console.log(response.data)
            let count = 0;
            if(response.status == 200 && response.data.code == 10000){
              let pageBean = response.data.pageBean;
              this.bigdata = pageBean.page;
              for(let i=0;i<this.bigdata.length;i++){
                this.$set(this.bigdata[i],"hais",true);
                count += this.bigdata[i].roomList.length;
              }
            }
            this.roomCount = count;
            if(response.data.code == 10008){
              this.bigdata = [];
            }
          })
          .catch((error)=>{
            // console.log(error);
          })
      },
      tsa(){
        this.hide = !this.hide;
      },
      communityChange(){
        let vm = this;
        if(this.RoomBillSelects){
          for(let i =0;i<this.RoomBillSelects.length;i++){
            if(this.RoomBillSelects[i].communityId == this.communityId){
              this.communityName = this.RoomBillSelects[i].communityName;
              break;
            }
          }
        }
        vm.datas();
        vm.getCommunityInfo();
      },
      goToMeter(roomId,roomNum,housetypeName,tab){
        sessionStorage.setItem('roomHistoryRoomNum', roomNum);
        sessionStorage.setItem('roomHistoryHousetypeName', housetypeName);
        sessionStorage.setItem('roomHistoryCommunityName', this.communityName);
        this.$router.push({name:"historyMeter",query:{roomId:roomId,tab:tab}})
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
  }
</style>
