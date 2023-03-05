<template>
  <div ip = "app">
    <!--<button @click="add_node">add_node</button>-->
    <!--  <p>{{ message }}</p>-->
    <!--  <p>{{ count }}</p>-->

    <!--  <a @mouseover="countUp">-->
    <!--    {{message}}-->
    <!--</a>-->
      <header>
　      <p class="logo">NETWORK EMULATOR</p>
      </header>



      

      <button class="net_equipment_button" draggable="true" @dragstart="DragStartHandler('router')"><span id = "router_image"></span><br>Router</button>
      <button class="net_equipment_button" draggable="true" @dragstart="DragStartHandler('switch')"><span id = "switch_image"></span><br>Switch</button>
      <button class="net_equipment_button" draggable="true" @dragstart="DragStartHandler('host')"><span id = "host_image"></span><br>Host</button>
      <button class="connect_button" @click="connectMode"><span id = "connect_image"></span><br>Connect</button>  {{ connectStatus }}

      

      <!--<button @click="countUp">increment</button>-->
      
      <!--<button @click="drawGraph">draw</button>-->
      <!--<div id="my-window">テスト</div>-->

      
      <div id="networkPanel" >
        <NetworkCanvas ref="networkCanvas" @addWindow="addWindow" @updateConnectStatus="updateConnectStatus" @addNodeToList="addNodeToNodeList" v-on:mouseover.native="test" v-on:mouseleave.native="mouseLeaveOnNetworkCanvas" :connectStatus="connectStatus"></NetworkCanvas>
      </div>


      <div id="windowPanel" >
        <dl v-for="node in windowListVer2">
          <component :windowName=node.nodeID :is="'Window'" v-bind="{id:node.nodeID}"/>
        </dl>
      </div>
      
      <!--<div id = dialog>
        <DialogDrag></DialogDrag>
      </div>-->
      

<!--
      <div id="consolePanel">
        <select id="nodeSelect">
              <option v-for="(node, key) in nodeList" :key="key">
                {{ node }}
              </option>
            </select>


        <TerminalConsole></TerminalConsole>
      </div>
      
      <div id="tabs">
        <p>{{ 'aaa' }}</p>
        <button @click="changeChild('Window')">ConponentA</button>
        <button @click="changeChild('ComponentB')">ConponentB</button>
      </div>

      <dl v-for="child in childList">
        <component :is="child" />
      </dl>
-->
      <!--<component :is="currentChild" />-->


        
      <!--
      <footer>
        <p class="logo">NETWORK EMULATOR<span></span></p>
       <div class="footer-list">
            <ul>
              <li>Contact: <br>sugaya180141m@gmail.com</li>-->
               <!--<li>Privacy Policy</li>-->
           <!-- </ul>
        </div>-->
    <!--<div class="footer-logo">朝活 -Asakatsu-</div>
          <div class="footer-list">
            <ul>
              <li>Contact</li>
            </ul>
          </div>-->
       <!-- </footer>-->
  </div>

  

</template>


<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import cytoscape from 'cytoscape';
import NetworkCanvas from '../components/NetworkCanvas.vue';
import TerminalConsole from '../components/console/TerminalConsole.vue'
import Window from '../components/window/Window.vue'
import ComponentA from '../test/ComponentA.vue';
import ComponentB from '../test/ComponentB.vue';
import DialogDrag from '@/components/window/Dialog-Drag.vue';
import {AbstractNode} from '../components/node/AbstractNode';
import {GUIManager} from '../script/gui/GUIManager';


@Component({
  components: {
    NetworkCanvas,
    TerminalConsole,
    Window,
    ComponentA,
    ComponentB,
    DialogDrag
  },
})

export default class Client extends Vue {
  
    private message: string = "Hello World";
    private count: number = 0;
    private currentState = "start";
    private isMouseOnNetworkCanvas: boolean = false;
    //private router_count: number = 0;
    //private switch_count: number = 0;
    //private host_count: number = 0;
    private nodeList: Array<string> = [""];
    private connectStatus: string = "結線OFF";

    currentChild: string = "ComponentB";
    childList: Array<string> = [""];
    windowList: Array<string> = [""];
    private windowName = "Tanaka"
    private windowXPosition: number = 0;
    private windowYPosition: number = 0;

    private windowListVer2: Array<AbstractNode> = [];

    changeChild(name){
      console.log(name);
      this.currentChild = name;
      this.childList.push(name);
    }

    $refs!: {
      networkCanvas: NetworkCanvas
    }

   // private cy = new cytoscape.Core();
    // private cy = new cytoscape.Core();
    //private cy!: cytoscape.Core;
    //private cyop!: cytoscape.CytoscapeOptions;

    mounted(){

      this.$refs.networkCanvas.childMethod();
    }


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
    //(event as DragEvent).dataTransfer!.setData("test", "ABS");

    //ボタンに設定されているアイコンの画像データを設定
    let node_asset = new Image();
    //let nodeID: string;
    if(data == 'host'){
      //nodeID = 'Host'+this.host_count++;
      //(event as DragEvent).dataTransfer!.setData('nodeID', nodeID);
      //ノードリストにノードを追加
      //this.nodeList.push(nodeID);

      //node_asset.src = "./assets/image/host.png";
    }else if(data == 'router'){
      //nodeID = 'Router'+this.router_count++;
      //(event as DragEvent).dataTransfer!.setData('nodeID', nodeID);
      //this.nodeList.push(nodeID);
      //node_asset.src = "./assets/image/router.png";
    }else if(data == 'switch'){
      //nodeID = 'Switch'+this.switch_count++;
     // (event as DragEvent).dataTransfer!.setData('nodeID', nodeID);
      //this.nodeList.push(nodeID);
      //node_asset.src = "./assets/image/switch.png";
    }
    

    //画像を登録
    (event as DragEvent).dataTransfer!.setDragImage(node_asset, -2, -2);
    }

    public addNodeToNodeList(nodeID: string): void{
      //TODO: NodeIDをguimanagerから取るようにする
      GUIManager.guimanager.addNode(new AbstractNode(nodeID, nodeID));
      this.nodeList.push(nodeID);
      console.log(this.nodeList);
    }

    public test(): void{
      //console.log('aaa');

      //if(this.isMouseOnNetworkCanvas === true){
        
      //}
      
      //console.log('end test');
    }

    public mouseOverOnNetworkCanvas(): void{
      this.isMouseOnNetworkCanvas = true;
      console.log(this.isMouseOnNetworkCanvas)
    }

    public mouseLeaveOnNetworkCanvas(): void{
      this.isMouseOnNetworkCanvas = false;
      console.log(this.isMouseOnNetworkCanvas)
    }

    public connectMode(){
      if(this.nodeList.length < 2){
        this.connectStatus = "2個以上の機器を追加してください";
      } else {
        this.connectStatus = "結線元の機器を選択してください";

      }
    }

    public updateConnectStatus(connectStatus: string){
      this.connectStatus = connectStatus;
    }

    public addWindow(windowName: string){
      console.log("addWindow")
      this.windowList.push('Window')
      let node: AbstractNode | null;
      node = GUIManager.guimanager.selectedByUMID(windowName);
      if(node != null && !node.isDisplayedWindow && this.connectStatus == "結線OFF"){
        this.windowListVer2.push(node);
        node.isDisplayedWindow = true;
      }


          
      this.windowName = windowName
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

.net_equipment_button{
  border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:125px;
}

.net_equipment_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:125px;
}

.connect_button{
  border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:125px;
  margin-left: 300px;
}

.connect_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:125px;
}

#connect_image{
  height:100px;
  width:100px;
  background-image:url('../assets/connect_clear.png');
  display:inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
}

#router_image{
  height:100px;
  width:100px;
  background-image:url('../assets/network_iconset/router_01/router_01.png');
  display:inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
}

/*
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
}*/

#switch_image{
  /*background-image:url('../assets/switch.png');
  display:inline-block;
  width:100px;
  height:70px;*/
  height:100px;
  width:100px;
  background-image:url('../assets/network_iconset/l2_switch/l2_switch.png');
  display:inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
}

/*
.switch_button{border:1px solid #000000;
  background-color:#ffffff;
  width:120px;
  height:95px;
}

.switch_button:hover{
  border:1px solid #000000;
  background-color:#e2e2e2;
  width:120px;
  height:95px;
}*/

#host_image{
  /*background-image:url('../assets/host.png');*/
  height:100px;
  width:100px;
  background-image:url('../assets/network_iconset/desktop_pc/desktop_pc.png');
  display:inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
}

/*
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
  height:125px;
}*/

#consolePanel{
  position: absolute;
  left: 1050px;
  float: right;
}

#my-window {
	resize: both;
	overflow: auto;
	width: 50%;
	border-top: 1.4em solid #eee;
	border-radius: 4px;
	box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
	background: #fff;
	padding: 1.2em .8em;
	margin-bottom: 1.5em;
}

header {
	width: 100%;
	line-height: 60px;
	background: #8445be;
}

/* ロゴ */
header .logo {
	padding: 0 20px;
	font-size: 18px;
	color: #fff;
	letter-spacing: .2em;
}
/* テキスト */
header .logo span {
	margin-left: 10px;
	font-size: 14px;
	color: #fff;
	letter-spacing: .1em;
	vertical-align: middle;
}
.wrapper{
    min-height: 100vh;
    position: relative;/*←相対位置*/
}

footer {
  width: 100%;
  line-height: 30px;
  background-color: #3c3c3c;
  position: absolute;/*←絶対位置*/
  bottom: 0; /*下に固定*/
}

footer .logo {
  padding: 0 20px;
	font-size: 18px;
	color: #fff;
	letter-spacing: .2em;
}
footer .logo span {
	margin-left: 10px;
	font-size: 14px;
	color: #fff;
	letter-spacing: .1em;
	vertical-align: middle;
}

.footer-list li {
  margin-bottom: 0px;
  
}

.footer-list {
  color: #fff;
}
</style>
