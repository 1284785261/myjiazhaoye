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
		        	<table>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td><input type="text" placeholder="请输入社区名称" class="complie_name"></td>
		        		</tr>
		        		<tr>
		        			<td>地址：</td>
		        			<td>
		        				<el-select v-model="value" placeholder="请选择省">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
								<el-select v-model="value" placeholder="请选择市">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
								<el-select v-model="value" placeholder="请选择区">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select><br>
		        				
		        			</td>
		        		</tr>
		        		<tr>
		        			<td class="xiangxi"><el-input v-model="input" placeholder="请填写详细地址"></el-input></td>
		        		</tr>
		        		<tr>
		        			<td>社区类型：</td>
		        			<td>
		        				<el-checkbox v-model="checked">公寓</el-checkbox>
		        				<el-checkbox v-model="checked">办公室</el-checkbox>
		        				<el-checkbox v-model="checked">会议室</el-checkbox>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>开业日期：</td>
		        			<td>
		        				<div class="form-item">  
				                 <Date-picker type="date" placeholder="选择日期"></Date-picker>
				                </div>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>社区服务电话：</td>
		        			<td><input type="text" placeholder="请输入社区服务电话" class="complie_name2"></td>
		        		</tr>
		        		<tr>
		        			<td>物业合同编号：</td>
		        			<td><input type="text" placeholder="请输入物业合同编号" class="complie_name3"></td>
		        		</tr>
		        		<tr>
		        			<td>
		        				租期：
		        			</td>
		        			<td>
		        				<Date-picker type="date" placeholder="请选择日期"></Date-picker>
				                <span class="inline-block spanBar">-</span>
				                <Date-picker type="date" placeholder="请选择日期"></Date-picker>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>
		        				免租期：
		        			</td>
		        			<td>
		        				<Date-picker type="date" placeholder="请选择日期"></Date-picker>
				                <span class="inline-block spanBar">-</span>
				                <Date-picker type="date" placeholder="请选择日期"></Date-picker>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td>
		        				物业合同：
		        			</td>
		        			<td>
							        <Upload
							            :before-upload="handleUpload"
							            action="//jsonplaceholder.typicode.com/posts/">
							            <Button type="ghost" class="cas">请选择文件</Button>
							            
							        </Upload>
							        <Button type="text" @click="upload" :loading="loadingStatus" class="cass">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
		        			</td>
		        			<tr><div class="unloading" v-if="file !== null">已上传：{{ file.name }} </div></tr>
		        		</tr>
		        	</table>
		        	<div class="operation-box">
		        	  
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
    			options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value: '',
		        input: '',
		        checked: true,
		        file: null,
                loadingStatus: false
		   	}
    	},
    	methods:{
    		Complie:function(){
    			this.$router.push({path:"/apartment/communityRoom"});
    		},
    		handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('上传成功')
                }, 1500);
            }
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>