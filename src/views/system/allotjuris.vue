<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box mps">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/system/systems">系统管理</router-link>
				</div>
				<el-tabs v-model="activeName2" type="card">
					<el-tab-pane label="权限配置" name="first">
						<div class="allotjuris">
							<div class="allotjur">
								<img src="../../../static/images/icon/iden.png" /> <span>PC权限管理</span>
							</div>
							<div class="allotjur2">
								<span>权限组名称：</span><input type="text" v-model="name" />
							</div>
							<table>
								<tr v-for="(item,index) in loderList">
									<td>
										<Checkbox v-model="item.singd" @click.prevent.native="handleCheckAll(item,index)"><span>{{item.powerItemName}}</span></Checkbox>
									</td>
									<td>
										<Checkbox v-for="(ite,inde) in item.powerItemChildList" v-model="ite.sing" @on-change="checkAllGroupChange(item,inde)"><span>{{ite.powerItemName}}</span></Checkbox>
									</td>
								</tr>
							</table>

							<a class="tjss" @click="addcommunis" v-if="jurisdiction('STAFF_UPDATE') || jurisdiction('STAFF_INCREASE')">确定</a>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<footer-box></footer-box>
		</div>

		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>
<script>
	import '../../sass/style/allotjuris.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import { hostAllocation,hostAddToManagement } from '../api.js';
	import axios from 'axios';
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
				activeTabName:"systems",
				sings:true,
				single:false,
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				activeName2: 'first',
				loderList: [],
				powerId: '',
				name: '',
				list:[],
				list2:[],
				lins:[]
			}
		},
		mounted() {
			this.powerId = this.$route.query.id;
			this.datas();
		},
		methods: {
			datas() {
				axios.post(hostAllocation,
					qs.stringify({
						powerId: this.powerId
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.loderList = res.data.entity.powerItemList;
						this.name = res.data.entity.powerName;
						
						if(res.data.entity.powerItem){
							this.lins = res.data.entity.powerItem.split(",");
							console.log(this.lins);
						}
						let a = 0;
						let arr = [];
						let arr2 = [];
						let arr3 = [];
						for(let i = 0; i < this.loderList.length; i++) {
							this.$set(this.loderList[i], "singd", false);
							for(let m = 0; m < this.loderList[i].powerItemChildList.length; m++){
								this.$set(this.loderList[i].powerItemChildList[m], "sing", false);
							}
						}
						console.log(this.loderList);
						for(let i = 0; i < this.loderList.length; i++) {
							for(let s = 0; s < this.loderList[i].powerItemChildList.length;s++){
								for(let m = 0; m < this.lins.length; m++){
									if(this.loderList[i].powerItemChildList[s].powerItemId == this.lins[m]){
										this.$set(this.loderList[i].powerItemChildList[s], "sing", true);	
									}
								}
							}	
						}
						for(let i = 0; i < this.loderList.length;i++){
							for(let s = 0; s < this.loderList[i].powerItemChildList.length;s++){
								if(this.loderList[i].powerItemChildList[s].sing != true){
									this.$set(this.loderList[i], "singd", false);
								}
								else{
									this.$set(this.loderList[i], "singd", true);
								}
							}
						}
						console.log(this.loderList);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			handleCheckAll(item,index) { //权限全选
				console.log(item);
				item.singd = ! item.singd;
				if(this.loderList[index].singd == true) {
					for(let i = 0; i < this.loderList[index].powerItemChildList.length; i++) {
						this.$set(this.loderList[index].powerItemChildList[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.loderList[index].powerItemChildList.length; i++) {
						this.$set(this.loderList[index].powerItemChildList[i], "sing", false);
					}
				}
			},
			checkAllGroupChange(item, index) { //权限单选
				console.log(item);
				console.log(index);
				var flag = true;
				for(let i = 0; i < item.powerItemChildList.length; i++) {
					if(item.powerItemChildList[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				// let ins = flag.findIndex(fla=>fla == true)
				// if(ins >= 0){
				// 	item.singd = true
				// }else{
				// 	item.singd = false
				// }
				if(item.powerItemChildList.length) {
					item.singd = flag;
				} else {
					item.singd = false;
				}
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			addcommunis(){
				this.list2 = [];
				for(let i = 0;i<this.loderList.length;i++){
					for(let m = 0;m < this.loderList[i].powerItemChildList.length;m++){
						if(this.loderList[i].powerItemChildList[m].sing == true){
							this.list2.push(this.loderList[i].powerItemChildList[m].powerItemId);
						}
					}					
				}
				console.log(this.list2);
				let str = '';
				str = this.list2.join(",");
				axios.post(hostAddToManagement,
					qs.stringify({
						powerId:this.powerId,
						powerItem:str
					})
				).then((res)=>{
					console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.successMessage = '添加权限成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							sessionStorage.setItem("success",JSON.stringify(res.data.entity));
							this.datas();
							this.$router.push('/system/systems');
						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					console.log(err);
					this.warningMessage = '操作失败,服务器错误';
					this.warningModal = true;
				})
				
				this.list2 = [];
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>