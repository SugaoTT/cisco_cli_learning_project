<template>
    <div id=terminal></div>
</template>

<script lang="ts">
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import {GUIManager} from '../../script/gui/GUIManager';

@Component
export default class TerminalConsole extends Vue{
    /*
    実装にはxterm.jsを使用
    npm install --save xterm@4.9.0
    npm install --save xterm-addon-fit
    npm install --save xterm-addon-attach
    fitaddonの参考サイト(https://www.npmjs.com/package/xterm-addon-fit)
    */
    private term!: Terminal;
    private fitAddon!: FitAddon;
    //private terminalContainer: any = document.getElementById('terminal');
    private terminalName: string = '';
    //private z_index: number = 0;

    private _zIndexOfTerminal: String | undefined = '';

    @Prop({})
    private windowName!: string;
    //private windowPriority!: number;

    mounted(){
        //GUIManager.guimanager.addWindow(this.windowName)
        //this._zIndexOfTerminal = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
        //GUIManager.guimanager.addCountWindow();


        //document.getElementById(this.terminalName)?.children.namedItem('')


        /*
        console.log('GUIMANAGERへの問い合わせ: '+GUIManager.guimanager.getZIndexByWindowName(this.windowName));

        var zIndexOfTerminal = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
        while(zIndexOfTerminal == undefined){
            console.log('待ってます');
            zIndexOfTerminal = GUIManager.guimanager.getZIndexByWindowName(this.windowName);
        }
        this._zIndexOfTerminal = String(zIndexOfTerminal)
        */

        //this._zIndexOfTerminal = String(GUIManager.guimanager.countWindows+1);


        //this.z_index = this.windowPriority+1;

        console.log(this._zIndexOfTerminal)

        this.terminalName = this.windowName+'OfTerminal'
        console.log(this.terminalName)
        console.log(document.getElementById('terminal')!)
        document.getElementById('terminal')!.id=this.terminalName;
        console.log(document.getElementById(this.terminalName)!)

        this.term = new Terminal({
            fontSize: 14,
            rows: 30,
            cursorBlink: true,
            cursorStyle: 'underline',
            theme: {
                foreground: "#000000", //Font
                background: "#ffffff", //Background color
                cursor: "#000000" //Set cursor
            }
        });
        this.fitAddon = new FitAddon();
        this.term.loadAddon(this.fitAddon);
        this.term.open(document.getElementById(this.terminalName)!);
        this.term.writeln('Welcome to the terminal by xterm.js');
        this.term.write('\r\n$ ');
        this.term.clear();
        this.fitAddon.fit();
        
        //var elm =  document.getElementById(this.terminalName)!.style.zIndex='1';

        //var windowPriority

        console.log('winPro: '+this._zIndexOfTerminal)

        //document.getElementById(this.windowName)!.style.position='absolute';
        //document.getElementById(this.windowName)!.style.zIndex=String(Number(this._zIndexOfTerminal)+1);
        //console.log(document.getElementById(this.windowName))
        //this.term.fit();

        var curr_line = '';
        var printable: boolean = false;// = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
        /*
        参考ページ
        https://stackoverflow.com/questions/54189424/xterm-js-getting-current-line-text
        */
        this.term.onKey((e: { key: string, domEvent: KeyboardEvent }) => {
            //if(e.domEvent.keyCode)
            //curr_line += e.domEvent.key;
            printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
            curr_line += e.domEvent.key;

             if (e.domEvent.keyCode === 13){
                 this.term.write('\r\n$ ');
             } else if(e.domEvent.keyCode === 8){
                if(this.term.buffer.active.cursorX > 2){
                    curr_line.slice(0,-1);
                    console.log(this.term.buffer.active.cursorX);
                    this.term.write('\b \b');
                    
                }
             } else if(printable){
                
                console.log(curr_line, e.domEvent.key);
                this.term.write(e.key);
             }

            
        })
/*
        this.term.onKey((e: { key: string, domEvent: KeyboardEvent }) => {
            const ev = e.domEvent;
            const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
        });*/
    }

    //public setZIndexOfTerminal(windowPriority: number){
    //    this._zIndexOfTerminal = String(windowPriority + 1);
    //}

    public childMethod(): void{
        console.log('child');
    }

    public updateZIndex(zIndexOfTerminal: number): void{
        this._zIndexOfTerminal = String(zIndexOfTerminal);
        document.getElementById(this.windowName)!.style.position='absolute';
        document.getElementById(this.windowName)!.style.zIndex=String(zIndexOfTerminal);
    }

}




</script>

<style scoped>
    .terminal{
    }

</style>