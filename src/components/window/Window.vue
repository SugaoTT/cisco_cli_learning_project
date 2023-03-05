<template>
    <div id="window">
        <TerminalConsole ref="terminalConsole" v-bind="{class:'terminal'}" :windowName="windowName" windowPriority=windowPriority :style="{ transform: `translate(${x}px, ${y-200}px)` , height: height-40+'px', width: width-20+'px'}"></TerminalConsole> <!-- 参考: https://konsuki.com/615/ -->
    </div>
    
</template>

<script lang="ts">
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import TerminalConsole from '../../components/console/TerminalConsole.vue'
//@ts-ignore
import { JSFrame } from 'jsframe.js';
import drag from '@branu-jp/v-drag'
import {GUIManager} from '../../script/gui/GUIManager';


@Component({
  components: {
    TerminalConsole,
    Window
  },
})
export default class Window extends Vue{
    /*
    実装にはxterm.jsを使用
    npm install --save xterm@4.9.0
    npm install --save xterm-addon-fit
    npm install --save xterm-addon-attach
    fitaddonの参考サイト(https://www.npmjs.com/package/xterm-addon-fit)
    */
    private term!: Terminal;
    private fitAddon!: FitAddon;
    private x: number = 1200;
    private y: number = 200;
    private height: number = 500;
    private width: number = 500;
    //private terminalContainer: any = document.getElementById('terminal');
    private windowPriority: number = 0;
    private frame01: any;

    @Prop({})
    private windowName!: string;

    $refs!: {
      terminalConsole: TerminalConsole
    }

    mounted(){

        console.log(this.windowName)
        console.log('HELLO SHIMATANI')
        const jsFrame = new JSFrame({parentElement: document.querySelector('#window')});
        const frame01 = jsFrame.create({
        name: this.windowName,
        title: this.windowName,
        left: this.x, top: this.y, width: this.width, height: this.height,
        movable: true,//true:マウスで移動可能
        resizable: false,//true:マウスでリサイズ可能
        appearanceName: 'yosemite',//Now preset is selectable from  'yosemite','redstone','popup'
        style: {
           //backgroundColor: 'rgba(255,255,255,0)',
           //zIndex: 1
        },
        //html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="index.css"><title>Document</title></head><body><h1 class="page-title">テストメッセージ1</h1><h1 class="page-title">テストメッセージ2</h1></body>'
        
        });
        frame01.setTitle(this.windowName)
        //frame01.setUrl('./xterm2.html');
        frame01.show();
        this.frame01 = frame01;
        

        //console.log(frame01.jsFrame.windowManager.parentElement);
        //console.log(jsFrame.getWindowByName('Switch0'))
        //frame01.parentElement!.style.zIndex='5'
        //jsFrame.getWindowByName('Switch0').style.zIndex='1';

        //var frameA = jsFrame.getWindowByName(this.windowName);
        //console.log(frameA);
        
        

        const eventListener = (data) => {
            const frame = data.target;
            const eventType = data.eventType;
            const size = data.size;
            const position = data.pos;
            const windowName = frame.getName();
            //this.x = data.pos.x;
            //this.y = data.pos.y;
            console.log('a')
        }

        frame01.on('resize', (_flame) => {
            console.log(`Frame resized. ${_flame}`);
            });

        // register resize event
        frame01.on('frame', 'resize', eventListener);

        frame01.on('frame', 'resize', (data) => {
            this.height = data.size.height;
            this.width = data.size.width;
            //console.log(this.height)
            //console.log(this.width)
        });
        // register move event
        frame01.on('frame', 'move', eventListener);
         // Multiple listeners can be registered for a single eventType
        frame01.on('frame', 'move', (data) => {
            this.x = data.pos.x;
            this.y = data.pos.y;
            //console.log(this.x)
            //console.log(this.y)
        //console.log(`pos=${JSON.stringify(data.pos)} size=${JSON.stringify(data.size)}`)
        });

        frame01.on('frame', 'click', eventListener);

        frame01.on('frame', 'click', (data) =>{
            console.log('b');
        });


        /**
         * ウィンドウ内部をクリックしたときに発火
         * これだけだとタイトルバーをクリックしたときに発火されないため
         * 下記でタイトルバーの処理を記述
         */
        console.log(jsFrame.getWindowByName(this.windowName));
        var window = jsFrame.getWindowByName(this.windowName).iframe.id;
        document.querySelector('#'+window)!.addEventListener('click', () =>{
            const frame = jsFrame.getWindowByName(this.windowName);
            frame.requestFocus();

            this.configWindow();
        });


        /**
         * タイトルバーをクリックしたときに発火
         */
        var titleBar = jsFrame.getWindowByName(this.windowName).titleBar.id;
        document.querySelector('#'+titleBar)!.addEventListener('click', () =>{
            const frame = jsFrame.getWindowByName(this.windowName);
            frame.requestFocus();

            /**
             * TODO
             * ここをいい感じに初期化と同じ記述する
             */
            //GUIManager.guimanager.updateZIndex(this.windowName);
            //var num = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
            //this.windowPriority = Number(num);
            //frame01.jsFrame.windowManager.parentElement.style.zIndex=this.windowPriority;
            //GUIManager.guimanager.addCountWindow();

            this.configWindow();
        });



        frame01.on('frame', 'focus', (data) => {
        const frame = data.target;
        frame.setHTML(`<div id="my_element" style="padding:10px;font-size:20px;color:dodgerblue;">Focused!</div>`);
        console.log(`${frame.getName()} got focused.`);
      });

       /* document.querySelector('Switch0').addEventListener('click', () => {
        const windowName = `window${idx}`;

        // Find window by windowName
        const frame = jsFrame.getWindowByName(windowName);

        // Request focus on this window
        frame.requestFocus();
      });*/

        this.configWindow();
        /**
         * windowのz座標の計算
         */
        //GUIManager.guimanager.addCountWindow();
        //var num = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
        //this.windowPriority = Number(num);
        //console.log('windowの枚数：'+this.windowPriority)
        //this.$refs.terminalConsole.setZIndexOfTerminal(this.windowPriority);


        /**
         * ここで各Windowのz座標を設定
         */
        //frame01.jsFrame.windowManager.parentElement.style.zIndex=this.windowPriority

        //var elements = document.getElementsByClassName('xterm-text-layer');
        //elements[0].parentElement!.style.width='1000'
        //console.log(elements[0].parentElement!.style.width='100');
        //console.log(elements[0].parentElement)
        //elements[0].childNodes
        //console.log(document.getElementById('xterm-cursor-layer'))
        //elements[0].outerHTML = 'a';
        //console.log(elements[0].outerHTML)
    }

    //$refs!: {
    //  terminalConsole: TerminalConsole
    //}

    public updateZIndex(windowPriority: number): void{
        this.frame01.jsFrame.windowManager.parentElement.style.zIndex=windowPriority;
    }

    /**
     * ウィンドウとターミナルのz座標を設定する
     */
    public configWindow(): void{
        //windowをGUI Managerに登録&値更新
        GUIManager.guimanager.addWindow(this.windowName);
        //GUI Managerから使用するz座標の値を取得
        var zIndex = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
        //windowPriorityに値をセット
        this.windowPriority = Number(zIndex);
        //windowのz座標を更新
        this.frame01.jsFrame.windowManager.parentElement.style.zIndex=this.windowPriority
        //terminalのz座標を更新
        this.$refs.terminalConsole.updateZIndex(this.windowPriority+1);
        //GUI Managerのz座標を+2する
        GUIManager.guimanager.addCountWindow();
    }

    public move(): void{
        this.x = 100;
        this.y = 100;
    }
}




</script>

<style>
.terminal{
    overflow:visible;
    position: absolute;
    width: 440px;
    height:420px;
    z-index: 0;
}

#window{
    position: absolute;
    width: 500px;
    height: 500px;
}


.container::-webkit-scrollbar {  
  display: none; /*Google Chrome、Safari、Microsoft Edge対応のスクロールバー非表示コード*/
}

.xterm .xterm-screen{
    width: 90%;
    height: 420px;
}

.xterm-text-layer{
    width: 440px;
    height: 420px;
}

.xterm-selection-layer{
    width: 440px;
    height: 420px; 
}

.xterm-link-layer{
    width: 440px;
    height: 420px;
}

.xterm-cursor-layer{
    width: 440px;
    height: 420px;
}

</style>