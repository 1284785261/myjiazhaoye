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
								<el-select v-model="tableConferen.value1" filterable placeholder="请选择">
									<el-option v-for="item in tableConferen.option1" :key="item.userName +' '+ item.userPhone" :value="item.userName +' '+ item.userPhone">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loading">
										<input type="file" class="upfile" @change="loadfile" accept="image/png,image/jpg">

										<img :src='imgPath + tableConferen.srcs' />
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
								<el-select v-model="item.value2" filterable placeholder="请选择">
									<el-option v-for="ites in item.option2" :key="ites.userName+' '+ites.userPhone" :value="ites.userName+' '+ites.userPhone">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loading2">
										<input type="file" class="upfile" @change="loadfile2($event,index)" accept="image/png,image/jpg">

										<img :src='imgPath + tableConferences.srcs'/>
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
					<ul>
						<li v-for="item in ulsConfer">
							<span>{{item.title}}维修：</span>
							<el-select v-model="item.value3" filterable placeholder="请选择">
								<el-option v-for="ites in item.option3" :key="ites.userName +' '+ ites.userPhone" :value="ites.userName+' '+ites.userPhone">
								</el-option>
							</el-select>
						</li>
						<!--<li style="margin-left: 14px;">
							<span>空调维修：</span>
							<el-select v-model="value8" filterable placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
						<li>
							<span>燃气维修：</span>
							<el-select v-model="value8" filterable placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
						<li>
							<span>热水器维修：</span>
							<el-select v-model="value8" filterable placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>-->
					</ul>
					<p class="xuexian"></p>
					<a class="confirm" style="margin-left: 372px;">确定</a><router-link class="confirm" to="/system/systems">取消</router-link>
				</div>
			</div>
			<footer-box></footer-box>
		</div>

	</div>
</template>

<script>
	import '../../sass/style/staffdeploy.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import axios from 'axios';
	import { hostEmpRelation,hostMaintainRe,host,imgPath } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				tableConferen:{
					option1: [],
					value1: '',
					deletect:'继续添加管家',
					deletect2:'上传照片',
					srcs:'',
					inputValue:''
				},
				tableConferences:[{
					option2: [],
					value2: '',
					deletect:'继续添加管家',
					deletect2:'上传照片',
					srcs:'',
					inputValue:'',
					chen:true
				}],
				ulsConfer:[{
					title:'',
					repairDataId:'',
					type:'',
					option3: [],
					value3: ''
				}],				
				communityId:'',
				host3:'',
				chen:true,
				filelist:[],
				param:{},
				loading:false,
				loading2:false,
				imgPath :imgPath
			}
		},
		mounted() {
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			this.param = new FormData();
			this.communityId = this.$route.query.id;
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
					chen:true
				})
				this.datas();
			},
			addstas(){
				this.ulsConfer.push({
					title:'',
					repairDataId:'',
					type:'',
					option3: [],
					value3: ''
				})
			},
			details(item,index){
				console.log(index);
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
					qs.stringify({
						communityId : this.communityId
					})
				)
				.then((response)=>{
					console.log(response);
					if(response.data.code == 10000 && response.status == 200){
						for(let i = 0;i<response.data.entity.cxkjCommunityUserRelationRepair.length;i++){
							if(this.ulsConfer.length < response.data.entity.cxkjCommunityUserRelationRepair.length){
								this.addstas();
							}
							this.datas();
							this.ulsConfer[i].title = response.data.entity.cxkjCommunityUserRelationRepair[i].dataName;
							this.ulsConfer[i].repairDataId = response.data.entity.cxkjCommunityUserRelationRepair[i].repairDataId;
							this.ulsConfer[i].type = response.data.entity.cxkjCommunityUserRelationRepair[i].type;
						}
						console.log(this.ulsConfer);
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			loadfile(e){
				let vm = this
    			vm.filelist = [];
    			let file = e.target.files[0];
    			let files = [file,file.name];
    			this.filelist.push(files);
    			vm.chen = false;
    			
    			this.param.append('file',file);
    			this.param.append('module','personnel');
    			this.$http.post(vm.host3,vm.param).then(res =>{
    				vm.loading = true
  					console.log(res);
  					if(res.data.code == 10000 && res.status == 200){
//						vm.loading = false;
  						this.tableConferen.srcs = res.data.result.virtualPath;
  					}
					
    			}).catch(err=>{
    				console.log(err);
    			})
			},
			loadfile2(e,index){
				console.log(index)
				let vm = this
    			vm.filelist = [];
    			let file = e.target.files[0];
    			let files = [file,file.name];
    			this.filelist.push(files);
    			this.tableConferences[index].chen = false;
    			
    			this.param.append('file',file);
    			this.param.append('module','personnel');
    			this.$http.post(vm.host3,vm.param).then(res =>{
    				vm.loading2 = true
  					console.log(res);
  					if(res.data.code == 10000 && res.status == 200){
  						vm.loading2 = false;
  						this.tableConferences[index].srcs = res.data.result.virtualPath;
  					}
					
    			}).catch(err=>{
    				console.log(err);
    			})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>