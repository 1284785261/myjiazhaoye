<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components:{

  },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '/sass/base/_reset.scss';
  @import '/sass/page/_home.scss';
  #app{
    position: relative;
  }
</style>
