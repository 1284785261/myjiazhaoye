
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
          <h3><i class="icon icon-iden"></i>社区介绍</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div class="ivu-warp-Community">
            <div class="ivu-main-img">
              <h4>社区图片：</h4>
              <div class="item-img">
                <span class="fl">门面：</span>
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:162px;">
                    <div style="width: 160px;height:120px;line-height:112px;">
                      <Icon type="camera"></Icon>
                    </div>
                  </Upload>
                  <Modal v-model="visible">
                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible">
                  </Modal>
              </div>
              <div class="item-img">
                <span class="fl">办公区：</span>
                <div class="demo-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:162px;">
                  <div style="width: 160px;height:120px;line-height:112px;">
                    <Icon type="camera"></Icon>
                  </div>
                </Upload>
                <Modal v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
              </div>
              <div class="item-img">
                <span class="fl">公寓房间：</span>
                <div class="demo-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:162px;">
                  <div style="width: 160px;height:120px;line-height:112px;">
                    <Icon type="camera"></Icon>
                  </div>
                </Upload>
                <Modal v-model="visible">
                  <div style="text-align:center">
                    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                  </div>
                </Modal>
              </div>
            </div>
       
        <h4 class="bts">详情描述：</h4> 
        <div class="components-container">
        	
			    <div class="info"></div>
			    <!--<button @click="getUEContent()">获取内容</button>-->
			    <div class="editor-container">
			      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
			    </div>
			  </div>
        <button class="confirm">确定</button>
        <button class="call">取消</button>
      </div>  
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>
<script>
	
</script>    
<script>
		

  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
	import UE from '../../components/uedit.vue';
export default {
  components:{
    rightHeader,
    menuBox,
    footerBox,
    UE
  },
  data () {
    return {
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      defaultMsg: '',
      config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
      }
      }
    
  },
  methods: {
  	getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
   	},
    handleView (name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      // 因为上传过程为实例，这里模拟添加 url
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传 5 张图片。'
        });
      }
      return check;
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
  }
}
</script>



<style lang="scss" rel="stylesheet/scss" >
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityPresentation.scss';
  
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .components-container{
  	margin-left: 10%;
  	width: 1000px;
  	margin-bottom: 50px;
  	
  }
  #edui1_iframeholder{
  	height: 240px!important;
  }
  .bts{
  	display: inline-block;
  	position: absolute;
  	left: 0;
  	top: 600px;
  	padding-left: 91px;
  	font-size: 14px;
  	color: black;
  	font-weight: bold;
  }
  .confirm{
  	width: 140px;
  	height: 40px;
  	border: none;
  	border-radius: 5px;
  	background: #038be2;
  	color: white;
  	line-height: 40px;
  	text-align: center;
  	margin-left: 500px;
  	margin-right: 30px;
  }
  .call{
  	width: 140px;
  	height: 40px;
  	border: none;
  	border: 1px solid #666;
  	border-radius: 5px;
  	background: #f8f8f8;
  	color: #666666;
  	line-height: 40px;
  	text-align: center;
  }
  #right-content{
  	padding-bottom: 80px!important;
  }
  .ivu-modal-footer{
  	display: none;
  }
  .ivu-modal{
  	width: 800px!important;
  	height: 600px;
  }
  .ivu-modal-close{
  	display: inline-block;
  	background: #333333;
  	width: 30px;
  	border-radius: 50%;
  	text-align: center;
  	position: absolute;
  	top: -5%;
  	right: -5%;
  }
  
  .ivu-modal-body{
  	width: 800px;
  	height: 600px;
  	overflow: hidden;
  }
  .ivu-modal-body div img {
  	width: 100%;
  	height: 550px;
  }
</style>
