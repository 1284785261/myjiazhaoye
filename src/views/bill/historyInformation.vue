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
          <Select v-model="communityId" style="width:200px;margin-left: 20px">
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
            <transition name="el-zoom-in-top">
              <ul class="state2 transition-box" v-show='item.hais'>
                <li v-for="its in item.roomList" >
                  <div>
                    <p>{{its.roomNum}}</p>
                    <p>{{its.housetypeName}}</p>
                    <p>
                      <Button style="width: 80px;" @click="goToMeter()">抄表历史</Button>
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
        communityName:""
      }
    },
    filters:{

    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.communityId = 3;
      //console.log(this.communityId);
      this.getCommunityInfo();
      this.getCommunityData();
      this.datas();

    },
    methods:{
      //获取社区信息
      getCommunityInfo(){
        var that = this;
        this.$http.post(hostTitle,qs.stringify({communityId:this.communityId})).then(function(res){debugger
          if(res.data.code == 10000){
            that.communityName = res.data.result.community.communityName;
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      //获取所有社区
      getCommunityData(){
        var that = this;
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
        //console.log(this.bigdata[index].hais);
      },
      datas(){
        let vm = this
        axios.post(historyList,
          qs.stringify({
            communityId:this.communityId
          })
        ) .then((response)=>{debugger
            var count = 0;
            if(response.status == 200 && response.data.code == 10000){
              var pageBean = response.data.pageBean;
              this.bigdata = pageBean.page;
              for(var i=0;i<this.bigdata.length;i++){
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
            console.log(error);
          })
      },
      tsa(){
        this.hide = !this.hide;
      },
      goToMeter(){
        this.$router.push({name:"historyMeter"})
      }
    },
    watch:{
      communityId:function(newValue,oldValue){debugger
        var vm = this;
        vm.datas();
        vm.getCommunityInfo();
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
  }
</style>
