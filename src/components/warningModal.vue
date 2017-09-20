<template>
  <div>
    <div class="black-member-modal" @click="sendMessageToParent()"></div>
    <div class="black-member-modal-content">
      <div class="modal-img-wrap">
        <img src="../../static/images/icon/warning.png">
      </div>
      <p>{{warningMessage}}</p>
      <div class="modal-btn">
        <Button type="primary" @click="sendMessageToParent()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="sendMessageToParent()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["warningMessage"],
    data () {
      return {

      }
    },
    methods:{
      sendMessageToParent(){
        this.$emit("closeWarningModal",false);
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';

  .black-member-modal{
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

  .black-member-modal-content{
    width:280px;
    height:200px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        width: 32px;
        height: 32px;
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
      padding: 0 30px;
      span{
        color: #038be2;
        font-weight: 700;
        padding: 0 10px;
      }
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
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
  }


</style>


