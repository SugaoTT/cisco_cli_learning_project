<template>
  <div ip = "app">
    <button @click="add_node">add_node</button>
      <p>{{ message }}</p>
      <p>{{ count }}</p>

      <button class="router_button" draggable="true" @dragstart="DragStartHandler('router')"><span id = "router_image"></span><br>Router</button>
      <button class="switch_button" draggable="true" @dragstart="DragStartHandler('switch')"><span id = "switch_image"></span><br>Switch</button>
      <button class="host_button" draggable="true" @dragstart="DragStartHandler('host')"><span id = "host_image"></span><br>Host</button>

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
      //node_asset.src = "./assets/image/host.png";
    }else if(data == 'router'){
      //node_asset.src = "./assets/image/router.png";
    }else if(data == 'switch'){
      //node_asset.src = "./assets/image/switch.png";
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

#router_image{
  background-image:url('../assets/router.png');
  display:inline-block;
  width:100px;
  height:70px;
}

.router_button{
  border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:95px;
  
}

.router_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:95px;
}

#switch_image{
  background-image:url('../assets/switch.png');
  display:inline-block;
  width:100px;
  height:70px;
}

.switch_button{
  border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:95px;
  
}

.switch_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:95px;
}

#host_image{
  background-image:url('../assets/host.png');
  display:inline-block;
  width:100px;
  height:70px;
}

.host_button{
  border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:95px;
  
}

.host_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:95px;
}


.flowbtn{
font-family:'Arial',sans-serif;/* 好きなフォントを指定してね */
border-radius:4px;
position:relative;
display:inline-block;
width:66px;
height:58px;
font-size:30px;
color:#fff!important;
transition:.5s;
text-decoration:none;
box-shadow:0 1px 2px #999;
}
.flowbtn i{
position:relative;
bottom:5px;
}
.fl_tw1{
background:#55acee;
}

/* ボタン内テキスト調整 */
.flowbtn div{
font-size:11px;	
font-weight:bold;
letter-spacing:0;
position:relative;
bottom:22px;
}
/* ボタンマウスホバー時 */
.flowbtn:hover{
-webkit-transform:translateY(-5px);
-ms-transform:translateY(-5px);
transform:translateY(-5px);
text-decoration:none;
}
/* ulタグの内側余白を０にする */
ul.snsbtniti{
padding:0!important;
}
/* ボタン全体の位置調整 */
.snsbtniti{
display:flex;
flex-flow:row wrap;
justify-content:space-around;
}
/* ボタン同士の余白調整 */
.snsbtniti li{
flex:0 0 33%;
text-align:center!important;
}
</style>
