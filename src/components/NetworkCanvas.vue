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

    mounted(){
      this.cyop = {
        container: document.getElementById('cy'),

        elements: {
          nodes:[
            {
              data: {id: 'Host'},
            },
            {
              data: {id: 'Router'}
            }
          ],
          edges:[
            {
              data: {source: 'Host', target: 'Router'}
            }
          ]
        },
        style: [
          {
            selector: 'node',
            style: {
              'height': 40,
              'width': 40,
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
            selector: '#Host',
            style: {
              'background-image': "https://i.imgur.com/R1csOlU.jpg"
            }
          },
          {
            selector: '#Router',
            style: {
              'background-image': "https://i.imgur.com/t5UZjW0.jpg"
            }
          },
          {
            selector: '#Switch',
            style: {
              'background-image': "https://i.imgur.com/47f1aNF.jpg"
            }
          }
        ]
      }
      this.cy = cytoscape(this.cyop);
      // console.log(this.cy)
    }

    public DropHandler(e: DragEvent): void{
        console.log('b');
        let data: string = (event as DragEvent).dataTransfer!.getData("text/plain");
        let nodetype: string = "";
        
        //区別をつけるためボタンのIDを取得するようにした、重複しないならば別の実装でもかまわない
        if(data == "host"){
            nodetype="Host";
        }else if(data == "router"){
            nodetype="Router";
        }else if(data == "switch"){
            nodetype="Switch";
        }
        console.log(nodetype + 'が追加されました')
    }

    public DragOverHandler(event: DragEvent):void{

    }
}

</script>
<style scoped>
#cy{
    width: 600px;
    height:400px;
    border: solid 1px;
    position: absolute;
}
</style>>