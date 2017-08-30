
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
        <div id="communitySettingwrap">
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
                            <el-select v-model="value1" placeholder="请选择付款方式"  @change='mus(value1)'>
                              <el-option
                                v-for="item in option1"
													      :key="item.value1"
													      :value="item.dataName">
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
                            <el-select v-model="value2" placeholder="请选择维修项目">
                              <el-option
                                v-for="item in option2"
                                :key="item.value2"
                                :labels="item.labels"
                                :value="item.dataName">
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
                      <el-checkbox v-model="checked" v-for="item in option3">{{item.dataName}}</el-checkbox>
                     
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
                            <el-select v-model="value6" placeholder="请选择付款方式">
                              <el-option
                                v-for="item in option6"
                                :key="item.value6"
                                :value="item.dataName">
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
                            <el-select v-model="value4" placeholder="请选择套餐名称" style="width: 160px">
                              <el-option
                                v-for="item in option4"
                                :key="item.value4"
                                :labels="item.label4"
                                :value="item.dataName">
                              </el-option>
                            </el-select>
                          </td>
                          <td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span class="baifen2">元/</span></td>
                          <td>
                            <el-select v-model="value8" placeholder="请选择次数" style="width: 140px" class="tbs">
                              <el-option
                                v-for="item in option8"
                                :key="item.value8"
                                :value="item.dataName">
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
                            <el-select v-model="value7" placeholder="请选择维修项目">
                              <el-option
                                v-for="item in option7"
                                :key="item.value7"
                                :value="item.dataName">
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
                      <el-checkbox v-model="checked" v-for="item in option5">{{item.dataName}}</el-checkbox>
                     
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
	import { hostWay } from '../api.js';
	import axios from 'axios';
	import qs from 'qs';
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
      		}]
      }],
      option1: [],
      option2: [],
      value1: '',
      value2: '',
      option3: [],
      value3: '',
      option4: [],
      value4: '',
      option5: [],
      value5: '',
      option6: [],
      value6: '',
      option7: [],
      value7: '',
      option8: [],
      value8: '',
      selectNum:"",
      deletect:"删除",
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
  mounted(){
//	this.mus();
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
//  seting(){
//  	let vm = this
//  	axios.post(hostWay,
//  		qs.stringify({
//  			parentId:15
//  		})
//  	).then((response)=>{
//  		//console.log(response);
//  		vm.option2 = response.data.entity;
//  		vm.option7 = response.data.entity;
//  	//	console.log(vm.option2);
//  	})
//  	.catch((error)=>{
//  		console.log(error);
//  	})
//  	axios.post(hostWay,
//  		qs.stringify({
//  			parentId:40
//  		})
//  	).then((response)=>{
//  		//console.log(response);
//  		vm.option8 = response.data.entity;
//  	//	console.log(vm.option2);
//  	})
//  	.catch((error)=>{
//  		console.log(error);
//  	})
//  },
//  seting2(){
//	   	let vm =this
//	    axios.post(hostWay,
//  		qs.stringify({
//  			parentId:19
//  		})
//  	).then((response)=>{
//  		//console.log(response);
//  		vm.option3 = response.data.entity;
//  	//	console.log(vm.option3);
//  	})
//  	.catch((error)=>{
//  		console.log(error);
//  	})
//  	axios.post(hostWay,
//  		qs.stringify({
//  			parentId:26
//  		})
//  	).then((response)=>{
//  		//console.log(response);
//  		vm.option4 = response.data.entity;
//  	//	console.log(vm.option4);
//  	})
//  	.catch((error)=>{
//  		console.log(error);
//  	})
//  	axios.post(hostWay,
//  		qs.stringify({
//  			parentId:29
//  		})
//  	).then((response)=>{
//  		//console.log(response);
//  		vm.option5 = response.data.entity;
//  	//	console.log(vm.option5);
//  	})
//  	.catch((error)=>{
//  		console.log(error);
//  	})
//  
//  },
    mus(vul){
    	let vm = this
    	console.log(111);
	    axios.post(hostWay,
    		qs.stringify({
    			parentId:1
    		})
    	).then((response)=>{
    		console.log(response);
    		vm.option1 = response.data.entity;
    		//vm.option6 = response.data.entity;
    		console.log(vm.option1);
    	})
    	.catch((error)=>{
    		console.log(error);
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
