<template>
  <div>
    <!--<menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>-->
      <div class="wordbench-box">
        这是直播管理的页面
      </div>
      <!--<footer-box></footer-box>
    </div>-->
  </div>
</template>

<script>

  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox
    },
     data() {
        return{

        }
     },
    methods: {

    }
  }

</script>
