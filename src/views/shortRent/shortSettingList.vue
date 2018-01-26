<template>
  <div class="shortOrderListClass">
    <div>
      <div class="form-item">
        <b>社区：</b>
        <Select v-model="stationCommunity" style="width:180px">
          <Option v-for="community in  stationSelectList" :value="community.communityId"
                  :key="community.communityId">{{ community.communityName }}
          </Option>
        </Select>
      </div>
      <div class="form-item">
        <b>社区长租名称：</b>
        <Input style="width: 225px;"></Input>
      </div>
      <div class="form-item">
        <Button type="primary" style="width: 120px;height: 36px;" @click="" >查询</Button>
      </div>
      <div class="form-item ">
        <Button type="primary" style="width: 120px;height: 36px;" @click="goToNewShort" >新增</Button>
      </div>
    </div>
    <div class="tableDiv">
      <table class="table ivu-table" >
        <tr>
          <th>社区名称</th>
          <th>长租房名称</th>
          <th>短租房名称</th>
          <th>公寓设施</th>
          <th>服务说明</th>
          <th>房间信息</th>
          <th>操作</th>
        </tr>
        <tr >
          <td>已入住</td>
          <td>123456</td>
          <td>李杨</td>
          <td>13651412541</td>
          <td>标准大床房</td>
          <td>10003</td>
          <td>
            <a>删除</a>
            <a @click="goToNewShort">编辑</a>
            <a @click="openUploadModal">图片上传</a>
          </td>
        </tr>
      </table>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange3" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
        </el-pagination>
      </div>
    </div>


    <div class="upload-modal" v-if="uploadModal" ref="outUploadModal" @click="closeUploadModal()"></div>
    <div class="upload-content uploadModal" v-if="uploadModal" ref="uploadModal">
      <div class="upload-content-title">
        <span>短租户型图片上传</span>
      </div>
      <div class="modal-content-meddle">
        <div class="form-item">
        </div>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-upload-list="false"
          list-type="picture-card"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          multiple
          :limit="10"
          type="drag"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="form-btn-wrap">
        <Button type="primary" style="width: 120px;height: 36px;margin-right: 150px;" @click="closeUploadModal" >提交</Button>
        <Button type="primary" style="width: 120px;height: 36px;" @click="closeUploadModal" >取消</Button>
      </div>
      <div class="modal-close-btn" @click="closeUploadModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import {} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data() {
      let _this = this;
      return {
        activeTabName: "shortRent",//右侧导航栏选中状态
        successModal: false,//成功弹框显示控制
        warningModal: false,//失败弹框显示控制
        successMessage: '',//成功弹框提示消息
        warningMessage: '',//失败弹框提示消息
        selectShow:false,//条件查询显示或隐藏
        stationSelectList:[],//社区列表
        stationCommunity:'',//被选中的社区

        defaultList:[],//默认显示图片
        pageNum:1,//当前页数
        totalNum:0,//总条数

        dialogImageUrl:"",//预览图片URL
        dialogVisible:false,

        uploadModal:false,
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 分页插件
       **/
      handleCurrentChange3(){

      },


      handleFormatError(){
        debugger
      },
      handleMaxSize(){
        debugger
      },
      //文件上传前
      handleBeforeUpload(){

      },
      //文件上传成功时
      handleSuccess(){

      },
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /**
       * 打开创建哑帐弹框
       */
      openUploadModal(){
        this.uploadModal = true;
        setTimeout(() => {//将this.uploadModal = true;渲染完成后，否则找不到节点
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.uploadModal);
            document.querySelector("#app").firstChild.appendChild(this.$refs.outUploadModal);
          })
        }, 0)
      },
      /**
       * 关闭创建哑帐弹框
       */
      closeUploadModal(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.uploadModal);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outUploadModal);
      },
      goToNewShort(){
          this.$router.push({name:"newShortSetting"})
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/shortRent.scss';

  .upload-modal{
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

  .upload-content{
    width: 820px;
    height: 520px;
    min-height:320px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .upload-content-title{
      height: 60px;
      width: 100%;
      font-size: 20px;
      color: #fff;
      background-color:rgb(53,154,240);
      text-align: center;
      line-height: 60px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    .modal-content-meddle{
      padding: 0 20px;
      height: 340px;
      .form-item{
        display: inline-block;

      }
    }
    .form-btn-wrap{
      text-align: center;
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
    //预览图片插件
    .el-dialog{
      width: 880px;
    }
    .el-upload__input{
      display: none;
    }
  }
</style>
