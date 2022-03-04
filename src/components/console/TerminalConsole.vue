<template>
    <div id="terminal"></div>
</template>

<script lang="ts">
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

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

    mounted(){
        this.term = new Terminal({
            fontSize: 14,
            rows: 30,
            cursorBlink: true,
            cursorStyle: 'underline'
        });
        this.fitAddon = new FitAddon();
        this.term.loadAddon(this.fitAddon);
        this.term.open(document.getElementById('terminal')!);
        this.term.writeln('Welcome to the terminal by xterm.js');
        this.term.write('\r\n$ ');
        this.term.clear();
        this.fitAddon.fit();
        
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
}




</script>

<style scoped>
#terminal{
	overflow: auto;
    position: absolute;
    width: 500px;
    height:500px;
}
</style>