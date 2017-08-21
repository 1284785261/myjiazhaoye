<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">管理户型</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>管理户型</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="house-type-management">
          <div style="height: 30px;width: 100%;"></div>
          <table class="house-type-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr>
              <th>序号</th>
              <th>户型</th>
              <th>面积(m³)</th>
              <th>室</th>
              <th>厅</th>
              <th>卫</th>
              <th>窗</th>
              <th>朝向</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input   placeholder="请填写户型名称"></Input></td>
              <td ><Input   placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input   placeholder="请填写户型名称"></Input></td>
              <td ><Input   placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input   placeholder="请填写户型名称"></Input></td>
              <td ><Input   placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input   placeholder="请填写户型名称"></Input></td>
              <td ><Input   placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input   placeholder="请填写户型名称"></Input></td>
              <td ><Input   placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a>复制</a><a style="padding-left: 10px">删除</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td ><Input placeholder="请填写户型名称"></Input></td>
              <td ><Input placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="rootValue" filterable placeholder="请输入或选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #house-type-management{
    height: 985px;
    /*width: 100%;*/
    background-color: #fff;
    box-shadow: 0 3px 3px #ccc;
    .house-type-table{
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

</style>
