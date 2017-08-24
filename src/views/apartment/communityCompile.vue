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
		          <h3><i class="icon icon-iden"></i>编辑社区信息</h3>
		        </div>
		        <div class="message-tis">
		        	<table class="cop">
		        		<tr>
		        			<td>社区名称：</td>
		        			<td><input type="text" placeholder="请输入社区名称" class="complie_name" v-model="communityName"></td>
		        		</tr>
		        		<tr>
		        			<td>地址：</td>
		        			<td>
		        				<el-select v-model="province" placeholder="请选择省"  @change='isActive(province)'>
								    <el-option
								      v-for="item in parent"
								      :key="item.areaName"
								      :label="item.areaName"
								      :value="item.areaName"
								      >
								    </el-option>
								</el-select>
								<el-select v-model="city" placeholder="请选择市" @change='isActive2(city)'>
								    <el-option
								      v-for="item in parents"
								      :key="item.areaName"
								      :label="item.areaName"
								      :value="item.areaName">
								    </el-option>
								</el-select>
								<el-select v-model="value" placeholder="请选择区">
								    <el-option
								      v-for="item in countyList"
								      :key="item.areaName"
								      :label="item.areaName"
								      :value="item.areaName">
								    </el-option>
								</el-select><br>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td class="xiangxi"><el-input v-model="communityAddress" placeholder="请填写详细地址"></el-input></td>
		        		</tr>
		        		<tr>
		        			<td>社区类型：</td>
		        			<td>
		        				<el-checkbox-group v-model="checkList" @change="types(checkList)">
								    <el-checkbox label="公寓"></el-checkbox>
								    <el-checkbox label="办公空间"></el-checkbox>
								    
								</el-checkbox-group>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>开业日期：</td>
		        			<td>
		        				<div class="form-item">  
				                 <Date-picker type="date" placeholder="选择日期" v-model="communityOpeningDate"></Date-picker>
				                </div>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>社区服务电话：</td>
		        			<td><input type="text" placeholder="请输入社区服务电话" class="complie_name2" v-model="communityPhone"></td>
		        		</tr>
		        		<tr>
		        			<td>物业合同编号：</td>
		        			<td><input type="text" placeholder="请输入物业合同编号" class="complie_name3" v-model="communityContractNum"></td>
		        		</tr>
		        		<tr>
		        			<td>
		        				租期：
		        			</td>
		        			<td>
		        				<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
				                <span class="inline-block spanBar">-</span>
				                <Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseEnd"></Date-picker>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>
		        				免租期：
		        			</td>
		        			<td>
		        				<Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseBegin"></Date-picker>
				                <span class="inline-block spanBar">-</span>
				                <Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseEnd"></Date-picker>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>
		        				物业合同：
		        			</td>
		        			<td>
							        <Upload
							        	ref="upload"
							        	:show-upload-list="false"
							        	:default-file-list="defaultList"
							        	:on-success="handleSuccess"
							            
							            :format="['pdf']"
							            :on-format-error="handleFormatError"
							            :before-upload="handleBeforeUpload"
							            
							            multiple
							            action="//jsonplaceholder.typicode.com/posts/">
							            <Button type="ghost" class="cas">请选择文件</Button>
							            
							        </Upload>
							        <Button type="text" @click="upload" :loading="loadingStatus" class="cass">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
		        			</td>
		        			<tr>
		        				<div class="unloading" v-if="file !== null">
		        					<ul>
		        						<li>已上传：<a>{{ file.name }} </a><a><i class="el-icon-delete"></i></a></li>
		        					</ul>
		        					
		        				</div>
		        			</tr>
		        		</tr>
		        	</table>
		        	<div class="operation-box2">
		        	  
		              	<Button type="primary" @click="Complie">确定</Button>
		        	  
		              <Button>取消</Button>
		            </div>  
		        </div>
		        
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/communityComplie.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import {hostComplie,hostParent} from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			province:'', //省
    			city:'',	 //市
		        value: '',   //区
		        input: '',
		        checked: true,
		        file: null,
                loadingStatus: false,
                parent:[],  //省的数据
                parents:[], //市的数据
                countyList:[],  //县的数据
                checkList:[],  //办公类型
                inputFunc:'',
                communityName:null, //社区名称
                communityAddress:null, //详细地址
                communityOpeningDate:null, //开业日期
                communityType:'',  //社区类型
                communityPhone:null, //社区服务电话
                communityContractNum:null, //物业合同编号
                communityLeaseBegin:null, //租期开始时间
                communityLeaseEnd:null,  //租期结束时间
                communityFreeLeaseBegin:null,  //免租期开始时间
                communityFreeLeaseEnd:null,  //免租期结束时间
                communityContract:'',//物业合同
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': ''
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': ''
                    }
                ]
		   	}
    	},
    	methods:{
    		
    		Complie:function(){
    			this.$http.post(hostComplie,
    			qs.stringify(
    				{
    					communityName:this.communityName,
    					communityProvince:this.province,
    					communityCity:this.city,
    					communityDistrict:this.value,
    					communityAddress:this.communityAddress,
    					communityOpeningDate:this.communityOpeningDate,
    					communityType:this.communityType,
    					communityPhone:this.communityPhone,
    					communityContractNum:this.communityContractNum,
    					communityLeaseBegin:this.communityLeaseBegin,
    					communityLeaseEnd:this.communityLeaseEnd,
    					communityFreeLeaseBegin:this.communityFreeLeaseBegin,
    					communityFreeLeaseEnd:this.communityFreeLeaseEnd,
    					communityContract:this.communityContract
    				}
    			))
    		},
    		
    		handleBeforeUpload (file) {
                this.file = file;
                return false;
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError(file){
            	
            	this.$Message.success('文件 ' + file.name + ' 格式不正确，请上传 pdf格式的文件。')
                
               
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('上传成功')
                }, 1500);
            },
            isActive(value){//获取市的数据
    
            	let areaId = this.parent[this.parent.findIndex(item => item.areaName == value)].areaId;
                this.httpPost(areaId,1);
//				let parentId = this.parents[this.parent.findIndex(item => item.areaName == value)].areaId;
//				this.httpPost(parentId,2);
           	},
           	isActive2(value){//获取区的数据
            	let parentId = this.parents[this.parents.findIndex(item => item.areaName == value)].areaId;
				this.httpPost(parentId,2);
           	},
            httpPost(id,num){  //获取省市区数据的方法调用
             let Id = parseInt(id);
             let vm = this
           	 this.$http.post(hostParent,
				qs.stringify(
					{
						'parentId':Id
					}
				)).then((response)=>{
					if(num==1){
						vm.parents = response.data.result.areaList;
						//console.log(vm.parents);
					}else if(num==2){
						vm.countyList = response.data.result.areaList;
						//console.log(vm.countyList);
					}
				})
				.catch((error)=>{
					console.log(126)
					console.log(error);
				})
	
           },
           types(mw){
           		console.log(mw);
           		this.communityType = null;
           		for(var i=0;i<mw.length;i++){
           			if(mw[i]=="公寓" && mw.length==1){
           				this.communityType ='0';
           				//console.log('11'+this.communityType);
           			}else if(mw[i]=="办公空间" && mw.length==1){
           				this.communityType ='1';
           				//console.log('11'+this.communityType);
           			}else if(mw.length == 2){
           				this.communityType ='0,1';
           				//console.log('11'+this.communityType);
           			}
           		}
//         		if(mw.key == '0' && mw.value=="公寓"){
//         			
//         			console.log('11'+this.communityType);
//         		}else if(mw.key == '办公空间'){
//         			
//         			console.log('11'+this.communityType);
//         		}else if(){
//         			
//         			console.log('11'+this.communityType);
//         		}
           }
    	},
    	created(){
    		
			this.$http.post(hostParent,//获取省的数据
			qs.stringify(
				{
					'parentId':0
				}
			)).then((response)=>{
				//console.log(response);
				this.parent = response.data.result.areaList;
				//console.log(this.parent);
			})
			.catch((error)=>{
				console.log(error);
			})
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>