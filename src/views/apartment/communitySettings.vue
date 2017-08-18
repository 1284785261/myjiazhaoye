
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>社区设置</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			    <el-tab-pane label="公寓设置" name="first">
			    	 <div class="vue-warp-settings">
          <div class="ivu-floor floor01">
             <div class="floor-main">
               <span class="fl">付款方式设置：</span>
               <div class="floor-item">
                <table class="table ivu-table">
                  <tr v-for="tableRepair in tableRepairs">
                    <td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                    <td>
                    	<el-select v-model="value1" placeholder="请选择付款方式">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  </el-select>
                    </td>
                   
                    <td><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px"><span class="baifen">%</span></td>
                    <td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
                  </tr>
                </table>
                <div class="add-formItem">
                  <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
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
                    <td>
                    	<el-select v-model="value1" placeholder="请选择维修项目">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  </el-select>
                    </td>
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
          <div class="ivu-floor floor02">
          		<div class="floor-main">
                <span class="fl">家用电器：</span>
                <div class="floor-item form-item">
                   <el-checkbox v-model="checked">床</el-checkbox>
                   <el-checkbox v-model="checked">洗衣机</el-checkbox>
                   <el-checkbox v-model="checked">书桌</el-checkbox>
                   <el-checkbox v-model="checked">空调</el-checkbox>
                   <el-checkbox v-model="checked">电视</el-checkbox>
                   <el-checkbox v-model="checked">衣柜</el-checkbox>
                </div>
              </div>
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
            	<div class="floor-main1">
                <span class="fl">水费设置：</span>
                <span class="f5">计费方式：</span>
                <el-radio-group v-model="radio2">
                	
							    <el-radio :label="1">按用量</el-radio><br>
							    <el-radio :label="2">按合租人数</el-radio>
							  </el-radio-group>
							  <input class="inputs" type="text" v-model="input" placeholder="请填写金额"></input><span>元/m²</span><br>
							  <input class="inputs inputs2" type="text" v-model="input" placeholder="请填写金额"></input><span>元/人</span>
            	</div>
              </div>
          </div>
          <div class="ivu-floor floor03">
            <div class="floor-main">
            	<div class="floor-main1">
                <span class="fl">电费设置：</span>
                <span class="f5">计费方式：</span>
                <el-radio-group v-model="radio2">
                	
							    <el-radio :label="1">按用量</el-radio><br>
							    <el-radio :label="2">按合租人数</el-radio>
							  </el-radio-group>
							  <input class="inputs" type="text" v-model="input" placeholder="请填写金额"></input><span>元/度</span><br>
							  <input  class="inputs inputs2" type="text" v-model="input" placeholder="请填写金额"></input><span>元/人</span>
            	</div>
              </div>
          </div>
          <div class="operation-box">
              <Button type="primary">确定</Button>
              <Button>取消</Button>
          </div>
         </div>
			    </el-tab-pane>
			    <el-tab-pane label="办公设置" name="second">
			    	
			    	<div class="vue-warp-settings">
          <div class="ivu-floor floor01">
             <div class="floor-main">
               <span class="fl">付款方式设置：</span>
               <div class="floor-item">
                <table class="table ivu-table">
                  <tr v-for="tableRepair in tableRepairs">
                    <td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                    <td>
                    	<el-select v-model="value1" placeholder="请选择付款方式">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  </el-select>
                    </td>
                   
                    <td><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px"><span class="baifen">%</span></td>
                    <td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
                  </tr>
                </table>
                <div class="add-formItem">
                  <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
                </div>
              </div>
             </div>
          </div>
          <div class="ivu-floor floor03">
            <div class="floor-main">
              <span class="fl">会议室套餐设置：</span>
              <div class="floor-item">
                <table class="table ivu-table">
                  <tr v-for="tableRepair in tableRepairs">
                    <td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                    <td>
                    	<el-select v-model="value1" placeholder="请选择套餐名称" style="width: 160px">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  	</el-select>
                    </td>
                    <td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span class="baifen2">元/</span></td>
                    <td>
                    	<el-select v-model="value1" placeholder="请选择次数" style="width: 140px" class="tbs">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  	</el-select>
                    </td>
                    <td width="50px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
                  </tr>
                </table>
                <div class="add-formItem">
                  <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
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
                    <td>
                    	<el-select v-model="value1" placeholder="请选择维修项目">
									    <el-option
									      v-for="item in options"
									      :key="item.value1"
									      :labels="item.labels"
									      :value="item.value1">
									    </el-option>
									  </el-select>
                    </td>
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
          <div class="ivu-floor floor02">
          	<div class="floor-main">
                <span class="fl">服务费设置：</span>
                <div class="floor-item form-item">
                   <span class="item-date"><input type="text" placeholder="请输入服务费">元/月 </span>
                </div>
              </div>
          		<div class="floor-main">
                <span class="fl">办公物资：</span>
                <div class="floor-item form-item">
                   <el-checkbox v-model="checked">座机</el-checkbox>
                   <el-checkbox v-model="checked">饮水机</el-checkbox>
                   <el-checkbox v-model="checked">书桌</el-checkbox>
                   <el-checkbox v-model="checked">打印机</el-checkbox>
                   <el-checkbox v-model="checked">投影仪</el-checkbox>
                </div>
             </div>
           </div>
          <div class="operation-box">
              <Button type="primary">确定</Button>
              <Button>取消</Button>
          </div>
         </div>
			    </el-tab-pane>
			  </el-tabs>
        
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>

	import '../../sass/style/communitSetting.css'
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
    	checked:true,
    	input: '',
    	radio2: '1',
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
        options: [{
          value1: '选项1',
          labels: '黄金糕'
        }, {
          value1: '选项2',
          labels: '双皮奶'
        }, {
          value1: '选项3',
          labels: '蚵仔煎'
        }, {
          value1: '选项4',
          labels: '龙须面'
        }, {
          value1: '选项5',
          labels: '北京烤鸭'
        }],
        value1: '',
        selectNum:"",
        deletect:"删除"
      }],
      tableRepairs:[{
        checkValue:"",
        inputValue:"",
        element:"预计上门时间：",
        date:"",
        deletect:"删除"
      }],
      activeName2:'first'
    }
  },
  methods: {
  	handleClick(tab, event){
  		console.log(tab, event);
  	},
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
