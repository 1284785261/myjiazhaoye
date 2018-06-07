<template>
	<div id="readingRecord">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<!-- <div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/signed/housesubscribe">用户退租</router-link>
				</div> -->
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>抄表记录</h3>
				</div>
                <!-- //电表 -->
				<div id="readingRecords" v-if="type == 2">
                    <a class="btiss" :href="href1">导出</a>
                    <div class="readingRecordtitel">
                        <span>手动获取：</span><input type="text" v-model="waterrading">m³<a @click="manualReading(waterrading)">抄表</a><a @click="automaticReading">自动获取</a>
                    </div>
					<div>
						<table>
							<thead>
								<td>序号</td>
								<td>电表读数</td>
								<td>抄表类型</td>
								<td>记录时间</td>
								<td>操作人</td>
								<td>操作时间</td>
                                <td>操作</td>
							</thead>
                            <tr v-for="(item,index) in elevtrRecords">
                                <td>{{index+1}}</td>
                                <td v-if="item.show == 1">{{item.waterElectricityData}}</td>
                                <td v-else-if="item.show == 2"><input v-model="item.waterElectricityData"></td>
                                <td>{{item.chaozuotype}}</td>
                                <!--<td>{{item.createTime | time}}</td>-->
                              <td v-if="item.show == 1">{{item.createTime | time}}</td>
                              <td v-else-if="item.show == 2">
                                <el-date-picker
                                  v-model="createTime"
                                  type="datetime"
                                  placeholder="选择日期时间"
                                  default-time="12:00:00"
                                 >
                                </el-date-picker>
                              </td>
                                <td>{{item.userName}}</td>
                              <td>{{item.newTime | time}}</td>
                                <td v-if="item.show == 1"><a @click="editorm(index)">编辑</a></td>
                                <td v-else-if="item.show == 2"><a @click="editor(item.id,item.waterElectricityData,index)">保存</a></td>
                            </tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
						</el-pagination>
					</div>
				</div>
                <div id="readingRecords" v-if="type == 1">
                    <a class="btiss" :href="href1">导出</a>
                    <div class="readingRecordtitel">
                        <span>手动获取：</span><input type="text" v-model="waterrading">m³<a @click="manualReading(waterrading)">抄表</a><a @click="automaticReading">自动获取</a>
                    </div>
					<div>
						<table>
							<thead>
								<td>序号</td>
								<td>水表读数</td>
								<td>抄表类型</td>
								<td>记录时间</td>
								<td>操作人</td>
								<td>操作时间</td>
                                <td>操作</td>
							</thead>
                            <tr v-for="(item,index) in waterRecords">
                                <td>{{index+1}}</td>
                                <td v-if="item.show == 1">{{item.waterElectricityData}}</td>
                                <td v-else-if="item.show == 2"><input v-model="item.waterElectricityData"></td>
                                <td>{{item.chaozuotype}}</td>
                                <td v-if="item.show == 1">{{item.createTime | time}}</td>
                               <td v-else-if="item.show == 2">
                                 <el-date-picker
                                   v-model="createTime"
                                   type="datetime"
                                   placeholder="选择日期时间"
                                   default-time="12:00:00"
                                 >
                                 </el-date-picker>
                               </td>
                                <td>{{item.userName}}</td>
                                <td>{{item.newTime | time}}</td>
                                <td v-if="item.show == 1"><a @click="editorm(index)">编辑</a></td>
                                <td v-else-if="item.show == 2"><a @click="editor(item.id,item.waterElectricityData,index)">保存</a></td>
                            </tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
						</el-pagination>
					</div>
				</div>
                <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
                <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/readingRecords.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import  successModal from '../../components/successModal.vue';
    import  warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { RealTimeTable200227,host,RecordTable200229,RecordAdd200231,CxkjCommunityElectricityUpdateRoomAndRecord200221,CxkjCommunityWaterUpdateRoomAndRecord200220,RecordUpdate200232 } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
            footerBox,
            warningModal,
            successModal
		},
		data() {
			let _this = this
			return {
				activeTabName:"communityManagement",
                waterRecords:null,
                elevtrRecords:null,
                roomId:'',
                type:0,
                pageNum:1,
                currentPage3:1,
                pageSize: 10,
                totalNum:1,
                href1:'',
                waterrading:0,
                successModal:false,
                successMessage:"添加成功！",
                warningModal:false,
                warningMessage:"添加失败！",
                roomElectricitymeterRelationId:'',
                show:1,
               createTime:'',
        newHours:''
			}
		},
		mounted() {
            this.roomId = this.$route.query.roomId;
            this.type = this.$route.query.type;
            this.roomElectricitymeterRelationId = this.$route.query.roomElectricitymeterRelationId;
            this.datas();
            this.newHours = this.hours(new Date().getTime())
		},
		filters: {
            time(val){
                return new Date(val).Format("yyyy-MM-dd hh:mm");
            }
		},
		methods: {
            closeWarningModal(){
                this.warningModal = false;
            },
            datas(){
                let param = new FormData();
                this.href1 = host + '/cxkj-room/apis/pcManager/record/CxkjCommunityWaterElectricityRecordTableDownLoad200230?';
                param.append('pageNum',this.pageNum);
                param.append('roomId',this.roomId);
                param.append('type',this.type);
                this.href1 += 'roomId='+this.roomId+'&type='+this.type+'&pageNum='+this.pageNum;
                if(this.type == 2){
                    axios.post(RecordTable200229, param).then((res)=>{
                        console.log(res);
                        if(res.data.code == 10000 && res.status == 200) {
                            this.elevtrRecords = res.data.entity.page;
                            for(let i=0;i<this.elevtrRecords.length;i++){
                                this.$set(this.elevtrRecords[i], "show", 1);
                            }
                        }
                    })
                }else if(this.type == 1){
                    axios.post(RecordTable200229, param).then((res)=>{
                        // console.log(res);
                        if(res.data.code == 10000 && res.status == 200) {
                            this.waterRecords = res.data.entity.page;
                            for(let i=0;i<this.waterRecords.length;i++){
                                this.$set(this.waterRecords[i], "show", 1);
                            }
                        }
                    })
                }

            },
            handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
            },
            manualReading(val){
                let param = new FormData();
                param.append('waterElectricityData',val);
                param.append('roomId',this.roomId);
                param.append('type',this.type);
                axios.post(RecordAdd200231,param).then((res)=>{
                    if(res.data.code == 10000 && res.status == 200) {
                        this.successMessage = '手动抄表成功';
                        this.successModal = true;
                        setTimeout(() => {
                            this.successModal = false;
                            this.datas();
                        }, 2000);

                    }else{
                        this.warningMessage = res.data.content;
                        this.warningModal = true;
                    }
                }).catch((err)=>{
                    this.warningMessage = '手动抄表失败';
                    this.warningModal = true;
                })
                this.waterrading = 0;
            },
            automaticReading(){
                if(this.type == 2){
                    axios.post(CxkjCommunityElectricityUpdateRoomAndRecord200221,qs.stringify({
                        roomElectricitymeterRelationId:this.roomElectricitymeterRelationId,
                        roomId:this.roomId
                    })).then((res)=>{
                        if(res.data.code == 10000 && res.status == 200) {
                            this.successMessage = '自动抄表成功';
                            this.successModal = true;
                            setTimeout(() => {
                                this.successModal = false;
                                this.datas();
                            }, 2000);
                        }else{
                            this.warningMessage = res.data.content;
                            this.warningModal = true;
                        }
                    }).catch((err)=>{
                        this.warningMessage = '自动抄表失败';
                        this.warningModal = true;
                    })
                }else if(this.type == 1){
                    axios.post(CxkjCommunityWaterUpdateRoomAndRecord200220,qs.stringify({
                        roomWatermeterRelationId:this.roomElectricitymeterRelationId,
                        roomId:this.roomId
                    })).then((res)=>{
                        if(res.data.code == 10000 && res.status == 200) {
                            this.successMessage = '自动抄表成功';
                            this.successModal = true;
                            setTimeout(() => {
                                this.successModal = false;
                                this.datas();
                            }, 2000);
                        }else{
                            this.warningMessage = res.data.content;
                            this.warningModal = true;
                        }
                    }).catch((err)=>{
                        this.warningMessage = '自动抄表失败';
                        this.warningModal = true;
                    })
                }

            },
            editorm(index){
                if(this.type == 2){
                    this.$set(this.elevtrRecords[index], "show", 2);
                    this.createTime =this.elevtrRecords[index].createTime
                }else if(this.type == 1){
                    this.$set(this.waterRecords[index], "show", 2);
                  this.createTime = this.waterRecords[index].createTime
                }
            },
            editor(id,val,index){
              let vm = this
                // RecordUpdate200232
              // if(!vm.createTime){
              //   this.warningMessage = '请选择有效的时间';
              //   this.warningModal = true;
              //   return
              // }
              let createTime = this.dateTimes(new Date(vm.createTime).getTime())
                axios.post(RecordUpdate200232,qs.stringify({
                    id:id,
                    waterElectricityData:val,
                  createtime:createTime
                })).then((res)=>{
                    if(res.data.code == 10000 && res.status == 200) {
                        this.successMessage = '修改读数成功';
                        this.successModal = true;
                        setTimeout(() => {
                            this.successModal = false;
                            this.datas();
                        }, 2000);
                    }else{
                        this.warningMessage = res.data.content;
                        this.warningModal = true;
                    }
                }).catch((err)=>{
                    this.warningMessage = '修改读数失败';
                    this.warningModal = true;
                })

                if(this.type == 2){
                    this.$set(this.elevtrRecords[index], "show", 1);

                }else if(this.type == 1){
                    this.$set(this.waterRecords[index], "show", 1);

                }
            }
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';
</style>
