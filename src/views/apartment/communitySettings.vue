
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/">社区管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>社区设置</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div class="vue-warp-settings">
          <div class="ivu-floor floor01">
             <div class="floor-main">
               <span class="fl">付款方式设置：</span>
               <div class="floor-item">
                 <div class="item-box mar-bt15">
                   <label><span class="myRadio"><input type="radio" name="radio"><i class="icon icon-radio"></i></span> <span class="lb-x">押二付一</span></label>
                   <span class="lb-x">固定租金</span> <span class="item-date"> 限期<input type="text" placeholder="请输入天数">日内交齐</span>
                 </div>
                 <div class="item-box">
                   <label><span class="myRadio"><input type="radio" name="radio"><i class="icon icon-radio"></i></span><span class="lb-x">押一付一 </span> <span class="lb-x">允许管家在签约时设置租金浮动比例</span></label>
                 </div>
               </div>
             </div>
          </div>
          <div class="ivu-floor floor02">
              <div class="floor-main">
                <span class="fl">服务费设置：</span>
                <div class="floor-item form-item">
                   <span class="item-date"><input type="text" placeholder="请输入服务费">元/月 </span>
                </div>
              </div>
              <div class="floor-main">
                  <span class="fl">水电账单日设置：</span>
                  <div class="floor-item">
                    <Date-picker type="date" placeholder="选择日期"></Date-picker>
                    <span class="ivu-yellow"><i class="ivu-icon ivu-icon-information-circled"></i>提醒管家收取水费、电费、服务费</span>
                  </div>
             </div>
            </div>
          <div class="ivu-floor floor03">
            <div class="floor-main">
                <span class="fl">会议室套餐设置：</span>
                <div class="floor-item">
                    <table class="table ivu-table">
                      <tr v-for="tableConference in tableConferences">
                        <td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableConference.checkValue"><i class="icon icon-radio"></i></span></label></td>
                        <td><input class="ivu-input" v-model="tableConference.inputValue" placeholder="请输入套餐名称" style="width: 160px"></td>
                        <td><input class="ivu-input" v-model="tableConference.numValue" placeholder="请输入金额" style="width: 120px"></td>
                        <td><span class="text-default">{{tableConference.element}}</span></td>
                        <td>
                          <Select v-model="selectNum" placeholder="请选择数次" style="width: 120px;">
                            <Option v-for="item in tableConference.numList" :value="item.value" :key="item.value">{{item.label}}</Option>
                          </Select>
                        </td>
                        <td width="90px"><button class="btn_bar" @click="deleteConference">{{tableConference.deletect}}</button></td>
                      </tr>
                    </table>
                    <div class="add-formItem">
                       <Button @click="addRoom"><Icon type="plus"></Icon>继续添加</Button>
                    </div>
                </div>
              </div>
            </div>
          <div class="ivu-floor floor03">
            <div class="floor-main">
              <span class="fl">维修项目设置：</span>
              <div class="floor-item">
                <table class="table ivu-table">
                  <tr v-for="tableRepair in tableRepairs">
                    <td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                    <td><input class="ivu-input" v-model="tableRepair.inputValue" placeholder="请输入维修项目" style="width: 160px"></td>
                    <td><span class="text-default">{{tableRepair.element}}</span></td>
                    <td><input class="ivu-input" v-model="tableRepair.date" placeholder="24小时内" style="width: 120px"></td>
                    <td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
                  </tr>
                </table>
                <div class="add-formItem">
                  <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="operation-box">
              <Button type="primary">确定</Button>
              <Button>取消</Button>
          </div>
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

export default {
  components:{
    rightHeader,
    menuBox,
    footerBox
  },
  data () {
    return {
      tableConferences:[{
          checkValue:"",
          inputValue:"",
          numValue:"",
          element:"元/",
          numList:[{
                value:"num1",
                label:"1"
             },{
               value:"num2",
               label:"2"
             },{
               value:"num3",
               label:"3"
             }],
        selectNum:"",
        deletect:"删除"
      }],
      tableRepairs:[{
        checkValue:"",
        inputValue:"",
        element:"预计上门时间：",
        date:"",
        deletect:"删除"
      }]
    }
  },
  methods: {
    addRoom(){
        this.tableConferences.push({
          checkValue:"",
          inputValue:"",
          numValue:"",
          element:"元/",
          numList:[{
            value:"num1",
            label:"1"
          },{
            value:"num2",
            label:"2"
          },{
            value:"num3",
            label:"3"
          }],
          selectNum:"",
          deletect:"删除"
        })
    },
    addRepairs(){
        this.tableRepairs.push({
          checkValue:"",
          inputValue:"",
          element:"预计上门时间：",
          date:"",
          deletect:"删除"
        })
    },
    deleteConference(item){
        this.tableConferences.splice(item,1);
    },
    deleteRepair(item){
      this.tableRepairs.splice(item,1);
    }
  }
}
</script>



<style lang="scss" rel="stylesheet/scss" >
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import "../../sass/page/communitySettings.scss";
</style>
