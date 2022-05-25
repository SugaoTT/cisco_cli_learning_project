# cisco_cli_learning_project

本アプリケーションは、CCNA等の取得を目指す学生に対して、ネットワーク機器にどのようなコマンドを発行することで設定が施されるかというのを体系的に学習してもらうものである。

上記の点に加えて、私がVue.jsを用いてwebアプリケーション開発の練習をするために本アプリケーションを開発した。

外観は私が学部4年時に開発したシステムのものを踏襲しており、より便利に利用できるように、様々なフレームワークを取り入れており、CytoScape.jsを用いたグラフ作画や、xterm.jsを用いたターミナルの作成等を実施した。
本アプリケーションの実装目標としては、学習者が本アプリケーションを通じてターミナル上で発行したコマンドによって、どのような設定が施されるかを学習者にフィードバックすることとなっている。現状では、サーバとの疎通まで実装していないため、フロント側のみ実装完了となっている。

最終的な動作目標は以下のようなものである。

```
//入力コマンド
Router(config)# ip address 192.168.1.1 255.255.255.0
//サーバからの返答
IPアドレス: 192.168.1.1/24が設定されました。
```
## アプリケーション画面
アプリケーションの画面は以下の通りである。
![image](https://user-images.githubusercontent.com/98573303/169934387-779af3f3-d431-43d8-9fe8-3d6db832dce0.png)

## 開発目標
アプリケーションの開発目標は以下の通りである。

- Router, Switch, Hostを生成するためのボタンを作成し、ネットワークキャンバス上に追加できるようにする。
- ネットワーク機器間の結線をできるようにする。
- コマンド発行ができるようにコンソールを実装する。
- 機器を追加したとき、結線したとき、コンソールへコマンドが発行された時にサーバへメッセージを送り、サーバからのレスポンスを受け取る。

## 実装

開発目標のうち上3つに関しては実装が完了している。

Router, Switch, Hostを生成のためのボタンに関してはHTMLのDrag&Dropイベントを利用することで実現をした。

ネットワークキャンバスに関しては、柔軟に機器の移動・配置を可能とするためにCytoScape.jsを利用した。

![image](https://user-images.githubusercontent.com/98573303/169933805-92ba81bf-5fbe-4a79-a47a-f93fee658adf.png)
https://js.cytoscape.org/


コマンド発行のためのコンソールは、xterm.jsを利用した。

![image](https://user-images.githubusercontent.com/98573303/169933903-4d376c67-b97d-4155-a0cc-4cf7f266fab7.png)
https://xtermjs.org/

## 課題
今後の課題として、
試行錯誤を繰り返しコーディングをしたため、設計面や実装方法に非効率な部分があるため、その部分の改善。
また、コードの整備を行う。

さらに、サーバを作成しWebアプリケーションと疎通しやり取りを行えるようにする。


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
