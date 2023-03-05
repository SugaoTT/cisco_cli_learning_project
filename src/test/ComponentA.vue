<template>
  <div>
    <input type="text" value="componentA">
    <hr>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
 
@Component({})
export default class ComponentA extends Vue {
 
}
</script>
 
<style>
</style>