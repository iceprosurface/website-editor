<template>
  <div id="app">
    <!--<router-view />-->
    <page></page>
  </div>
</template>

<script>
import page from './page/pageEditor.vue'
export default {
  name: 'App',
  components: {
    page
  }
}
</script>

<style>
</style>
