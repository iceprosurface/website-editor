<template>
  <div id="app">
    <!--<router-view />-->
    <website-editor></website-editor>
  </div>
</template>

<script>
import websiteEditor from './index.vue'
export default {
  name: 'App',
  components: {
    websiteEditor
  }
}
</script>

<style>
</style>
