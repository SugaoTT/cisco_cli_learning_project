<template>
  <div id="app">
    <dialog-drag id="dialog-1">
      <p> Test dialog</p>
      <TerminalConsole></TerminalConsole>
    </dialog-drag>
    

  </div>
</template>

<script>  
import DialogDrag from 'vue-dialog-drag'
import TerminalConsole from '../../components/console/TerminalConsole.vue'

export default {
  name: 'app',
  components: {
    DialogDrag
  },
  methods: {
    drop (id) {
      console.log('drop id:', id)
    }
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>

<!-- optional dialog styles, see example -->
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>