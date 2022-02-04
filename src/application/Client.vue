<template>
  <div ip = "app">
    <button @click="add_node">add_node</button>
      <p>{{ message }}</p>
      <p>{{ count }}</p>
      <button id="router" draggable="true" @dragstart="DragStartHandler('router')"><img src="../assets/router.png" width="65%"><br>Router</button>
      <button id="switch" draggable="true" @dragstart="DragStartHandler('switch')"><img src="../assets/switch.png" width="65%"><br>Switch</button>
      <button id="host" draggable="true" @dragstart="DragStartHandler('host')"><img src="../assets/host.png" width="65%"><br>Host</button>
      <button @click="countUp">increment</button>
      
      <button @click="drawGraph">draw</button>
      
      <div id="networkPanel">
        <NetworkCanvas></NetworkCanvas>
      </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import cytoscape from 'cytoscape';
import NetworkCanvas from '../components/NetworkCanvas.vue';



@Component({
  components: {
    NetworkCanvas
  },
})

export default class Client extends Vue {
  
    private message: string = "Hello World";
    private count: number = 0;
    private currentState = "start";
   // private cy = new cytoscape.Core();
    // private cy = new cytoscape.Core();
    //private cy!: cytoscape.Core;
    //private cyop!: cytoscape.CytoscapeOptions;

    public countUp(){
        this.count++;
    }

    public add(a: number, b: number): number{
        console.log(a+b);
        return a+b;
    }

    public add_node(){
     // console.info(this.cy);
    }

    public drawGraph(){
      //this.cy = cytoscape(this.cyop);


    }

    public DragStartHandler(data: string): void{
      console.log('a');
      //データを設定
    (event as DragEvent).dataTransfer!.setData("text/plain", data);

    //ボタンに設定されているアイコンの画像データを設定
    let node_asset = new Image();
    if(data == 'host'){
      node_asset.src = "./assets/image/host.png";
    }else if(data == 'router'){
      node_asset.src = "./assets/image/router.png";
    }else if(data == 'switch'){
      node_asset.src = "./assets/image/switch.png";
    }

    //画像を登録
    (event as DragEvent).dataTransfer!.setDragImage(node_asset, -2, -2);
    }

    



    /*
    mounted(){
      console.log('TEST')
      this.cyop = {
          container: document.getElementById('cy'),
          elements: [
          { data: { id: 'Host0' } },
          { data: { id: 'Host1' } },
          {
            data: {
            id: 'Cable',
            source: 'Host0',
            target: 'Host1'
          }
        }],
        style: [
        {
          selector: 'node',
          style: {
            'shape': 'rectangle',
            'label': 'data(id)',
            "background-fit": "cover",
            'background-image': '../assets/host.png',
             
             //'background-color': 'red',
             
             
            }
        }]
      }

      this.cy = cytoscape(this.cyop);
    }*/



}

</script>

<style>

#networkPanel{
  padding-top:10px;
}
</style>
