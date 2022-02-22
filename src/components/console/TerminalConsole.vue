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
    */
    private term!: Terminal;
    //private terminalContainer: any = document.getElementById('terminal');

    mounted(){
        this.term = new Terminal({
            fontSize: 14,
            cursorBlink: true
        });
        this.term.open(document.getElementById('terminal')!);
        this.term.writeln('Welcome to the terminal by xterm.js');
        this.term.clear();

        var curr_line = '';

        /*
        参考ページ
        https://stackoverflow.com/questions/54189424/xterm-js-getting-current-line-text
        */
        this.term.onKey((e: { key: string, domEvent: KeyboardEvent }) => {
            //if(e.domEvent.keyCode)
            curr_line += e.domEvent.key;
            console.log(curr_line, e.domEvent.key);
            this.term.write(e.key);
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
    resize: both;
	overflow: auto;
}
</style>