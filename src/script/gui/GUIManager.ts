import { AbstractNode } from "@/components/node/AbstractNode";

export class GUIManager{
    /** 自身を格納する変数*/
    private static _guimanager: GUIManager;

    /** ノード管理用リスト */
    private _list_nodes: Array<AbstractNode>;

    /** これまでwindowが何枚作られたかどうかを数え上げる
     *  windowのz軸の優先度指定に使用
     */
    private _count_windows: number;

    /**
     * これまでに作られたwindowの名前とz座標を紐づけたMAP
     * TODO: MAPの中のwindow名の優先度を変更できるようにする．
     */
    private _map_windows: Map<string, string>;

    /** シングルトンパターンの実装 */
    public static get guimanager(): GUIManager{
        if(this._guimanager == null){
            this._guimanager = new GUIManager();
        }
        
        return this._guimanager;		
    }

    


    /** コンストラクタ */
    private constructor(){
        this._list_nodes = new Array();
        this._count_windows = 10;
        this._map_windows = new Map<string, string>();
    }


    /** ノード管理用リストを返す */
    public get list_nodes(){
        return this._list_nodes;
    }

    /** ノード管理用リストに新たなノードを追加*/
    public addNode(node: AbstractNode){
        this._list_nodes.push(node);
        console.log(node.nodeID+'がguimanagerに追加されました')
    }

    /** ノード管理用リストからノードIDに対応するノードオブジェクトを検索 */
    public selectedByUMID(nodeID: string): AbstractNode | null{
        let node: AbstractNode;
        for(let i: number = 0; i < this._list_nodes.length; i++){
            node = this._list_nodes[i];
            if(nodeID == node.nodeID){
                return node;
            }
        }
        return null;
    }
    /** windowの枚数が増加したときにcount_windowの値を増加させる */
    public addCountWindow(): void{
        this._count_windows = this._count_windows+2;
        console.log('test:'+this._count_windows);
    }

    /** windowがこれまでに何枚作られたかどうかを返す */
    public get countWindows(): number{
        //this._count_windows = this._count_windows+2;
        return this._count_windows;
    }

    /**
     * 追加したWindowをz座標と対応付けてMAPに追加
     * @param windowName ウィンドウ名
     */
    public addWindow(windowName: string): void{
        this._map_windows.set(windowName, String(this._count_windows));
    }

    public getZIndexByWindowName(windowName: string): string | undefined{
        if(this._map_windows.has(windowName)){
            var a = this._map_windows.get(windowName);
            return a;
        } 
    }

    /**
     * 登録されているウィンドウのz座標を更新
     * @param windowName ウィンドウ名
     */
    public updateZIndex(windowName: string): void{
        this._map_windows.set(windowName, String(this._count_windows));
    }

    //public updateZIndexByWindowName(windowName: string): string | undefined{
//
    //}

}