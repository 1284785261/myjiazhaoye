<template>
	<div class="bugbox">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/system/systems">系统管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>人员配备</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="staffdeploy">
					<table>
						<tr>
							<td style="vertical-align: top;color: #000;font-weight: bold;line-height: 30px;">店长：</td>
							<td>
								<el-select v-model="tableConferen.value1" filterable placeholder="请选择" @change="actives(tableConferen.value1)">
									<el-option v-for="item in tableConferen.option1" :key="item.userName +' '+ item.userPhone" :value="item.userName +' '+ item.userPhone">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loading">
										<input type="file" class="upfile" @change="loadfile" accept="image/png,image/jpg">

										<img :src='imgPath + tableConferen.srcs' v-show="mus"/>
										<span class="iconfont icon-jiahao1" v-if="chen"></span>
										<span class="iconfont icon-jiahao2" v-if="chen"></span>
										<span class="jiahao3" v-if="chen">{{tableConferen.deletect2}}</span>
									</a>
								</div>
								<textarea placeholder="请输入店长介绍" v-model="tableConferen.inputValue"></textarea>
							</td>
						</tr>
					</table>
					<p class="xuexian"></p>
					<table>
						<tr v-for="(item,index) in tableConferences">
							<td style="vertical-align: top;color: #000;font-weight: bold;line-height: 30px;">管家：</td>
							<td>
								<a class="addploy" @click="addstaff" v-if="item.deletect == '继续添加管家'">{{item.deletect}}</a>
								<a class="addploy" @click="details(item,index)" v-else >{{item.deletect}}</a>
								<el-select v-model="item.value2" filterable placeholder="请选择" @change="actives2(item.value2,index)">
									<el-option v-for="ites in item.option2" :key="ites.userName+' '+ites.userPhone" :value="ites.userName+' '+ites.userPhone">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loadList[index]">
										<input type="file" class="upfile" @change="loadfile2($event,index)" accept="image/png,image/jpg">

										<img :src='imgPath + item.srcs' v-show="mus2"/>
										<span class="iconfont icon-jiahao1" v-if="item.chen"></span>
										<span class="iconfont icon-jiahao2" v-if="item.chen"></span>
										<span class="jiahao3" v-if="item.chen">{{item.deletect2}}</span>
									</a>
								</div>
								<textarea placeholder="请输入管家介绍" v-model="item.inputValue"></textarea>
							</td>
						</tr>
						
					</table>
					<p class="xuexian"></p>
					<ul v-show="ulsConfer[0].title != ''">
						<li v-for="(item,index) in ulsConfer">
							<span v-if="item.title != ''">{{item.title}}维修：</span>
							<el-select v-model="item.value3" filterable placeholder="请选择" @change="activem(item.value3,index)" v-if="item.title != ''">
								<el-option v-for="ites in item.option3" :key="ites.userName +' '+ ites.userPhone" :value="ites.userName+' '+ites.userPhone">
								</el-option>
							</el-select>
						</li>
					</ul>
					<p class="xuexian" v-if="ulsConfer[0].title != ''"></p>
					<a class="confirm" style="margin-left: 372px;" @click="confirms">确定</a><router-link class="confirm" to="/system/systems">取消</router-link>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/staffdeploy.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostEmpRelation,hostMaintainRe,host,imgPath,hostAddUserRelation } from '../api.js';
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
			return {
				tableConferen:{
					option1: [],
					value1: '',
					deletect:'继续添加管家',
					deletect2:'上传照片',
					srcs:'',
					inputValue:'',
					id:''
				},
				tableConferences:[{
					option2: [],
					value2: '',
					deletect:'继续添加管家',
					deletect2:'上传照片',
					srcs:'',
					inputValue:'',
					chen:true,
					id:''
				}],
				ulsConfer:[{
					title:'',
					repairDataId:'',
					type:'',
					option3: [],
					value3: '',
					id:''
				}],				
				communityId:'',
				host3:'',
				chen:true,
				filelist:[],
				param:{},
				loading:false,
				loading2:false,
				loadList:[],
				imgPath :imgPath,
				cxkjCommunityUserRelationList:[],
				cxkjCommunityUserRelationRepair:[],
				successModal: false,
				warningModal: false,
				successMessage: '设置成功',
				warningMessage: '',
				mus:false,
				mus2:false
			}
		},
		mounted() {
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			
			this.communityId = this.$route.query.id;
			this.$set(this.loadList,0,false)
			this.datas();
			this.datam();
		},
		filters: {},
		methods: {
			addstaff(){
				this.tableConferences.push({
					option2: [],
					value2: '',
					deletect:'删除',
					deletect2:'上传照片',
					srcs:'',
					inputValue:'',
					chen:true,
					id:''
				})
				this.$set(this.loadList,this.loadList.length,false)
				this.datas();
			},
			addstas(){
				this.ulsConfer.push({
					title:'',
					repairDataId:'',
					type:'',
					option3: [],
					value3: '',
					id:''
				})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			details(item,index){
				this.tableConferences.splice(index,1);
			},
			datas(){
				axios.post(hostEmpRelation)          //员工信息
				.then((response)=>{
					//console.log(response);
					if(response.data.code == 10000 && response.status == 200){
						this.tableConferen.option1 = response.data.entity;
						for(let i = 0 ;i<this.tableConferences.length;i++){
							this.tableConferences[i].option2 = response.data.entity;
						}
						for(let i = 0;i<this.ulsConfer.length;i++){
							this.ulsConfer[i].option3 = response.data.entity;
						}
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			datam(){
				axios.post(hostMaintainRe,
					qs.stringify({          //维修项信息
						communityId : this.communityId
					})
				)
				.then((response)=>{
					console.log(111111111);
					console.log(response);
					if(response.data.code == 10000 && response.status == 200){
						
						if(response.data.entity.cxkjCommunityUserRelationShopowner.length){
							this.tableConferen.srcs = response.data.entity.cxkjCommunityUserRelationShopowner[0].userPic;
							if(this.tableConferen.srcs != ''){
								this.mus = true;
								this.chen = false;
							}
							this.tableConferen.id = response.data.entity.cxkjCommunityUserRelationShopowner[0].userId;
							this.tableConferen.inputValue = response.data.entity.cxkjCommunityUserRelationShopowner[0].userIntro;
							if(response.data.entity.cxkjCommunityUserRelationShopowner[0].userName != null && response.data.entity.cxkjCommunityUserRelationShopowner[0].userPhone != null){
								this.tableConferen.value1 = response.data.entity.cxkjCommunityUserRelationShopowner[0].userName + ' ' +  response.data.entity.cxkjCommunityUserRelationShopowner[0].userPhone;
							}
		
						}
						if(response.data.entity.cxkjCommunityUserRelationHousekeeper.length){
							for(let i = 0;i<response.data.entity.cxkjCommunityUserRelationHousekeeper.length;i++){
							if(this.tableConferences.length < response.data.entity.cxkjCommunityUserRelationHousekeeper.length){
								this.addstaff();
							}
							if(response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPic != null){
								this.tableConferences[i].chen = false;
								this.mus2 = true;
							}
							this.tableConferences[i].id = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userId;
							this.tableConferences[i].inputValue = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userIntro;
							this.tableConferences[i].srcs = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPic;
							if(response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userName != null && response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPhone != null){
								this.tableConferences[i].value2 = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userName + ' ' +  response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPhone;
							}
							
							}
							console.log(this.tableConferences);
						}
						if(response.data.entity.cxkjCommunityUserRelationRepair.length){
							for(let i = 0;i<response.data.entity.cxkjCommunityUserRelationRepair.length;i++){
							if(this.ulsConfer.length < response.data.entity.cxkjCommunityUserRelationRepair.length){
								this.addstas();
							}
							this.datas();
							this.ulsConfer[i].id = response.data.entity.cxkjCommunityUserRelationRepair[i].userId;
							this.ulsConfer[i].title = response.data.entity.cxkjCommunityUserRelationRepair[i].dataName;
							this.ulsConfer[i].repairDataId = response.data.entity.cxkjCommunityUserRelationRepair[i].repairDataId;
							this.ulsConfer[i].type = response.data.entity.cxkjCommunityUserRelationRepair[i].type;
							if(response.data.entity.cxkjCommunityUserRelationRepair[i].userName != null && response.data.entity.cxkjCommunityUserRelationRepair[i].userPhone != null){
								this.ulsConfer[i].value3 = response.data.entity.cxkjCommunityUserRelationRepair[i].userName + ' ' +  response.data.entity.cxkjCommunityUserRelationRepair[i].userPhone;
							}
							
							}
							console.log(11111111111111);
							console.log(this.ulsConfer);
						}
						this.cxkjCommunityUserRelationRepair = response.data.entity.cxkjCommunityUserRelationRepair;
						
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			loadfile(e){      //店长上传头像
				let vm = this
    			vm.filelist = [];
    			let file = e.target.files[0];
    			let param = new FormData();
    			let files = [file,file.name];
    			this.filelist.push(files);
    			vm.chen = false;
    			
    			param.append('file',file);
    			param.append('module','personnel');
    			this.$http.post(vm.host3,param).then(res =>{
    				vm.loading = true
  					console.log(res);
  					if(res.data.code == 10000 && res.status == 200){
  						setTimeout(function(){
  							vm.loading = false;
  							vm.mus = true;
  						},1000)	
  						this.tableConferen.srcs = res.data.result.virtualPath;
  					}
					
    			}).catch(err=>{
    				console.log(err);
    			})
			},
			loadfile2(e,index){  //管家上传头像
				//console.log(index);
				let vm = this
    			vm.filelist = [];
    			let file = e.target.files[0];
    			if(!file){
    				return
    			}
    			let files = [file,file.name];
    			let param = new FormData();
    			this.filelist.push(files);
//  			vm.loadList[index] = true
    			this.$set(this.loadList,index,true)
    			this.tableConferences[index].chen = false;
    			param.append('file',file);
    			console.log(param)
    			this.$http.post(vm.host3,param).then(res =>{
  					if(res.data.code == 10000 && res.status == 200){
						setTimeout(function(){
							vm.$set(vm.loadList,index,false);
							vm.mus2 = true;
						},1000)
  						this.tableConferences[index].srcs = res.data.result.virtualPath;
  					}
					console.log(this.tableConferences);
    			}).catch(err=>{
    				console.log(err);
    			})
			},
			actives(value){
				let str = value.split(' ');
				this.tableConferen.id = this.tableConferen.option1[this.tableConferen.option1.findIndex(item => item.userName == str[0])].userId;
				console.log(this.tableConferen);
			},
			actives2(value,index){
				let str = value.split(' ');
				this.tableConferences[index].id = this.tableConferences[index].option2[this.tableConferences[index].option2.findIndex(item => item.userName == str[0])].userId;
				console.log(this.tableConferences);
			},
			activem(value,index){
				let str = value.split(' ');
				this.ulsConfer[index].id = this.ulsConfer[index].option3[this.ulsConfer[index].option3.findIndex(item => item.userName == str[0])].userId;
				console.log(this.ulsConfer);
			},
			confirms(){
				let vm = this
				this.cxkjCommunityUserRelationList.push({communityId:this.communityId,userId:this.tableConferen.id,userType:0,userPic:this.tableConferen.srcs,userIntro:this.tableConferen.inputValue});
				for(let i = 0 ;i<this.tableConferences.length;i++){
					this.cxkjCommunityUserRelationList.push({communityId:this.communityId,userId:this.tableConferences[i].id,userType:1,userPic:this.tableConferences[i].srcs,userIntro:this.tableConferences[i].inputValue});
				}
				for(let i = 0;i<this.ulsConfer.length;i++){
					this.cxkjCommunityUserRelationList.push({communityId:this.communityId,userId:this.ulsConfer[i].id,userType:2,repairDataId:this.ulsConfer[i].repairDataId});
				}
				
				console.log(this.cxkjCommunityUserRelationList);
				axios.post(hostAddUserRelation,
					{
						cxkjCommunityUserRelationList:this.cxkjCommunityUserRelationList
					}
				).then((res)=>{
					console.log(res);
					this.cxkjCommunityUserRelationList = [];
					if(res.data.code == 10000 && res.status == 200){
						vm.successMessage = '操作成功';
						vm.successModal = true;
						setTimeout(()=>{
							vm.successModal = false;
						},2000)
					}
					else{
						vm.warningMessage = '操作失败，请检查信息';
						vm.warningModal = true;
					}
				}).catch((err)=>{
					
					console.log(err);
					this.cxkjCommunityUserRelationList = [];
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>