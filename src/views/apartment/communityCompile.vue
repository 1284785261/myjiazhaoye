<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link class="active" to="/apartment/communityManagement">社区管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>编辑社区信息</h3>
        </div>
        <div class="compile">
          <table class="cop">
            <tr>
              <td><span class="btxs">*</span>社区名称：</td>
              <td><input type="text" placeholder="请输入社区名称" class="complie_name" v-model="communityName" maxlength="20"></td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>所属公司：</td>
              <td>
                <el-select v-model="Companyvalue" placeholder="请选择所属公司" @change='selectCompany(Companyvalue)' style="width:290px;">
                  <el-option v-for="item in allCompanys" :key="item.id" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>地址：</td>
              <td>
                <el-select v-model="province" placeholder="请选择省" @change='isActive(province)'>
                  <el-option v-for="item in parent" :key="item.areaName" :label="item.areaName" :value="item.areaName">
                  </el-option>
                </el-select>
                <el-select v-model="city" placeholder="请选择市" @change='isActive2(city)'>
                  <el-option v-for="item in parents" :key="item.areaName" :label="item.areaName" :value="item.areaName">
                  </el-option>
                </el-select>
                <el-select v-model="valuem" placeholder="请选择区" @change='isActive3(valuem)'>
                  <el-option v-for="item in countyList" :key="item.areaName" :label="item.areaName" :value="item.areaName">
                  </el-option>
                </el-select><br>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="xiangxi">
                <el-input v-model="communityAddress" placeholder="请填写详细地址" :maxlength=30></el-input>
              </td>
            </tr>
            <tr>
              <td style="padding-right: 15px;"><span class="btxs">*</span>坐标地址 :</td>
              <td class="xiangxi location_community">
                <el-input v-model="coordinate" placeholder="请填写地址经纬度(点击右侧图标到百度地图复制经纬度)"></el-input>
                <div style="display: inline-block;width: 35px;height: 45px;cursor: pointer;"  @click="openMap()"><Icon type="location"></Icon></div>
              </td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>社区类型：</td>
              <td>
                <el-checkbox-group v-model="checkList" @change="types(checkList)">
                  <el-checkbox label="公寓"></el-checkbox>
                  <el-checkbox label="办公空间"></el-checkbox>

                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>开业日期：</td>
              <td>
                <div class="form-item">
                	<!--<Date-picker type="month" placeholder="选择月" style="width: 200px"></Date-picker>-->
                	<!--<Date-picker type="datetime" format="dd" placeholder="选择日期和时间（不含秒）" style="width: 200px"></Date-picker>-->
                  <Date-picker type="date" placeholder="选择开业日期" v-model="communityOpeningDate"></Date-picker>
                </div>
              </td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>社区服务电话：</td>
              <td><input type="text" placeholder="请输入社区服务电话" class="complie_name2" v-model="communityPhone" maxlength="15"></td>
            </tr>
            <tr>
              <td><span class="btxs">*</span>物业合同编号：</td>
              <td><input type="text" placeholder="请输入物业合同编号" class="complie_name3" v-model="communityContractNum" maxlength="20"></td>
            </tr>
            <tr>
              <td>
                <span class="btxs">*</span>租期：
              </td>
              <td>
                <Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
                <span class="inline-block spanBar">-</span>
                <Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="communityLeaseEnd"></Date-picker>
              </td>
            </tr>
            <tr>
              <td>
                <span class="btxs">*</span>免租期：
              </td>
              <td>
                <Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseBegin"></Date-picker>
                <span class="inline-block spanBar">-</span>
                <Date-picker type="date" :options="option2" placeholder="请选择日期" v-model="communityFreeLeaseEnd"></Date-picker>
              </td>
            </tr>
            <tr>
              <td>物业合同签约日期：</td>
              <td>
                <div class="form-item">
                  <Date-picker type="date" placeholder="选择签约日期" v-model="propertySignDate"></Date-picker>
                </div>
                </td>
            </tr>
            <tr>
              <td>业主姓名：</td>
              <td><input type="text" placeholder="请输入业主姓名" class="complie_name3" v-model="propertyContactName" maxlength="20"></td>
            </tr>
            <tr>
              <td>业主联系电话：</td>
              <td><input type="text" placeholder="请输入业主联系电话" class="complie_name3" v-model="propertyContactPhone" maxlength="20"></td>
            </tr>
            <tr>
              <td>社区月租金：</td>
              <td><input type="text" placeholder="请输入社区月租金" class="complie_name3" v-model="propertyRent" maxlength="20"></td>
            </tr>
            <tr>
              <td valign="top" style="line-height: 30px;">
                <span class="btxs">*</span>物业合同：
              </td>
              <td class="bargain">
                <!--<span class="mn">请选择文件<input type="file" class="file" multiple="true" accept=".pdf,.png" @change='uploadFile' /></span>-->
                <!--<span class="md"><i class="el-icon-information"></i>只能上传.pdf,.png文件</span>-->
                <el-upload class="upload-demo" 
                :action='UploadUrl()' 
                :data='data' 
                :on-preview="handlePreview" 
                :on-remove="handleRemove" 
                :file-list="fileList3" 
                :on-success='success' 
                :on-error='error'
                :headers="heads"
                :before-upload="beforeAvatarUpload">
                  <el-button size="small" type="primary" style="font-size: 14px;color: #8fa6bf;">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip"><i class="el-icon-information"></i>只能上传png/pdf文件</div>
                </el-upload>
								<ul v-if='pdfName.length' style="position: absolute;top: 24px;left: 425px;line-height: 26px;">
									<li v-for='(item,index) in pdfName' @click='openItem(item)' style="cursor: pointer;line-height:30px;">查看</li>
								</ul>
              </td>
            </tr>
          </table>
          <div class="operation-box2">
            <!--<el-button type="primary" @click="Complie" v-loading.fullscreen.lock="fullscreenLoading">
                            确定
                        </el-button>-->
            <Button type="primary" @click="Complie" v-if="communityId == '' " :disabled="disabled">确定</Button>
            <Button type="primary" @click="Complie2" v-else :disabled="disabled2">确定</Button>
            <Button @click="gos">取消</Button>
          </div>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
  </div>
</template>

<script>
  import '../../sass/style/communityComplie.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import { hostComplie, hostParent, hostTitle ,host,imgPath,hostaddComplie,Company500150} from '../api.js';
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
        data: {
          module: 'community'
        },
        activeTabName:"communityManagement",
        host3:'',
        successModal: false,
        warningModal: false,
        successMessage: '添加成功',
        warningMessage: '添加信息不完整，请检查添加社区信息',
        fullscreenLoading: false,
        pdfName: [],
        province: '', //省
        city: '', //市
        valuem: '', //区
        areaId: '', //省ID
        parentId: '', //市ID,
        areas: '', //区ID
        input: '',
        checked: true,
        file: null,
        loadingStatus: false,
        parent: [], //省的数据
        parents: [], //市的数据
        countyList: [], //县的数据
        checkList: [], //办公类型
        inputFunc: '',
        communityName: null, //社区名称
        companyId:null,  //所属公司ID
        communityAddress: null, //详细地址
        communityOpeningDate: null, //开业日期
        communityType: '', //社区类型
        communityPhone: null, //社区服务电话
        communityContractNum: null, //物业合同编号
        communityLeaseBegin: null, //租期开始时间
        communityLeaseEnd: null, //租期结束时间
        communityFreeLeaseBegin: null, //免租期开始时间
        communityFreeLeaseEnd: null, //免租期结束时间
        communityContract: '', //物业合同
        propertySignDate:'',
        propertyContactName:'',
        propertyContactPhone:'',
        propertyRent:'',
        communityId:'',
        communityLatitude:null,
        communityLongitude:null,
        coordinate:"",
        fileList3: [],
        disabled:false,
        disabled2:false,
        imgPath:'',
        heads:{
          'Access-Control-Allow-Origin':host
        },
        option1: {
					disabledDate (date) {
						return date && date.valueOf() <= _this.communityLeaseBegin;
					}
				},
				option2: {
					disabledDate (date) {
						return date && date.valueOf() <= _this.communityFreeLeaseBegin;
					}
        },
        allCompanys:null, //获取全部公司的数据
        Companyvalue:null
      }
    },
    mounted() {
    	this.imgPath = imgPath
      this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
      if(this.$route.query.id){
        this.communityId = this.$route.query.id;
        this.befor();
      }
      this.allCompany();
    },
    methods: {
    	gos(){
	    	this.$router.go(-1);
	    },
    	openItem(item){
    		 window.open(imgPath+item,"","width=600,height=600");
		    
      },
      //获取全部所属公司
      allCompany(){
        axios.post(Company500150).then((res)=>{
          if(res.status == 200 && res.data.code == 10000) {
            this.allCompanys = res.data.pageBean;
          }
        })
      },
      //选择公司获取id
      selectCompany(value){
        this.companyId = this.allCompanys[this.allCompanys.findIndex(item => item.name == value)].id;
      },
      befor(){
        let vm = this
        if(this.communityId != ''){
          axios.post(hostTitle,
            qs.stringify({
              communityId:vm.communityId
            }))
            .then((response)=>{
              console.log(response);
              if(response.status == 200 && response.data.code == 10000) {
                vm.communityName = response.data.result.community.communityName;
                vm.province = response.data.result.community.province.areaName;
                vm.areaId = response.data.result.community.province.areaId;
                vm.city = response.data.result.community.city.areaName;
                vm.parentId = response.data.result.community.city.areaId;
                vm.Companyvalue = response.data.result.community.companyName;
                vm.httpPost(vm.parentId, 2);
                vm.valuem = response.data.result.community.district.areaName;
                vm.areas = response.data.result.community.district.areaId;
                vm.communityAddress = response.data.result.community.communityAddress;
                vm.pdfName = response.data.result.community.communityContract.split(',');
                let imgUrl=response.data.result.community.communityContract.split(",");
                for(let k = 0; k < imgUrl.length; k++){
                  let item= {}
                  let len= imgUrl[k].split("/");
                  item.name=len[len.length-1]
                  item.url =imgPath+imgUrl[k]
                  item.status = 'finished'
                  vm.fileList3.push(item)
                }
                if(response.data.result.community.communityType == '0'){
                  vm.checkList.push('公寓');
                  vm.communityType = '0';
                }
                else if(response.data.result.community.communityType == '1'){
                  vm.checkList.push('办公空间');
                  vm.communityType = '1';
                }
                else if(response.data.result.community.communityType == '0,1'){
                  vm.checkList.push('公寓');
                  vm.checkList.push('办公空间');
                  vm.communityType = '0,1';
                }
                vm.communityOpeningDate = response.data.result.community.communityOpeningDate;
                vm.communityPhone= response.data.result.community.communityPhone;
                vm.communityContractNum= response.data.result.community.communityContractNum;
                vm.communityLeaseBegin= response.data.result.community.communityLeaseBegin;
                vm.communityLeaseEnd= response.data.result.community.communityLeaseEnd;
                vm.communityFreeLeaseBegin= response.data.result.community.communityFreeLeaseBegin;
                vm.communityFreeLeaseEnd= response.data.result.community.communityFreeLeaseEnd;
                vm.communityLongitude= response.data.result.community.communityLongitude;
                vm.communityLatitude= response.data.result.community.communityLatitude;
                vm.propertySignDate = response.data.result.community.propertySignDate;
                vm.propertyContactName = response.data.result.community.propertyContactName;
                vm.propertyContactPhone = response.data.result.community.propertyContactPhone;
                vm.propertyRent = response.data.result.community.propertyRent;
                if(vm.communityLongitude && vm.communityLatitude){
                  vm.coordinate =vm.communityLongitude +","+vm.communityLatitude;
                }
              }
            })
            .catch((error)=>{
            })
        }
      },
      handleRemove(file, fileList3) { //删除文件
        let index = this.pdfName.findIndex(item => item == ('/files/community/'+file.name) || item == file.name);
        this.pdfName.splice(index, 1);
      },
      success(response) { //上传文件成功
        if(response.code == 10000) {
          this.pdfName.push(response.result.virtualPath);
        }
      },
      error(err) { //上传文件失败
      },
      handlePreview(file) {
      },
      UploadUrl(){
        return this.host3;
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/png';
        const isPDF = file.type === 'application/pdf';
        if (isPDF || isJPG) {
          
        }
        else{
            this.$message.error('上传文件只能是 PNG 或 PDF 格式!');
        }
        return isPDF || isJPG;
      },
      Complie() {
        let vm = this
        let param = new FormData(); //创建form对象
        vm.communityContract = this.pdfName.join(',');
        vm.disabled = true;
        // console.log(vm.communityContract);
				// console.log(vm.communityOpeningDate)
				// console.log(vm.communityPhone)
				// console.log(vm.communityContractNum)
				// console.log(vm.communityLeaseBegin)
				// console.log(vm.communityLeaseEnd)
				// console.log(vm.communityFreeLeaseBegin)
				// console.log(vm.communityFreeLeaseEnd)
        // console.log(vm.areaId)
        // console.log(vm.communityAddress)
        // console.log(vm.communityType)
        // console.log(vm.parentId)
        // console.log(vm.areas)
        this.communityOpeningDate = new Date(this.communityOpeningDate).Format('yyyy-MM-dd');
        this.communityLeaseBegin = new Date(this.communityLeaseBegin).Format('yyyy-MM-dd');
        this.communityLeaseEnd = new Date(this.communityLeaseEnd).Format('yyyy-MM-dd');
        this.communityFreeLeaseBegin = new Date(this.communityFreeLeaseBegin).Format('yyyy-MM-dd');
        this.communityFreeLeaseEnd = new Date(this.communityFreeLeaseEnd).Format('yyyy-MM-dd');
        this.propertySignDate = new Date(this.propertySignDate).Format('yyyy-MM-dd');
        param.append("communityName", vm.communityName);
        param.append("communityProvince", vm.areaId);
        param.append("companyId",vm.companyId);
        param.append("communityCity", vm.parentId);
        param.append("communityDistrict", vm.areas);
        param.append("communityAddress", vm.communityAddress);
        param.append("communityOpeningDate", vm.communityOpeningDate);
        param.append("communityType", vm.communityType);
        param.append("communityPhone", vm.communityPhone);
        param.append("communityContractNum", vm.communityContractNum);
        param.append("communityLeaseBegin", vm.communityLeaseBegin);
        param.append("communityLeaseEnd", vm.communityLeaseEnd);
        param.append("communityFreeLeaseBegin", vm.communityFreeLeaseBegin);
        param.append("communityFreeLeaseEnd", vm.communityFreeLeaseEnd);
        param.append('communityContract',vm.communityContract);
        param.append('propertySignDate',vm.propertySignDate);
        param.append('propertyContactName',vm.propertyContactName);
        param.append('propertyContactPhone',vm.propertyContactPhone);
        param.append('propertyRent',vm.propertyRent);
        if(vm.coordinate){
          vm.communityLongitude = vm.coordinate.substring(0,vm.coordinate.indexOf(","));
          vm.communityLatitude = vm.coordinate.substring(vm.coordinate.indexOf(",")+1);
        }
        param.append('communityLongitude',vm.communityLongitude);
        param.append('communityLatitude',vm.communityLatitude);
        this.fullscreenLoading = true;
        if(!this.pdfName.length){
          if(!vm.communityContract){
            this.warningMessage = '信息填入不完整，请补充完信息';
            this.warningModal = true;
            return
          }
        }
        if(!vm.parentId || !vm.areas || !vm.companyId || !vm.communityAddress || !vm.communityOpeningDate || !vm.communityType || !vm.communityPhone || !vm.communityContractNum || !vm.communityLeaseBegin || !vm.communityLeaseEnd || !vm.communityFreeLeaseBegin || !vm.communityFreeLeaseEnd || !vm.coordinate) {
          this.fullscreenLoading = false;
          this.warningMessage = '信息填入不完整，请补充完信息';
          this.warningModal = true;
          return
        } else {
          this.$http.post(hostComplie, param).then(res => {

            if(res.status == 200 && res.data.code == 10000) {
              this.successMessage = '添加成功';
              this.successModal = true;
              setTimeout(() => {
                this.successModal = false;
                this.fullscreenLoading = false;
                vm.disabled = false;
                vm.$router.push('/apartment/communityManagement');
              }, 2000);

            } else {
              this.fullscreenLoading = false;
              this.warningMessage = res.data.content;
              this.warningModal = true;
              vm.disabled = false;
            }
          })
            .catch(error => {
              this.warningMessage = '添加失败,服务器出现异常';
              this.warningModal = true;
            })
        }
      },
      Complie2() {
        let vm = this
        vm.disabled2 = true;
        let param2 = new FormData(); //创建form对象
        if(vm.communityId != ''){
          vm.communityContract = this.pdfName.join(',');
          // console.log(vm.communityContract);
          // console.log(vm.communityName);
          // console.log(vm.communityContract);
          // console.log(vm.communityAddress)
          // console.log(vm.communityType)
          // console.log(vm.areaId)
          // console.log(vm.parentId)
          // console.log(vm.areas)
          // console.log(vm.communityContractNum);
          // console.log(vm.communityOpeningDate);
          // console.log(vm.communityPhone);
          // console.log(vm.communityLeaseBegin);
          // console.log(vm.communityLeaseEnd);
          // console.log(vm.communityFreeLeaseBegin);
          // console.log(vm.communityFreeLeaseEnd);
          this.communityOpeningDate = new Date(this.communityOpeningDate).Format('yyyy-MM-dd');
          this.communityLeaseBegin = new Date(this.communityLeaseBegin).Format('yyyy-MM-dd');
          this.communityLeaseEnd = new Date(this.communityLeaseEnd).Format('yyyy-MM-dd');
          this.communityFreeLeaseBegin = new Date(this.communityFreeLeaseBegin).Format('yyyy-MM-dd');
          this.communityFreeLeaseEnd = new Date(this.communityFreeLeaseEnd).Format('yyyy-MM-dd');
          this.propertySignDate = new Date(this.propertySignDate).Format('yyyy-MM-dd');
          param2.append("communityId",vm.communityId);
          param2.append("communityName", vm.communityName);
          param2.append("communityProvince", vm.areaId);
          param2.append("companyId",vm.companyId);
          param2.append("communityCity", vm.parentId);
          param2.append("communityDistrict", vm.areas);
          param2.append("communityAddress", vm.communityAddress);
          param2.append("communityOpeningDate", vm.communityOpeningDate);
          param2.append("communityType", vm.communityType);
          param2.append("communityPhone", vm.communityPhone);
          param2.append("communityContractNum", vm.communityContractNum);
          param2.append("communityLeaseBegin", vm.communityLeaseBegin);
          param2.append("communityLeaseEnd", vm.communityLeaseEnd);
          param2.append("communityFreeLeaseBegin", vm.communityFreeLeaseBegin);
          param2.append("communityFreeLeaseEnd", vm.communityFreeLeaseEnd);
          param2.append('communityContract',vm.communityContract);
          param2.append('propertySignDate',vm.propertySignDate);
          param2.append('propertyContactName',vm.propertyContactName);
          param2.append('propertyContactPhone',vm.propertyContactPhone);
          param2.append('propertyRent',vm.propertyRent);
          if(vm.coordinate){
            vm.communityLongitude = vm.coordinate.substring(0,vm.coordinate.indexOf(","));
            vm.communityLatitude = vm.coordinate.substring(vm.coordinate.indexOf(",")+1);
          }
          param2.append('communityLongitude',vm.communityLongitude);
          param2.append('communityLatitude',vm.communityLatitude);
          this.fullscreenLoading = true;
          if(!this.pdfName.length){
            if(!vm.communityContract){
              this.warningMessage = '信息填入不完整，请补充完信息';
              this.warningModal = true;
              return
            }
          }
          if(!vm.parentId || !vm.areas || !vm.companyId || !vm.communityAddress || !vm.communityOpeningDate || !vm.communityType || !vm.communityPhone || !vm.communityContractNum || !vm.communityLeaseBegin || !vm.communityLeaseEnd || !vm.communityFreeLeaseBegin || !vm.communityFreeLeaseEnd || !vm.coordinate) {
            this.fullscreenLoading = false;
            this.warningMessage = '信息填入不完整，请补充完信息';
            this.warningModal = true;
            return
          } else {
            this.$http.post(hostaddComplie, param2).then(res => {
              if(res.status == 200 && res.data.code == 10000) {
                this.successMessage = '修改成功';
                this.successModal = true;
                setTimeout(() => {
                  this.fullscreenLoading = false;
                  this.successModal = false;
                  vm.disabled2 = false;
                  vm.$router.push('/apartment/communityManagement');
                }, 3000);

              } else {
                this.fullscreenLoading = false;
                vm.disabled2 = false;
                this.warningMessage = res.data.content;
                this.warningModal = true;
              }
            })
              .catch(error => {
                this.warningMessage = '修改失败,服务器出现异常';
                this.warningModal = true;
              })
          }
        }

      },
      openMap(){
        window.open("http://api.map.baidu.com/lbsapi/getpoint/index.html","_blank","width=600,height=500,,scrollbars=no,location=no,top=300,left=400");
      },
      closeWarningModal() {
        this.warningModal = false;
      },
      isActive(value) { //获取市的数据
        if(value){
          this.areaId = this.parent[this.parent.findIndex(item => item.areaName == value)].areaId;
          this.httpPost(this.areaId, 1);
        }
      },
      isActive2(value) { //获取区的数据
        if(value){
          this.parentId = this.parents[this.parents.findIndex(item => item.areaName == value)].areaId;
          this.httpPost(this.parentId, 2);
        }
      },
      isActive3(value) {
        if(value){
          this.areas = this.countyList[this.countyList.findIndex(item => item.areaName == value)].areaId;
        }
      },
      httpPost(id, num) { //获取省市区数据的方法调用
        let Id = parseInt(id);
        let vm = this
        this.$http.post(hostParent,
          qs.stringify({
            'parentId': Id
          })).then((response) => {
          if(num == 1) {
            vm.parents = response.data.result.areaList;
          }
          else if(num == 2) {
            vm.countyList = response.data.result.areaList;
          }
        })
          .catch((error) => {
          })

      },
      types(mw) {
        this.communityType = '';
        for(var i = 0; i < mw.length; i++) {
          if(mw[i] == "公寓" && mw.length == 1) {
            this.communityType = '0';
          } else if(mw[i] == "办公空间" && mw.length == 1) {
            this.communityType = '1';
          } else if(mw.length >= 2) {
            this.communityType = '0,1';
          }
        }
      }
    },
    created() {
      this.$http.post(hostParent, //获取省的数据
        qs.stringify({
          'parentId': 0
        })).then((response) => {
        this.parent = response.data.result.areaList;
      })
    },
    datas() {
      axios.post(hostTitle,
        qs.stringify({
          communityId: vm.communityId
        }))
        .then((response) => {
          if(response.status == 200 && response.data.code == 10000) {
            vm.community = response.data.result.community;

          }
        })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  .location_community{
    .ivu-icon-location{
      font-size: 38px;
      color: red;
      position: relative;
      top: 10px;
      left: 5px;
    }
  }
  .ivu-icon-ios-calendar-outline {
			color: #038be2;
			font-family: "iconfont" !important;
			font-size: 18px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			&:before {
				content: "\e60c";
			}
		}
</style>
