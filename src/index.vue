<template>
  <div class="website-editor">
    <page></page>
  </div>
</template>

<script>
import page from './page/pageEditor.vue'
export default {
  name: 'websiteEditor',
  data () {
    return {}
  },
  components: {
    page
  }
}
</script>
<style lang="less" type="text/less">
</style>
