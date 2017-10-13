<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>开门记录</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="doorRecord" v-loading="loading">
		    		<div class="doorrecord" v-if="titleData.floorName"  >
		    			<ul>
		    				<li><span>房间：</span><span>{{titleData.floorName}}层 {{titleData.roomNum}}</span></li>
		    				<li><span>门锁类型：</span><span v-if="titleData.lockType==1">智能密码锁</span><span v-if="titleData.lockType==2">RFID锁</span></li>
		    				<li>
                  <span>门锁状态：</span>
                  <span v-if="titleData.lockStatus == 1" style="color: #3dc4b2;">在线</span>
                  <span v-if="titleData.lockStatus == 2">离线</span>
                  <span v-if="titleData.lockStatus == 3">冻结</span>
                </li>
		    				<li><span>门锁序列号：</span><span>{{titleData.sn}}</span></li>
		    				<li><span>供应商：</span><span>{{titleData.supplierDataName}}</span></li>
		    			</ul>
		    		</div>
		    		<table v-if="!noRecord">
		    			<thead>
		    				<td width="33%">时间</td>
		    				<!--<td width="33%">操作人</td>-->
		    				<td width="33%">状态</td>
		    			</thead>
		    			<tr v-for="item in doorRecordData">
		    				<td>{{item.opTime}}</td>
		    				<!--<td>租客</td>-->
		    				<td>
                  <span v-if="item.success">成功</span>
                  <span v-if="!item.success" style="color: red;">密码错误</span>
                </td>
		    			</tr>
		    		</table>
            <div class="blank-background-img" v-if="noRecord">
              <img src="../../../static/images/blank/house_space.png" >
              <h2>暂无公寓内容~</h2>
            </div>
		    	</div>

			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/doorRecord.css';
	import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {doorLockNotes} from  '../api.js';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false,
          roomLockId:null,
          doorRecordData:[],
          titleData:{},
          loading:true,
          noRecord:false,
		   	}
    	},
      mounted(){
    	  this.roomLockId = this.$route.query.roomLockId;
    	  this.getDoorRecord({roomLockId:this.roomLockId});
      },
    	methods:{
        getDoorRecord(data){
          var that = this;
          this.$http.post(doorLockNotes,qs.stringify(data)).then(function(res){debugger
            that.loading = false;
            if(res.status == 200 && res.data.code == 10000){
              let result = res.data.entity;
              that.titleData = result[0];
              that.doorRecordData = result[1].data;
              if(that.doorRecordData.length == 0){
                  that.noRecord = true;
              }
            }
          })
        },

    	},
    	created(){


    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #doorRecord{
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
  }

</style>
