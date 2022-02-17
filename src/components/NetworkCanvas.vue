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


  

    public childMethod(): void {
      console.log('child');


    this.cy.on('tap', 'node', function(event) {
      console.log(event.target._private.data.id);
      //console.log('host dayo')

    });

      console.log('end childMethod')
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
            selector: '.Host',
            style: {
              'background-image': "https://i.imgur.com/R1csOlU.jpg",
              'label': 'data(id)',
              'text-margin-y': 50
            }
          },
          {
            selector: '.Router',
            style: {
              'background-image': "https://i.imgur.com/t5UZjW0.jpg",
              'label': 'data(id)',
              'text-margin-y': 50
            }
          },
          {
            selector: '.Switch',
            style: {
              'background-image': "https://i.imgur.com/47f1aNF.jpg",
              'label': 'data(id)',
              'text-margin-y': 50
            }
          }
        ]
      }
      this.cy = cytoscape(this.cyop);
       console.log(this.cy)
    }

    

    public DropHandler(e: DragEvent): void{
        console.log('b');
        let data: string = (event as DragEvent).dataTransfer!.getData("text/plain");
        let x_position: number = (event as MouseEvent).offsetX;
        let y_position: number = (event as MouseEvent).offsetY;
        let nodetype: string = "";
        
        //区別をつけるためボタンのIDを取得するようにした、重複しないならば別の実装でもかまわない
        if(data == "host"){
            nodetype="Host";
            this.cy.add({
              data: {id: 'Host'+this.host_count},
              position: { x: x_position, y: y_position },
              classes: 'Host'
            });
          this.host_count++;
        }else if(data == "router"){
            nodetype="Router";
            this.cy.add({
              data: {id: 'Router'+this.router_count},
              position: { x: x_position, y: y_position },
              classes: 'Router'
            });
          this.router_count++;
        }else if(data == "switch"){
          console.log('manzi')
            nodetype="Switch";
            this.cy.add({
              data: {id: 'Switch'+this.switch_count},
              position: { x: x_position, y: y_position },
              classes: 'Switch'
            });
          this.switch_count++;
        }
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