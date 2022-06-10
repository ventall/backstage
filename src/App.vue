<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang='stylus'>
html, body
  overflow hidden
  height 100vh
  box-sizing border-box
  padding 0
  margin 0
  #app
    height 100%
</style>