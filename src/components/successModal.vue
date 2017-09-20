<template>
  <div>
    <div class="community-room-modal"></div>
    <div id="addroom-success-modal">
      <div class="modal-img-wrap">
        <img src="../../static/images/icon/house_type_success.png">
      </div>
      <p class="success-p">
        <span>{{successMessage}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props:["successMessage"],
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';

  .community-room-modal{
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

  #addroom-success-modal{
    width:280px;
    height:180px;
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
        margin-top: 30px;
      }
    }
    .success-p{
      text-align: center;
      padding-top: 15px;
      font-size: 18px;
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }
</style>


