# Node-Curl

### 使い方
#### ビルド
```
yarn
yarn build
```
#### 基本的なコマンド
指定したurlにGETリクエストを送信する
```
yarn start URL
```
#### オプション
ファイル出力.取得したテキスト、画像、音声ファイルをdist/tmp以下に出力する
```
-o ファイル名
```
リクエスト、レスポンスのヘッダー出力
```
-v
```
POSTリクエスト
```
-X POST
```
パラメータを送信する例
```
-d "text=hello&index=3"
```