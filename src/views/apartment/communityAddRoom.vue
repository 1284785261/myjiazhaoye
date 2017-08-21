<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">批量添加房间</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>批量添加房间</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="add-room-management">
          <div style="height: 30px;width: 100%;"></div>
          <table class="add-room-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr>
              <th>楼层</th>
              <th>房号</th>
              <th>户型与格局</th>
              <th>家用电器</th>
              <th>水表/水费</th>
              <th>电表/电费</th>
              <th>租金（元/月）</th>
              <th>操作</th>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a @click="modal1=true">床 衣柜 书桌 空调 电视机 洗衣机</a>
              </td>
              <td>
                <a @click="modal2=true">在线 按用量8.00元/m³</a>
              </td>
              <td>
                <a @click="modal3=true">在线 按用量2.2元/度</a>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <p>床 衣柜 书桌 空调 电视机 洗衣机</p>
              </td>
              <td>
                <p>在线 按用量8.00元/m³</p>
              </td>
              <td>
                <p>在线 按用量2.2元/度</p>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <p>床 衣柜 书桌 空调 电视机 洗衣机</p>
              </td>
              <td>
                <p>在线 按用量8.00元/m³</p>
              </td>
              <td>
                <p>在线 按用量2.2元/度</p>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <p>床 衣柜 书桌 空调 电视机 洗衣机</p>
              </td>
              <td>
                <p>在线 按用量8.00元/m³</p>
              </td>
              <td>
                <p>在线 按用量2.2元/度</p>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>床 衣柜 书桌 空调 电视机 洗衣机</a>
              </td>
              <td>
                <a>在线 按用量8.00元/m³</a>
              </td>
              <td>
                <a>在线 按用量2.2元/度</a>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td >
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input   placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <p>床 衣柜 书桌 空调 电视机 洗衣机</p>
              </td>
              <td>
                <p>在线 按用量8.00元/m³</p>
              </td>
              <td>
                <p>在线 按用量2.2元/度</p>
              </td>
              <td>
                <Input   placeholder="请填写租金"></Input>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
          </table>
          <div class="add-item">
            <span>继续添加&nbsp;&nbsp;</span><input v-model="numberLine" style="width: 50px;padding-left: 15px;">&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;&nbsp;<Button>确定</Button>
          </div>
          <div class="house-type-btn">
            <Button type="primary" style="width: 130px;height: 40px">确定</Button>
            <Button style="width: 130px;height: 40px; margin-left: 20px;">取消</Button>
          </div>

          <Modal v-model="modal1" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>电费设置</span>
            </div>
            <div class="modal-content-meddle">
              <p style="margin-bottom: 15px"><b>电表状态 :</b><span style="padding-left: 17px;">在线</span></p>
              <div>
                <div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>
                <div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">
                  <Radio-group v-model="vertical" vertical>
                    <Radio label="count">
                      <span>按用量 </span>
                    </Radio>
                    <Radio label="member">
                      <span>按合租人数 </span>
                    </Radio>
                  </Radio-group>
                </div>
                <div style="display: inline-block;">
                  <div><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/度</span><br></div>
                  <div style="padding-top: 10px"><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="del">确定</Button>
            </div>
          </Modal>

          <Modal v-model="modal2" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>家用电器设置</span>
            </div>
            <div id="appliances-setting" class="modal-content-meddle">
              <table class="appliances-setting-table">
                <tr>
                  <td><Checkbox >床</Checkbox></td>
                  <td><Checkbox >空调</Checkbox></td>
                  <td><Checkbox >电视</Checkbox></td>
                </tr>
                <tr>
                  <td><Checkbox >洗衣机</Checkbox></td>
                  <td><Checkbox >书桌</Checkbox></td>
                  <td><Checkbox >衣柜</Checkbox></td>
                </tr>
              </table>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="del2">确定</Button>
            </div>
          </Modal>

          <Modal v-model="modal3" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>水费设置</span>
            </div>
            <div class="modal-content-meddle">
              <p style="margin-bottom: 15px"><b>水表状态 :</b><span style="padding-left: 17px;">在线</span></p>
              <div>
                <div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>
                <div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">
                  <Radio-group v-model="vertical" vertical>
                    <Radio label="count">
                      <span>按用量 </span>
                    </Radio>
                    <Radio label="member">
                      <span>按合租人数 </span>
                    </Radio>
                  </Radio-group>
                </div>
                <div style="display: inline-block;">
                  <div><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/m³</span><br></div>
                  <div style="padding-top: 10px"><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="del3">确定</Button>
            </div>
          </Modal>

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
        numberLine:1,
        value:"",
        rootValue:"",
        options: [{
          value: '选项1',
          label: '1室'
        }, {
          value: '选项2',
          label: '2室'
        }, {
          value: '选项3',
          label: '3室'
        }, {
          value: '选项4',
          label: '4室'
        }, {
          value: '选项5',
          label: '5室'
        }],
        modal1: false,
        modal2: false,
        modal3: false,
        modal_loading: false,
        vertical: 'count'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      del () {
        this.modal1 = false;
      },
      del2 () {
        this.modal2 = false;
      },
      del3 () {
        this.modal3 = false;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #add-room-management{
    height: 985px;
    /*width: 100%;*/
    background-color: #fff;
    box-shadow: 0 3px 3px #ccc;
    .add-room-table{
      border-collapse:collapse;
      text-align: center;
      th{
        background-color: #f8f8f9;
      }
      th,td{
        border: 1px solid #ccc;
        padding: 15px 10px;
        min-width: 130px;
      }
      tr>th:first-child,tr>td:first-child{
        border-left-width: 0;
      }
      tr>td:last-child,tr>th:last-child{
        border-right-width: 0;
      }
    }

  }
  .add-item{
    margin: 20px 0 0 20px;
    text-align: left;
  }
  .house-type-btn{
    margin: 70px auto;
    text-align: center;
  }

  //弹出框源码修改
  .ivu-modal-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-modal{
      position: relative;
      top: 0;
      .ivu-modal-content{
        .ivu-modal-close{
          right: -30px;
          top: -30px;
          .ivu-icon-ios-close-empty{
            color: #fff;
            background-color: rgba(0,0,0,0.5);
            border-radius: 100%;
            width: 30px;
            height: 30px;
          }
          .ivu-icon-ios-close-empty:before{
            position: absolute;
            left: 9px;
          }
        }
        .ivu-modal-header{
          background-color: #2d8cf0;
          height: 60px;
          color: #fff;
          font-size: 20px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .ivu-modal-body{
          margin:30px 50px 10px 70px;
          text-align: left;
          .ivu-radio-group label:nth-child(2){
            padding-top: 6px;
          }
        }
        .ivu-radio-group-vertical .ivu-radio-wrapper{
            height: 40px;
        }
        .ivu-modal-footer{
          border-top: 0;
          text-align: center;
          padding-bottom: 50px;
        }
      }
    }
  }
  #appliances-setting{
    .ivu-checkbox-wrapper{
      padding-right: 30px;
    }
    .appliances-setting-table{
      margin-left: 50px;
    }
  }


</style>
