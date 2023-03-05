/** 各種ノードのおおもとのクラス、コンテナを継承している */
export class AbstractNode{

    /** ノードのIDを格納，サーバ内で一意となる */
    private _nodeID!: string;

    /** ノード名を格納，クライアント内で一意となる．ネットワークキャンバス等に書く際はこちらを使用 */
    private _nodeName!: string;

    /** window表示フラグ, 既にwindowが表示されていたらtrue, それ以外はfalse */
    private _isDisplayedWindow!: boolean;

    /** コンソールログを格納 */
    private _consoleLog!: string;


    public constructor(nodeID: string, nodeName: string){
        this._nodeID = nodeID;
        this._nodeName = nodeName;
    }

    public set nodeID(nodeID: string){
        this._nodeID = nodeID;
    }

    public get nodeID(): string{
        return this._nodeID;
    }

    public set nodeName(nodeName: string){
        this._nodeName = nodeName;
    }

    public get nodeName(): string{
        return this._nodeName;
    }

    public set isDisplayedWindow(isDisplayedWindow: boolean){
        this._isDisplayedWindow = isDisplayedWindow;
    }

    public get isDisplayedWindow(){
        return this._isDisplayedWindow;
    }
}