
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">邀请记录</router-link>
        </div>
        <div id="invite-index-wrap">
          <Tabs type="card" @on-click="changeTab" v-model="activeName">
            <Tab-pane label="邀请记录" name="room">
              <div class="form-search-criteria">
                <div class="form-item">
                  <div class="form-search">
                    <i class="iconfont icon-sousuo"></i>
                    <Input v-model="invitePhoneKey" placeholder="搜索邀请人和邀请人手机号码"></Input>
                    <input type="button" @click="roomSearch()" value="搜索">
                  </div>
                </div>
                <div class="form-item">
                  <span>签约日期：</span>
                  <Date-picker type="date" :options="option4" placeholder="选择日期" format="yyyy-MM-dd HH:mm" v-model="startDate"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" :options="option1" placeholder="选择日期" v-model="endDate"></Date-picker>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 35px;" @click="daochu()">导出</Button>
                </div>
              </div>
              <table class="table ivu-table" v-if="inviteRecordNum > 0">
                <tr>
                  <th >邀请人</th>
                  <th>邀请人手机号码</th>
                  <th>注册人</th>
                  <th>注册人手机号码</th>
                  <th>注册时间</th>
                </tr>
                <tr v-for="item in inviteRecordList">
                  <td>{{item.inviteUserName}}</td>
                  <td>{{item.inviteUserPhone}}</td>
                  <td>{{item.invitedUserName}}</td>
                  <td>{{item.invitedUserPhone}}</td>
                  <td>{{item.createTime|timefilter("yyyy/MM/dd hh:mm")}}</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="inviteRecordNum == 0">
                <img src="../../../static/images/blank/contract_space.png" >
                <h2>暂无邀请记录~</h2>
              </div>
              <Page :total="inviteRecordNum" :current="inviteRecordCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="inviteRecordNum > 0"></Page>

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
  import {allCommunity,roomContract,officeContract,propertyContract,CxkjInviteFriendList300139,CxkjDownloadInviteFriend300142} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      let _this = this;
      return {
        activeName:"room",

        inviteRecordList:[],//公寓合同数据
        inviteRecordNum:0,//公寓合同总条数
        inviteRecordCurrent:1,//公寓合同当前页
        startDate:"",//公寓签约开始时间
        endDate:"",//公寓签约结束时间
        invitePhoneKey:"",//公寓搜索关键字

        option1: {
          disabledDate (date) {
            return date && date.valueOf() < _this.startDate;
          }
        },
        option4: {
          disabledDate(date){
            if(_this.endDate){
              return date &&  _this.endDate < date.valueOf();
            }
          }
        },
      }
    },
    mounted(){
      this.getInviteRecord({pageNum:1});
    },
    methods: {
      changeTab(tab){
        sessionStorage.setItem("contractIndexTab",tab);
      },
      getInviteRecord(data){
        var that = this;
        this.$http.get(CxkjInviteFriendList300139,{params:data})
          .then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.pageBean;
              that.inviteRecordList = pageBean.page;
              that.inviteRecordNum = pageBean.totalNum;
            }
            if(res.data.code == 10008){
              that.inviteRecordList = [];
              that.inviteRecordNum = 0;
            }
          })
      },
      roomSearch(page){
        var data = {
          pageNum:page || 1
        }
        this.inviteRecordCurrent = page || 1;
        if(this.invitePhoneKey){
          data.inviteUserPhone = this.invitePhoneKey;
        }
        if(this.startDate){
          data.beginDate = new Date(this.startDate).Format("yyyy-MM-dd hh:mm");
        }
        if(this.endDate){
          data.endDate = new Date(this.endDate).Format("yyyy-MM-dd hh:mm");
        }
        this.getInviteRecord(data);
      },
      daochu(){
        let url  = CxkjDownloadInviteFriend300142+"?pageName="+this.inviteRecordCurrent;
        if(this.inviteRecordList){
            if(this.invitePhoneKey){
              url = url + "&inviteUserPhone="+this.invitePhoneKey;
            }
            if(this.startDate){
              url = url + "&beginDate="+new Date(this.startDate).Format("yyyy-MM-dd hh:mm");
            }
            if(this.endDate){
              url = url + "&endDate="+new Date(this.endDate).Format("yyyy-MM-dd hh:mm");
            }
            debugger
            window.open(url);
        }
       
      }

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

  #invite-index-wrap{
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
