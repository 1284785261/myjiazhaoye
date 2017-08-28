
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
                      <input type="text" placeholder="请输入会员名称">
                    </li>
                    <li>
                      <span>会员手机号 :</span>
                      <input type="text" placeholder="请输入会员手机号">
                    </li>
                    <li>
                      <span>会员等级 :</span>
                      <input type="text" placeholder="请输入会员等级">
                    </li>
                  </ul>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 35px;">查询</Button>
                </div>
              </div>
              <table class="member-management-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>选择</th>
                  <th>会员名称</th>
                  <th>会员手机号</th>
                  <th>会员等级</th>
                  <th>性别</th>
                  <th>创建日期</th>
                  <th>状态</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a @click="openBlackModal()">设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a> 设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a> 设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a> 设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr> <tr>
                <td>
                  <Checkbox v-model="isChecked"></Checkbox>
                </td>
                <td>欧阳宇明</td>
                <td>13633448899</td>
                <td>钻石</td>
                <td>男</td>
                <td>2017-02-05 10:10:05</td>
                <td>正常</td>
                <td>习惯不好，扰邻</td>
                <td>
                  <a> 设为黑名单</a>
                  <router-link to="/member/memberInformation">详情</router-link>
                </td>
              </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a> 设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a> 设为黑名单</a>
                    <router-link to="/member/memberInformation">详情</router-link>
                  </td>
                </tr>


              </table>
              <Page :total="100" show-elevator></Page>
            </Tab-pane>

            <Tab-pane label="黑名单管理">
              <div class="form-search-criteria">
                <div class="form-item">
                  <ul>
                    <li>
                      <span>会员名称 :</span>
                      <input type="text" placeholder="请输入会员名称">
                    </li>
                    <li>
                      <span>会员手机号 :</span>
                      <input type="text" placeholder="请输入会员手机号">
                    </li>
                    <li>
                      <span>会员等级 :</span>
                      <input type="text" placeholder="请输入会员等级">
                    </li>
                  </ul>
                </div>
                <div class="form-item">
                  <Button style="width: 120px;height: 35px;">查询</Button>
                </div>
              </div>
              <table class="member-management-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
                <tr>
                  <th>选择</th>
                  <th>会员名称</th>
                  <th>会员手机号</th>
                  <th>会员等级</th>
                  <th>性别</th>
                  <th>创建日期</th>
                  <th>状态</th>
                  <th>黑名单原因</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a @click="openWhileModal()">设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Checkbox v-model="isChecked"></Checkbox>
                  </td>
                  <td>欧阳宇明</td>
                  <td>13633448899</td>
                  <td>钻石</td>
                  <td>男</td>
                  <td>2017-02-05 10:10:05</td>
                  <td>正常</td>
                  <td>习惯不好，扰邻</td>
                  <td>
                    <a>设为白名单</a>
                    <a>详情</a>
                  </td>
                </tr>
              </table>
              <Page :total="100" show-elevator></Page>
            </Tab-pane>
          </Tabs>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
    <div class="black-member-modal" v-if="blackModal" @click="closeBlackModal()"></div>
    <div class="black-member-modal-content" v-if="blackModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/black-member-1.png">
      </div>
      <p>确定蒋该用户设置为<span>黑名单</span>吗?</p>
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
  import {hostAuthor,hostCommint} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data () {
      return {
        isChecked:true,
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
        model1: '',
        isShow:false,
        blackModal:false,
        whileModal:false,
        tableEvaluates:[{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
        },{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
        },{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
        },{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
        },{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
        }]

      }
    },
    methods: {
      closeBlackModal(){
        this.blackModal = false;
      },
      openBlackModal(){
        this.blackModal = true;
      },
      setBliakMember(){
        this.blackModal = false;
      },
      closeWhileModal(){
        this.whileModal = false;
      },
      openWhileModal(){
        this.whileModal = true;
      },
      setWhileMember(){
        this.whileModal = false;
      }
    },


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

</style>
