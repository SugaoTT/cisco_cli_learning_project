<template>
  <div ip = "app">
      <p>{{ message }}</p>
      <p>{{ count }}</p>
      <button id="router" draggable="true"><img src="../assets/router.png" width="65%"><br>Router</button>
      <button id="switch" draggable="true"><img src="../assets/switch.png" width="65%"><br>Switch</button>
      <button id="host" draggable="true"><img src="../assets/host.png" width="65%"><br>Host</button>
      <button @click="countUp">increment</button>
      <button @click="add_node">add_node</button>
      <button @click="drawGraph">draw</button>
      <div id="cy"></div>
      
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import cytoscape from 'cytoscape';




@Component({
  components: {
  },
})

export default class Client extends Vue {
  
    private message: string = "Hello World";
    private count: number = 0;
    private currentState = "start";
   // private cy = new cytoscape.Core();
    // private cy = new cytoscape.Core();
    private cy!: cytoscape.Core;
    private cyop!: cytoscape.CytoscapeOptions;

    public countUp(){
        this.count++;
    }

    public add(a: number, b: number): number{
        console.log(a+b);
        return a+b;
    }

    public add_node(){
      console.info(this.cy);
    }

    public drawGraph(){
      //this.cy = cytoscape(this.cyop);


    }


    mounted(){
      console.log('TEST')
      this.cyop = {
          container: document.getElementById('cy'),
          elements: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          {
            data: {
            id: 'ab',
            source: 'a',
            target: 'b'
          }
        }],
        style: [
        {
          selector: 'node',
          style: {
              'background-image': '../assets/router.png',
              'background-color': 'red',
              label: 'data(id)'
            }
        }]
      }

      this.cy = cytoscape(this.cyop);
    }



}

</script>

<style>
#cy {
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50px;
    left: 0px;
    text-align: left;
}
</style>
