
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
        <div id="member-management-wrap">
          <Tabs type="card">
            <Tab-pane label="会员管理">
              <div class="form-search-criteria">
                <div class="form-item">
                  <ul>
                    <li>
                      <span>会员名称 :</span>
                      <input type="text" placeholder="请输入会员名称" v-model="memberName">
                    </li>
                    <li>
                      <span>会员手机号 :</span>
                      <input type="text" placeholder="请输入会员手机号" v-model="memberPhone">
                    </li>
                    <!--<li>-->
                      <!--<span>会员等级 :</span>-->
                      <!--<input type="text" placeholder="请输入会员等级" v-model="memberGrade">-->
                    <!--</li>-->
                  </ul>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 35px;" @click="pageSearch()">查询</Button>
                </div>
              </div>
              <table class="member-management-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>会员名称</th>
                  <th>会员手机号</th>
                  <th>性别</th>
                  <th>创建日期</th>
                  <th>状态</th>
                  <th>备注</th>
                  <th>操作{{memberCurrent}}</th>
                </tr>
                <tr v-for="(item,index) in  memberList">
                  <td>{{item.userName}}</td>
                  <td>{{item.userPhone}}</td>
                  <td>
                    <span v-if="item.gender==1">男</span>
                    <span v-else>女</span>
                  </td>
                  <td>{{item.createtime| timefilter("yyyy-MM-dd hh:mm:ss")}}</td>
                  <td>
                    <span v-if="item.userBlacklist==1" style="color: red;">黑名单</span>
                    <span v-else>正常</span>
                  </td>
                  <td>{{item.cxkjCenterBlacklist?item.cxkjCenterBlacklist.note:"--"}}</td>
                  <td>
                    <a @click="openBlackModal(item.id,index)" v-if="item.userBlacklist!=1">设为黑名单</a>
                    <router-link :to="{name:'memberInformation',query:{id:item.id}}">详情</router-link>
                  </td>
                </tr>
              </table>
              <Page :total="memberTotalNum" :current="memberCurrent" :page-size="10" show-elevator show-total @on-change="pageSearch"></Page>
            </Tab-pane>

            <Tab-pane label="黑名单管理">
              <div class="form-search-criteria">
                <div class="form-item">
                  <ul>
                    <li>
                      <span>会员名称 :</span>
                      <input type="text" placeholder="请输入会员名称" v-model="blackMemberName">
                    </li>
                    <li>
                      <span>会员手机号 :</span>
                      <input type="text" placeholder="请输入会员手机号" v-model="blackMemberPhone">
                    </li>
                    <!--<li>-->
                      <!--<span>会员等级 :</span>-->
                      <!--<input type="text" placeholder="请输入会员等级">-->
                    <!--</li>-->
                  </ul>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 35px;" @click="blackPageSearch()">查询</Button>
                </div>
              </div>
              <table class="member-management-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th style="width:80px;">选择</th>
                  <th>会员名称</th>
                  <th>会员手机号</th>
                  <th>性别</th>
                  <th>创建日期</th>
                  <th>状态</th>
                  <th>黑名单原因</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item,index) in  blackMemberList">
                  <td style="width:80px;">
                    <div @click="checkAllSelect(index,item.isChecked)"><Checkbox label="item.isChecked" v-model="item.isChecked"></Checkbox></div>
                  </td>
                  <td>{{item.userName}}</td>
                  <td>{{item.userPhone}}</td>
                  <td>
                    <span v-if="item.gender==1">男</span>
                    <span v-else>女</span>
                  </td>
                  <td>{{item.createtime| timefilter("yyyy-MM-dd hh:mm:ss")}}</td>
                  <td>
                    <span v-if="item.userBlacklist==1" style="color: red;">黑名单</span>
                    <span v-else>正常</span>
                  </td>
                  <td>{{item.cxkjCenterBlacklist?item.cxkjCenterBlacklist.note:"--"}}</td>
                  <td>
                    <a @click="openWhileModal(item.cxkjCenterBlacklist.blacklistId,index)">设为白名单</a>
                  </td>
                </tr>
              </table>
              <div class="all-select-wrap">
                <div @click="selectAll" style="display: inline-block"><Checkbox label="全选" v-model="checkAllStatus">全选</Checkbox></div>
                <Button style="width: 120px;height: 30px;" :disabled="checkBtnStatus"  @click="setAllWhile()">批量设为白名单</Button>
              </div>
              <Page :total="blackMemberTotalNum"  :current="blackMemberCurrent"  :page-size="10" show-elevator show-total @on-change="blackPageSearch"></Page>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
    <div class="black-member-modal" v-if="blackModal" @click="closeBlackModal()"></div>
    <div id="black-member"  class="black-member-modal-content" v-if="blackModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/black-member-1.png">
      </div>
      <p>确定蒋该用户设置为<span>黑名单</span>吗?</p>
      <div class="modal-reason-wrap">
        <span>备注 :</span>
        <textarea name="remarks" style="width:160px;height: 70px;resize: none;" placeholder="请输入原因" v-model="remarks"></textarea>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="setBliakMember()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeBlackModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div class="black-member-modal" v-if="whileModal" @click="closeWhileModal()"></div>
    <div class="black-member-modal-content" v-if="whileModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/black-member-2.png">
      </div>
      <p>确定蒋该用户设置为<span>白名单</span>吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="setWhileMember()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeWhileModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>
  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {memberTable,editBlacklist,eemberInformation,editWhilelist} from '../api.js';
  import qs from 'qs';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
        isChecked:true,
        blackModal:false,
        whileModal:false,

        memberName:"",
        memberPhone:"",
        memberList:[],
        memberTotalNum:0,
        memberCurrent:2,
        memberId:null,
        remarks:"",

        blackMemberList:[],
        blackMemberTotalNum:0,
        blackMemberName:"",
        blackMemberPhone:"",
        checkAllStatus:false,
        blackMemberCurrent:1,

      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        this.getmemberTable({pageNum:1});
        this.getBlackMemberTable({pageNum:1,userBlacklist:1});
        this.blackMemberCurrent = 1;
        this.memberCurrent = 1;
        },
      //会员列表
      getmemberTable(params){
        var that = this;
        this.$http.post(memberTable,qs.stringify(params))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.entity;
              that.memberList = pageBean.page;
              that.memberTotalNum = pageBean.totalNum;
            }
            if(res.data.code == 10004){
              that.memberList = [];
              that.memberTotalNum = 0;
            }
        })
      },
      //会员搜索
      pageSearch(page){
        var params = {
          pageNum:page || 1,
        }
        if(this.memberName){
          params.userNameLike = this.memberName;
        }
        if(this.memberPhone){
          params.userPhoneLike = this.memberPhone;
        }
        this.getmemberTable(params);debugger
      },
      //黑名单列表
      getBlackMemberTable(params){
        var that = this;
        this.$http.post(memberTable,qs.stringify(params))
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.entity;
              that.blackMemberList = pageBean.page;
              that.blackMemberTotalNum = pageBean.totalNum;
              for(var i =0;i<that.blackMemberList.length;i++){
                that.$set(that.blackMemberList[i],"isChecked",false);
              }
            }
            if(res.data.code == 10004){
              that.blackMemberList = [];
              that.blackMemberTotalNum = 0;
            }
          })
      },
      //黑名单搜索
      blackPageSearch(page){
        var params = {
          pageNum:page || 1,
          userBlacklist : 1
        }
        if(this.blackMemberName){
          params.userNameLike = this.blackMemberName;
        }
        if(this.blackMemberPhone){
          params.userPhoneLike = this.blackMemberPhone;
        }
        this.getBlackMemberTable(params);
      },

      closeBlackModal(){
        this.blackModal = false;
      },
      openBlackModal(id){
        this.blackModal = true;
        this.memberId = id;
      },
      //设置为黑名单
      setBliakMember(){
          var vm = this;
        this.blackModal = false;
        var params = {
          userId:this.memberId,
          note:this.remarks
        };
        this.remarks = "";
        this.$http.post(editBlacklist,qs.stringify(params))
          .then(function(res){
            vm.init()
          })
      },
      closeWhileModal(){
        this.whileModal = false;
      },

      openWhileModal(blacklistId,index){
        this.whileModal = true;
        this.blacklistId = blacklistId;
      },
      //设置为白名单
      setWhileMember(){
        var vm = this;
        this.whileModal = false;
        var params = [{
          blacklistId:this.blacklistId,
        }]
        this.$http.post(editWhilelist,{cxkjCenterBlacklist:params})
          .then(function(res){
            vm.init()
          })
      },
      //批量设置白名单
      setAllWhile(){
        var vm = this;
        var params = []
        console.log(this.blackMemberList);
        for(var i = 0;i<this.blackMemberList.length;i++){
          params.push({blacklistId:this.blackMemberList[i].cxkjCenterBlacklist.blacklistId})
        }debugger
        this.$http.post(editWhilelist,{cxkjCenterBlacklist:params})
          .then(function(res){
            vm.checkAllStatus = false;
            vm.init()
          })
      },
      //单选事件
      selectAll(){
        if(!this.checkAllStatus){
          for(var i = 0;i<this.blackMemberList.length;i++){
            this.$set(this.blackMemberList[i],"isChecked",true);
          }
        }else{
          for(var i = 0;i<this.blackMemberList.length;i++){
            this.$set(this.blackMemberList[i],"isChecked",false);
          }
        }
        this.checkAllStatus = !this.checkAllStatus;
      },
      //全选事件
      checkAllSelect(index,isChecked){
        this.blackMemberList[index].isChecked = !isChecked;
        var flag = true;
        for(var i = 0;i<this.blackMemberList.length;i++){
          if(!this.blackMemberList[i].isChecked){
            flag = false;
            break;
          }
        }
        if(this.blackMemberList.length){
          this.checkAllStatus = flag;
        }else{
          this.checkAllStatus = false;
        }
        console.log(flag)
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
    computed:{
      checkBtnStatus:function(){
        var flag = true;//假设一个没选
        for(var i = 0;i<this.blackMemberList.length;i++){
          if(this.blackMemberList[i].isChecked){
            flag = false;
            break;
          }
        }
        if(this.blackMemberList.length > 0){
          return flag;
        }else{
          return true;
        }
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #member-management-wrap{
    min-height: 1000px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
    }
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .ivu-tabs-content{
      background-color: #fff;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container{
      height: 54px;
    }
    .ivu-tabs-nav-container{
      background-color: rgb(244,244,244);
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
      width: 160px;
      height: 53px;
      text-align: center;
      line-height: 52px;
      padding: 0;
      border-radius: 10px 10px 0 0;
      margin-right: 10px;
      @include fontSzie(18px,#666);
      &.ivu-tabs-tab-active{
        background-color: #038be2;
        color:#fff;
      }
    }
    .form-item{
      display: inline-block;
      margin-right: 20px;
      .form-search{
        position: relative;
        right: 0;
        .ivu-input-wrapper{
          width: auto;
        }
      }
      ul{
        li{
          display: inline-block;
          margin-right: 30px;
          input[type=text]{
            width: 180px;
            height: 35px;
            padding: 0 5px;
            margin-left: 10px;
          }
          span{
            color: black;
            font-weight: 700;
          }
        }
      }
    }
    .form-search-criteria{
      position: relative;
      padding: 21px 0 21px 20px;
    }

    .ivu-select-single .ivu-select-selection{
      height: 36px;
      border-radius: 0;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 36px;
      line-height: 36px;
    }
    .ivu-input-icon-normal+.ivu-input{
      height: 36px;
      border-radius: 0;
    }

    .ivu-date-picker-editor{
      input{
        width: 140px;
      }
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
    table{
      border-collapse: collapse;
      border-spacing: 0;
    }

    .ivu-page{
      margin: 50px 0 160px 0;
      text-align: center;
    }

    .ivu-modal-footer{
      text-align: center;
      .ivu-btn{
        background-color: #f8f8f8;
        @include fontSzie(14px,#666);
        border: 1px solid #dcdcdc;
        width: 90px;
        height: 30px;
        padding: 0;
        text-align: center;
      }
      .ivu-btn-primary{
        background-color: #038be2;
        color:#fff;
        border: none;
      }
    }

    .ivu-tabs-tabpane{
      width: 100%;
      height: 100%;
      background-color: #fff;

    }
    .ivu-btn-export{
      width: 68px;
      height: 36px;
      @include fontSzie(14px,#666);
    }
    .table{
      .text-default{
        color: #666;}
    }


    .member-management-table{
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
  }

  .black-member-modal{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.4);
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }
  .black-member-modal-content{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        width: 32px;
        height: 32px;
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
      span{
        color: #038be2;
        font-weight: 700;
        padding: 0 10px;
      }
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
    .modal-close-btn{
      position: absolute;
      top: -36px;
      right: -36px;
      width: 36px;
      height: 36px;
      color: #fff;
      background-color:rgba(0,0,0,0.7) ;
      border-radius: 100%;
      text-align: center;
      font-size: 36px;
      cursor: pointer;
      i{
        position: relative;
        top: -8px;
      }
    }
  }
  #black-member{
    height: 270px;
    .modal-reason-wrap{
      margin-top: 20px;
      text-align: center;
      height: 70px;
      span{
        position: relative;
        top: -50px;
        font-weight: 700;
        color: black;
      }
    }
  }
  .all-select-wrap{
    margin-left: 28px;
    margin-top: 10px;
  }

</style>
