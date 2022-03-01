<template>
    <div id="cy" @dragover.prevent="DragOverHandler()" @drop="DropHandler()"></div>
</template>

<script lang = "ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import cytoscape from 'cytoscape';

@Component
export default class NetWorkCanvas extends Vue{
    private cy!: cytoscape.Core;
    private cyop!: cytoscape.CytoscapeOptions;
    private router_count: number = 0;
    private switch_count: number = 0;
    private host_count: number = 0;
    //ケーブルを作成する際にケーブル名が重複することを避けるための値
    //実際はNodeに関するインスタンスを作成し、そこで各ノード毎にケーブルの本数を管理すればいいと思われる。
    private cable_count: number = 0;

    /**一時格納用の結線元ノード*/
    private srcNode: string = "";
    private dstNode: string = "";

    @Prop({})
    private connectStatus!: string;

    public childMethod(): void {
      console.log('child');
      console.log(this.connectStatus);

     /* if(this.connectStatus == "結線元の機器を選択してください"){
        console.log("結線モードのコンソール");
        let srcNode:string = "";
        let dstNode:string = "";

        this.cy.on('tap', 'node', function(event) {
          srcNode = event.target._private.data.id;
        });
        this.srcNode = srcNode;

        this.cy.on('tap', 'node', function(event) {
          dstNode = event.target._private.data.id;
        });
        this.dstNode = dstNode;

        console.log(this.srcNode+"=>"+this.dstNode);
      }*/

      let nodeData: string = "";
      //コールバック関数なので自信のインスタンスを予め保持しておく
      let me = this;
      this.cy.on('tap', 'node', function(event) {
        me.clickedNode(event.target._private.data.id);


        //me.srcNode = event.target._private.data.id;
        //console.log(event.target._private.data.id);
        //console.log(me.srcNode);
        
    });
     /*   console.log(nodeData);

      console.log("A");
      if(this.connectStatus == "結線元の機器を選択してください"){
        this.srcNode = nodeData;
        this.connectStatus = "結線先の機器を選択してください";
        console.log(this.srcNode+"=>"+this.dstNode);
      }

      if(this.connectStatus == "結線先の機器を選択してください"){
        this.dstNode = nodeData;
        console.log(this.srcNode+"=>"+this.dstNode);
      }

      console.log('end childMethod')*/
    }

    public clickedNode(nodeID: string) {
      console.log(nodeID);
      console.log(this.connectStatus);
      /**
       * 結線操作の処理を記述
       */
      if(this.connectStatus == "結線元の機器を選択してください"){
        this.srcNode = nodeID;
        this.$emit("updateConnectStatus", "結線先の機器を選択してください");
        //this.connectStatus = "結線先の機器を選択してください";
        //this.$emit('connectStatus', this.connectStatus);
      } else if(this.connectStatus == "結線先の機器を選択してください"){
        this.dstNode = nodeID;
        this.$emit("updateConnectStatus", "結線OFF");
      }

      if(this.srcNode != "" && this.dstNode != ""){
        this.connect();
        console.log(this.srcNode+"=>"+this.dstNode);

        //初期化しておく
        this.srcNode = "";
        this.dstNode = "";
      }


    }

    public connect(): void{
      this.cy.add({
              data: {id: this.srcNode+"To"+this.dstNode+this.cable_count++, source: this.srcNode, target: this.dstNode}
            });
    }

    mounted(){
      //this.cy.on('tap',function(e){
//
      //})
      this.cyop = {
        container: document.getElementById('cy'),

        elements: {
          nodes:[
            /*{
              data: {id: 'Hosta'}, position: { x: 0, y: 0 },
              classes: 'Host'
            },
            {
              data: {id: 'Router'},
              classes: 'Router'
            },
            {
              data: {id: 'Switch'},
              classes: 'Switch'
            }*/
          ],
          edges:[
            /*{
              data: {source: 'Hosta', target: 'Router'}
            },{
              data: {source: 'Hosta', target: 'Router'}
            },{
              data: {source: 'Hosta', target: 'Router'}
            }*/
          ]
        },
        style: [
          {
            selector: 'node',
            style: {
              'height': 80,
              'width': 80,
              'background-fit': 'cover',
              'backgroundColor': 'white'
              //'border-color': '#000',
             // 'border-width': 3,
              //'border-opacity': 0.5
            }
          },
          {
              selector: 'edge',
              style: {
                'curve-style': 'bezier',
                'width': 3,
                'line-color': 'black',
             }
          },
          {
            selector: '.Host',
            style: {
              'background-image': "https://i.imgur.com/R1csOlU.jpg",
              'label': 'data(id)',
              'text-margin-y': 90
            }
          },
          {
            selector: '.Router',
            style: {
              'background-image': "https://i.imgur.com/t5UZjW0.jpg",
              'label': 'data(id)',
              'text-margin-y': 90
            }
          },
          {
            selector: '.Switch',
            style: {
              'background-image': "https://i.imgur.com/47f1aNF.jpg",
              'label': 'data(id)',
              'text-margin-y': 90
            }
          }
        ],
        wheelSensitivity: 0
      }
      this.cy = cytoscape(this.cyop);
       console.log(this.cy)
    }

    

    public DropHandler(e: DragEvent): void{
        console.log('b');
        let data: string = (event as DragEvent).dataTransfer!.getData("text/plain");
        //let nodeID: string = (event as DragEvent).dataTransfer!.getData("nodeID");
        let nodeID: string = "";
        let x_position: number = (event as MouseEvent).offsetX;
        let y_position: number = (event as MouseEvent).offsetY;
        let nodetype: string = "";

        //console.log(data2)
        
        //区別をつけるためボタンのIDを取得するようにした、重複しないならば別の実装でもかまわない
        if(data == "host"){
          nodeID = 'Host'+this.host_count++;
            nodetype="Host";
            this.cy.add({
              data: {id: nodeID},
              position: { x: x_position, y: y_position },
              classes: 'Host'
            });
            //console.log(this.connectStatus);
        }else if(data == "router"){
          nodeID = 'Router'+this.router_count++;
            nodetype="Router";
            this.cy.add({
              data: {id: nodeID},
              position: { x: x_position, y: y_position },
              classes: 'Router'
            });
        }else if(data == "switch"){
          nodeID = 'Switch'+this.switch_count++;
          //console.log('manzi')
            nodetype="Switch";
            this.cy.add({
              data: {id: nodeID},
              position: { x: x_position, y: y_position },
              classes: 'Switch'
            });
        }
        this.$emit("addNodeToList", nodeID);
        //ノードIDをクライアントのリストに追加


        console.log(nodetype + 'が追加されました')
        console.log(this.cy)
        //this.cy.layout().off;
    }

    public DragOverHandler(event: DragEvent):void{

    }
    
    
}

</script>
<style scoped>
#cy{
    width: 1000px;
    height:500px;
    border: solid 1px;
    position: absolute;
}
</style>>